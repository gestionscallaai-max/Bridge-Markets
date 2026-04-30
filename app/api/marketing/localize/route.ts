import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    try {
        const { market, image } = await req.json();

        if (!apiKey) return NextResponse.json({ success: false, error: 'Falta API Key' }, { status: 500 });

        // Exact re-creation prompt (matching user's screenshot)
        const prompt = `Crea una imagen exactamente igual a esta, pero traducida al ${market}.
        
        REQUISITOS CRÍTICOS:
        1. El diseño debe ser IDÉNTICO (estilo metálico 3D, colores púrpuras).
        2. Todo el texto debe estar en ${market}.
        3. Especial atención a la palabra "CUPÓN" -> debe ser "${market === 'French' ? 'COUPON' : 'CUPÓN'}".
        4. Devuelve la imagen GENERADA.`;

        // Prepare image for SDK
        const imagePart = {
            inlineData: {
                data: image,
                mimeType: "image/jpeg"
            }
        };

        const modelsToTry = ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.5-flash-lite"];
        let lastError = null;

        for (const modelId of modelsToTry) {
            try {
                const genAI = new GoogleGenerativeAI(apiKey);
                // Try to use v1beta for better image generation tool support
                const model = genAI.getGenerativeModel({ model: modelId }, { apiVersion: 'v1' });

                const result = await model.generateContent([prompt, imagePart]);
                const response = await result.response;
                
                const parts = response.candidates?.[0]?.content?.parts || [];
                const imagePartFound = parts.find((p: any) => p.inlineData);

                if (imagePartFound && imagePartFound.inlineData) {
                    return NextResponse.json({ 
                        success: true, 
                        type: 'image',
                        data: `data:${imagePartFound.inlineData.mimeType};base64,${imagePartFound.inlineData.data}`,
                        socialCopy: response.text() || ""
                    });
                }
                
                const text = response.text();
                const match = text.match(/data:image\/[a-zA-Z]*;base64,[^"']*/);
                if (match) {
                    return NextResponse.json({ success: true, type: 'image', data: match[0], socialCopy: text });
                }

                throw new Error("El modelo no devolvió una imagen generada.");
            } catch (e: any) {
                lastError = e;
                continue;
            }
        }

        throw lastError || new Error("No se pudo procesar el rediseño.");

    } catch (error: any) {
        console.error('Error in marketing localization:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}