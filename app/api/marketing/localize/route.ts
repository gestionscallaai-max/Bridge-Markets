import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    try {
        const { market, image } = await req.json();

        if (!apiKey) return NextResponse.json({ success: false, error: 'Falta API Key de Gemini' }, { status: 500 });

        const genAI = new GoogleGenerativeAI(apiKey);
        // Use v1beta and pro model for native image generation support
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }, { apiVersion: 'v1beta' });

        const prompt = `Re-create this image exactly as it is, pixel by pixel, but translate all the text to ${market}. 
        Maintain the exact 3D metallic silver typography, the purple abstract background, and the Bridge Markets branding.
        The output must be the GENERATED IMAGE.`;

        const imagePart = {
            inlineData: {
                data: image,
                mimeType: "image/jpeg"
            }
        };

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        
        // Look for the image in the response parts
        const parts = response.candidates?.[0]?.content?.parts || [];
        const imagePartFound = parts.find((p: any) => p.inlineData);

        if (imagePartFound && imagePartFound.inlineData) {
            return NextResponse.json({ 
                success: true, 
                type: 'image',
                data: `data:${imagePartFound.inlineData.mimeType};base64,${imagePartFound.inlineData.data}`,
                socialCopy: response.text() || "Flyer rediseñado correctamente."
            });
        }

        // Fallback: Check if it returned a base64 string in the text
        const text = response.text();
        const b64Match = text.match(/data:image\/[a-zA-Z]*;base64,[^"']*/);
        if (b64Match) {
            return NextResponse.json({
                success: true,
                type: 'image',
                data: b64Match[0],
                socialCopy: text
            });
        }

        throw new Error("El modelo no devolvió la imagen reconstruida. Asegúrate de que los permisos de generación de imagen están activos.");

    } catch (error: any) {
        console.error('Error in Gemini image generation:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}