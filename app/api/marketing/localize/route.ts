import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    try {
        const { market, image } = await req.json();

        if (!apiKey) return NextResponse.json({ success: false, error: 'Falta API Key' }, { status: 500 });

        const genAI = new GoogleGenerativeAI(apiKey);
        // Using the specific model identified in the working reference
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image" }, { apiVersion: 'v1beta' });

        const prompt = `Translate all text in this advertisement image to the language of ${market}. ONLY translate the text - do not add any cultural imagery, flags, national symbols, or stereotypical visual elements. Keep the image, composition, styling, colors, and all visual elements exactly the same as the original. The only change should be the language of the text.`;

        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        inlineData: {
                            mimeType: 'image/jpeg',
                            data: image,
                        },
                    },
                    { text: prompt },
                ],
            },
        ];

        // The working reference uses a specific config for image generation
        const result = await model.generateContentStream({
            contents,
            generationConfig: {
                // @ts-ignore - Specific property from the reference code
                imageConfig: {
                    aspectRatio: "9:16", // Adjusted for typical flyers
                }
            }
        } as any);

        let base64Image = null;
        for await (const chunk of result.stream) {
            if (!chunk.candidates?.[0]?.content?.parts) continue;
            
            for (const part of chunk.candidates[0].content.parts) {
                if (part.inlineData) {
                    base64Image = part.inlineData.data;
                    break;
                }
            }
            if (base64Image) break;
        }

        if (base64Image) {
            return NextResponse.json({ 
                success: true, 
                type: 'image',
                data: `data:image/jpeg;base64,${base64Image}`,
                socialCopy: "Flyer rediseñado perfectamente."
            });
        }

        throw new Error("El modelo no devolvió la imagen reconstruida. Verifica los permisos de Gemini 2.5 Flash Image.");

    } catch (error: any) {
        console.error('Error in Gemini reconstruction:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}