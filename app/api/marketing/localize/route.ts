import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const maxDuration = 180;

// ── Language metadata ────────────────────────────────────────────────────────
const LANG_META: Record<string, { en: string; native: string }> = {
    'French':     { en: 'French',              native: 'français' },
    'English':    { en: 'English',             native: 'English' },
    'Portuguese': { en: 'Portuguese',          native: 'português' },
    'Chinese':    { en: 'Chinese (Simplified)', native: '中文' },
    'Hindi':      { en: 'Hindi',               native: 'हिन्दी' },
    'Japanese':   { en: 'Japanese',            native: '日本語' },
    'Russian':    { en: 'Russian',             native: 'русский' },
    'Arabic':     { en: 'Arabic',              native: 'العربية' },
    'Bengali':    { en: 'Bengali',             native: 'বাংলা' },
    'Spanish':    { en: 'Spanish',             native: 'español' },
};

export async function POST(req: NextRequest) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    try {
        const { market, image } = await req.json();

        if (!apiKey) return NextResponse.json({ success: false, error: 'Falta API Key' }, { status: 500 });
        if (!market || !image) return NextResponse.json({ success: false, error: 'Faltan parámetros' }, { status: 400 });

        const ai = new GoogleGenAI({ apiKey });
        const { en: targetEn, native: targetNative } = LANG_META[market] ?? { en: market, native: market };

        // ── Helper: image generation with retry ─────────────────────────────────
        const generateImage = async (inputImage: string, prompt: string): Promise<string | null> => {
            for (let attempt = 0; attempt < 3; attempt++) {
                try {
                    const res = await ai.models.generateContent({
                        model: 'gemini-3.1-flash-image-preview',
                        contents: [{
                            role: 'user',
                            parts: [
                                { inlineData: { mimeType: 'image/jpeg', data: inputImage } },
                                { text: prompt },
                            ],
                        }],
                        config: { responseModalities: ['IMAGE', 'TEXT'] },
                    } as any);

                    for (const part of res.candidates?.[0]?.content?.parts ?? []) {
                        if (part.inlineData?.data) return part.inlineData.data;
                    }
                    return null;
                } catch (e: any) {
                    if (attempt < 2) { await new Promise(r => setTimeout(r, (attempt + 1) * 5000)); continue; }
                    throw e;
                }
            }
            return null;
        };

        // ── Helper: text-only generation with retry ──────────────────────────────
        const generateText = async (inputImage: string, prompt: string): Promise<string> => {
            for (let attempt = 0; attempt < 3; attempt++) {
                try {
                    const res = await ai.models.generateContent({
                        model: 'gemini-2.5-flash',
                        contents: [{
                            role: 'user',
                            parts: [
                                { inlineData: { mimeType: 'image/jpeg', data: inputImage } },
                                { text: prompt },
                            ],
                        }],
                    } as any);
                    return res.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
                } catch (e: any) {
                    if (attempt < 2) { await new Promise(r => setTimeout(r, (attempt + 1) * 3000)); continue; }
                    throw e;
                }
            }
            return '';
        };

        // ── STEP 1: Extract & translate all text using a text model ──────────────
        // We let the language model (which is excellent at translation) produce
        // an exact translation map. The image model only needs to do visual replacement.
        const translationRaw = await generateText(image, `
You are a professional translator from Spanish to ${targetEn}.

Look at this marketing image and do the following:
1. Find EVERY piece of visible text in the image (headline, subheadline, body copy, labels, buttons, captions, disclaimers, small print, text inside icons, watermarks).
2. For each text piece, provide its EXACT translation into ${targetEn} (${targetNative}).

Rules:
- Do NOT translate: brand names ("Bridge Markets"), promo codes (e.g. BM10%), ticker symbols, percentages/numbers.
- Translate EVERYTHING else, including large 3D headlines, even if they look like a title or product name — they are in Spanish and must be translated.
- Provide NATURAL, fluent, grammatically correct ${targetEn}. Do not transliterate.

Respond ONLY with a valid JSON array, no extra text, no markdown:
[
  { "original": "<exact Spanish text as it appears>", "translation": "<correct ${targetEn} translation>" },
  ...
]
`);

        // Parse translation map — fall back gracefully if JSON is malformed
        let translationMap: Array<{ original: string; translation: string }> = [];
        try {
            const jsonMatch = translationRaw.match(/\[[\s\S]*\]/);
            if (jsonMatch) translationMap = JSON.parse(jsonMatch[0]);
        } catch {
            console.warn('Translation map parse failed, proceeding without map:', translationRaw);
        }

        // Build a human-readable replacement guide for the image model
        const replacementGuide = translationMap.length > 0
            ? translationMap.map(t => `• "${t.original}" → "${t.translation}"`).join('\n')
            : '(No translation map available — translate all Spanish text to ' + targetEn + ')';

        console.log(`[Localize] Translation map for ${market}:\n${replacementGuide}`);

        await new Promise(r => setTimeout(r, 2000));

        // ── STEP 2: Image edit using the exact translation map ───────────────────
        // The model now knows EXACTLY what to write — no guessing needed.
        const pass1 = await generateImage(image, `
Edit this image by replacing Spanish text with its ${targetEn} (${targetNative}) translation.

Use this EXACT translation map — replace each original text with its translation as written below:
${replacementGuide}

Rules:
- Replace EVERY original text listed above with its translation, character by character as given.
- Do NOT paraphrase or re-translate — use the exact translations provided.
- Keep the same font style, weight, size, color, position, 3D effect, and visual appearance for each text element.
- Do NOT change: colors, layout, background, images, logos, graphic elements, "Bridge Markets" brand, promo codes, numbers.
- Output ONLY the edited image.
`);

        if (!pass1) throw new Error('El modelo no generó la imagen.');

        await new Promise(r => setTimeout(r, 3000));

        // ── STEP 3: Validation pass — catch any text the map missed ─────────────
        const pass2 = await generateImage(pass1, `
Check this image for any remaining Spanish words that were NOT yet translated to ${targetEn} (${targetNative}).

If you find any Spanish word, phrase, or partial text — translate it to ${targetEn} now, keeping the same visual style.
If the image is already 100% in ${targetEn}, return it unchanged.

Do NOT change: "Bridge Markets", promo codes, numbers, percentages, non-text graphic elements.
Output ONLY the final image.
`);

        return NextResponse.json({
            success: true,
            type: 'image',
            data: `data:image/jpeg;base64,${pass2 || pass1}`,
            socialCopy: `Flyer localizado a ${market}.`,
            debug: { translationMap },
        });

    } catch (error: any) {
        console.error('[Localize] Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}