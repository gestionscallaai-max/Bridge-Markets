import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const maxDuration = 120;

export async function POST(req: NextRequest) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    try {
        const { market, image } = await req.json();

        if (!apiKey) return NextResponse.json({ success: false, error: 'Falta API Key' }, { status: 500 });

        const ai = new GoogleGenAI({ apiKey });

        // ============================================================
        // STEP 1: Extract ALL text from the image using a text model
        // ============================================================
        const extractionResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            inlineData: {
                                mimeType: 'image/jpeg',
                                data: image,
                            },
                        },
                        {
                            text: `Extract EVERY piece of text visible in this image. List each text block on a separate line. Include ALL text no matter how small - headers, subheaders, body text, labels, captions, watermarks, everything. Do NOT skip any text. Return ONLY the raw text, one block per line, nothing else.`,
                        },
                    ],
                },
            ],
        });

        const extractedText = extractionResponse.text || '';
        const textBlocks = extractedText.split('\n').filter((line: string) => line.trim().length > 0);

        // ============================================================
        // STEP 2: Translate all extracted text
        // ============================================================
        const translationResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: `Translate the following text blocks to ${market}. 
                            
RULES:
- Translate EVERY line
- Do NOT translate brand names like "Bridge Markets", promotional codes like "BM10%", URLs, or email addresses
- Return ONLY the translations, one per line, in the SAME ORDER as the input
- Each output line must correspond to the same input line number

INPUT TEXT:
${textBlocks.map((t: string, i: number) => `${i + 1}. ${t}`).join('\n')}`,
                        },
                    ],
                },
            ],
        });

        const translatedText = translationResponse.text || '';
        const translations = translatedText.split('\n').filter((line: string) => line.trim().length > 0);

        // Build the replacement map
        const replacementPairs = textBlocks.map((original: string, i: number) => {
            const translated = translations[i]?.replace(/^\d+\.\s*/, '') || original;
            return `"${original.trim()}" → "${translated.trim()}"`;
        }).join('\n');

        // ============================================================
        // STEP 3: Generate the localized image with explicit replacements
        // ============================================================
        const imageResponse = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash-image',
            config: {
                responseModalities: ['image', 'text'],
            },
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            inlineData: {
                                mimeType: 'image/jpeg',
                                data: image,
                            },
                        },
                        {
                            text: `Recreate this exact image but replace the following text. Make these EXACT replacements:

${replacementPairs}

CRITICAL INSTRUCTIONS:
- Replace EVERY text listed above with its translation. Do not skip any.
- Keep the EXACT same visual design, layout, colors, backgrounds, effects, and typography style.
- Do NOT add flags, cultural symbols, or any new visual elements.
- The output image must look identical to the original except for the translated text.`,
                        },
                    ],
                },
            ],
        } as any);

        let base64Image: string | null = null;
        for await (const chunk of imageResponse) {
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
                socialCopy: `Flyer localizado a ${market} correctamente.`
            });
        }

        throw new Error("El modelo no devolvió la imagen. Verifica tu cuota en https://aistudio.google.com/apikey");

    } catch (error: any) {
        console.error('Error in localization pipeline:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}