import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    try {
        const { market, image } = await req.json();

        if (!apiKey) return NextResponse.json({ success: false, error: 'Falta API Key' }, { status: 500 });

        // High-precision redesign prompt
        const prompt = `
            IMAGE GENERATION TASK:
            Re-design this marketing flyer for the ${market} market.
            
            STYLE REQUIREMENTS:
            - Maintain the EXACT 3D metallic silver/purple aesthetic.
            - Keep the "Bridge Markets" branding.
            - The main text must be "${market === 'French' ? 'COUPON' : 'CUPÓN'}".
            - Include "10% OFF" in 3D metallic numbers.
            - The layout must be identical to the original but NATIVELY rendered in ${market} language.
            
            OUTPUT: You MUST return a NEW image file.
        `;

        // Prepare image for SDK
        const imagePart = {
            inlineData: {
                data: image,
                mimeType: "image/jpeg"
            }
        };

        // List of models to try
        const modelsToTry = [
            "gemini-2.5-pro", 
            "gemini-2.5-flash", 
            "gemini-2.0-flash",
            "gemini-1.5-pro",
            "imagen-3"
        ];
        
        let lastError = null;

        for (const modelId of modelsToTry) {
            try {
                console.log(`Intentando con modelo: ${modelId}...`);
                const genAI = new GoogleGenerativeAI(apiKey);
                const model = genAI.getGenerativeModel({ model: modelId }, { apiVersion: 'v1' });

                const result = await model.generateContent([prompt, imagePart]);
                const response = await result.response;
                
                // Check for image parts
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

                // Fallback for base64 in text
                const text = response.text();
                const match = text.match(/data:image\/[a-zA-Z]*;base64,[^"']*/);
                if (match) {
                    return NextResponse.json({ success: true, type: 'image', data: match[0], socialCopy: text });
                }

                console.warn(`Modelo ${modelId} no generó imagen, probando el siguiente.`);
                lastError = new Error(`El modelo ${modelId} no soportó generación de imagen directa.`);
            } catch (e: any) {
                lastError = e;
                console.error(`Error en modelo ${modelId}:`, e.message);
                // Si es un error de saturación o no encontrado, seguimos intentando
                continue;
            }
        }

        throw lastError || new Error("No se pudo rediseñar la imagen con los modelos disponibles.");

    } catch (error: any) {
        console.error('Error in marketing localization:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}