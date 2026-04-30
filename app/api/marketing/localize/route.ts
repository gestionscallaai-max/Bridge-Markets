import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    try {
        const { market, image } = await req.json();

        if (!apiKey) return NextResponse.json({ success: false, error: 'Falta API Key' }, { status: 500 });

        // Initialize Google AI with v1 (stable)
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            generationConfig: {
                responseMimeType: "application/json"
            }
        }, { apiVersion: 'v1' });

        // High-precision design layer prompt
        const prompt = `
            You are "Nano Banana", a high-end marketing design engine.
            TASK: Extract and translate all text layers from this flyer to ${market}.
            
            RULES:
            1. Extract EVERY text element.
            2. Translate accurately but keep the marketing impact.
            3. For the coordinates (x, y), use 0.0 to 1.0 (0.5 is center).
            4. Identify the prominent visual style (color, font weight).
            
            TRANSLATION SPECIAL RULES:
            - "CUPÓN" -> "COUPON"
            - "ESPECIAL" -> "SPECIAL"
            - "DSCTO" -> "OFF"
            
            RETURN ONLY THIS JSON SCHEMA:
            {
              "success": true,
              "type": "layers",
              "layers": [
                { "text": "Translated Text", "x": 0.5, "y": 0.3, "fontSize": 60, "color": "#FFFFFF", "bold": true },
                { "text": "Subtext", "x": 0.5, "y": 0.45, "fontSize": 24, "color": "#CCCCCC", "bold": false }
              ],
              "socialCopy": "A high-conversion marketing caption in ${market}"
            }
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
        const responseText = response.text();

        try {
            const aiData = JSON.parse(responseText);
            return NextResponse.json(aiData);
        } catch (e) {
            console.error('Failed to parse AI JSON:', responseText);
            return NextResponse.json({ 
                success: false, 
                error: "La IA no devolvió un formato de diseño válido." 
            }, { status: 500 });
        }

    } catch (error: any) {
        console.error('Error in marketing localization:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}