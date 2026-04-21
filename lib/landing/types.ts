// ─────────────────────────────────────────────────────────────
// Landing Sections Catalog — Modular renderable sections
// Extracted from 14 bocetos for mix-and-match landing pages
// ─────────────────────────────────────────────────────────────

export type SectionCategory = 'hero' | 'content' | 'social_proof' | 'cta' | 'layout';

export interface SectionMeta {
    id: string;
    name: string;
    icon: string;
    category: SectionCategory;
    description: string;
    sourceTemplate: number; // 1-14
    defaultContent: Record<string, any>;
}

export interface BrandConfig {
    fullName: string;
    whatsapp: string;
    email: string;
    partnerId: string;
    language: string;
    primaryColor?: string;
    // Campo editable: Nombre de la comunidad o academia del IB
    communityName?: string;
    // Campo editable: Frase personalizada en el hero
    heroPhrase?: string;
    // Campo editable: Enlaces a redes sociales
    instagram?: string;
    telegram?: string;
    tiktok?: string;
    // Campo editable: Link personalizado de referido o CTA
    ctaLink?: string;
    // URL del logo del IB
    logoUrl?: string;
    // Nombre del IB (fallback para communityName)
    ibName?: string;
    videoUrl?: string;
}
