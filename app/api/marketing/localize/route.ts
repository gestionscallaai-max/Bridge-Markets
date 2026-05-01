import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    try {
        const { market, image } = await req.json();

        if (!apiKey) return NextResponse.json({ success: false, error: 'Falta API Key' }, { status: 500 });

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-pro",
            generationConfig: { responseMimeType: "application/json" }
        });

        // Prompt for High-Fidelity Design Extraction
        const prompt = `
            You are a professional design reconstruction engine. 
            TASK: Identify every text block in this flyer and its background context for a PIXEL-PERFECT replacement.
            
            FOR EACH BLOCK, PROVIDE:
            1. originalText: Exact text in the image.
            2. translatedText: The translation to ${market}.
            3. x, y: Center coordinates (0.0 to 1.0).
            4. fontSize: Estimated size in pixels.
            5. color: Text color (HEX).
            6. bgColor: The EXACT background color/hex behind this specific text (CRITICAL).
            7. bold: boolean.
            
            RETURN ONLY THIS JSON SCHEMA:
            {
              "layers": [
                { "originalText": "...", "translatedText": "...", "x": 0.5, "y": 0.5, "fontSize": 50, "color": "#FFFFFF", "bgColor": "#2D1B4E", "bold": true }
              ],
              "socialCopy": "..."
            }
        `;

        const imagePart = {
            inlineData: {
                data: image,
                mimeType: "image/jpeg"
            }
        };

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const aiData = JSON.parse(response.text());

        return NextResponse.json({
            success: true,
            type: 'layers',
            layers: aiData.layers,
            socialCopy: aiData.socialCopy
        });

    } catch (error: any) {
        console.error('Error in design analysis:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}