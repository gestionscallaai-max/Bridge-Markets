import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    try {
        const { market, image } = await req.json();

        if (!apiKey) return NextResponse.json({ success: false, error: 'Falta API Key' }, { status: 500 });

        // High-precision design extraction prompt
        const prompt = `
            You are "Nano Banana", a high-end design engine.
            TASK: Extract every text layer and its background context for a SEAMLESS redesign.
            
            FOR EACH TEXT ELEMENT, IDENTIFY:
            1. originalText: The text in the image.
            2. translatedText: The translation to ${market}.
            3. x, y: Coordinates (0.0 to 1.0).
            4. fontSize: Estimated size.
            5. color: Text color (HEX).
            6. bgColor: The EXACT background color/hex behind this specific text (CRITICAL for erasing it).
            7. bold: boolean.
            
            RETURN ONLY THIS JSON:
            {
              "success": true,
              "type": "layers",
              "layers": [...],
              "socialCopy": "..."
            }
        `;

        // Prepare image for SDK
        const imagePart = {
            inlineData: {
                data: image,
                mimeType: "image/jpeg"
            }
        };

        const modelsToTry = ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.0-flash"];
        let lastError = null;

        for (const modelId of modelsToTry) {
            try {
                const genAI = new GoogleGenerativeAI(apiKey);
                const model = genAI.getGenerativeModel({ 
                    model: modelId,
                    generationConfig: { responseMimeType: "application/json" }
                }, { apiVersion: 'v1' });

                const result = await model.generateContent([prompt, imagePart]);
                const response = await result.response;
                return NextResponse.json(JSON.parse(response.text()));
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