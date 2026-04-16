const fs = require('fs');
const path = require('path');

const typesPath = path.join(__dirname, '../lib/i18n/types.ts');
let typesContent = fs.readFileSync(typesPath, 'utf8');

const newKeys = `
        adminStatLeads: string;
        adminStatClicks: string;
        adminStatLandings: string;
        adminStatPartners: string;
        global: string;
        network: string;
        total: string;
        adminQuickActions: string;
        managePartners: string;
        managePartnersDesc: string;
        globalClients: string;
        globalClientsDesc: string;
        networkStats: string;
        networkStatsDesc: string;
        activeLandings: string;
        activeLandingsDesc: string;
        consolidatedVolumeAdmin: string;
        consolidatedVolumeAdminDesc: string;
        topPartnersWeek: string;
        topPartnersWeekDesc: string;
        viewAll: string;
        noPartnerData: string;
        howToImprove: string;
        createGraphics: string;
        createGraphicsDesc: string;
        generateLandingsTip: string;
        generateLandingsTipDesc: string;
        shareLinkTip: string;
        shareLinkTipDesc: string;
        globalDistribution: string;
        globalDistributionDesc: string;
        adminZone: string;
        manageNetwork: string;
        manageNetworkDesc: string;
        viewPartnersList: string;`;

typesContent = typesContent.replace(/realtimeData: string;\n\s*\};/, 'realtimeData: string;' + newKeys + '\n    };');
fs.writeFileSync(typesPath, typesContent);

const localesDir = path.join(__dirname, '../lib/i18n/locales');
const files = fs.readdirSync(localesDir);

const translationsES = `
        adminStatLeads: 'Red Total - Leads',
        adminStatClicks: 'Clics Totales Red',
        adminStatLandings: 'Landings Activas',
        adminStatPartners: 'Partners Activos',
        global: 'Global',
        network: 'Red',
        total: 'Total',
        adminQuickActions: 'Accesos Rápidos — Admin',
        managePartners: 'Gestionar Partners',
        managePartnersDesc: 'Ver y administrar toda la red',
        globalClients: 'Clientes Globales',
        globalClientsDesc: 'Ver todos los leads de la red',
        networkStats: 'Estadísticas Red',
        networkStatsDesc: 'Métricas consolidadas',
        activeLandings: 'Landings Activas',
        activeLandingsDesc: 'Todas las landings de la red',
        consolidatedVolumeAdmin: 'Volumen Consolidado — Red',
        consolidatedVolumeAdminDesc: 'Actividad total de todos los partners',
        topPartnersWeek: 'Top Partners — Esta Semana',
        topPartnersWeekDesc: 'Ranking por volumen de leads generados',
        viewAll: 'Ver todos',
        noPartnerData: 'No hay datos de partners aún',
        howToImprove: 'Cómo mejorar tu rendimiento',
        createGraphics: 'Crea piezas gráficas',
        createGraphicsDesc: 'Usa los materiales en 14 idiomas para llegar a más mercados',
        generateLandingsTip: 'Genera Landing Pages',
        generateLandingsTipDesc: 'Landing pages personalizadas con IA convierten 3x más',
        shareLinkTip: 'Comparte tu link',
        shareLinkTipDesc: 'Distribuye tus links de referido en todos tus canales',
        globalDistribution: 'Distribución Global — Toda la Red',
        globalDistributionDesc: 'Origen geográfico consolidado de todos los leads',
        adminZone: 'ZONA ADMIN',
        manageNetwork: 'Gestiona tu red de Partners',
        manageNetworkDesc: 'Ver roles, actividades y estadísticas de cada partner',
        viewPartnersList: 'Ver Partners',`;

const translationsEN = `
        adminStatLeads: 'Total Network - Leads',
        adminStatClicks: 'Total Network Clicks',
        adminStatLandings: 'Active Landings',
        adminStatPartners: 'Active Partners',
        global: 'Global',
        network: 'Network',
        total: 'Total',
        adminQuickActions: 'Quick Actions — Admin',
        managePartners: 'Manage Partners',
        managePartnersDesc: 'View and manage the entire network',
        globalClients: 'Global Clients',
        globalClientsDesc: 'View all network leads',
        networkStats: 'Network Statistics',
        networkStatsDesc: 'Consolidated metrics',
        activeLandings: 'Active Landings',
        activeLandingsDesc: 'All network landings',
        consolidatedVolumeAdmin: 'Consolidated Volume — Network',
        consolidatedVolumeAdminDesc: 'Total activity of all partners',
        topPartnersWeek: 'Top Partners — This Week',
        topPartnersWeekDesc: 'Ranking by volume of generated leads',
        viewAll: 'View all',
        noPartnerData: 'No partner data yet',
        howToImprove: 'How to improve your performance',
        createGraphics: 'Create graphic pieces',
        createGraphicsDesc: 'Use materials in 14 languages to reach more markets',
        generateLandingsTip: 'Generate Landing Pages',
        generateLandingsTipDesc: 'AI personalized landing pages convert 3x more',
        shareLinkTip: 'Share your link',
        shareLinkTipDesc: 'Distribute your referral links across all your channels',
        globalDistribution: 'Global Distribution — Whole Network',
        globalDistributionDesc: 'Consolidated geographic origin of all leads',
        adminZone: 'ADMIN ZONE',
        manageNetwork: 'Manage your Partner network',
        manageNetworkDesc: 'View roles, activities, and stats of each partner',
        viewPartnersList: 'View Partners',`;

for (const file of files) {
    if (!file.endsWith('.ts')) continue;
    const filepath = path.join(localesDir, file);
    let content = fs.readFileSync(filepath, 'utf8');
    
    // determine translation
    let t = translationsEN;
    if (file === 'es.ts') t = translationsES;
    
    // Match 'realtimeData: ... ,' and append new translations
    content = content.replace(/realtimeData:\s*['"][^'"]+['"],/, match => match + t);
    fs.writeFileSync(filepath, content);
}
console.log('Update complete.');
