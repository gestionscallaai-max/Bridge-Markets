import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const maxDuration = 120;

export async function POST(req: NextRequest) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    try {
        const { market, image } = await req.json();

        if (!apiKey) return NextResponse.json({ success: false, error: 'Falta API Key' }, { status: 500 });

        const ai = new GoogleGenAI({ apiKey });

        const targetLang: Record<string, string> = {
            'French': 'French', 'English': 'English', 'Portuguese': 'Portuguese',
            'Chinese': 'Chinese', 'Hindi': 'Hindi', 'Japanese': 'Japanese',
            'Russian': 'Russian', 'Arabic': 'Arabic', 'Bengali': 'Bengali', 'Spanish': 'Spanish',
        };

        const lang = targetLang[market] || market;

        // Retry helper for 503/429 errors
        const callWithRetry = async (fn: () => Promise<any>, maxRetries = 3): Promise<any> => {
            for (let attempt = 0; attempt < maxRetries; attempt++) {
                try {
                    return await fn();
                } catch (e: any) {
                    const status = e?.status || e?.httpStatusCode || 0;
                    if ((status === 503 || status === 429) && attempt < maxRetries - 1) {
                        const delay = (attempt + 1) * 5000; // 5s, 10s, 15s
                        await new Promise(r => setTimeout(r, delay));
                        continue;
                    }
                    throw e;
                }
            }
        };

        const result = await callWithRetry(async () => {
            const res = await ai.models.generateContentStream({
                model: 'gemini-2.5-flash-image',
                config: { responseModalities: ['image', 'text'] },
                contents: [{
                    role: 'user',
                    parts: [
                        { inlineData: { mimeType: 'image/jpeg', data: image } },
                        { text: `Translate ALL text in this advertisement image to ${lang}. Replace every single word with its ${lang} translation. Do not leave any word in the original language. Keep the exact same visual design, layout, colors, and style. Only change the language of the text.` },
                    ],
                }],
            } as any);

            for await (const chunk of res) {
                if (!chunk.candidates?.[0]?.content?.parts) continue;
                for (const part of chunk.candidates[0].content.parts) {
                    if (part.inlineData?.data) return part.inlineData.data;
                }
            }
            throw new Error("No image returned");
        });

        return NextResponse.json({ 
            success: true, 
            type: 'image',
            data: `data:image/jpeg;base64,${result}`,
            socialCopy: `Flyer localizado a ${market}.`
        });

    } catch (error: any) {
        console.error('Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}