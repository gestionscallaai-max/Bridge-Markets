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

        // ── STEP 1: Fast text extraction + translation (thinking disabled) ────────
        // thinkingBudget: 0 skips chain-of-thought → responds in ~3s instead of ~25s
        let translationGuide = '';
        try {
            const textRes = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                config: {
                    thinkingConfig: { thinkingBudget: 0 },
                } as any,
                contents: [{
                    role: 'user',
                    parts: [
                        { inlineData: { mimeType: 'image/jpeg', data: image } },
                        { text: `List every Spanish text element visible in this image and its ${targetEn} translation. Respond ONLY with a compact JSON array, no markdown:
[{"o":"<original>","t":"<${targetEn} translation>"}]
Skip: brand names (Bridge Markets), promo codes, pure numbers.` },
                    ],
                }],
            } as any);

            const raw = textRes.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
            const match = raw.match(/\[[\s\S]*\]/);
            if (match) {
                const map: Array<{ o: string; t: string }> = JSON.parse(match[0]);
                translationGuide = map.map(x => `"${x.o}" → "${x.t}"`).join('\n');
            }
        } catch (e) {
            console.warn('[Localize] Text extraction failed, proceeding without map:', e);
        }

        // ── STEP 2: Image edit with exact translation map ─────────────────────────
        const prompt = translationGuide
            ? `Edit this image. Replace each Spanish text with its exact ${targetEn} (${targetNative}) translation as listed:

${translationGuide}

Rules:
- Use EXACTLY the translations listed above, character by character.
- The large stylized/3D headline is also in Spanish — translate it using the list.
- Keep all visual styles: colors, layout, fonts, sizes, 3D effects, background, images.
- Do NOT change: "Bridge Markets", promo codes, numbers, non-text elements.
- Output only the edited image.`
            : `Translate every Spanish word in this image to ${targetEn} (${targetNative}). Keep all visual design identical. Output only the translated image.`;

        const IMAGE_MODELS = ['gemini-3.1-flash-image-preview', 'gemini-2.5-flash-image'];
        let resultImage: string | null = null;

        for (const model of IMAGE_MODELS) {
            try {
                const res = await ai.models.generateContent({
                    model,
                    contents: [{
                        role: 'user',
                        parts: [
                            { inlineData: { mimeType: 'image/jpeg', data: image } },
                            { text: prompt },
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
                console.warn(`[Localize] Model ${model} failed:`, e.message);
                if (e.status === 429) await new Promise(r => setTimeout(r, 4000));
            }
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