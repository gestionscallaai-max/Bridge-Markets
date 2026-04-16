const fs = require('fs');
const path = require('path');

const typesPath = path.join(__dirname, '../lib/i18n/types.ts');
let typesContent = fs.readFileSync(typesPath, 'utf8');

const newTypes = `
    gallery: {
        materialGalleryTitle: string;
        materialGalleryDesc: string;
        searchMaterial: string;
        syncExistingImages: string;
        uploading: string;
        upload: string;
        loadingGallery: string;
        viewFullSize: string;
        downloadMaterial: string;
        deleteFromGallery: string;
        downloadBtn: string;
        emptyGallery: string;
        noMaterialAvailable: string;
        syncBtn: string;
        manageDocs: string;
        adminPortal: string;
        manualUpload: string;
        localMigration: string;
        docTitle: string;
        category: string;
        language: string;
        uploadPdf: string;
        thumbnailJpg: string;
        syncDoc: string;
        massiveUpload: string;
        dragFilesDesc: string;
        filesReady: string;
        clearBtn: string;
        startProcess: string;
        syncingServer: string;
        visual: string;
        document: string;
        size: string;
        actions: string;
        noDocsFound: string;
        copyLink: string;
    };
    templates: {
        synthetic_edu_name: string;
        synthetic_edu_desc: string;
        propfirm_pro_name: string;
        propfirm_pro_desc: string;
        unified_copy_mam_name: string;
        unified_copy_mam_desc: string;
        pro_leverage_x12_name: string;
        pro_leverage_x12_desc: string;
        institutional_mother_name: string;
        institutional_mother_desc: string;
        synthetic_universe_total_name: string;
        synthetic_universe_total_desc: string;
    };
`;

if (!typesContent.includes('gallery: {')) {
    typesContent = typesContent.replace(/export type TranslationKeys = \{/, 'export type TranslationKeys = {' + newTypes);
    fs.writeFileSync(typesPath, typesContent);
}

const localesDir = path.join(__dirname, '../lib/i18n/locales');
const files = fs.readdirSync(localesDir);

const translationsES = `
    gallery: {
        materialGalleryTitle: 'Material de Promoción',
        materialGalleryDesc: 'Recursos visuales para tus redes sociales',
        searchMaterial: 'Buscar material...',
        syncExistingImages: 'Sincronizar imágenes existentes',
        uploading: 'Subiendo...',
        upload: 'Subir',
        loadingGallery: 'Cargando galería...',
        viewFullSize: 'Ver tamaño completo',
        downloadMaterial: 'Descargar material',
        deleteFromGallery: 'Eliminar de la galería',
        downloadBtn: 'Descargar',
        emptyGallery: 'Galería vacía',
        noMaterialAvailable: 'No hay material de promoción disponible actualmente.',
        syncBtn: 'Registrar imágenes de /public/images/post',
        manageDocs: 'Gestionar Documentos',
        adminPortal: 'Portal Administrativo',
        manualUpload: 'Carga Manual',
        localMigration: 'Migración Local',
        docTitle: 'Título del Documento',
        category: 'Categoría',
        language: 'Idioma',
        uploadPdf: 'Subir PDF',
        thumbnailJpg: 'Miniatura JPG',
        syncDoc: 'Sincronizar Documento',
        massiveUpload: 'Carga Masiva (Folder Docs)',
        dragFilesDesc: 'Arrastra todos los archivos de la carpeta Docs',
        filesReady: 'Archivos Listos',
        clearBtn: 'Limpiar',
        startProcess: 'Iniciar Procesamiento Automático',
        syncingServer: 'Sincronizando con Servidor',
        visual: 'Visual',
        document: 'Documento',
        size: 'Tamaño',
        actions: 'Acciones',
        noDocsFound: 'No hay documentos que coincidan con los filtros seleccionados.',
        copyLink: 'Copiar Link'
    },
    templates: {
        synthetic_edu_name: 'Índices Sintéticos (Educativa)',
        synthetic_edu_desc: 'Enfocada en explicar y educar sobre el mercado de sintéticos. Ideal para captar nuevos traders.',
        propfirm_pro_name: 'PropFirm (Cuentas fondeadas)',
        propfirm_pro_desc: 'Landing de alta conversión para los retos de PropFirm.',
        unified_copy_mam_name: 'MAM & Copy Trading (Unificada)',
        unified_copy_mam_desc: 'Landing dual que explica tanto el sistema MAM como el Copy Trading con tablas comparativas.',
        pro_leverage_x12_name: 'Pro Leverage X12',
        pro_leverage_x12_desc: 'Especializada en cuentas con apalancamiento x12 sin evaluación.',
        institutional_mother_name: 'Landing Institucional (Madre)',
        institutional_mother_desc: 'La landing principal corporativa de Bridge Markets con todos los servicios integrados.',
        synthetic_universe_total_name: 'Universo Total de Sintéticos',
        synthetic_universe_total_desc: 'Landing premium que muestra el ecosistema completo: Deriv + Weltrade + Bridge Markets.'
    },`;

const translationsEN = `
    gallery: {
        materialGalleryTitle: 'Promotional Material',
        materialGalleryDesc: 'Visual resources for your social networks',
        searchMaterial: 'Search material...',
        syncExistingImages: 'Sync existing images',
        uploading: 'Uploading...',
        upload: 'Upload',
        loadingGallery: 'Loading gallery...',
        viewFullSize: 'View full size',
        downloadMaterial: 'Download material',
        deleteFromGallery: 'Delete from gallery',
        downloadBtn: 'Download',
        emptyGallery: 'Empty gallery',
        noMaterialAvailable: 'No promotional material available at this time.',
        syncBtn: 'Register images',
        manageDocs: 'Manage Documents',
        adminPortal: 'Admin Portal',
        manualUpload: 'Manual Upload',
        localMigration: 'Local Migration',
        docTitle: 'Document Title',
        category: 'Category',
        language: 'Language',
        uploadPdf: 'Upload PDF',
        thumbnailJpg: 'JPG Thumbnail',
        syncDoc: 'Sync Document',
        massiveUpload: 'Bulk Upload (Folder Docs)',
        dragFilesDesc: 'Drag all files from Docs folder',
        filesReady: 'Files Ready',
        clearBtn: 'Clear',
        startProcess: 'Start Automatic Processing',
        syncingServer: 'Syncing with Server',
        visual: 'Visual',
        document: 'Document',
        size: 'Size',
        actions: 'Actions',
        noDocsFound: 'No documents match the selected filters.',
        copyLink: 'Copy Link'
    },
    templates: {
        synthetic_edu_name: 'Synthetic Indices (Educational)',
        synthetic_edu_desc: 'Focused on explaining and educating about the synthetics market. Ideal to capture new traders.',
        propfirm_pro_name: 'PropFirm (Funded Accounts)',
        propfirm_pro_desc: 'High conversion landing for PropFirm challenges.',
        unified_copy_mam_name: 'MAM & Copy Trading (Unified)',
        unified_copy_mam_desc: 'Dual landing explaining both MAM system and Copy Trading with comparison tables.',
        pro_leverage_x12_name: 'Pro Leverage X12',
        pro_leverage_x12_desc: 'Specialized in x12 leverage accounts without evaluation.',
        institutional_mother_name: 'Institutional Landing (Mother)',
        institutional_mother_desc: 'The main corporate landing for Bridge Markets with all services integrated.',
        synthetic_universe_total_name: 'Total Synthetics Universe',
        synthetic_universe_total_desc: 'Premium landing showcasing the complete ecosystem: Deriv + Weltrade + Bridge Markets.'
    },`;

for (const file of files) {
    if (!file.endsWith('.ts')) continue;
    const filepath = path.join(localesDir, file);
    let content = fs.readFileSync(filepath, 'utf8');
    
    // determine translation
    let t = translationsEN;
    if (file === 'es.ts') t = translationsES;
    
    // Add the new block at the end (before the last bracket)
    if (!content.includes('gallery: {')) {
        content = content.replace(/};\s*$/, t + '\n};');
        fs.writeFileSync(filepath, content);
    }
}
console.log('Gallery translations updated.');
