import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const maxDuration = 120;

export async function POST(req: NextRequest) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    try {
        const { market, image } = await req.json();

        if (!apiKey) return NextResponse.json({ success: false, error: 'Falta API Key' }, { status: 500 });

        const ai = new GoogleGenAI({ apiKey });

        const lang: Record<string, string> = {
            'French': 'French', 'English': 'English', 'Portuguese': 'Portuguese',
            'Chinese': 'Chinese', 'Hindi': 'Hindi', 'Japanese': 'Japanese',
            'Russian': 'Russian', 'Arabic': 'Arabic', 'Bengali': 'Bengali', 'Spanish': 'Spanish',
        };

        const target = lang[market] || market;

        // Helper: call image model with retry
        const generateImage = async (inputImage: string, prompt: string): Promise<string | null> => {
            for (let attempt = 0; attempt < 3; attempt++) {
                try {
                    const res = await ai.models.generateContentStream({
                        model: 'gemini-2.5-flash-image',
                        config: { responseModalities: ['image', 'text'] },
                        contents: [{
                            role: 'user',
                            parts: [
                                { inlineData: { mimeType: 'image/jpeg', data: inputImage } },
                                { text: prompt },
                            ],
                        }],
                    } as any);

                    for await (const chunk of res) {
                        if (!chunk.candidates?.[0]?.content?.parts) continue;
                        for (const part of chunk.candidates[0].content.parts) {
                            if (part.inlineData?.data) return part.inlineData.data;
                        }
                    }
                    return null;
                } catch (e: any) {
                    if (attempt < 2) {
                        await new Promise(r => setTimeout(r, (attempt + 1) * 5000));
                        continue;
                    }
                    throw e;
                }
            }
            return null;
        };

        // PASS 1: Initial translation
        const pass1 = await generateImage(image,
            `Translate ALL text in this advertisement to ${target}. Replace every word. Keep the exact same design. Only change the language.`
        );

        if (!pass1) throw new Error("El modelo no generó la imagen.");

        // Wait 3 seconds to avoid rate limiting
        await new Promise(r => setTimeout(r, 3000));

        // PASS 2: Fix remaining untranslated text
        const pass2 = await generateImage(pass1,
            `Some text in this image is still in Spanish. Replace ALL remaining Spanish text with ${target}. Do not change anything else.`
        );

        return NextResponse.json({ 
            success: true, 
            type: 'image',
            data: `data:image/jpeg;base64,${pass2 || pass1}`,
            socialCopy: `Flyer localizado a ${market}.`
        });

    } catch (error: any) {
        console.error('Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}