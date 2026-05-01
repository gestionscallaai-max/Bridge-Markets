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
                        text: [
                            `You are a professional advertisement localization engine.`,
                            ``,
                            `TASK: Recreate this exact advertisement image with ALL text translated to ${market}.`,
                            ``,
                            `STRICT RULES:`,
                            `1. TRANSLATE EVERY SINGLE word, phrase, and sentence in the image to ${market}. No exceptions.`,
                            `2. DO NOT leave any word in the original language. Every piece of readable text must be in ${market}.`,
                            `3. DO NOT TRANSLATE brand names, codes, or identifiers: "Bridge Markets", "BM10%", URLs, email addresses, phone numbers, or any alphanumeric promotional code.`,
                            `4. PRESERVE the exact same visual design: background, colors, gradients, textures, 3D effects, metallic typography style, shadows, and all decorative elements.`,
                            `5. PRESERVE the exact same layout, text positioning, font sizes, and visual hierarchy.`,
                            `6. DO NOT add any cultural imagery, flags, national symbols, landmarks, or stereotypical visual elements.`,
                            `7. The ONLY difference between the original and the output must be the language of the text.`,
                            `8. The output must be a complete, production-ready advertisement image.`,
                        ].join('\n'),
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