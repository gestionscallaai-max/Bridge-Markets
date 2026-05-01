import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const maxDuration = 120;

// ── Language metadata ────────────────────────────────────────────────────────
const LANG_META: Record<string, { en: string; native: string }> = {
    'French':     { en: 'French',               native: 'français' },
    'English':    { en: 'English',               native: 'English' },
    'Portuguese': { en: 'Portuguese',            native: 'português' },
    'Chinese':    { en: 'Chinese (Simplified)',  native: '中文' },
    'Hindi':      { en: 'Hindi',                 native: 'हिन्दी' },
    'Japanese':   { en: 'Japanese',              native: '日本語' },
    'Russian':    { en: 'Russian',               native: 'русский' },
    'Arabic':     { en: 'Arabic',                native: 'العربية' },
    'Bengali':    { en: 'Bengali',               native: 'বাংলা' },
    'Spanish':    { en: 'Spanish',               native: 'español' },
};

export async function POST(req: NextRequest) {
    const apiKey = process.env.GEMINI_API_KEY;

    try {
        const { market, image } = await req.json();

        if (!apiKey) return NextResponse.json({ success: false, error: 'Falta API Key' }, { status: 500 });
        if (!market || !image) return NextResponse.json({ success: false, error: 'Faltan parámetros' }, { status: 400 });

        const ai = new GoogleGenAI({ apiKey });
        const { en: targetEn, native: targetNative } = LANG_META[market] ?? { en: market, native: market };

        // ── Single image edit call with retry ────────────────────────────────────
        const IMAGE_MODELS = ['gemini-2.5-flash-image', 'gemini-3.1-flash-image-preview'];

        let resultImage: string | null = null;

        for (const model of IMAGE_MODELS) {
            for (let attempt = 0; attempt < 2; attempt++) {
                try {
                    const res = await ai.models.generateContent({
                        model,
                        contents: [{
                            role: 'user',
                            parts: [
                                { inlineData: { mimeType: 'image/jpeg', data: image } },
                                { text: `Translate all Spanish text in this image to ${targetEn} (${targetNative}).

WHAT TO TRANSLATE: every word, phrase, headline, subtitle, body text, label, button, caption, watermark, and disclaimer that is written in Spanish.

WHAT NOT TO TRANSLATE: the brand name "Bridge Markets", promo/discount codes (e.g. BM10%), numbers, percentages, and non-text graphic elements.

IMPORTANT — the large stylized or 3D headline text in the center is also in Spanish. Translate it too. It is not a brand name.

OUTPUT RULES:
- Keep the exact same visual design: colors, layout, background, images, fonts, sizes, and 3D effects.
- Output only the translated image, no commentary.` },
                            ],
                        }],
                        config: { responseModalities: ['IMAGE', 'TEXT'] },
                    } as any);

                    for (const part of res.candidates?.[0]?.content?.parts ?? []) {
                        if (part.inlineData?.data) {
                            resultImage = part.inlineData.data;
                            break;
                        }
                    }

                    if (resultImage) break;
                } catch (e: any) {
                    const isRetryable = attempt === 0 && (e.status === 429 || e.status === 503);
                    if (isRetryable) {
                        await new Promise(r => setTimeout(r, 4000));
                        continue;
                    }
                    // Try next model on non-retryable error
                    console.warn(`[Localize] Model ${model} failed (attempt ${attempt}):`, e.message);
                    break;
                }
            }
            if (resultImage) break;
        }

        if (!resultImage) throw new Error('El modelo no generó la imagen. Inténtalo de nuevo.');

        return NextResponse.json({
            success: true,
            type: 'image',
            data: `data:image/jpeg;base64,${resultImage}`,
            socialCopy: `Flyer localizado a ${market}.`,
        });

    } catch (error: any) {
        console.error('[Localize] Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}