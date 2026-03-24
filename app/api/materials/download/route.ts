import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { language, size, type } = body;

        // Validaciones básicas
        if (!language || !size || !type) {
            return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
        }

        // Aquí iría la lógica real de negocio para conectarse al servicio VPS, 
        // Generador de imágenes, S3, etc.
        console.log(`[API Materials Downloader] Solicitando creativo: ${type} - ${size} (${language})`);

        // Simula la latencia de un generador de imágenes (1.5 segundos)
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // URL MOCK: Devuelve una imagen placeholder generada con las dimensiones correctas
        const width = size.split('x')[0] || '1080';
        const height = size.split('x')[1] || '1080';
        const textParam = encodeURIComponent(`${type} - ${language}`);

        // Usamos dummyimage.com o placehold.co 
        const mockUrl = `https://placehold.co/${width}x${height}/a855f7/ffffff.png?text=${textParam}&font=Montserrat`;

        return NextResponse.json({
            success: true,
            downloadUrl: mockUrl,
            message: 'Creativo generado correctamente'
        });
    } catch (error) {
        console.error('[API Materials Downloader] Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
