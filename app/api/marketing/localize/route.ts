import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { market, image } = await req.json();
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

        if (!apiKey) return NextResponse.json({ success: false, error: 'Falta API Key' }, { status: 500 });

        console.log('Image Base64 Length:', image.length);
        if (image.length > 4000000) { // Approx 4MB limit for many Gemini endpoints
             console.warn('Image might be too large for inlineData');
        }

        // 1. Prepare Nano Banana 2 API (gemini-3.1-flash-image-preview)
        const modelId = "gemini-3.1-flash-image-preview";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;

        // 2. Specialized localization prompt for Image-to-Image
        const prompt = `
            LOCALIZE THIS MARKETING FLYER TO: ${market}.
            
            TRANSLATION GUIDE (STRICT SPELLING):
            - "CUPÓN" must be "COUPON" (Check spelling twice!)
            - "ESPECIAL" -> "SPECIAL"
            - "PROGRAMA" -> "PROGRAM"
            - "CÓDIGO" -> "CODE"
            - "DSCTO" -> "OFF"
            
            CRITICAL INSTRUCTIONS:
            1. RENDER A NEW IMAGE: Perform a native inpainting.
            2. PERFECTION: Localized text must match the 3D metallic/silver style perfectly.
            3. SOCIAL COPY: In addition to the image, provide a high-conversion marketing caption for Instagram/Facebook in ${market} as a separate text part.
            5. DIMENSIONS: Maintain the EXACT SAME dimensions and aspect ratio as the original image. Do not change square images to vertical.
            6. OUTPUT: Return the localized image and the marketing text.
        `;

        // 3. Make the API call
        const aiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: prompt },
                        { inlineData: { mimeType: 'image/jpeg', data: image } }
                    ]
                }],
                generationConfig: {
                    temperature: 0.4,
                    topP: 0.95,
                }
            })
        });

        const result = await aiResponse.json();
        console.log('--- NANO BANANA RESULT ---', JSON.stringify(result).substring(0, 500));

        if (result.error) {
            console.error('NANO BANANA ERROR:', result.error);
            throw new Error(result.error.message);
        }

        // 4. Extract the image and text from the response
        const imagePart = result.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData);
        const textPart = result.candidates?.[0]?.content?.parts?.find((p: any) => p.text)?.text || "";
        
        if (imagePart) {
            return NextResponse.json({ 
                success: true, 
                type: 'image',
                data: `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`,
                socialCopy: textPart
            });
        }

        // 5. Fallback: If AI returned text (layers) instead of image, handle gracefully
        const fallbackText = result.candidates?.[0]?.content?.parts?.[0]?.text || "";
        try {
            const aiData = JSON.parse(fallbackText);
            return NextResponse.json({ 
                success: true, 
                type: 'layers',
                data: aiData
            });
        } catch (e) {
            return NextResponse.json({ 
                success: true, 
                type: 'error',
                message: "La IA no devolvió una imagen válida.",
                raw: fallbackText
            });
        }

    } catch (error: any) {
        console.error('Error in marketing localization:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}