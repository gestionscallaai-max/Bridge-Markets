import { LandingProduct } from './types';

export const SECTION_CATEGORIES: Record<string, { label: string, icon: string }> = {
    'Official': { label: 'Oficiales', icon: 'verified' },
    'Custom': { label: 'Personalizados', icon: 'edit' },
    'Promotion': { label: 'Promocionales', icon: 'campaign' }
};

export const SECTION_CATALOG: LandingProduct[] = [
    {
        id: 'bridge_v3_premium',
        name: 'Índices Sintéticos PRO V3 (FINAL)',
        icon: 'diamond',
        category: 'Official',
        description: 'La landing oficial definitiva de Bridge Markets. Diseño premium con elementos 3D y contenido institucional.',
        sourceTemplate: 1,
        defaultContent: {},
    },
    {
        id: 'prop_official_v3',
        name: 'Bridge Markets PropFirm — FOREX/CFDs & Synthetic PropTrading',
        icon: 'workspace_premium',
        category: 'Official',
        description: 'La landing oficial para cuentas fondeadas. Incluye todas las tablas comparativas y reglas operativas.',
        sourceTemplate: 2,
        defaultContent: {},
    },
    {
        id: 'unified_copy_mam_template',
        name: 'Cuentas MAM y Copy Trading — Bridge Markets | Para uso de IBs',
        icon: 'hub',
        category: 'Official',
        description: 'Hub unificado para gestión de capital MAM y sistema de Copy Trading.',
        sourceTemplate: 3,
        defaultContent: {},
    },
    {
        id: 'pro_leverage_x12',
        name: 'Cuentas Apalancadas PRO LEVERAGE X12 — Bridge Markets | Para uso de IBs',
        icon: 'bolt',
        category: 'Official',
        description: 'Multiplica tu capital hasta x12 y opera directamente sin fases de evaluación.',
        sourceTemplate: 4,
        defaultContent: {},
    },
    {
        id: 'institutional_mother',
        name: 'Bridge Markets — Landing Institucional del Broker | Para uso de IBs',
        icon: 'account_balance',
        category: 'Official',
        description: 'La landing principal corporativa de Bridge Markets con todos los servicios integrados.',
        sourceTemplate: 5,
        defaultContent: {},
    },
    {
        id: 'synthetic_universe_total',
        name: 'Universo Total de Sintéticos — Bridge Markets | Para uso de IBs',
        icon: 'public',
        category: 'Official',
        description: 'Landing premium que muestra el ecosistema completo: Deriv + Weltrade + Bridge Markets.',
        sourceTemplate: 6,
        defaultContent: {},
    },
];
