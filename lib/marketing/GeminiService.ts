import { GoogleGenerativeAI } from '@google/generative-ai';

export interface LocalizerResult {
    market: string;
    loading: boolean;
    image: string | null;
    error: string | null;
}

export async function generateLocalizedAd(
    apiKey: string,
    market: string,
    refImageBase64: string,
    aspectRatio: string = '16:9'
): Promise<string | null> {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        // Usamos el modelo más reciente capaz de generar/editar imágenes con texto
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `Translate all text in this advertisement image to the language of ${market}. 
        ONLY translate the text - do not add any cultural imagery, flags, national symbols, or stereotypical visual elements. 
        Keep the image, composition, styling, colors, and all visual elements exactly the same as the original. 
        The only change should be the language of the text.`;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    mimeType: 'image/jpeg',
                    data: refImageBase64
                }
            }
        ]);

        const response = await result.response;
        // El modelo devuelve la imagen procesada
        const candidates = response.candidates;
        if (candidates && candidates[0].content.parts[0].inlineData) {
            return candidates[0].content.parts[0].inlineData.data;
        }

        return null;
    } catch (error) {
        console.error(`Error en Gemini para ${market}:`, error);
        throw error;
    }
}
