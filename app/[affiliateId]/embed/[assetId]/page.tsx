import { ASSETS_DATA } from '@/lib/data/locales';

export default function AffiliateEmbedPage({
    params,
    searchParams,
}: {
    params: { affiliateId: string; assetId: string };
    searchParams: { lang?: string };
}) {
    const { affiliateId, assetId } = params;
    const lang = (searchParams.lang as 'EN' | 'ES' | 'PT') || 'ES';

    const asset = ASSETS_DATA.find(a => a.id === assetId);

    if (!asset) {
        return <div className="p-4 text-center font-sans text-sm text-slate-500">Asset not found.</div>;
    }

    const localeData = asset.locales[lang];

    return (
        <div className="w-full h-screen overflow-hidden bg-transparent font-sans flex items-center justify-center">
            {/* This will act as the live iFrame component for affiliate properties */}
            <a
                href={`https://bridgemarkets.com/register?ref=${affiliateId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block w-full h-full group"
            >
                {/* En un entorno real, la imagen base viene de un CDN */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                    <div className="absolute inset-0 bg-mesh-gradient opacity-40 mix-blend-color-dodge transition-transform duration-1000 group-hover:scale-105" />
                </div>

                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-4">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter drop-shadow-lg">
                        {localeData.title}
                    </h2>
                    <span className="mt-4 px-6 py-2 bg-gradient-to-r from-lila to-lila-light text-white rounded-full font-bold shadow-[0_0_15px_rgba(155,81,224,0.5)] transform transition-transform group-hover:scale-110">
                        {localeData.cta}
                    </span>
                </div>

                {/* Invisible Tracker Logic Note */}
                <div className="hidden">Tracker Active: {affiliateId}</div>
            </a>
        </div>
    );
}
