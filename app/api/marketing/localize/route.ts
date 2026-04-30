import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
    try {
        const { market, image } = await req.json();
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

        if (!apiKey) return NextResponse.json({ success: false, error: 'Falta API Key' }, { status: 500 });

        // Initialize Google AI
        const genAI = new GoogleGenerativeAI(apiKey);
        
        // Use gemini-1.5-flash which is standard for image tasks
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Specialized localization prompt
        const prompt = `
            LOCALIZE THIS MARKETING FLYER TO: ${market}.
            
            TRANSLATION GUIDE (STRICT SPELLING):
            - "CUPÓN" must be "COUPON" (Check spelling twice!)
            - "ESPECIAL" -> "SPECIAL"
            - "PROGRAMA" -> "PROGRAM"
            - "CÓDIGO" -> "CODE"
            - "DSCTO" -> "OFF"
            
            CRITICAL INSTRUCTIONS:
            1. RENDER A NEW IMAGE: Perform a native inpainting.
            2. PERFECTION: Localized text must match the 3D metallic/silver style perfectly.
            3. SOCIAL COPY: In addition to the image, provide a high-conversion marketing caption for Instagram/Facebook in ${market} as a separate text part.
            4. DIMENSIONS: Maintain the EXACT SAME dimensions and aspect ratio as the original image.
            5. OUTPUT: Return the localized image and the marketing text.
        `;

        // Prepare image for SDK
        const imagePart = {
            inlineData: {
                data: image,
                mimeType: "image/jpeg"
            }
        };

        // Make the call
        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        
        // Extract parts
        const responseText = response.text();
        const parts = response.candidates?.[0]?.content?.parts || [];
        const resultImagePart = parts.find((p: any) => p.inlineData);

        if (resultImagePart) {
            return NextResponse.json({ 
                success: true, 
                type: 'image',
                data: `data:${resultImagePart.inlineData.mimeType};base64,${resultImagePart.inlineData.data}`,
                socialCopy: responseText
            });
        }

        // Fallback: If AI returned text/json instead of an image
        try {
            // Check if text is JSON
            const aiData = JSON.parse(responseText.replace(/```json|```/g, ''));
            return NextResponse.json({ 
                success: true, 
                type: 'layers',
                data: aiData,
                socialCopy: responseText
            });
        } catch (e) {
            return NextResponse.json({ 
                success: true, 
                type: 'error',
                message: "La IA generó el texto pero no pudo procesar la imagen directamente.",
                socialCopy: responseText
            });
        }

    } catch (error: any) {
        console.error('Error in marketing localization:', error);
        
        // Debug info if model not found
        let debugMsg = error.message;
        if (debugMsg.includes('not found') || debugMsg.includes('supported')) {
            debugMsg += " | Sugerencia: Verifica que la API Key tenga habilitado el modelo gemini-1.5-flash en Google AI Studio.";
        }

        return NextResponse.json({ success: false, error: debugMsg }, { status: 500 });
    }
}