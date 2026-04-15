// ============================================================
// Bridge Markets — Dashboard UI Translations
// 10 Languages: ES, EN, ZH, HI, FR, AR, BN, PT, RU, JA
// ============================================================

export type LangCode = 'es' | 'en' | 'zh' | 'hi' | 'fr' | 'ar' | 'bn' | 'pt' | 'ru' | 'ja';

export const LANGUAGE_META: Record<LangCode, { label: string; nativeLabel: string; flag: string; rtl?: boolean }> = {
    es: { label: 'Español',    nativeLabel: 'Español',    flag: '🇪🇸' },
    en: { label: 'English',    nativeLabel: 'English',    flag: '🇬🇧' },
    zh: { label: 'Chinese',    nativeLabel: '中文',         flag: '🇨🇳' },
    hi: { label: 'Hindi',      nativeLabel: 'हिन्दी',      flag: '🇮🇳' },
    fr: { label: 'French',     nativeLabel: 'Français',   flag: '🇫🇷' },
    ar: { label: 'Arabic',     nativeLabel: 'العربية',    flag: '🇸🇦', rtl: true },
    bn: { label: 'Bengali',    nativeLabel: 'বাংলা',       flag: '🇧🇩' },
    pt: { label: 'Português',  nativeLabel: 'Português',  flag: '🇧🇷' },
    ru: { label: 'Russian',    nativeLabel: 'Русский',    flag: '🇷🇺' },
    ja: { label: 'Japanese',   nativeLabel: '日本語',       flag: '🇯🇵' },
};

export type TranslationKeys = {
    // Sidebar Navigation
    nav: {
        overview: string;
        reports: string;
        clients: string;
        accounts: string;
        stats: string;
        promo: string;
        materialPost: string;
        landingTools: string;
        referralLinks: string;
        guidelines: string;
        support: string;
        settings: string;
        admin: string;
        partnerManagement: string;
        globalSettings: string;
    };
    // Topbar
    topbar: {
        adminView: string;
        partnerView: string;
        search: string;
    };
    // Overview Page
    overview: {
        title: string;
        subtitle: string;
        myLeads: string;
        networkLeads: string;
        trafficClicks: string;
        totalClicks: string;
        myLandings: string;
        partnerLandings: string;
        realTime: string;
        quickActions: string;
        materialPost: string;
        materialPostDesc: string;
        landingGen: string;
        landingGenDesc: string;
        myClients: string;
        myClientsDesc: string;
        reports: string;
        reportsDesc: string;
        thisWeek: string;
        dailyLeads: string;
        consolidatedVolume: string;
        realTrafficNote: string;
        noHistory: string;
        heatmapTitle: string;
        heatmapSubtitle: string;
        topPartner: string;
        highDensity: string;
        medDensity: string;
        steadyGrowth: string;
        materialsReady: string;
        materialsTitle: string;
        materialsSubtitle: string;
        viewMaterials: string;
        conversion: string;
        growth: string;
        adminPanel: string;
        welcomePartner: string;
        realtimeData: string;
    };
    // Common
    common: {
        loading: string;
        save: string;
        cancel: string;
        delete: string;
        edit: string;
        close: string;
        preview: string;
        generate: string;
        download: string;
        copy: string;
        share: string;
        back: string;
        next: string;
        finish: string;
        logout: string;
        role: string;
        admin: string;
        partner: string;
        search: string;
        noData: string;
        error: string;
        success: string;
        comingSoon: string;
    };
    // Landing page form
    landing: {
        title: string;
        subtitle: string;
        step1: string;
        step2: string;
        step3: string;
        selectLanguage: string;
        selectCountry: string;
        fullName: string;
        whatsapp: string;
        email: string;
        landingType: string;
        generating: string;
        generatedTitle: string;
        generatedSubtitle: string;
        landingLang: string;
        history: string;
        changeLangHint: string;
    };
    // Referral Links page
    links: {
        title: string;
        subtitle: string;
        createBtn: string;
        searchPlaceholder: string;
        totalLinks: string;
        noLinks: string;
        noLinksDesc: string;
        createLink: string;
        newLinkTitle: string;
        newLinkDesc: string;
        linkName: string;
        campaignName: string;
        urlPreview: string;
        creating: string;
        generate: string;
        referralUrl: string;
        copied: string;
        clicks: string;
        open: string;
        deleteConfirm: string;
    };
    // Leads page
    leads: {
        title: string;
        subtitle: string;
        filters: string;
        exportCsv: string;
        colName: string;
        colContact: string;
        colOrigin: string;
        colDate: string;
        loading: string;
        empty: string;
    };
    // Support page
    support: {
        badge: string;
        title: string;
        titleHighlight: string;
        subtitle: string;
        whatsappTitle: string;
        whatsappDesc: string;
        whatsappAction: string;
        emailTitle: string;
        emailDesc: string;
        emailAction: string;
        scheduleTitle: string;
        scheduleDesc: string;
        scheduleAction: string;
        faqTitle: string;
        faqSubtitle: string;
        faqNotFound: string;
        faqNotFoundDesc: string;
        faqHelpCenter: string;
        faq: { q: string; a: string }[];
    };
    // Promo overview extras
    promo: {
        sections: string;
        languages: string;
        customize: string;
        createCustom: string;
        more: string;
        all: string;
        uploadPiece: string;
        imageUploaded: string;
        dragOrClick: string;
        aspectRatio: string;
        export: string;
    };
    // Settings page
    settings: {
        menuTitle: string;
        profile: string;
        security: string;
        preferences: string;
        profileInfo: string;
        profileInfoDesc: string;
        fullName: string;
        country: string;
        emailLabel: string;
        emailSecurityNote: string;
        saving: string;
        saveProfile: string;
        savedSuccess: string;
        dangerZone: string;
        dangerDesc: string;
        deactivate: string;
        verified: string;
    };
    // Reports pages (clients, accounts, stats)
    reports: {
        // Clients page
        clientsTitle: string; clientsSubtitle: string; filters: string; exportLeads: string;
        leadsIdentified: string; colClientInfo: string; colContact: string; colStatus: string;
        colOrigin: string; colDate: string; syncing: string; noLeads: string; noLeadsDesc: string;
        endOfRecords: string; statusRegistered: string; statusFunded: string;
        // Accounts page
        accountsTitle: string; accountsSubtitle: string; totalAccounts: string;
        colHolder: string; colContactDetails: string; colOperationalStatus: string; colOpening: string;
        fetchingFinancial: string; noActiveAccounts: string; noActiveAccountsDesc: string;
        syncedWithMT: string; statusTrading: string;
        // Stats page
        statsTitle: string; statsSubtitle: string; activeTraders: string;
        totalClicks: string; leadsCapt: string; convRate: string;
        weeklyTrend: string; weeklyTrendDesc: string; week: string; month: string;
        proPerfTitle: string; monthlyGoal: string; impact: string; reach: string;
        improveTitle: string; improveDesc: string; goToAcademy: string;
        dayMon: string; dayTue: string; dayWed: string; dayThu: string; dayFri: string; daySat: string; daySun: string;
    };
};

const T: Record<LangCode, TranslationKeys> = {
    es: {
        nav: {
            overview: 'Panel de control',
            reports: 'Informes',
            clients: 'Clientes',
            accounts: 'Cuentas del cliente',
            stats: 'Estadísticas de rendimiento',
            promo: 'Promo',
            materialPost: 'Material Post',
            landingTools: 'Herramientas de registro',
            referralLinks: 'Links de Referido',
            guidelines: 'Directrices publicitarias',
            support: 'Asistencia',
            settings: 'Configuración',
            admin: 'Administración',
            partnerManagement: 'Gestión de Partners',
            globalSettings: 'Configuración Global',
        },
        topbar: { adminView: 'Admin View', partnerView: '← Partner View', search: 'Buscar...' },
        overview: {
            title: 'Panel', subtitle: 'de Control',
            myLeads: 'Mis Leads', networkLeads: 'Leads Totales Red',
            trafficClicks: 'Tráfico / Clics', totalClicks: 'Clics Totales',
            myLandings: 'Mis Landing Pages', partnerLandings: 'Landings de Partners',
            realTime: 'En tiempo real',
            quickActions: 'Accesos Rápidos',
            materialPost: 'Material Post', materialPostDesc: 'Landings y links en 8 idiomas',
            landingGen: 'Generador de Landings', landingGenDesc: 'Crea tu landing personalizada en 3 pasos',
            myClients: 'Mis Clientes', myClientsDesc: 'Gestiona tu cartera de clientes',
            reports: 'Informes', reportsDesc: 'Clics, leads y estadísticas de rendimiento',
            thisWeek: 'Esta semana',
            dailyLeads: 'Registro de Leads Diarios',
            consolidatedVolume: 'Volumen Generado Consolidado',
            realTrafficNote: 'Se poblará cuando recibas tráfico real',
            noHistory: 'Sin datos históricos aún',
            heatmapTitle: 'Mapa de Calor Global',
            heatmapSubtitle: 'Distribución geográfica de tus clientes',
            topPartner: 'Top Partner',
            highDensity: 'Densidad Muy Alta (>800)',
            medDensity: 'Densidad Alta (>500)',
            steadyGrowth: 'Crecimiento Constante',
            materialsReady: 'Materiales listos',
            materialsTitle: '7 landings · 8 idiomas disponibles',
            materialsSubtitle: 'Comparte tu link personalizado en segundos',
            viewMaterials: 'Ver Materiales',
            conversion: 'Conv.',
            growth: 'Crec.',
            adminPanel: 'Panel Administrador',
            welcomePartner: 'Bienvenido, Partner',
            realtimeData: 'Datos en tiempo real de tu actividad',
        },
        common: {
            loading: 'Cargando...', save: 'Guardar', cancel: 'Cancelar', delete: 'Eliminar',
            edit: 'Editar', close: 'Cerrar', preview: 'Vista previa', generate: 'Generar',
            download: 'Descargar', copy: 'Copiar', share: 'Compartir', back: 'Atrás',
            next: 'Siguiente', finish: 'Finalizar', logout: 'Cerrar Sesión',
            role: 'Rol', admin: 'Administrador', partner: 'Partner',
            search: 'Buscar', noData: 'Sin datos', error: 'Error', success: 'Éxito',
            comingSoon: 'Próximamente',
        },
        landing: {
            title: 'Generador de', subtitle: 'Landing Pages',
            step1: 'Datos', step2: 'Plantilla', step3: 'Secciones',
            selectLanguage: 'Idioma de la landing', selectCountry: 'País objetivo',
            fullName: 'Nombre completo', whatsapp: 'WhatsApp', email: 'Correo electrónico',
            landingType: 'Tipo de landing', generating: 'Generando...',
            generatedTitle: '¡Landing generada!', generatedSubtitle: 'Tu página está lista para compartir',
            landingLang: 'Idioma de la landing', history: 'Ver mis guardadas', changeLangHint: 'Cambiar idioma de la landing',
        },
        links: {
            title: 'Links de Referido', subtitle: 'Gestiona tus campañas y maximiza tus conversiones.',
            createBtn: 'Crear Nuevo Enlace', searchPlaceholder: 'Buscar por nombre o campaña...',
            totalLinks: 'Enlaces Totales', noLinks: 'No hay enlaces',
            noLinksDesc: 'Empieza creando tu primer link para trackear tus leads.', createLink: '+ Crear Link',
            newLinkTitle: 'Nuevo Link de Tracking', newLinkDesc: 'Personaliza tu enlace para medir el éxito de tus campañas.',
            linkName: 'Nombre del Link', campaignName: 'Nombre de Campaña (UTM)', urlPreview: 'Previsualización de URL',
            creating: 'Creando...', generate: 'Generar Link', referralUrl: 'URL de Referido',
            copied: '¡Copiado!', clicks: 'Clics', open: 'Abrir', deleteConfirm: '¿Seguro que quieres eliminar este link?',
        },
        leads: {
            title: 'Tus Leads', subtitle: 'Contactos registrados a través de tus landing pages.',
            filters: 'Filtros', exportCsv: 'Exportar CSV',
            colName: 'Nombre', colContact: 'Contacto', colOrigin: 'Origen (Landing)', colDate: 'Fecha de Registro',
            loading: 'Cargando leads...', empty: 'No hay leads registrados aún. Empieza a compartir tus landings.',
        },
        support: {
            badge: 'Soporte Premium', title: '¿Cómo podemos', titleHighlight: 'ayudarte', subtitle: 'Nuestro equipo especializado en Partners está disponible para resolver cualquier duda.',
            whatsappTitle: 'WhatsApp Directo', whatsappDesc: 'Consultas rápidas y soporte técnico inmediato.', whatsappAction: 'Abrir Chat',
            emailTitle: 'Email de Soporte', emailDesc: 'Para revisiones detalladas o envío de documentos.', emailAction: 'Enviar Email',
            scheduleTitle: 'Horario Operativo', scheduleDesc: 'Lun-Vie 9:00 - 18:00 EST / Sáb 10:00 - 14:00 EST', scheduleAction: 'Ver Calendario',
            faqTitle: 'Preguntas Frecuentes', faqSubtitle: 'Encuentra respuestas inmediatas a las dudas más comunes.',
            faqNotFound: '¿No encuentras tu duda?', faqNotFoundDesc: 'Nuestro centro de ayuda completo tiene más de 100 artículos para ti.',
            faqHelpCenter: 'Visitar Centro de Ayuda',
            faq: [
                { q: '¿Cuándo se pagan las comisiones?', a: 'Las comisiones aprobadas se pagan dentro de los primeros 5 días hábiles del mes siguiente.' },
                { q: '¿Cuál es el mínimo para solicitar un retiro?', a: 'El monto mínimo para solicitar un reembolso es de $10 USD.' },
                { q: '¿Cómo puedo ver si mis leads se registraron?', a: 'Ve a Informes > Clientes para ver todos los leads registrados vinculados a tu cuenta.' },
                { q: '¿Puedo tener varias Landing Pages activas?', a: 'Sí, puedes crear múltiples landing pages desde Promo > Herramientas de Registro.' },
            ],
        },
        promo: {
            sections: 'Secciones', languages: 'Idiomas', customize: 'Personalizar', createCustom: 'Crear Landing Personalizada',
            more: 'más', all: 'Todas', uploadPiece: 'Sube tu pieza', imageUploaded: 'Imagen cargada',
            dragOrClick: 'Arrastra o haz clic para subir', aspectRatio: 'Ratio de aspecto', export: 'Exportar',
        },
        settings: {
            menuTitle: 'Menú de Configuración', profile: 'Perfil Personal', security: 'Seguridad', preferences: 'Preferencias',
            profileInfo: 'Información del Perfil', profileInfoDesc: 'Actualiza tus datos públicos y de contacto.',
            fullName: 'Nombre Completo', country: 'País / Región', emailLabel: 'Correo Electrónico',
            emailSecurityNote: 'El email está vinculado a tu cuenta y no puede cambiarse por seguridad.',
            saving: 'Guardando...', saveProfile: 'Guardar Perfil', savedSuccess: 'Cambios guardados con éxito',
            dangerZone: 'Zona de Peligro', dangerDesc: 'Acciones irreversibles sobre tu cuenta.',
            deactivate: 'Solicitar desactivación de cuenta', verified: 'Verificado',
        },
        reports: {
            clientsTitle: 'Clientes Registrados', clientsSubtitle: 'Gestiona tu base de leads y haz seguimiento de conversiones.',
            filters: 'Filtros', exportLeads: 'Exportar Leads', leadsIdentified: 'Leads Identificados',
            colClientInfo: 'Información del Cliente', colContact: 'Contacto', colStatus: 'Estatus',
            colOrigin: 'Canal Origen', colDate: 'Fecha', syncing: 'Sincronizando base de datos...',
            noLeads: 'Sin leads detectados', noLeadsDesc: 'Tus futuros clientes aparecerán aquí una vez que interactúen con tus materiales.',
            endOfRecords: 'Fin de registros recientes', statusRegistered: 'Registrado', statusFunded: 'Fondeado',
            accountsTitle: 'Cuentas Operativas', accountsSubtitle: 'Monitorea la actividad y el estatus financiero de tus referidos.',
            totalAccounts: 'Total Cuentas', colHolder: 'Titular de la Cuenta', colContactDetails: 'Detalles de Contacto',
            colOperationalStatus: 'Estatus Operativo', colOpening: 'Apertura',
            fetchingFinancial: 'Obteniendo estados financieros...', noActiveAccounts: 'No hay cuentas activas',
            noActiveAccountsDesc: 'Las cuentas fondeadas de tus clientes se listarán automáticamente aquí.',
            syncedWithMT: 'Datos sincronizados con MetaTrader', statusTrading: 'Operando',
            statsTitle: 'Análisis de Rendimiento', statsSubtitle: 'Monitorea el crecimiento y efectividad de tus campañas en tiempo real.',
            activeTraders: 'Traders Activos', totalClicks: 'Clics Totales', leadsCapt: 'Leads Captados',
            convRate: 'Tasa Conv.', weeklyTrend: 'Tendencia Semanal',
            weeklyTrendDesc: 'Distribución de impactos y captaciones en los últimos 7 días.',
            week: 'Semana', month: 'Mes', proPerfTitle: 'Rendimiento Pro', monthlyGoal: 'Objetivo Mensual',
            impact: 'Impacto', reach: 'Alcance', improveTitle: '¿Quieres mejorar tus números?',
            improveDesc: 'Accede a nuestra academia premium para partners y descubre nuevas estrategias.',
            goToAcademy: 'Ir a Academia',
            dayMon: 'Lun', dayTue: 'Mar', dayWed: 'Mie', dayThu: 'Jue', dayFri: 'Vie', daySat: 'Sab', daySun: 'Dom',
        },
    },
    en: {
        nav: {
            overview: 'Dashboard',
            reports: 'Reports',
            clients: 'Clients',
            accounts: 'Client Accounts',
            stats: 'Performance Stats',
            promo: 'Promo',
            materialPost: 'Marketing Materials',
            landingTools: 'Registration Tools',
            referralLinks: 'Referral Links',
            guidelines: 'Advertising Guidelines',
            support: 'Support',
            settings: 'Settings',
            admin: 'Administration',
            partnerManagement: 'Partner Management',
            globalSettings: 'Global Settings',
        },
        topbar: { adminView: 'Admin View', partnerView: '← Partner View', search: 'Search...' },
        overview: {
            title: 'Control', subtitle: 'Panel',
            myLeads: 'My Leads', networkLeads: 'Network Total Leads',
            trafficClicks: 'Traffic / Clicks', totalClicks: 'Total Clicks',
            myLandings: 'My Landing Pages', partnerLandings: 'Partner Landings',
            realTime: 'Real time',
            quickActions: 'Quick Actions',
            materialPost: 'Marketing Materials', materialPostDesc: 'Landings & links in 8 languages',
            landingGen: 'Landing Generator', landingGenDesc: 'Create your custom landing in 3 steps',
            myClients: 'My Clients', myClientsDesc: 'Manage your client portfolio',
            reports: 'Reports', reportsDesc: 'Clicks, leads and performance stats',
            thisWeek: 'This week',
            dailyLeads: 'Daily Lead Register',
            consolidatedVolume: 'Consolidated Volume',
            realTrafficNote: 'Will populate when you receive real traffic',
            noHistory: 'No historical data yet',
            heatmapTitle: 'Global Heat Map',
            heatmapSubtitle: 'Geographic distribution of your clients',
            topPartner: 'Top Partner',
            highDensity: 'Very High Density (>800)',
            medDensity: 'High Density (>500)',
            steadyGrowth: 'Steady Growth',
            materialsReady: 'Materials ready',
            materialsTitle: '7 landings · 8 languages available',
            materialsSubtitle: 'Share your personalized link in seconds',
            viewMaterials: 'View Materials',
            conversion: 'Conv.',
            growth: 'Growth',
            adminPanel: 'Admin Panel',
            welcomePartner: 'Welcome, Partner',
            realtimeData: 'Real-time data of your activity',
        },
        common: {
            loading: 'Loading...', save: 'Save', cancel: 'Cancel', delete: 'Delete',
            edit: 'Edit', close: 'Close', preview: 'Preview', generate: 'Generate',
            download: 'Download', copy: 'Copy', share: 'Share', back: 'Back',
            next: 'Next', finish: 'Finish', logout: 'Log Out',
            role: 'Role', admin: 'Administrator', partner: 'Partner',
            search: 'Search', noData: 'No data', error: 'Error', success: 'Success',
            comingSoon: 'Coming Soon',
        },
        landing: {
            title: 'Landing Page', subtitle: 'Generator',
            step1: 'Data', step2: 'Template', step3: 'Sections',
            selectLanguage: 'Landing language', selectCountry: 'Target country',
            fullName: 'Full name', whatsapp: 'WhatsApp', email: 'Email address',
            landingType: 'Landing type', generating: 'Generating...',
            generatedTitle: 'Landing generated!', generatedSubtitle: 'Your page is ready to share',
            landingLang: 'Landing language', history: 'My saved landings', changeLangHint: 'Change landing language',
        },
        links: {
            title: 'Referral Links', subtitle: 'Manage your campaigns and maximize conversions.',
            createBtn: 'Create New Link', searchPlaceholder: 'Search by name or campaign...',
            totalLinks: 'Total Links', noLinks: 'No links yet',
            noLinksDesc: 'Start by creating your first link to track leads.', createLink: '+ Create Link',
            newLinkTitle: 'New Tracking Link', newLinkDesc: 'Customize your link to measure campaign success.',
            linkName: 'Link Name', campaignName: 'Campaign Name (UTM)', urlPreview: 'URL Preview',
            creating: 'Creating...', generate: 'Generate Link', referralUrl: 'Referral URL',
            copied: 'Copied!', clicks: 'Clicks', open: 'Open', deleteConfirm: 'Are you sure you want to delete this link?',
        },
        leads: {
            title: 'Your Leads', subtitle: 'Contacts registered through your landing pages.',
            filters: 'Filters', exportCsv: 'Export CSV',
            colName: 'Name', colContact: 'Contact', colOrigin: 'Origin (Landing)', colDate: 'Registration Date',
            loading: 'Loading leads...', empty: 'No leads registered yet. Start sharing your landings.',
        },
        support: {
            badge: 'Premium Support', title: 'How can we', titleHighlight: 'help you', subtitle: 'Our specialized Partners team is available to resolve any questions.',
            whatsappTitle: 'WhatsApp Direct', whatsappDesc: 'Quick queries and immediate technical support.', whatsappAction: 'Open Chat',
            emailTitle: 'Support Email', emailDesc: 'For detailed reviews or document submissions.', emailAction: 'Send Email',
            scheduleTitle: 'Business Hours', scheduleDesc: 'Mon-Fri 9:00 - 18:00 EST / Sat 10:00 - 14:00 EST', scheduleAction: 'View Calendar',
            faqTitle: 'Frequently Asked Questions', faqSubtitle: 'Find immediate answers to the most common questions.',
            faqNotFound: 'Can\'t find your answer?', faqNotFoundDesc: 'Our complete help center has over 100 articles for you.',
            faqHelpCenter: 'Visit Help Center',
            faq: [
                { q: 'When are commissions paid?', a: 'Approved commissions are paid within the first 5 business days of the following month.' },
                { q: 'What is the minimum withdrawal amount?', a: 'The minimum withdrawal amount is $10 USD.' },
                { q: 'How can I see if my leads registered?', a: 'Go to Reports > Clients to see all leads linked to your account.' },
                { q: 'Can I have multiple active landing pages?', a: 'Yes, you can create multiple landing pages from Promo > Registration Tools.' },
            ],
        },
        promo: {
            sections: 'Sections', languages: 'Languages', customize: 'Customize', createCustom: 'Create Custom Landing',
            more: 'more', all: 'All', uploadPiece: 'Upload your asset', imageUploaded: 'Image uploaded',
            dragOrClick: 'Drag or click to upload', aspectRatio: 'Aspect ratio', export: 'Export',
        },
        settings: {
            menuTitle: 'Settings Menu', profile: 'Personal Profile', security: 'Security', preferences: 'Preferences',
            profileInfo: 'Profile Information', profileInfoDesc: 'Update your public and contact details.',
            fullName: 'Full Name', country: 'Country / Region', emailLabel: 'Email Address',
            emailSecurityNote: 'Email is linked to your account and cannot be changed for security.',
            saving: 'Saving...', saveProfile: 'Save Profile', savedSuccess: 'Changes saved successfully',
            dangerZone: 'Danger Zone', dangerDesc: 'Irreversible actions on your account.',
            deactivate: 'Request account deactivation', verified: 'Verified',
        },
        reports: {
            clientsTitle: 'Registered Clients', clientsSubtitle: 'Manage your leads database and track conversions.',
            filters: 'Filters', exportLeads: 'Export Leads', leadsIdentified: 'Leads Identified',
            colClientInfo: 'Client Information', colContact: 'Contact', colStatus: 'Status',
            colOrigin: 'Source Channel', colDate: 'Date', syncing: 'Syncing database...',
            noLeads: 'No leads detected', noLeadsDesc: 'Your future clients will appear here once they interact with your materials.',
            endOfRecords: 'End of recent records', statusRegistered: 'Registered', statusFunded: 'Funded',
            accountsTitle: 'Operational Accounts', accountsSubtitle: 'Monitor the activity and financial status of your referrals.',
            totalAccounts: 'Total Accounts', colHolder: 'Account Holder', colContactDetails: 'Contact Details',
            colOperationalStatus: 'Operational Status', colOpening: 'Opening',
            fetchingFinancial: 'Fetching financial data...', noActiveAccounts: 'No active accounts',
            noActiveAccountsDesc: 'Funded accounts from your clients will be listed here automatically.',
            syncedWithMT: 'Data synced with MetaTrader', statusTrading: 'Trading',
            statsTitle: 'Performance Analysis', statsSubtitle: 'Monitor the growth and effectiveness of your campaigns in real time.',
            activeTraders: 'Active Traders', totalClicks: 'Total Clicks', leadsCapt: 'Leads Captured',
            convRate: 'Conv. Rate', weeklyTrend: 'Weekly Trend',
            weeklyTrendDesc: 'Distribution of impressions and captures over the last 7 days.',
            week: 'Week', month: 'Month', proPerfTitle: 'Pro Performance', monthlyGoal: 'Monthly Goal',
            impact: 'Impact', reach: 'Reach', improveTitle: 'Want to improve your numbers?',
            improveDesc: 'Access our premium partner academy and discover new strategies.',
            goToAcademy: 'Go to Academy',
            dayMon: 'Mon', dayTue: 'Tue', dayWed: 'Wed', dayThu: 'Thu', dayFri: 'Fri', daySat: 'Sat', daySun: 'Sun',
        },
    },
    zh: {
        nav: {
            overview: '控制面板',
            reports: '报告',
            clients: '客户',
            accounts: '客户账户',
            stats: '业绩统计',
            promo: '推广',
            materialPost: '营销材料',
            landingTools: '注册工具',
            referralLinks: '推荐链接',
            guidelines: '广告指南',
            support: '支持',
            settings: '设置',
            admin: '管理',
            partnerManagement: '合作伙伴管理',
            globalSettings: '全局设置',
        },
        topbar: { adminView: '管理员视图', partnerView: '← 合作伙伴视图', search: '搜索...' },
        overview: {
            title: '控制', subtitle: '面板',
            myLeads: '我的潜客', networkLeads: '网络总潜客',
            trafficClicks: '流量 / 点击', totalClicks: '总点击数',
            myLandings: '我的落地页', partnerLandings: '合作伙伴落地页',
            realTime: '实时',
            quickActions: '快捷操作',
            materialPost: '营销材料', materialPostDesc: '8种语言的落地页和链接',
            landingGen: '落地页生成器', landingGenDesc: '3步创建自定义落地页',
            myClients: '我的客户', myClientsDesc: '管理您的客户组合',
            reports: '报告', reportsDesc: '点击、潜客和绩效统计',
            thisWeek: '本周',
            dailyLeads: '每日潜客记录',
            consolidatedVolume: '综合成交量',
            realTrafficNote: '收到真实流量后将显示数据',
            noHistory: '暂无历史数据',
            heatmapTitle: '全球热力图',
            heatmapSubtitle: '客户地理分布',
            topPartner: '顶级合作伙伴',
            highDensity: '极高密度 (>800)',
            medDensity: '高密度 (>500)',
            steadyGrowth: '稳定增长',
            materialsReady: '材料就绪',
            materialsTitle: '7个落地页 · 8种语言',
            materialsSubtitle: '几秒内分享您的个性化链接',
            viewMaterials: '查看材料',
            conversion: '转化率',
            growth: '增长',
            adminPanel: '管理员面板',
            welcomePartner: '欢迎，合作伙伴',
            realtimeData: '您活动的实时数据',
        },
        common: {
            loading: '加载中...', save: '保存', cancel: '取消', delete: '删除',
            edit: '编辑', close: '关闭', preview: '预览', generate: '生成',
            download: '下载', copy: '复制', share: '分享', back: '返回',
            next: '下一步', finish: '完成', logout: '退出登录',
            role: '角色', admin: '管理员', partner: '合作伙伴',
            search: '搜索', noData: '无数据', error: '错误', success: '成功',
            comingSoon: '即将推出',
        },
        landing: {
            title: '落地页', subtitle: '生成器',
            step1: '数据', step2: '模板', step3: '板块',
            selectLanguage: '落地页语言', selectCountry: '目标国家',
            fullName: '全名', whatsapp: 'WhatsApp', email: '电子邮件',
            landingType: '落地页类型', generating: '生成中...',
            generatedTitle: '落地页已生成！', generatedSubtitle: '您的页面已准备好分享',
            landingLang: '落地页语言', history: '我的保存', changeLangHint: '更改落地页语言',
        },
        links: {
            title: '推荐链接', subtitle: '管理您的活动并最大化转化率。',
            createBtn: '创建新链接', searchPlaceholder: '按名称或活动搜索...',
            totalLinks: '总链接数', noLinks: '暂无链接',
            noLinksDesc: '创建您的第一个链接来跟踪潜在客户。', createLink: '+ 创建链接',
            newLinkTitle: '新跟踪链接', newLinkDesc: '自定义您的链接以衡量活动效果。',
            linkName: '链接名称', campaignName: '活动名称 (UTM)', urlPreview: 'URL 预览',
            creating: '创建中...', generate: '生成链接', referralUrl: '推荐URL',
            copied: '已复制！', clicks: '点击', open: '打开', deleteConfirm: '确定要删除此链接吗？',
        },
        leads: {
            title: '您的潜在客户', subtitle: '通过您的落地页注册的联系人。',
            filters: '筛选', exportCsv: '导出CSV',
            colName: '姓名', colContact: '联系方式', colOrigin: '来源（落地页）', colDate: '注册日期',
            loading: '加载中...', empty: '暂无潜在客户。开始分享您的落地页吧。',
        },
        support: {
            badge: '高级支持', title: '我们如何', titleHighlight: '帮助您', subtitle: '我们专业的合作伙伴团队随时为您解答。',
            whatsappTitle: 'WhatsApp 直连', whatsappDesc: '快速咨询和即时技术支持。', whatsappAction: '打开聊天',
            emailTitle: '支持邮箱', emailDesc: '用于详细审核或提交文件。', emailAction: '发送邮件',
            scheduleTitle: '营业时间', scheduleDesc: '周一至五 9:00 - 18:00 EST / 周六 10:00 - 14:00 EST', scheduleAction: '查看日历',
            faqTitle: '常见问题', faqSubtitle: '即时获取最常见问题的答案。',
            faqNotFound: '找不到答案？', faqNotFoundDesc: '我们的帮助中心有100多篇文章。',
            faqHelpCenter: '访问帮助中心',
            faq: [
                { q: '佣金何时支付？', a: '已批准的佣金将在次月前5个工作日内支付。' },
                { q: '最低提款金额是多少？', a: '最低提款金额为10美元。' },
                { q: '如何查看我的潜在客户是否注册？', a: '前往报告 > 客户查看与您账户关联的所有潜在客户。' },
                { q: '我可以同时拥有多个活跃的落地页吗？', a: '是的，您可以从推广 > 注册工具创建多个落地页。' },
            ],
        },
        promo: {
            sections: '部分', languages: '语言', customize: '自定义', createCustom: '创建自定义落地页',
            more: '更多', all: '全部', uploadPiece: '上传素材', imageUploaded: '图片已上传',
            dragOrClick: '拖拽或点击上传', aspectRatio: '宽高比', export: '导出',
        },
        settings: {
            menuTitle: '设置菜单', profile: '个人资料', security: '安全', preferences: '偏好设置',
            profileInfo: '个人信息', profileInfoDesc: '更新您的公开和联系信息。',
            fullName: '全名', country: '国家/地区', emailLabel: '电子邮件',
            emailSecurityNote: '邮箱已绑定账户，出于安全考虑无法更改。',
            saving: '保存中...', saveProfile: '保存资料', savedSuccess: '更改已成功保存',
            dangerZone: '危险区域', dangerDesc: '对您的账户执行不可逆操作。',
            deactivate: '申请停用账户', verified: '已验证',
        },
        reports: {
            clientsTitle: '注册客户', clientsSubtitle: '管理您的潜在客户数据库并跟踪转化。',
            filters: '筛选', exportLeads: '导出线索', leadsIdentified: '已识别线索',
            colClientInfo: '客户信息', colContact: '联系方式', colStatus: '状态',
            colOrigin: '来源渠道', colDate: '日期', syncing: '同步数据库中...',
            noLeads: '未检测到线索', noLeadsDesc: '您的未来客户将在与您的材料互动后出现在这里。',
            endOfRecords: '最近记录已完', statusRegistered: '已注册', statusFunded: '已入金',
            accountsTitle: '运营账户', accountsSubtitle: '监控您推荐人的活动和财务状态。',
            totalAccounts: '总账户', colHolder: '账户持有人', colContactDetails: '联系详情',
            colOperationalStatus: '运营状态', colOpening: '开户',
            fetchingFinancial: '获取财务数据中...', noActiveAccounts: '暂无活跃账户',
            noActiveAccountsDesc: '客户的入金账户将自动在此列出。',
            syncedWithMT: '数据已与MetaTrader同步', statusTrading: '交易中',
            statsTitle: '绩效分析', statsSubtitle: '实时监控您的活动增长和有效性。',
            activeTraders: '活跃交易者', totalClicks: '总点击', leadsCapt: '捕获线索',
            convRate: '转化率', weeklyTrend: '每周趋势',
            weeklyTrendDesc: '过去7天的点击和捕获分布。',
            week: '周', month: '月', proPerfTitle: '专业绩效', monthlyGoal: '月度目标',
            impact: '影响力', reach: '覆盖范围', improveTitle: '想提升您的数据？',
            improveDesc: '访问我们的高级合作伙伴学院，发现新策略。',
            goToAcademy: '前往学院',
            dayMon: '周一', dayTue: '周二', dayWed: '周三', dayThu: '周四', dayFri: '周五', daySat: '周六', daySun: '周日',
        },
    },
    hi: {
        nav: {
            overview: 'डैशबोर्ड',
            reports: 'रिपोर्ट',
            clients: 'ग्राहक',
            accounts: 'ग्राहक खाते',
            stats: 'प्रदर्शन आंकड़े',
            promo: 'प्रचार',
            materialPost: 'मार्केटिंग सामग्री',
            landingTools: 'पंजीकरण उपकरण',
            referralLinks: 'रेफ़रल लिंक',
            guidelines: 'विज्ञापन दिशानिर्देश',
            support: 'सहायता',
            settings: 'सेटिंग',
            admin: 'प्रशासन',
            partnerManagement: 'पार्टनर प्रबंधन',
            globalSettings: 'वैश्विक सेटिंग',
        },
        topbar: { adminView: 'एडमिन व्यू', partnerView: '← पार्टनर व्यू', search: 'खोजें...' },
        overview: {
            title: 'नियंत्रण', subtitle: 'पैनल',
            myLeads: 'मेरे लीड', networkLeads: 'नेटवर्क कुल लीड',
            trafficClicks: 'ट्रैफ़िक / क्लिक', totalClicks: 'कुल क्लिक',
            myLandings: 'मेरे लैंडिंग पेज', partnerLandings: 'पार्टनर लैंडिंग पेज',
            realTime: 'रियल टाइम',
            quickActions: 'त्वरित कार्य',
            materialPost: 'मार्केटिंग सामग्री', materialPostDesc: '8 भाषाओं में लैंडिंग और लिंक',
            landingGen: 'लैंडिंग जनरेटर', landingGenDesc: '3 चरणों में कस्टम लैंडिंग बनाएं',
            myClients: 'मेरे ग्राहक', myClientsDesc: 'अपना क्लाइंट पोर्टफोलियो प्रबंधित करें',
            reports: 'रिपोर्ट', reportsDesc: 'क्लिक, लीड और प्रदर्शन आंकड़े',
            thisWeek: 'इस सप्ताह',
            dailyLeads: 'दैनिक लीड रजिस्टर',
            consolidatedVolume: 'समेकित वॉल्यूम',
            realTrafficNote: 'वास्तविक ट्रैफ़िक मिलने पर डेटा दिखेगा',
            noHistory: 'अभी तक कोई ऐतिहासिक डेटा नहीं',
            heatmapTitle: 'वैश्विक हीट मैप',
            heatmapSubtitle: 'आपके ग्राहकों का भौगोलिक वितरण',
            topPartner: 'शीर्ष पार्टनर',
            highDensity: 'अत्यधिक उच्च घनत्व (>800)',
            medDensity: 'उच्च घनत्व (>500)',
            steadyGrowth: 'स्थिर वृद्धि',
            materialsReady: 'सामग्री तैयार है',
            materialsTitle: '7 लैंडिंग · 8 भाषाएं उपलब्ध',
            materialsSubtitle: 'सेकंड में अपना व्यक्तिगत लिंक साझा करें',
            viewMaterials: 'सामग्री देखें',
            conversion: 'रूपांतरण',
            growth: 'वृद्धि',
            adminPanel: 'एडमिन पैनल',
            welcomePartner: 'स्वागत है, पार्टनर',
            realtimeData: 'आपकी गतिविधि का रियल-टाइम डेटा',
        },
        common: {
            loading: 'लोड हो रहा है...', save: 'सहेजें', cancel: 'रद्द करें', delete: 'हटाएं',
            edit: 'संपादित करें', close: 'बंद करें', preview: 'पूर्वावलोकन', generate: 'बनाएं',
            download: 'डाउनलोड', copy: 'कॉपी करें', share: 'साझा करें', back: 'वापस',
            next: 'अगला', finish: 'समाप्त', logout: 'लॉग आउट',
            role: 'भूमिका', admin: 'प्रशासक', partner: 'पार्टनर',
            search: 'खोजें', noData: 'कोई डेटा नहीं', error: 'त्रुटि', success: 'सफलता',
            comingSoon: 'जल्द आ रहा है',
        },
        landing: {
            title: 'लैंडिंग पेज', subtitle: 'जनरेटर',
            step1: 'डेटा', step2: 'टेम्पलेट', step3: 'सेक्शन',
            selectLanguage: 'लैंडिंग भाषा', selectCountry: 'लक्षित देश',
            fullName: 'पूरा नाम', whatsapp: 'WhatsApp', email: 'ईमेल पता',
            landingType: 'लैंडिंग प्रकार', generating: 'बनाया जा रहा है...',
            generatedTitle: 'लैंडिंग बन गई!', generatedSubtitle: 'आपका पेज साझा करने के लिए तैयार है',
            landingLang: 'लैंडिंग की भाषा', history: 'मेरी सेव की गई', changeLangHint: 'लैंडिंग की भाषा बदलें',
        },
        links: {
            title: 'रेफ़रल लिंक', subtitle: 'अपने अभियान प्रबंधित करें और रूपांतरण बढ़ाएं।',
            createBtn: 'नया लिंक बनाएं', searchPlaceholder: 'नाम या अभियान खोजें...',
            totalLinks: 'कुल लिंक', noLinks: 'कोई लिंक नहीं',
            noLinksDesc: 'लीड ट्रैक करने के लिए अपना पहला लिंक बनाएं।', createLink: '+ लिंक बनाएं',
            newLinkTitle: 'नया ट्रैकिंग लिंक', newLinkDesc: 'अभियान सफलता मापने के लिए अपना लिंक कस्टमाइज़ करें।',
            linkName: 'लिंक का नाम', campaignName: 'अभियान नाम (UTM)', urlPreview: 'URL पूर्वावलोकन',
            creating: 'बना रहा है...', generate: 'लिंक बनाएं', referralUrl: 'रेफ़रल URL',
            copied: 'कॉपी हो गया!', clicks: 'क्लिक', open: 'खोलें', deleteConfirm: 'क्या आप इस लिंक को हटाना चाहते हैं?',
        },
        leads: {
            title: 'आपके लीड', subtitle: 'आपके लैंडिंग पेज के माध्यम से पंजीकृत संपर्क।',
            filters: 'फ़िल्टर', exportCsv: 'CSV निर्यात',
            colName: 'नाम', colContact: 'संपर्क', colOrigin: 'स्रोत (लैंडिंग)', colDate: 'पंजीकरण तिथि',
            loading: 'लीड लोड हो रहे हैं...', empty: 'अभी तक कोई लीड नहीं। अपनी लैंडिंग साझा करना शुरू करें।',
        },
        support: {
            badge: 'प्रीमियम सहायता', title: 'हम कैसे', titleHighlight: 'मदद करें', subtitle: 'हमारी विशेष पार्टनर टीम किसी भी प्रश्न का उत्तर देने के लिए उपलब्ध है।',
            whatsappTitle: 'WhatsApp डायरेक्ट', whatsappDesc: 'त्वरित प्रश्न और तत्काल तकनीकी सहायता।', whatsappAction: 'चैट खोलें',
            emailTitle: 'सहायता ईमेल', emailDesc: 'विस्तृत समीक्षा या दस्तावेज़ भेजने के लिए।', emailAction: 'ईमेल भेजें',
            scheduleTitle: 'कार्य समय', scheduleDesc: 'सोम-शुक्र 9:00 - 18:00 EST / शनि 10:00 - 14:00 EST', scheduleAction: 'कैलेंडर देखें',
            faqTitle: 'अक्सर पूछे जाने वाले प्रश्न', faqSubtitle: 'सबसे आम प्रश्नों के तुरंत उत्तर पाएं।',
            faqNotFound: 'उत्तर नहीं मिला?', faqNotFoundDesc: 'हमारे सहायता केंद्र में 100 से अधिक लेख हैं।',
            faqHelpCenter: 'सहायता केंद्र पर जाएं',
            faq: [
                { q: 'कमीशन कब भुगतान किया जाता है?', a: 'स्वीकृत कमीशन अगले महीने के पहले 5 कार्य दिवसों में भुगतान किया जाता है।' },
                { q: 'न्यूनतम निकासी राशि क्या है?', a: 'न्यूनतम निकासी राशि $10 USD है।' },
                { q: 'मैं कैसे देख सकता हूं कि मेरे लीड ने पंजीकरण किया?', a: 'रिपोर्ट > क्लाइंट पर जाएं।' },
                { q: 'क्या मेरे पास कई सक्रिय लैंडिंग पेज हो सकते हैं?', a: 'हां, प्रोमो > पंजीकरण टूल से कई लैंडिंग पेज बना सकते हैं।' },
            ],
        },
        promo: {
            sections: 'अनुभाग', languages: 'भाषाएँ', customize: 'अनुकूलित', createCustom: 'कस्टम लैंडिंग बनाएं',
            more: 'और', all: 'सभी', uploadPiece: 'अपनी सामग्री अपलोड करें', imageUploaded: 'छवि अपलोड हो गई',
            dragOrClick: 'अपलोड करने के लिए खींचें या क्लिक करें', aspectRatio: 'पक्षानुपात', export: 'निर्यात',
        },
        settings: {
            menuTitle: 'सेटिंग्स मेनू', profile: 'व्यक्तिगत प्रोफ़ाइल', security: 'सुरक्षा', preferences: 'प्राथमिकताएँ',
            profileInfo: 'प्रोफ़ाइल जानकारी', profileInfoDesc: 'अपनी सार्वजनिक और संपर्क जानकारी अपडेट करें।',
            fullName: 'पूरा नाम', country: 'देश / क्षेत्र', emailLabel: 'ईमेल पता',
            emailSecurityNote: 'ईमेल आपके खाते से जुड़ा है और सुरक्षा कारणों से बदला नहीं जा सकता।',
            saving: 'सहेज रहा है...', saveProfile: 'प्रोफ़ाइल सहेजें', savedSuccess: 'परिवर्तन सफलतापूर्वक सहेजे गए',
            dangerZone: 'खतरनाक क्षेत्र', dangerDesc: 'आपके खाते पर अपरिवर्तनीय कार्रवाइयाँ।',
            deactivate: 'खाता निष्क्रियता का अनुरोध करें', verified: 'सत्यापित',
        },
        reports: {
            clientsTitle: 'पंजीकृत ग्राहक', clientsSubtitle: 'अपने लीड डेटाबेस को प्रबंधित करें और रूपांतरण ट्रैक करें।',
            filters: 'फ़िल्टर', exportLeads: 'लीड्स निर्यात', leadsIdentified: 'पहचाने गए लीड्स',
            colClientInfo: 'ग्राहक जानकारी', colContact: 'संपर्क', colStatus: 'स्थिति',
            colOrigin: 'स्रोत चैनल', colDate: 'दिनांक', syncing: 'डेटाबेस सिंक हो रहा है...',
            noLeads: 'कोई लीड नहीं मिला', noLeadsDesc: 'आपके भावी ग्राहक आपकी सामग्री से इंटरैक्ट करने के बाद यहां दिखाई देंगे।',
            endOfRecords: 'हाल के रिकॉर्ड का अंत', statusRegistered: 'पंजीकृत', statusFunded: 'फंडेड',
            accountsTitle: 'ऑपरेशनल खाते', accountsSubtitle: 'अपने रेफ़रल की गतिविधि और वित्तीय स्थिति की निगरानी करें।',
            totalAccounts: 'कुल खाते', colHolder: 'खाता धारक', colContactDetails: 'संपर्क विवरण',
            colOperationalStatus: 'ऑपरेशनल स्थिति', colOpening: 'खुलना',
            fetchingFinancial: 'वित्तीय डेटा प्राप्त हो रहा है...', noActiveAccounts: 'कोई सक्रिय खाता नहीं',
            noActiveAccountsDesc: 'ग्राहकों के फंडेड खाते स्वचालित रूप से यहां सूचीबद्ध होंगे।',
            syncedWithMT: 'MetaTrader से सिंक किया गया', statusTrading: 'ट्रेडिंग',
            statsTitle: 'प्रदर्शन विश्लेषण', statsSubtitle: 'अपने अभियानों की वृद्धि और प्रभावशीलता की रीयल-टाइम निगरानी।',
            activeTraders: 'सक्रिय ट्रेडर्स', totalClicks: 'कुल क्लिक्स', leadsCapt: 'कैप्चर किए गए लीड्स',
            convRate: 'रूपांतरण दर', weeklyTrend: 'साप्ताहिक रुझान',
            weeklyTrendDesc: 'पिछले 7 दिनों में प्रभावों और कैप्चर का वितरण।',
            week: 'सप्ताह', month: 'महीना', proPerfTitle: 'प्रो प्रदर्शन', monthlyGoal: 'मासिक लक्ष्य',
            impact: 'प्रभाव', reach: 'पहुंच', improveTitle: 'अपने नंबर सुधारना चाहते हैं?',
            improveDesc: 'हमारी प्रीमियम पार्टनर अकादमी तक पहुंचें और नई रणनीतियां खोजें।',
            goToAcademy: 'अकादमी पर जाएं',
            dayMon: 'सोम', dayTue: 'मंग', dayWed: 'बुध', dayThu: 'गुरु', dayFri: 'शुक्र', daySat: 'शनि', daySun: 'रवि',
        },
    },
    fr: {
        nav: {
            overview: 'Tableau de bord',
            reports: 'Rapports',
            clients: 'Clients',
            accounts: 'Comptes clients',
            stats: 'Statistiques de performance',
            promo: 'Promo',
            materialPost: 'Matériaux marketing',
            landingTools: 'Outils d\'inscription',
            referralLinks: 'Liens de parrainage',
            guidelines: 'Directives publicitaires',
            support: 'Assistance',
            settings: 'Paramètres',
            admin: 'Administration',
            partnerManagement: 'Gestion des partenaires',
            globalSettings: 'Paramètres globaux',
        },
        topbar: { adminView: 'Vue Admin', partnerView: '← Vue Partenaire', search: 'Rechercher...' },
        overview: {
            title: 'Tableau', subtitle: 'de Bord',
            myLeads: 'Mes Leads', networkLeads: 'Leads Réseau Total',
            trafficClicks: 'Trafic / Clics', totalClicks: 'Clics Totaux',
            myLandings: 'Mes Pages d\'Atterrissage', partnerLandings: 'Pages Partenaires',
            realTime: 'Temps réel',
            quickActions: 'Accès Rapides',
            materialPost: 'Matériaux Marketing', materialPostDesc: 'Pages et liens en 8 langues',
            landingGen: 'Générateur de Pages', landingGenDesc: 'Créez votre page en 3 étapes',
            myClients: 'Mes Clients', myClientsDesc: 'Gérez votre portefeuille clients',
            reports: 'Rapports', reportsDesc: 'Clics, leads et statistiques',
            thisWeek: 'Cette semaine',
            dailyLeads: 'Registre Quotidien de Leads',
            consolidatedVolume: 'Volume Consolidé',
            realTrafficNote: 'S\'affichera avec du trafic réel',
            noHistory: 'Aucun historique pour le moment',
            heatmapTitle: 'Carte de Chaleur Mondiale',
            heatmapSubtitle: 'Distribution géographique de vos clients',
            topPartner: 'Meilleur Partenaire',
            highDensity: 'Très Haute Densité (>800)',
            medDensity: 'Haute Densité (>500)',
            steadyGrowth: 'Croissance Constante',
            materialsReady: 'Matériaux prêts',
            materialsTitle: '7 pages · 8 langues disponibles',
            materialsSubtitle: 'Partagez votre lien personnalisé en secondes',
            viewMaterials: 'Voir les Matériaux',
            conversion: 'Conv.',
            growth: 'Croiss.',
            adminPanel: 'Panneau Administrateur',
            welcomePartner: 'Bienvenue, Partenaire',
            realtimeData: 'Données en temps réel de votre activité',
        },
        common: {
            loading: 'Chargement...', save: 'Enregistrer', cancel: 'Annuler', delete: 'Supprimer',
            edit: 'Modifier', close: 'Fermer', preview: 'Aperçu', generate: 'Générer',
            download: 'Télécharger', copy: 'Copier', share: 'Partager', back: 'Retour',
            next: 'Suivant', finish: 'Terminer', logout: 'Se Déconnecter',
            role: 'Rôle', admin: 'Administrateur', partner: 'Partenaire',
            search: 'Chercher', noData: 'Aucune donnée', error: 'Erreur', success: 'Succès',
            comingSoon: 'Prochainement',
        },
        landing: {
            title: 'Générateur de', subtitle: 'Pages d\'Atterrissage',
            step1: 'Données', step2: 'Modèle', step3: 'Sections',
            selectLanguage: 'Langue de la page', selectCountry: 'Pays cible',
            fullName: 'Nom complet', whatsapp: 'WhatsApp', email: 'Adresse e-mail',
            landingType: 'Type de page', generating: 'Génération...',
            generatedTitle: 'Page générée!', generatedSubtitle: 'Votre page est prête à partager',
            landingLang: 'Langue de la page', history: 'Mes pages sauvegardées', changeLangHint: 'Changer la langue de la page',
        },
        links: {
            title: 'Liens de Parrainage', subtitle: 'Gérez vos campagnes et maximisez les conversions.',
            createBtn: 'Créer un Nouveau Lien', searchPlaceholder: 'Rechercher par nom ou campagne...',
            totalLinks: 'Liens Totaux', noLinks: 'Aucun lien',
            noLinksDesc: 'Commencez par créer votre premier lien pour suivre vos prospects.', createLink: '+ Créer un Lien',
            newLinkTitle: 'Nouveau Lien de Suivi', newLinkDesc: 'Personnalisez votre lien pour mesurer le succès de vos campagnes.',
            linkName: 'Nom du Lien', campaignName: 'Nom de Campagne (UTM)', urlPreview: 'Aperçu de l\'URL',
            creating: 'Création...', generate: 'Générer le Lien', referralUrl: 'URL de Parrainage',
            copied: 'Copié !', clicks: 'Clics', open: 'Ouvrir', deleteConfirm: 'Voulez-vous vraiment supprimer ce lien ?',
        },
        leads: {
            title: 'Vos Prospects', subtitle: 'Contacts enregistrés via vos pages d\'atterrissage.',
            filters: 'Filtres', exportCsv: 'Exporter CSV',
            colName: 'Nom', colContact: 'Contact', colOrigin: 'Origine (Landing)', colDate: 'Date d\'Inscription',
            loading: 'Chargement des prospects...', empty: 'Aucun prospect enregistré. Commencez à partager vos pages.',
        },
        support: {
            badge: 'Support Premium', title: 'Comment pouvons-nous', titleHighlight: 'vous aider', subtitle: 'Notre équipe spécialisée est disponible pour répondre à toutes vos questions.',
            whatsappTitle: 'WhatsApp Direct', whatsappDesc: 'Questions rapides et support technique immédiat.', whatsappAction: 'Ouvrir le Chat',
            emailTitle: 'Email de Support', emailDesc: 'Pour des analyses détaillées ou l\'envoi de documents.', emailAction: 'Envoyer un Email',
            scheduleTitle: 'Horaires', scheduleDesc: 'Lun-Ven 9:00 - 18:00 EST / Sam 10:00 - 14:00 EST', scheduleAction: 'Voir le Calendrier',
            faqTitle: 'Questions Fréquentes', faqSubtitle: 'Trouvez des réponses immédiates aux questions les plus courantes.',
            faqNotFound: 'Vous ne trouvez pas votre réponse ?', faqNotFoundDesc: 'Notre centre d\'aide contient plus de 100 articles.',
            faqHelpCenter: 'Visiter le Centre d\'Aide',
            faq: [
                { q: 'Quand les commissions sont-elles payées ?', a: 'Les commissions approuvées sont payées dans les 5 premiers jours ouvrables du mois suivant.' },
                { q: 'Quel est le montant minimum de retrait ?', a: 'Le montant minimum est de 10 USD.' },
                { q: 'Comment voir si mes prospects se sont inscrits ?', a: 'Allez dans Rapports > Clients pour voir tous les prospects.' },
                { q: 'Puis-je avoir plusieurs pages actives ?', a: 'Oui, créez plusieurs pages depuis Promo > Outils d\'Inscription.' },
            ],
        },
        promo: {
            sections: 'Sections', languages: 'Langues', customize: 'Personnaliser', createCustom: 'Créer une Landing personnalisée',
            more: 'plus', all: 'Toutes', uploadPiece: 'Téléchargez votre pièce', imageUploaded: 'Image chargée',
            dragOrClick: 'Glissez ou cliquez pour télécharger', aspectRatio: 'Rapport d\'aspect', export: 'Exporter',
        },
        settings: {
            menuTitle: 'Menu de Configuration', profile: 'Profil Personnel', security: 'Sécurité', preferences: 'Préférences',
            profileInfo: 'Informations du Profil', profileInfoDesc: 'Mettez à jour vos données publiques et de contact.',
            fullName: 'Nom Complet', country: 'Pays / Région', emailLabel: 'Adresse Email',
            emailSecurityNote: 'L\'email est lié à votre compte et ne peut être changé pour des raisons de sécurité.',
            saving: 'Enregistrement...', saveProfile: 'Enregistrer le Profil', savedSuccess: 'Modifications enregistrées',
            dangerZone: 'Zone Dangereuse', dangerDesc: 'Actions irréversibles sur votre compte.',
            deactivate: 'Demander la désactivation du compte', verified: 'Vérifié',
        },
        reports: {
            clientsTitle: 'Clients Inscrits', clientsSubtitle: 'Gérez votre base de leads et suivez les conversions.',
            filters: 'Filtres', exportLeads: 'Exporter Leads', leadsIdentified: 'Leads Identifiés',
            colClientInfo: 'Info Client', colContact: 'Contact', colStatus: 'Statut',
            colOrigin: 'Canal Source', colDate: 'Date', syncing: 'Synchronisation en cours...',
            noLeads: 'Aucun lead détecté', noLeadsDesc: 'Vos futurs clients apparaîtront ici dès qu\'ils interagissent avec vos matériaux.',
            endOfRecords: 'Fin des enregistrements récents', statusRegistered: 'Inscrit', statusFunded: 'Financé',
            accountsTitle: 'Comptes Opérationnels', accountsSubtitle: 'Surveillez l\'activité et le statut financier de vos filleuls.',
            totalAccounts: 'Total Comptes', colHolder: 'Titulaire du Compte', colContactDetails: 'Détails Contact',
            colOperationalStatus: 'Statut Opérationnel', colOpening: 'Ouverture',
            fetchingFinancial: 'Récupération des données financières...', noActiveAccounts: 'Aucun compte actif',
            noActiveAccountsDesc: 'Les comptes financés de vos clients seront listés automatiquement ici.',
            syncedWithMT: 'Données synchronisées avec MetaTrader', statusTrading: 'En Trading',
            statsTitle: 'Analyse de Performance', statsSubtitle: 'Suivez la croissance et l\'efficacité de vos campagnes en temps réel.',
            activeTraders: 'Traders Actifs', totalClicks: 'Clics Totaux', leadsCapt: 'Leads Captés',
            convRate: 'Taux Conv.', weeklyTrend: 'Tendance Hebdomadaire',
            weeklyTrendDesc: 'Distribution des impressions et captures des 7 derniers jours.',
            week: 'Semaine', month: 'Mois', proPerfTitle: 'Performance Pro', monthlyGoal: 'Objectif Mensuel',
            impact: 'Impact', reach: 'Portée', improveTitle: 'Envie d\'améliorer vos chiffres ?',
            improveDesc: 'Accédez à notre académie premium pour partenaires et découvrez de nouvelles stratégies.',
            goToAcademy: 'Accéder à l\'Académie',
            dayMon: 'Lun', dayTue: 'Mar', dayWed: 'Mer', dayThu: 'Jeu', dayFri: 'Ven', daySat: 'Sam', daySun: 'Dim',
        },
    },
    ar: {
        nav: {
            overview: 'لوحة التحكم',
            reports: 'التقارير',
            clients: 'العملاء',
            accounts: 'حسابات العملاء',
            stats: 'إحصائيات الأداء',
            promo: 'الترويج',
            materialPost: 'مواد التسويق',
            landingTools: 'أدوات التسجيل',
            referralLinks: 'روابط الإحالة',
            guidelines: 'إرشادات الإعلان',
            support: 'الدعم',
            settings: 'الإعدادات',
            admin: 'الإدارة',
            partnerManagement: 'إدارة الشركاء',
            globalSettings: 'الإعدادات العامة',
        },
        topbar: { adminView: 'عرض المسؤول', partnerView: 'عرض الشريك ←', search: 'بحث...' },
        overview: {
            title: 'لوحة', subtitle: 'التحكم',
            myLeads: 'العملاء المحتملون', networkLeads: 'إجمالي الشبكة',
            trafficClicks: 'حركة / نقرات', totalClicks: 'إجمالي النقرات',
            myLandings: 'صفحات الهبوط', partnerLandings: 'صفحات الشركاء',
            realTime: 'الوقت الفعلي',
            quickActions: 'الإجراءات السريعة',
            materialPost: 'مواد التسويق', materialPostDesc: 'صفحات وروابط بـ 8 لغات',
            landingGen: 'منشئ الصفحات', landingGenDesc: 'أنشئ صفحتك في 3 خطوات',
            myClients: 'عملائي', myClientsDesc: 'إدارة محفظة العملاء',
            reports: 'التقارير', reportsDesc: 'النقرات والعملاء والإحصائيات',
            thisWeek: 'هذا الأسبوع',
            dailyLeads: 'سجل العملاء اليومي',
            consolidatedVolume: 'الحجم الموحد',
            realTrafficNote: 'سيظهر عند استلام حركة مرور حقيقية',
            noHistory: 'لا توجد بيانات تاريخية',
            heatmapTitle: 'الخريطة الحرارية العالمية',
            heatmapSubtitle: 'التوزيع الجغرافي لعملائك',
            topPartner: 'أفضل شريك',
            highDensity: 'كثافة عالية جداً (>800)',
            medDensity: 'كثافة عالية (>500)',
            steadyGrowth: 'نمو مستمر',
            materialsReady: 'المواد جاهزة',
            materialsTitle: '7 صفحات · 8 لغات متاحة',
            materialsSubtitle: 'شارك رابطك الشخصي في ثوانٍ',
            viewMaterials: 'عرض المواد',
            conversion: 'تحويل',
            growth: 'نمو',
            adminPanel: 'لوحة المسؤول',
            welcomePartner: 'مرحباً، شريك',
            realtimeData: 'بيانات نشاطك في الوقت الفعلي',
        },
        common: {
            loading: 'جارٍ التحميل...', save: 'حفظ', cancel: 'إلغاء', delete: 'حذف',
            edit: 'تعديل', close: 'إغلاق', preview: 'معاينة', generate: 'إنشاء',
            download: 'تنزيل', copy: 'نسخ', share: 'مشاركة', back: 'رجوع',
            next: 'التالي', finish: 'إنهاء', logout: 'تسجيل الخروج',
            role: 'الدور', admin: 'مسؤول', partner: 'شريك',
            search: 'بحث', noData: 'لا توجد بيانات', error: 'خطأ', success: 'نجاح',
            comingSoon: 'قريباً',
        },
        landing: {
            title: 'منشئ', subtitle: 'صفحات الهبوط',
            step1: 'البيانات', step2: 'القالب', step3: 'الأقسام',
            selectLanguage: 'لغة الصفحة', selectCountry: 'البلد المستهدف',
            fullName: 'الاسم الكامل', whatsapp: 'واتساب', email: 'البريد الإلكتروني',
            landingType: 'نوع الصفحة', generating: 'جارٍ الإنشاء...',
            generatedTitle: 'تم إنشاء الصفحة!', generatedSubtitle: 'صفحتك جاهزة للمشاركة',
            landingLang: 'لغة الصفحة', history: 'محفوظاتي', changeLangHint: 'تغيير لغة الصفحة',
        },
        links: {
            title: 'روابط الإحالة', subtitle: 'أدِر حملاتك وعظّم التحويلات.',
            createBtn: 'إنشاء رابط جديد', searchPlaceholder: 'البحث بالاسم أو الحملة...',
            totalLinks: 'إجمالي الروابط', noLinks: 'لا توجد روابط',
            noLinksDesc: 'ابدأ بإنشاء رابطك الأول لتتبع العملاء المحتملين.', createLink: '+ إنشاء رابط',
            newLinkTitle: 'رابط تتبع جديد', newLinkDesc: 'خصّص رابطك لقياس نجاح حملاتك.',
            linkName: 'اسم الرابط', campaignName: 'اسم الحملة (UTM)', urlPreview: 'معاينة الرابط',
            creating: 'جارٍ الإنشاء...', generate: 'إنشاء الرابط', referralUrl: 'رابط الإحالة',
            copied: 'تم النسخ!', clicks: 'نقرات', open: 'فتح', deleteConfirm: 'هل أنت متأكد من حذف هذا الرابط؟',
        },
        leads: {
            title: 'عملاؤك المحتملون', subtitle: 'جهات الاتصال المسجلة عبر صفحات الهبوط.',
            filters: 'تصفية', exportCsv: 'تصدير CSV',
            colName: 'الاسم', colContact: 'جهة الاتصال', colOrigin: 'المصدر (الصفحة)', colDate: 'تاريخ التسجيل',
            loading: 'جارٍ التحميل...', empty: 'لا يوجد عملاء محتملون بعد. ابدأ بمشاركة صفحاتك.',
        },
        support: {
            badge: 'دعم متميز', title: 'كيف يمكننا', titleHighlight: 'مساعدتك', subtitle: 'فريقنا المتخصص متاح للإجابة على أي استفسار.',
            whatsappTitle: 'واتساب مباشر', whatsappDesc: 'استفسارات سريعة ودعم تقني فوري.', whatsappAction: 'فتح المحادثة',
            emailTitle: 'بريد الدعم', emailDesc: 'للمراجعات التفصيلية أو إرسال المستندات.', emailAction: 'إرسال بريد',
            scheduleTitle: 'ساعات العمل', scheduleDesc: 'الإثنين-الجمعة 9:00 - 18:00 EST / السبت 10:00 - 14:00 EST', scheduleAction: 'عرض التقويم',
            faqTitle: 'الأسئلة الشائعة', faqSubtitle: 'ابحث عن إجابات فورية للأسئلة الأكثر شيوعاً.',
            faqNotFound: 'لم تجد إجابتك؟', faqNotFoundDesc: 'مركز المساعدة يحتوي على أكثر من 100 مقال.',
            faqHelpCenter: 'زيارة مركز المساعدة',
            faq: [
                { q: 'متى تُدفع العمولات؟', a: 'تُدفع العمولات المعتمدة خلال أول 5 أيام عمل من الشهر التالي.' },
                { q: 'ما هو الحد الأدنى للسحب؟', a: 'الحد الأدنى للسحب هو 10 دولارات أمريكية.' },
                { q: 'كيف أتحقق من تسجيل العملاء المحتملين؟', a: 'انتقل إلى التقارير > العملاء لعرض جميع العملاء المحتملين.' },
                { q: 'هل يمكنني امتلاك عدة صفحات هبوط نشطة؟', a: 'نعم، يمكنك إنشاء عدة صفحات من الترويج > أدوات التسجيل.' },
            ],
        },
        promo: {
            sections: 'أقسام', languages: 'لغات', customize: 'تخصيص', createCustom: 'إنشاء صفحة هبوط مخصصة',
            more: 'المزيد', all: 'الكل', uploadPiece: 'ارفع صورتك', imageUploaded: 'تم تحميل الصورة',
            dragOrClick: 'اسحب أو انقر للتحميل', aspectRatio: 'نسبة العرض', export: 'تصدير',
        },
        settings: {
            menuTitle: 'قائمة الإعدادات', profile: 'الملف الشخصي', security: 'الأمان', preferences: 'التفضيلات',
            profileInfo: 'معلومات الملف الشخصي', profileInfoDesc: 'حدّث بياناتك العامة ومعلومات الاتصال.',
            fullName: 'الاسم الكامل', country: 'البلد / المنطقة', emailLabel: 'البريد الإلكتروني',
            emailSecurityNote: 'البريد الإلكتروني مرتبط بحسابك ولا يمكن تغييره لأسباب أمنية.',
            saving: 'جارٍ الحفظ...', saveProfile: 'حفظ الملف الشخصي', savedSuccess: 'تم حفظ التغييرات بنجاح',
            dangerZone: 'منطقة خطرة', dangerDesc: 'إجراءات لا رجعة فيها على حسابك.',
            deactivate: 'طلب تعطيل الحساب', verified: 'موثّق',
        },
        reports: {
            clientsTitle: 'العملاء المسجلون', clientsSubtitle: 'أدر قاعدة بياناتك وتتبع التحويلات.',
            filters: 'فلاتر', exportLeads: 'تصدير العملاء', leadsIdentified: 'العملاء المحددون',
            colClientInfo: 'معلومات العميل', colContact: 'الاتصال', colStatus: 'الحالة',
            colOrigin: 'قناة المصدر', colDate: 'التاريخ', syncing: 'مزامنة قاعدة البيانات...',
            noLeads: 'لم يتم اكتشاف عملاء', noLeadsDesc: 'سيظهر عملاؤك المستقبليون هنا بمجرد تفاعلهم مع موادك.',
            endOfRecords: 'نهاية السجلات الأخيرة', statusRegistered: 'مسجّل', statusFunded: 'ممول',
            accountsTitle: 'الحسابات التشغيلية', accountsSubtitle: 'راقب نشاط ووضع الإحالات المالي.',
            totalAccounts: 'إجمالي الحسابات', colHolder: 'صاحب الحساب', colContactDetails: 'تفاصيل الاتصال',
            colOperationalStatus: 'الحالة التشغيلية', colOpening: 'الافتتاح',
            fetchingFinancial: 'جارٍ جلب البيانات المالية...', noActiveAccounts: 'لا توجد حسابات نشطة',
            noActiveAccountsDesc: 'ستُدرج حسابات عملائك الممولة تلقائيًا هنا.',
            syncedWithMT: 'بيانات متزامنة مع MetaTrader', statusTrading: 'يتداول',
            statsTitle: 'تحليل الأداء', statsSubtitle: 'راقب نمو وفعالية حملاتك بالوقت الفعلي.',
            activeTraders: 'المتداولون النشطون', totalClicks: 'إجمالي النقرات', leadsCapt: 'العملاء المكتسبون',
            convRate: 'معدل التحويل', weeklyTrend: 'الاتجاه الأسبوعي',
            weeklyTrendDesc: 'توزيع المشاهدات والاكتساب خلال آخر 7 أيام.',
            week: 'أسبوع', month: 'شهر', proPerfTitle: 'أداء احترافي', monthlyGoal: 'الهدف الشهري',
            impact: 'التأثير', reach: 'النطاق', improveTitle: 'تريد تحسين أرقامك؟',
            improveDesc: 'ادخل أكاديمية الشركاء المميزة واكتشف استراتيجيات جديدة.',
            goToAcademy: 'الذهاب للأكاديمية',
            dayMon: 'اثن', dayTue: 'ثلا', dayWed: 'أرب', dayThu: 'خمي', dayFri: 'جمع', daySat: 'سبت', daySun: 'أحد',
        },
    },
    bn: {
        nav: {
            overview: 'ড্যাশবোর্ড',
            reports: 'প্রতিবেদন',
            clients: 'ক্লায়েন্ট',
            accounts: 'ক্লায়েন্ট অ্যাকাউন্ট',
            stats: 'কর্মক্ষমতা পরিসংখ্যান',
            promo: 'প্রচার',
            materialPost: 'মার্কেটিং উপকরণ',
            landingTools: 'নিবন্ধন সরঞ্জাম',
            referralLinks: 'রেফারেল লিংক',
            guidelines: 'বিজ্ঞাপন নির্দেশিকা',
            support: 'সহায়তা',
            settings: 'সেটিংস',
            admin: 'প্রশাসন',
            partnerManagement: 'পার্টনার ব্যবস্থাপনা',
            globalSettings: 'গ্লোবাল সেটিংস',
        },
        topbar: { adminView: 'অ্যাডমিন ভিউ', partnerView: '← পার্টনার ভিউ', search: 'খুঁজুন...' },
        overview: {
            title: 'নিয়ন্ত্রণ', subtitle: 'প্যানেল',
            myLeads: 'আমার লিড', networkLeads: 'নেটওয়ার্ক মোট লিড',
            trafficClicks: 'ট্র্যাফিক / ক্লিক', totalClicks: 'মোট ক্লিক',
            myLandings: 'আমার ল্যান্ডিং পেজ', partnerLandings: 'পার্টনার ল্যান্ডিং পেজ',
            realTime: 'রিয়েল টাইম',
            quickActions: 'দ্রুত কার্যক্রম',
            materialPost: 'মার্কেটিং উপকরণ', materialPostDesc: '8 ভাষায় ল্যান্ডিং ও লিংক',
            landingGen: 'ল্যান্ডিং জেনারেটর', landingGenDesc: '3 ধাপে কাস্টম ল্যান্ডিং তৈরি করুন',
            myClients: 'আমার ক্লায়েন্ট', myClientsDesc: 'আপনার ক্লায়েন্ট পোর্টফোলিও পরিচালনা করুন',
            reports: 'প্রতিবেদন', reportsDesc: 'ক্লিক, লিড এবং পরিসংখ্যান',
            thisWeek: 'এই সপ্তাহ',
            dailyLeads: 'দৈনিক লিড রেজিস্টার',
            consolidatedVolume: 'সমন্বিত ভলিউম',
            realTrafficNote: 'প্রকৃত ট্র্যাফিক পেলে প্রদর্শিত হবে',
            noHistory: 'এখনো কোনো ঐতিহাসিক ডেটা নেই',
            heatmapTitle: 'গ্লোবাল হিট ম্যাপ',
            heatmapSubtitle: 'আপনার ক্লায়েন্টদের ভৌগোলিক বিতরণ',
            topPartner: 'টপ পার্টনার',
            highDensity: 'অত্যন্ত উচ্চ ঘনত্ব (>800)',
            medDensity: 'উচ্চ ঘনত্ব (>500)',
            steadyGrowth: 'স্থির বৃদ্ধি',
            materialsReady: 'উপকরণ প্রস্তুত',
            materialsTitle: '7 ল্যান্ডিং · 8 ভাষা উপলব্ধ',
            materialsSubtitle: 'সেকেন্ডে আপনার ব্যক্তিগত লিংক শেয়ার করুন',
            viewMaterials: 'উপকরণ দেখুন',
            conversion: 'রূপান্তর',
            growth: 'বৃদ্ধি',
            adminPanel: 'অ্যাডমিন প্যানেল',
            welcomePartner: 'স্বাগতম, পার্টনার',
            realtimeData: 'আপনার কার্যক্রমের রিয়েল-টাইম ডেটা',
        },
        common: {
            loading: 'লোড হচ্ছে...', save: 'সেভ করুন', cancel: 'বাতিল', delete: 'মুছুন',
            edit: 'সম্পাদনা', close: 'বন্ধ করুন', preview: 'প্রিভিউ', generate: 'তৈরি করুন',
            download: 'ডাউনলোড', copy: 'কপি করুন', share: 'শেয়ার করুন', back: 'পিছনে',
            next: 'পরবর্তী', finish: 'সম্পন্ন', logout: 'লগ আউট',
            role: 'ভূমিকা', admin: 'প্রশাসক', partner: 'পার্টনার',
            search: 'খুঁজুন', noData: 'কোনো ডেটা নেই', error: 'ত্রুটি', success: 'সফলতা',
            comingSoon: 'শীঘ্রই আসছে',
        },
        landing: {
            title: 'ল্যান্ডিং পেজ', subtitle: 'জেনারেটর',
            step1: 'ডেটা', step2: 'টেমপ্লেট', step3: 'সেকশন',
            selectLanguage: 'ল্যান্ডিং ভাষা', selectCountry: 'লক্ষ্য দেশ',
            fullName: 'পূর্ণ নাম', whatsapp: 'WhatsApp', email: 'ইমেইল ঠিকানা',
            landingType: 'ল্যান্ডিং ধরন', generating: 'তৈরি হচ্ছে...',
            generatedTitle: 'ল্যান্ডিং তৈরি হয়েছে!', generatedSubtitle: 'আপনার পেজ শেয়ারের জন্য প্রস্তুত',
            landingLang: 'ল্যান্ডিং ভাষা', history: 'আমার সেভ করা', changeLangHint: 'ল্যান্ডিং ভাষা পরিবর্তন করুন',
        },
        links: {
            title: 'রেফারেল লিংক', subtitle: 'আপনার প্রচারাভিযান পরিচালনা করুন এবং রূপান্তর বাড়ান।',
            createBtn: 'নতুন লিংক তৈরি', searchPlaceholder: 'নাম বা প্রচারাভিযান খুঁজুন...',
            totalLinks: 'মোট লিংক', noLinks: 'কোনো লিংক নেই',
            noLinksDesc: 'লিড ট্র্যাক করতে আপনার প্রথম লিংক তৈরি করুন।', createLink: '+ লিংক তৈরি',
            newLinkTitle: 'নতুন ট্র্যাকিং লিংক', newLinkDesc: 'প্রচারাভিযানের সাফল্য মাপতে আপনার লিংক কাস্টমাইজ করুন।',
            linkName: 'লিংকের নাম', campaignName: 'প্রচারাভিযানের নাম (UTM)', urlPreview: 'URL প্রিভিউ',
            creating: 'তৈরি হচ্ছে...', generate: 'লিংক তৈরি', referralUrl: 'রেফারেল URL',
            copied: 'কপি হয়েছে!', clicks: 'ক্লিক', open: 'খুলুন', deleteConfirm: 'আপনি কি এই লিংকটি মুছতে চান?',
        },
        leads: {
            title: 'আপনার লিড', subtitle: 'আপনার ল্যান্ডিং পেজের মাধ্যমে নিবন্ধিত যোগাযোগ।',
            filters: 'ফিল্টার', exportCsv: 'CSV রপ্তানি',
            colName: 'নাম', colContact: 'যোগাযোগ', colOrigin: 'উৎস (ল্যান্ডিং)', colDate: 'নিবন্ধনের তারিখ',
            loading: 'লিড লোড হচ্ছে...', empty: 'এখনো কোনো লিড নেই। আপনার ল্যান্ডিং শেয়ার করুন।',
        },
        support: {
            badge: 'প্রিমিয়াম সহায়তা', title: 'আমরা কিভাবে', titleHighlight: 'সাহায্য করব', subtitle: 'আমাদের বিশেষজ্ঞ দল যেকোনো প্রশ্নের উত্তর দিতে প্রস্তুত।',
            whatsappTitle: 'WhatsApp সরাসরি', whatsappDesc: 'দ্রুত প্রশ্ন এবং তাৎক্ষণিক প্রযুক্তি সহায়তা।', whatsappAction: 'চ্যাট খুলুন',
            emailTitle: 'সহায়তা ইমেইল', emailDesc: 'বিস্তারিত পর্যালোচনা বা নথি জমা দিতে।', emailAction: 'ইমেইল পাঠান',
            scheduleTitle: 'কর্মসময়', scheduleDesc: 'সোম-শুক্র 9:00 - 18:00 EST / শনি 10:00 - 14:00 EST', scheduleAction: 'ক্যালেন্ডার দেখুন',
            faqTitle: 'সচরাচর জিজ্ঞাসা', faqSubtitle: 'সবচেয়ে সাধারণ প্রশ্নের তাৎক্ষণিক উত্তর।',
            faqNotFound: 'উত্তর পাচ্ছেন না?', faqNotFoundDesc: 'আমাদের সহায়তা কেন্দ্রে 100+ নিবন্ধ আছে।',
            faqHelpCenter: 'সহায়তা কেন্দ্র দেখুন',
            faq: [
                { q: 'কমিশন কখন প্রদান করা হয়?', a: 'অনুমোদিত কমিশন পরবর্তী মাসের প্রথম 5 কর্মদিবসে প্রদান করা হয়।' },
                { q: 'সর্বনিম্ন উত্তোলনের পরিমাণ কত?', a: 'সর্বনিম্ন উত্তোলনের পরিমাণ $10 USD।' },
                { q: 'আমার লিড নিবন্ধিত হয়েছে কিনা কিভাবে দেখব?', a: 'রিপোর্ট > ক্লায়েন্টে যান।' },
                { q: 'আমি কি একাধিক সক্রিয় ল্যান্ডিং পেজ রাখতে পারি?', a: 'হ্যাঁ, প্রোমো > রেজিস্ট্রেশন টুল থেকে একাধিক পেজ তৈরি করুন।' },
            ],
        },
        promo: {
            sections: 'বিভাগ', languages: 'ভাষা', customize: 'কাস্টমাইজ', createCustom: 'কাস্টম ল্যান্ডিং তৈরি',
            more: 'আরও', all: 'সব', uploadPiece: 'আপনার ছবি আপলোড করুন', imageUploaded: 'ছবি আপলোড হয়েছে',
            dragOrClick: 'টেনে আনুন বা ক্লিক করুন', aspectRatio: 'অনুপাত', export: 'রপ্তানি',
        },
        settings: {
            menuTitle: 'সেটিংস মেনু', profile: 'ব্যক্তিগত প্রোফাইল', security: 'নিরাপত্তা', preferences: 'পছন্দসমূহ',
            profileInfo: 'প্রোফাইল তথ্য', profileInfoDesc: 'আপনার প্রকাশ্য ও যোগাযোগ তথ্য আপডেট করুন।',
            fullName: 'পূর্ণ নাম', country: 'দেশ / অঞ্চল', emailLabel: 'ইমেইল ঠিকানা',
            emailSecurityNote: 'ইমেইল আপনার অ্যাকাউন্টের সাথে যুক্ত এবং নিরাপত্তার জন্য পরিবর্তন করা যাবে না।',
            saving: 'সংরক্ষণ হচ্ছে...', saveProfile: 'প্রোফাইল সংরক্ষণ', savedSuccess: 'পরিবর্তন সফলভাবে সংরক্ষিত',
            dangerZone: 'বিপদ এলাকা', dangerDesc: 'আপনার অ্যাকাউন্টে অপরিবর্তনীয় কাজ।',
            deactivate: 'অ্যাকাউন্ট নিষ্ক্রিয়করণের অনুরোধ', verified: 'যাচাইকৃত',
        },
        reports: {
            clientsTitle: 'নিবন্ধিত ক্লায়েন্ট', clientsSubtitle: 'আপনার লিড ডেটাবেস পরিচালনা করুন এবং রূপান্তর ট্র্যাক করুন।',
            filters: 'ফিল্টার', exportLeads: 'লিড রপ্তানি', leadsIdentified: 'চিহ্নিত লিড',
            colClientInfo: 'ক্লায়েন্ট তথ্য', colContact: 'যোগাযোগ', colStatus: 'স্থিতি',
            colOrigin: 'উৎস চ্যানেল', colDate: 'তারিখ', syncing: 'ডেটাবেস সিঙ্ক হচ্ছে...',
            noLeads: 'কোনো লিড পাওয়া যায়নি', noLeadsDesc: 'আপনার ভবিষ্যত ক্লায়েন্ট আপনার উপকরণের সাথে ইন্টারেক্ট করলে এখানে দেখা যাবে।',
            endOfRecords: 'সাম্প্রতিক রেকর্ডের শেষ', statusRegistered: 'নিবন্ধিত', statusFunded: 'ফান্ডেড',
            accountsTitle: 'অপারেশনাল অ্যাকাউন্ট', accountsSubtitle: 'আপনার রেফারেলের কার্যকলাপ এবং আর্থিক অবস্থা পর্যবেক্ষণ করুন।',
            totalAccounts: 'মোট অ্যাকাউন্ট', colHolder: 'অ্যাকাউন্ট ধারক', colContactDetails: 'যোগাযোগ বিবরণ',
            colOperationalStatus: 'অপারেশনাল স্থিতি', colOpening: 'খোলা',
            fetchingFinancial: 'আর্থিক ডেটা আনা হচ্ছে...', noActiveAccounts: 'কোনো সক্রিয় অ্যাকাউন্ট নেই',
            noActiveAccountsDesc: 'আপনার ক্লায়েন্টদের ফান্ডেড অ্যাকাউন্ট স্বয়ংক্রিয়ভাবে এখানে তালিকাভুক্ত হবে।',
            syncedWithMT: 'MetaTrader এর সাথে সিঙ্ক করা', statusTrading: 'ট্রেডিং',
            statsTitle: 'কর্মক্ষমতা বিশ্লেষণ', statsSubtitle: 'আপনার ক্যাম্পেইনের বৃদ্ধি ও কার্যকারিতা রিয়েল-টাইমে পর্যবেক্ষণ।',
            activeTraders: 'সক্রিয় ট্রেডার', totalClicks: 'মোট ক্লিক', leadsCapt: 'ক্যাপচার করা লিড',
            convRate: 'রূপান্তর হার', weeklyTrend: 'সাপ্তাহিক প্রবণতা',
            weeklyTrendDesc: 'গত ৭ দিনে ইমপ্রেশন এবং ক্যাপচারের বিতরণ।',
            week: 'সপ্তাহ', month: 'মাস', proPerfTitle: 'প্রো পারফরম্যান্স', monthlyGoal: 'মাসিক লক্ষ্য',
            impact: 'প্রভাব', reach: 'নাগাল', improveTitle: 'আপনার সংখ্যা উন্নত করতে চান?',
            improveDesc: 'আমাদের প্রিমিয়াম পার্টনার একাডেমিতে প্রবেশ করুন এবং নতুন কৌশল আবিষ্কার করুন।',
            goToAcademy: 'একাডেমিতে যান',
            dayMon: 'সোম', dayTue: 'মঙ্গ', dayWed: 'বুধ', dayThu: 'বৃহ', dayFri: 'শুক্র', daySat: 'শনি', daySun: 'রবি',
        },
    },
    pt: {
        nav: {
            overview: 'Painel de Controle',
            reports: 'Relatórios',
            clients: 'Clientes',
            accounts: 'Contas de clientes',
            stats: 'Estatísticas de desempenho',
            promo: 'Promo',
            materialPost: 'Material de Marketing',
            landingTools: 'Ferramentas de registro',
            referralLinks: 'Links de indicação',
            guidelines: 'Diretrizes de publicidade',
            support: 'Suporte',
            settings: 'Configurações',
            admin: 'Administração',
            partnerManagement: 'Gestão de Parceiros',
            globalSettings: 'Configurações Globais',
        },
        topbar: { adminView: 'Visão Admin', partnerView: '← Visão Parceiro', search: 'Pesquisar...' },
        overview: {
            title: 'Painel', subtitle: 'de Controle',
            myLeads: 'Meus Leads', networkLeads: 'Leads Totais da Rede',
            trafficClicks: 'Tráfego / Cliques', totalClicks: 'Cliques Totais',
            myLandings: 'Minhas Landing Pages', partnerLandings: 'Landings dos Parceiros',
            realTime: 'Tempo real',
            quickActions: 'Ações Rápidas',
            materialPost: 'Material de Marketing', materialPostDesc: 'Landings e links em 8 idiomas',
            landingGen: 'Gerador de Landing', landingGenDesc: 'Crie sua landing em 3 passos',
            myClients: 'Meus Clientes', myClientsDesc: 'Gerencie sua carteira de clientes',
            reports: 'Relatórios', reportsDesc: 'Cliques, leads e estatísticas',
            thisWeek: 'Esta semana',
            dailyLeads: 'Registro Diário de Leads',
            consolidatedVolume: 'Volume Consolidado',
            realTrafficNote: 'Será preenchido quando receber tráfego real',
            noHistory: 'Sem dados históricos ainda',
            heatmapTitle: 'Mapa de Calor Global',
            heatmapSubtitle: 'Distribuição geográfica dos seus clientes',
            topPartner: 'Top Parceiro',
            highDensity: 'Density Muito Alta (>800)',
            medDensity: 'Alta Density (>500)',
            steadyGrowth: 'Crescimento Constante',
            materialsReady: 'Materiais prontos',
            materialsTitle: '7 landings · 8 idiomas disponíveis',
            materialsSubtitle: 'Compartilhe seu link personalizado em segundos',
            viewMaterials: 'Ver Materiais',
            conversion: 'Conv.',
            growth: 'Cresc.',
            adminPanel: 'Painel Administrador',
            welcomePartner: 'Bem-vindo, Parceiro',
            realtimeData: 'Dados em tempo real da sua atividade',
        },
        common: {
            loading: 'Carregando...', save: 'Salvar', cancel: 'Cancelar', delete: 'Excluir',
            edit: 'Editar', close: 'Fechar', preview: 'Visualizar', generate: 'Gerar',
            download: 'Baixar', copy: 'Copiar', share: 'Compartilhar', back: 'Voltar',
            next: 'Próximo', finish: 'Concluir', logout: 'Sair',
            role: 'Função', admin: 'Administrador', partner: 'Parceiro',
            search: 'Pesquisar', noData: 'Sem dados', error: 'Erro', success: 'Sucesso',
            comingSoon: 'Em breve',
        },
        landing: {
            title: 'Gerador de', subtitle: 'Landing Pages',
            step1: 'Dados', step2: 'Template', step3: 'Seções',
            selectLanguage: 'Idioma da landing', selectCountry: 'País alvo',
            fullName: 'Nome completo', whatsapp: 'WhatsApp', email: 'Endereço de e-mail',
            landingType: 'Tipo de landing', generating: 'Gerando...',
            generatedTitle: 'Landing gerada!', generatedSubtitle: 'Sua página está pronta para compartilhar',
            landingLang: 'Idioma da landing', history: 'Minhas salvas', changeLangHint: 'Alterar idioma da landing',
        },
        links: {
            title: 'Links de Indicação', subtitle: 'Gerencie suas campanhas e maximize conversões.',
            createBtn: 'Criar Novo Link', searchPlaceholder: 'Buscar por nome ou campanha...',
            totalLinks: 'Links Totais', noLinks: 'Nenhum link',
            noLinksDesc: 'Comece criando seu primeiro link para rastrear leads.', createLink: '+ Criar Link',
            newLinkTitle: 'Novo Link de Rastreamento', newLinkDesc: 'Personalize seu link para medir o sucesso das campanhas.',
            linkName: 'Nome do Link', campaignName: 'Nome da Campanha (UTM)', urlPreview: 'Prévia da URL',
            creating: 'Criando...', generate: 'Gerar Link', referralUrl: 'URL de Indicação',
            copied: 'Copiado!', clicks: 'Cliques', open: 'Abrir', deleteConfirm: 'Tem certeza que deseja excluir este link?',
        },
        leads: {
            title: 'Seus Leads', subtitle: 'Contatos registrados através das suas landing pages.',
            filters: 'Filtros', exportCsv: 'Exportar CSV',
            colName: 'Nome', colContact: 'Contato', colOrigin: 'Origem (Landing)', colDate: 'Data de Registro',
            loading: 'Carregando leads...', empty: 'Nenhum lead registrado ainda. Comece a compartilhar suas landings.',
        },
        support: {
            badge: 'Suporte Premium', title: 'Como podemos', titleHighlight: 'ajudá-lo', subtitle: 'Nossa equipe especializada está disponível para resolver qualquer dúvida.',
            whatsappTitle: 'WhatsApp Direto', whatsappDesc: 'Consultas rápidas e suporte técnico imediato.', whatsappAction: 'Abrir Chat',
            emailTitle: 'Email de Suporte', emailDesc: 'Para análises detalhadas ou envio de documentos.', emailAction: 'Enviar Email',
            scheduleTitle: 'Horário Comercial', scheduleDesc: 'Seg-Sex 9:00 - 18:00 EST / Sáb 10:00 - 14:00 EST', scheduleAction: 'Ver Calendário',
            faqTitle: 'Perguntas Frequentes', faqSubtitle: 'Encontre respostas imediatas para as dúvidas mais comuns.',
            faqNotFound: 'Não encontrou sua resposta?', faqNotFoundDesc: 'Nosso centro de ajuda tem mais de 100 artigos.',
            faqHelpCenter: 'Visitar Centro de Ajuda',
            faq: [
                { q: 'Quando as comissões são pagas?', a: 'As comissões aprovadas são pagas nos primeiros 5 dias úteis do mês seguinte.' },
                { q: 'Qual é o valor mínimo de saque?', a: 'O valor mínimo é de $10 USD.' },
                { q: 'Como ver se meus leads se registraram?', a: 'Vá em Relatórios > Clientes para ver todos os leads.' },
                { q: 'Posso ter várias landing pages ativas?', a: 'Sim, crie múltiplas páginas em Promo > Ferramentas de Registro.' },
            ],
        },
        promo: {
            sections: 'Seções', languages: 'Idiomas', customize: 'Personalizar', createCustom: 'Criar Landing Personalizada',
            more: 'mais', all: 'Todas', uploadPiece: 'Envie sua peça', imageUploaded: 'Imagem carregada',
            dragOrClick: 'Arraste ou clique para enviar', aspectRatio: 'Proporção', export: 'Exportar',
        },
        settings: {
            menuTitle: 'Menu de Configurações', profile: 'Perfil Pessoal', security: 'Segurança', preferences: 'Preferências',
            profileInfo: 'Informações do Perfil', profileInfoDesc: 'Atualize seus dados públicos e de contato.',
            fullName: 'Nome Completo', country: 'País / Região', emailLabel: 'Endereço de Email',
            emailSecurityNote: 'O email está vinculado à sua conta e não pode ser alterado por segurança.',
            saving: 'Salvando...', saveProfile: 'Salvar Perfil', savedSuccess: 'Alterações salvas com sucesso',
            dangerZone: 'Zona de Perigo', dangerDesc: 'Ações irreversíveis na sua conta.',
            deactivate: 'Solicitar desativação da conta', verified: 'Verificado',
        },
        reports: {
            clientsTitle: 'Clientes Registrados', clientsSubtitle: 'Gerencie sua base de leads e acompanhe conversões.',
            filters: 'Filtros', exportLeads: 'Exportar Leads', leadsIdentified: 'Leads Identificados',
            colClientInfo: 'Informação do Cliente', colContact: 'Contato', colStatus: 'Status',
            colOrigin: 'Canal de Origem', colDate: 'Data', syncing: 'Sincronizando banco de dados...',
            noLeads: 'Nenhum lead detectado', noLeadsDesc: 'Seus futuros clientes aparecerão aqui quando interagirem com seus materiais.',
            endOfRecords: 'Fim dos registros recentes', statusRegistered: 'Registrado', statusFunded: 'Financiado',
            accountsTitle: 'Contas Operacionais', accountsSubtitle: 'Monitore a atividade e o status financeiro dos seus indicados.',
            totalAccounts: 'Total Contas', colHolder: 'Titular da Conta', colContactDetails: 'Detalhes de Contato',
            colOperationalStatus: 'Status Operacional', colOpening: 'Abertura',
            fetchingFinancial: 'Buscando dados financeiros...', noActiveAccounts: 'Sem contas ativas',
            noActiveAccountsDesc: 'Contas financiadas dos seus clientes serão listadas automaticamente aqui.',
            syncedWithMT: 'Dados sincronizados com MetaTrader', statusTrading: 'Operando',
            statsTitle: 'Análise de Desempenho', statsSubtitle: 'Monitore o crescimento e a eficácia das suas campanhas em tempo real.',
            activeTraders: 'Traders Ativos', totalClicks: 'Cliques Totais', leadsCapt: 'Leads Captados',
            convRate: 'Taxa Conv.', weeklyTrend: 'Tendência Semanal',
            weeklyTrendDesc: 'Distribuição de impressões e captações nos últimos 7 dias.',
            week: 'Semana', month: 'Mês', proPerfTitle: 'Desempenho Pro', monthlyGoal: 'Meta Mensal',
            impact: 'Impacto', reach: 'Alcance', improveTitle: 'Quer melhorar seus números?',
            improveDesc: 'Acesse nossa academia premium para parceiros e descubra novas estratégias.',
            goToAcademy: 'Ir para Academia',
            dayMon: 'Seg', dayTue: 'Ter', dayWed: 'Qua', dayThu: 'Qui', dayFri: 'Sex', daySat: 'Sáb', daySun: 'Dom',
        },
    },
    ru: {
        nav: {
            overview: 'Панель управления',
            reports: 'Отчёты',
            clients: 'Клиенты',
            accounts: 'Счета клиентов',
            stats: 'Статистика эффективности',
            promo: 'Промо',
            materialPost: 'Маркетинговые материалы',
            landingTools: 'Инструменты регистрации',
            referralLinks: 'Реферальные ссылки',
            guidelines: 'Рекламные рекомендации',
            support: 'Поддержка',
            settings: 'Настройки',
            admin: 'Администрация',
            partnerManagement: 'Управление партнёрами',
            globalSettings: 'Глобальные настройки',
        },
        topbar: { adminView: 'Вид администратора', partnerView: '← Вид партнёра', search: 'Поиск...' },
        overview: {
            title: 'Панель', subtitle: 'управления',
            myLeads: 'Мои лиды', networkLeads: 'Всего лидов сети',
            trafficClicks: 'Трафик / Клики', totalClicks: 'Всего кликов',
            myLandings: 'Мои лендинги', partnerLandings: 'Лендинги партнёров',
            realTime: 'В реальном времени',
            quickActions: 'Быстрые действия',
            materialPost: 'Маркетинговые материалы', materialPostDesc: 'Страницы и ссылки на 8 языках',
            landingGen: 'Генератор лендингов', landingGenDesc: 'Создайте лендинг за 3 шага',
            myClients: 'Мои клиенты', myClientsDesc: 'Управляйте портфелем клиентов',
            reports: 'Отчёты', reportsDesc: 'Клики, лиды и статистика',
            thisWeek: 'Эта неделя',
            dailyLeads: 'Ежедневный журнал лидов',
            consolidatedVolume: 'Консолидированный объём',
            realTrafficNote: 'Появится при получении реального трафика',
            noHistory: 'Нет исторических данных',
            heatmapTitle: 'Глобальная тепловая карта',
            heatmapSubtitle: 'Географическое распределение ваших клиентов',
            topPartner: 'Лучший партнёр',
            highDensity: 'Очень высокая плотность (>800)',
            medDensity: 'Высокая плотность (>500)',
            steadyGrowth: 'Стабильный рост',
            materialsReady: 'Материалы готовы',
            materialsTitle: '7 лендингов · 8 языков доступно',
            materialsSubtitle: 'Поделитесь персональной ссылкой за секунды',
            viewMaterials: 'Просмотр материалов',
            conversion: 'Конв.',
            growth: 'Рост',
            adminPanel: 'Панель администратора',
            welcomePartner: 'Добро пожаловать, партнёр',
            realtimeData: 'Данные вашей активности в реальном времени',
        },
        common: {
            loading: 'Загрузка...', save: 'Сохранить', cancel: 'Отмена', delete: 'Удалить',
            edit: 'Редактировать', close: 'Закрыть', preview: 'Просмотр', generate: 'Создать',
            download: 'Скачать', copy: 'Копировать', share: 'Поделиться', back: 'Назад',
            next: 'Далее', finish: 'Завершить', logout: 'Выйти',
            role: 'Роль', admin: 'Администратор', partner: 'Партнёр',
            search: 'Поиск', noData: 'Нет данных', error: 'Ошибка', success: 'Успешно',
            comingSoon: 'Скоро',
        },
        landing: {
            title: 'Генератор', subtitle: 'лендингов',
            step1: 'Данные', step2: 'Шаблон', step3: 'Разделы',
            selectLanguage: 'Язык лендинга', selectCountry: 'Целевая страна',
            fullName: 'Полное имя', whatsapp: 'WhatsApp', email: 'Электронная почта',
            landingType: 'Тип лендинга', generating: 'Генерация...',
            generatedTitle: 'Лендинг создан!', generatedSubtitle: 'Ваша страница готова к публикации',
            landingLang: 'Язык лендинга', history: 'Мои сохранённые', changeLangHint: 'Изменить язык лендинга',
        },
        links: {
            title: 'Реферальные ссылки', subtitle: 'Управляйте кампаниями и повышайте конверсию.',
            createBtn: 'Создать новую ссылку', searchPlaceholder: 'Поиск по имени или кампании...',
            totalLinks: 'Всего ссылок', noLinks: 'Ссылок нет',
            noLinksDesc: 'Создайте первую ссылку для отслеживания лидов.', createLink: '+ Создать ссылку',
            newLinkTitle: 'Новая ссылка отслеживания', newLinkDesc: 'Настройте ссылку для измерения успеха кампаний.',
            linkName: 'Название ссылки', campaignName: 'Название кампании (UTM)', urlPreview: 'Предварительный просмотр URL',
            creating: 'Создание...', generate: 'Создать ссылку', referralUrl: 'Реферальная URL',
            copied: 'Скопировано!', clicks: 'Клики', open: 'Открыть', deleteConfirm: 'Вы уверены, что хотите удалить эту ссылку?',
        },
        leads: {
            title: 'Ваши лиды', subtitle: 'Контакты, зарегистрированные через ваши лендинги.',
            filters: 'Фильтры', exportCsv: 'Экспорт CSV',
            colName: 'Имя', colContact: 'Контакт', colOrigin: 'Источник (Лендинг)', colDate: 'Дата регистрации',
            loading: 'Загрузка лидов...', empty: 'Лидов пока нет. Начните делиться лендингами.',
        },
        support: {
            badge: 'Премиум поддержка', title: 'Как мы можем', titleHighlight: 'помочь вам', subtitle: 'Наша специализированная команда готова ответить на любой вопрос.',
            whatsappTitle: 'WhatsApp напрямую', whatsappDesc: 'Быстрые вопросы и мгновенная техподдержка.', whatsappAction: 'Открыть чат',
            emailTitle: 'Email поддержки', emailDesc: 'Для детального анализа или отправки документов.', emailAction: 'Отправить Email',
            scheduleTitle: 'Часы работы', scheduleDesc: 'Пн-Пт 9:00 - 18:00 EST / Сб 10:00 - 14:00 EST', scheduleAction: 'Календарь',
            faqTitle: 'Часто задаваемые вопросы', faqSubtitle: 'Мгновенные ответы на самые частые вопросы.',
            faqNotFound: 'Не нашли ответ?', faqNotFoundDesc: 'Наш центр помощи содержит более 100 статей.',
            faqHelpCenter: 'Перейти в центр помощи',
            faq: [
                { q: 'Когда выплачиваются комиссии?', a: 'Утверждённые комиссии выплачиваются в первые 5 рабочих дней следующего месяца.' },
                { q: 'Какая минимальная сумма вывода?', a: 'Минимальная сумма вывода — $10 USD.' },
                { q: 'Как проверить, зарегистрировались ли мои лиды?', a: 'Перейдите в Отчёты > Клиенты.' },
                { q: 'Могу ли я иметь несколько активных лендингов?', a: 'Да, создайте несколько лендингов в Промо > Инструменты регистрации.' },
            ],
        },
        promo: {
            sections: 'Разделы', languages: 'Языки', customize: 'Настроить', createCustom: 'Создать свой лендинг',
            more: 'ещё', all: 'Все', uploadPiece: 'Загрузите изображение', imageUploaded: 'Изображение загружено',
            dragOrClick: 'Перетащите или нажмите для загрузки', aspectRatio: 'Соотношение сторон', export: 'Экспорт',
        },
        settings: {
            menuTitle: 'Меню настроек', profile: 'Личный профиль', security: 'Безопасность', preferences: 'Настройки',
            profileInfo: 'Информация профиля', profileInfoDesc: 'Обновите публичные и контактные данные.',
            fullName: 'Полное имя', country: 'Страна / Регион', emailLabel: 'Электронная почта',
            emailSecurityNote: 'Email привязан к аккаунту и не может быть изменён в целях безопасности.',
            saving: 'Сохранение...', saveProfile: 'Сохранить профиль', savedSuccess: 'Изменения сохранены',
            dangerZone: 'Опасная зона', dangerDesc: 'Необратимые действия с аккаунтом.',
            deactivate: 'Запросить деактивацию аккаунта', verified: 'Подтверждён',
        },
        reports: {
            clientsTitle: 'Зарегистрированные клиенты', clientsSubtitle: 'Управляйте базой лидов и отслеживайте конверсии.',
            filters: 'Фильтры', exportLeads: 'Экспорт лидов', leadsIdentified: 'Выявленные лиды',
            colClientInfo: 'Информация о клиенте', colContact: 'Контакт', colStatus: 'Статус',
            colOrigin: 'Канал источника', colDate: 'Дата', syncing: 'Синхронизация базы данных...',
            noLeads: 'Лиды не обнаружены', noLeadsDesc: 'Ваши будущие клиенты появятся здесь после взаимодействия с вашими материалами.',
            endOfRecords: 'Конец последних записей', statusRegistered: 'Зарегистрирован', statusFunded: 'Пополнен',
            accountsTitle: 'Операционные счета', accountsSubtitle: 'Отслеживайте активность и финансовый статус ваших рефералов.',
            totalAccounts: 'Всего счетов', colHolder: 'Владелец счёта', colContactDetails: 'Контактные данные',
            colOperationalStatus: 'Операционный статус', colOpening: 'Открытие',
            fetchingFinancial: 'Получение финансовых данных...', noActiveAccounts: 'Нет активных счетов',
            noActiveAccountsDesc: 'Пополненные счета ваших клиентов будут автоматически перечислены здесь.',
            syncedWithMT: 'Данные синхронизированы с MetaTrader', statusTrading: 'Торгует',
            statsTitle: 'Анализ эффективности', statsSubtitle: 'Отслеживайте рост и эффективность ваших кампаний в реальном времени.',
            activeTraders: 'Активные трейдеры', totalClicks: 'Всего кликов', leadsCapt: 'Захваченные лиды',
            convRate: 'Конверсия', weeklyTrend: 'Недельный тренд',
            weeklyTrendDesc: 'Распределение показов и захватов за последние 7 дней.',
            week: 'Неделя', month: 'Месяц', proPerfTitle: 'Про эффективность', monthlyGoal: 'Месячная цель',
            impact: 'Влияние', reach: 'Охват', improveTitle: 'Хотите улучшить свои показатели?',
            improveDesc: 'Получите доступ к премиум-академии для партнёров и откройте новые стратегии.',
            goToAcademy: 'В Академию',
            dayMon: 'Пн', dayTue: 'Вт', dayWed: 'Ср', dayThu: 'Чт', dayFri: 'Пт', daySat: 'Сб', daySun: 'Вс',
        },
    },
    ja: {
        nav: {
            overview: 'ダッシュボード',
            reports: 'レポート',
            clients: 'クライアント',
            accounts: 'クライアントアカウント',
            stats: 'パフォーマンス統計',
            promo: 'プロモ',
            materialPost: 'マーケティング素材',
            landingTools: '登録ツール',
            referralLinks: '紹介リンク',
            guidelines: '広告ガイドライン',
            support: 'サポート',
            settings: '設定',
            admin: '管理',
            partnerManagement: 'パートナー管理',
            globalSettings: 'グローバル設定',
        },
        topbar: { adminView: '管理者ビュー', partnerView: '← パートナービュー', search: '検索...' },
        overview: {
            title: 'コントロール', subtitle: 'パネル',
            myLeads: '自分のリード', networkLeads: 'ネットワーク総リード',
            trafficClicks: 'トラフィック / クリック', totalClicks: '総クリック数',
            myLandings: 'ランディングページ', partnerLandings: 'パートナーページ',
            realTime: 'リアルタイム',
            quickActions: 'クイックアクション',
            materialPost: 'マーケティング素材', materialPostDesc: '8言語のページとリンク',
            landingGen: 'ランディングジェネレーター', landingGenDesc: '3ステップでカスタムページ作成',
            myClients: 'マイクライアント', myClientsDesc: 'クライアントポートフォリオ管理',
            reports: 'レポート', reportsDesc: 'クリック、リード、統計',
            thisWeek: '今週',
            dailyLeads: '日次リード登録',
            consolidatedVolume: '統合ボリューム',
            realTrafficNote: '実際のトラフィックを受信したときに表示',
            noHistory: '履歴データがまだありません',
            heatmapTitle: 'グローバルヒートマップ',
            heatmapSubtitle: 'クライアントの地理的分布',
            topPartner: 'トップパートナー',
            highDensity: '非常に高い密度 (>800)',
            medDensity: '高密度 (>500)',
            steadyGrowth: '安定した成長',
            materialsReady: '素材の準備完了',
            materialsTitle: '7ページ · 8言語対応',
            materialsSubtitle: '数秒でパーソナルリンクを共有',
            viewMaterials: '素材を見る',
            conversion: 'コンバ.',
            growth: '成長',
            adminPanel: '管理者パネル',
            welcomePartner: 'ようこそ、パートナー',
            realtimeData: 'アクティビティのリアルタイムデータ',
        },
        common: {
            loading: '読み込み中...', save: '保存', cancel: 'キャンセル', delete: '削除',
            edit: '編集', close: '閉じる', preview: 'プレビュー', generate: '生成',
            download: 'ダウンロード', copy: 'コピー', share: '共有', back: '戻る',
            next: '次へ', finish: '完了', logout: 'ログアウト',
            role: '役割', admin: '管理者', partner: 'パートナー',
            search: '検索', noData: 'データなし', error: 'エラー', success: '成功',
            comingSoon: '近日公開',
        },
        landing: {
            title: 'ランディングページ', subtitle: 'ジェネレーター',
            step1: 'データ', step2: 'テンプレート', step3: 'セクション',
            selectLanguage: 'ランディング言語', selectCountry: '対象国',
            fullName: '氏名', whatsapp: 'WhatsApp', email: 'メールアドレス',
            landingType: 'ランディングタイプ', generating: '生成中...',
            generatedTitle: 'ランディング生成完了！', generatedSubtitle: 'ページの共有準備ができました',
            landingLang: 'ランディング言語', history: '保存済み', changeLangHint: 'ランディング言語を変更',
        },
        links: {
            title: 'リファラルリンク', subtitle: 'キャンペーンを管理し、コンバージョンを最大化。',
            createBtn: '新規リンク作成', searchPlaceholder: '名前やキャンペーンで検索...',
            totalLinks: '合計リンク', noLinks: 'リンクなし',
            noLinksDesc: 'リードを追跡する最初のリンクを作成しましょう。', createLink: '+ リンク作成',
            newLinkTitle: '新規トラッキングリンク', newLinkDesc: 'キャンペーンの成功を測るリンクをカスタマイズ。',
            linkName: 'リンク名', campaignName: 'キャンペーン名 (UTM)', urlPreview: 'URLプレビュー',
            creating: '作成中...', generate: 'リンク生成', referralUrl: 'リファラルURL',
            copied: 'コピー済み！', clicks: 'クリック', open: '開く', deleteConfirm: 'このリンクを削除しますか？',
        },
        leads: {
            title: 'リード一覧', subtitle: 'ランディングページから登録された連絡先。',
            filters: 'フィルター', exportCsv: 'CSVエクスポート',
            colName: '名前', colContact: '連絡先', colOrigin: '出典（ランディング）', colDate: '登録日',
            loading: 'リード読み込み中...', empty: 'まだリードがありません。ランディングの共有を始めましょう。',
        },
        support: {
            badge: 'プレミアムサポート', title: 'どのように', titleHighlight: 'お手伝い', subtitle: '専門パートナーチームがご質問にお答えします。',
            whatsappTitle: 'WhatsApp ダイレクト', whatsappDesc: '迅速な質問と即時テクニカルサポート。', whatsappAction: 'チャットを開く',
            emailTitle: 'サポートメール', emailDesc: '詳細な確認や書類提出に。', emailAction: 'メール送信',
            scheduleTitle: '営業時間', scheduleDesc: '月〜金 9:00 - 18:00 EST / 土 10:00 - 14:00 EST', scheduleAction: 'カレンダー表示',
            faqTitle: 'よくある質問', faqSubtitle: 'よくある質問への即時回答。',
            faqNotFound: '答えが見つかりませんか？', faqNotFoundDesc: 'ヘルプセンターには100以上の記事があります。',
            faqHelpCenter: 'ヘルプセンターへ',
            faq: [
                { q: 'コミッションはいつ支払われますか？', a: '承認されたコミッションは翌月の最初の5営業日以内に支払われます。' },
                { q: '最低出金額は？', a: '最低出金額は$10 USDです。' },
                { q: 'リードが登録したか確認するには？', a: 'レポート > クライアントで確認できます。' },
                { q: '複数のランディングページを持てますか？', a: 'はい、プロモ > 登録ツールから複数ページを作成できます。' },
            ],
        },
        promo: {
            sections: 'セクション', languages: '言語', customize: 'カスタマイズ', createCustom: 'カスタムランディング作成',
            more: '件', all: 'すべて', uploadPiece: '素材をアップロード', imageUploaded: '画像アップロード済み',
            dragOrClick: 'ドラッグまたはクリックでアップロード', aspectRatio: 'アスペクト比', export: 'エクスポート',
        },
        settings: {
            menuTitle: '設定メニュー', profile: '個人プロフィール', security: 'セキュリティ', preferences: '環境設定',
            profileInfo: 'プロフィール情報', profileInfoDesc: '公開情報と連絡先を更新。',
            fullName: '氏名', country: '国 / 地域', emailLabel: 'メールアドレス',
            emailSecurityNote: 'メールはアカウントに紐付けられており、セキュリティ上変更できません。',
            saving: '保存中...', saveProfile: 'プロフィール保存', savedSuccess: '変更が保存されました',
            dangerZone: '危険ゾーン', dangerDesc: 'アカウントに対する不可逆的な操作。',
            deactivate: 'アカウント無効化を申請', verified: '認証済み',
        },
        reports: {
            clientsTitle: '登録クライアント', clientsSubtitle: 'リードデータベースを管理し、コンバージョンを追跡。',
            filters: 'フィルター', exportLeads: 'リード書出し', leadsIdentified: '特定されたリード',
            colClientInfo: 'クライアント情報', colContact: '連絡先', colStatus: 'ステータス',
            colOrigin: 'ソースチャネル', colDate: '日付', syncing: 'データベース同期中...',
            noLeads: 'リードが見つかりません', noLeadsDesc: '将来のクライアントは、素材と交流した後にここに表示されます。',
            endOfRecords: '最近の記録の終わり', statusRegistered: '登録済み', statusFunded: '入金済み',
            accountsTitle: '運用口座', accountsSubtitle: '紹介者の活動と財務状況を監視。',
            totalAccounts: '口座合計', colHolder: '口座名義人', colContactDetails: '連絡先詳細',
            colOperationalStatus: '運用ステータス', colOpening: '開設',
            fetchingFinancial: '財務データ取得中...', noActiveAccounts: 'アクティブな口座なし',
            noActiveAccountsDesc: 'クライアントの入金口座は自動的にここに表示されます。',
            syncedWithMT: 'MetaTraderとデータ同期済み', statusTrading: '取引中',
            statsTitle: 'パフォーマンス分析', statsSubtitle: 'キャンペーンの成長と効果をリアルタイムで監視。',
            activeTraders: 'アクティブトレーダー', totalClicks: '総クリック数', leadsCapt: '獲得リード',
            convRate: '転換率', weeklyTrend: '週間トレンド',
            weeklyTrendDesc: '過去7日間のインプレッションとキャプチャの分布。',
            week: '週', month: '月', proPerfTitle: 'プロパフォーマンス', monthlyGoal: '月間目標',
            impact: 'インパクト', reach: 'リーチ', improveTitle: '数字を改善したいですか？',
            improveDesc: 'プレミアムパートナーアカデミーにアクセスし、新しい戦略を発見。',
            goToAcademy: 'アカデミーへ',
            dayMon: '月', dayTue: '火', dayWed: '水', dayThu: '木', dayFri: '金', daySat: '土', daySun: '日',
        },
    },
};

export const DASHBOARD_TRANSLATIONS = T;

export function getT(lang: LangCode): TranslationKeys {
    return T[lang] || T['es'];
}
