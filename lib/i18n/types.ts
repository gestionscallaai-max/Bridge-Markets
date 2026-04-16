export type LangCode = 'es' | 'en' | 'zh' | 'hi' | 'fr' | 'ar' | 'bn' | 'pt' | 'ru' | 'ja';

export type TranslationKeys = {
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
    // Promo Materials
    promo: {
        sections: string;
        languages: string;
        documentsTab: string;
        all: string;
        createCustom: string;
        customize: string;
        more: string;
        uploadPiece: string;
        imageUploaded: string;
        dragOrClick: string;
        aspectRatio: string;
        export: string;
        docSearch: string;
        docType: string;
        docLanguage: string;
        catManuales: string;
        catPayRetailers: string;
        catGlosarios: string;
        catPresentaciones: string;
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
