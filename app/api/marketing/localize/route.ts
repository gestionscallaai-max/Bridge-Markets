import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
        return NextResponse.json({ success: false, error: "Falta OPENAI_API_KEY en el servidor." }, { status: 500 });
    }
    const openai = new OpenAI({ apiKey: openaiKey });

    try {
        const { market, image } = await req.json();

        // Step 1: Analyze original image with GPT-4o Vision to generate a perfect reconstruction prompt
        const visionResponse = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: [
                        { 
                            type: "text", 
                            text: `Analyze this Bridge Markets flyer. Generate a high-detail prompt for DALL-E 3 to RECREATE this exact image pixel-by-pixel. 
                            The background must be the same dark purple abstract texture. 
                            The branding "BRIDGE MARKETS Propfirm" must be at the top.
                            The central text must be changed to ${market}. 
                            If it's French, use "COUPON SPÉCIAL". 
                            Maintain the 3D metallic silver/chrome effect for the main numbers and text.
                            The bottom code is "BM10%".
                            Return ONLY the prompt for DALL-E 3, nothing else.` 
                        },
                        { 
                            type: "image_url", 
                            image_url: { url: `data:image/jpeg;base64,${image}` } 
                        }
                    ]
                }
            ],
            max_tokens: 500
        });

        const dallePrompt = visionResponse.choices?.[0]?.message?.content || "A professional marketing flyer for Bridge Markets with metallic 3D text.";

        // Step 2: Generate the new image with DALL-E 3
        const imageGeneration = await openai.images.generate({
            model: "dall-e-3",
            prompt: dallePrompt,
            n: 1,
            size: "1024x1792", // Vertical aspect ratio
            quality: "hd",
            response_format: "b64_json"
        });

        const newImageBase64 = imageGeneration.data?.[0]?.b64_json;

        if (!newImageBase64) {
            throw new Error("DALL-E 3 no devolvió los datos de la imagen.");
        }

        return NextResponse.json({
            success: true,
            type: 'image',
            data: `data:image/png;base64,${newImageBase64}`,
            socialCopy: "Flyer rediseñado profesionalmente por DALL-E 3."
        });

    } catch (error: any) {
        console.error('Error in OpenAI reconstruction:', error);
        return NextResponse.json({ 
            success: false, 
            error: error.message || "Error al rediseñar la imagen con OpenAI." 
        }, { status: 500 });
    }
}