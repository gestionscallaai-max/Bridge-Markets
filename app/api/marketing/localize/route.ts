import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    try {
        const { market, image } = await req.json();

        if (!apiKey) return NextResponse.json({ success: false, error: 'Falta API Key de Gemini' }, { status: 500 });

        // Pure Pixel-by-Pixel Reconstruction Prompt (Optimized for Imagen 3 via Gemini API)
        const prompt = `
            TASK: RECONSTRUCT THIS IMAGE PIXEL-BY-PIXEL.
            Maintain the EXACT 3D metallic silver typography and purple aesthetic of Bridge Markets.
            
            TRANSLATION REQUIREMENTS:
            - Change all Spanish text to ${market}.
            - "CUPÓN" must be replaced by "${market === 'French' ? 'COUPON' : 'CUPÓN'}" using the SAME chrome/silver 3D style.
            - "ESPECIAL" -> "${market === 'French' ? 'SPÉCIAL' : 'SPECIAL'}".
            
            OUTPUT: YOU MUST RETURN A NEW IMAGE BLOB.
        `;

        const imagePart = {
            inlineData: {
                data: image,
                mimeType: "image/jpeg"
            }
        };

        const modelsToTry = ["gemini-1.5-pro", "gemini-1.5-flash", "gemini-2.5-pro"];
        let lastError = null;

        for (const modelId of modelsToTry) {
            try {
                const genAI = new GoogleGenerativeAI(apiKey);
                // Use v1beta for advanced image generation features
                const model = genAI.getGenerativeModel({ model: modelId }, { apiVersion: 'v1beta' });

                const result = await model.generateContent([prompt, imagePart]);
                const response = await result.response;
                
                const parts = response.candidates?.[0]?.content?.parts || [];
                const imagePartFound = parts.find((p: any) => p.inlineData);

                if (imagePartFound && imagePartFound.inlineData) {
                    return NextResponse.json({ 
                        success: true, 
                        type: 'image',
                        data: `data:${imagePartFound.inlineData.mimeType};base64,${imagePartFound.inlineData.data}`,
                        socialCopy: response.text() || "Flyer reconstruido píxel a píxel."
                    });
                }
                
                throw new Error(`El modelo ${modelId} no generó la imagen reconstruida.`);
            } catch (e: any) {
                lastError = e;
                continue;
            }
        }

        throw lastError || new Error("No se pudo reconstruir la imagen con Gemini.");

    } catch (error: any) {
        console.error('Error in Gemini reconstruction:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}