import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    try {
        const { market, image } = await req.json();

        if (!apiKey) return NextResponse.json({ success: false, error: 'Falta API Key' }, { status: 500 });

        const ai = new GoogleGenAI({ apiKey });
        const model = 'gemini-2.5-flash-image';

        const contents = [
            {
                role: 'user' as const,
                parts: [
                    {
                        inlineData: {
                            mimeType: 'image/jpeg',
                            data: image,
                        },
                    },
                    {
                        text: `Translate all text in this advertisement image to the language of ${market}. ONLY translate the text - do not add any cultural imagery, flags, national symbols, or stereotypical visual elements. Keep the image, composition, styling, colors, and all visual elements exactly the same as the original. The only change should be the language of the text.`,
                    },
                ],
            },
        ];

        const config = {
            responseModalities: ['image', 'text'],
        };

        const response = await ai.models.generateContentStream({
            model,
            config,
            contents,
        } as any);

        let base64Image: string | null = null;
        for await (const chunk of response) {
            if (!chunk.candidates?.[0]?.content?.parts) continue;
            
            for (const part of chunk.candidates[0].content.parts) {
                if (part.inlineData) {
                    base64Image = part.inlineData.data || null;
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
                socialCopy: "Flyer localizado correctamente."
            });
        }

        throw new Error("El modelo no devolvió la imagen. Verifica tu cuota en https://ai.dev/rate-limits");

    } catch (error: any) {
        console.error('Error in Gemini reconstruction:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}