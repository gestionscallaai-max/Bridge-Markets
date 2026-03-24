import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { subdomain, displayName, whatsapp, facebookPixel, googleAnalytics } = body;

        // Validación básica
        if (!subdomain) {
            return NextResponse.json({ error: 'Falta el subdominio' }, { status: 400 });
        }

        console.log(`[API VPS Deploying] Nueva landing: ${subdomain}.bridgemarkets.com`);
        console.log(`Config: Nombre=${displayName}, WP=${whatsapp}, FB=${facebookPixel}, GA=${googleAnalytics}`);

        // Aquí iría la lógica del VPS (Docker exec, PM2 config, Nginx config o Database Sync)

        // Simular tiempo de despliegue en VPS (3 segundos)
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // URL final que tendrá la landing
        const deployedUrl = `https://${subdomain.toLowerCase()}.bridgemarkets.com`;

        return NextResponse.json({
            success: true,
            url: deployedUrl,
            message: 'Landing desplegada correctamente en el VPS'
        });
    } catch (error) {
        console.error('[API VPS Deploying] Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
