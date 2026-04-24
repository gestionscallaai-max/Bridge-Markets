import { BrandConfig } from '../types';
// Force recompile: Unified Synthetic Universe v2.0

import { renderPropHero, renderPropEducation, renderPropProgramsForex, renderPropProgramsSynthetic, renderPropSteps, renderPropRules, renderPropBenefits, renderPropCommunity, renderPropFAQ, renderPropFinalCTA, renderPropFooter, renderPropRegistration } from './propFirm';
import { renderMamCopyHero, renderMamCopyNav, renderMamCopyIntro, renderMamBlock, renderCopyBlock, renderMamCopyComparison, renderMamCopyBenefits, renderMamCopySteps, renderMamCopyFAQ, renderMamCopyFinalCTA, renderMCCommunity, renderMCFooter, renderMCRegistration } from './mamCopy';
import { renderLX12Hero, renderLX12Intro, renderLX12Pricing, renderLX12Example, renderLX12Rules, renderLX12Withdrawals, renderLX12Benefits, renderLX12Community, renderLX12Faq, renderLX12FinalCTA, renderLX12Footer, renderLX12Registration } from './proLeverage';
import { renderInstHero, renderInstAbout, renderInstWhy, renderInstEcosystem, renderInstSelector, renderInstPartners, renderInstTech, renderInstWorkflow, renderInstCommunity, renderInstFAQ, renderInstFinalCTA, renderInstFooter, renderInstRegistration } from './institutional';
import { renderSNUHero, renderSNUValue, renderSNUUniverses, renderSNUUnvBM, renderSNUUnvDeriv, renderSNUUnvWeltrade, renderSNUWhy, renderSNUWorkflow, renderSNUCommunity, renderSNUFAQ, renderSNUFinalCTA, renderSNUFooter, renderSNURegistration } from './syntheticUniverse';
import { renderV3Hero, renderV3Features, renderV3Header, renderV3Community, renderV3Footer, renderV3Registration } from './v3';
import { renderSPHero, renderSPAbout, renderSPAdvantages, renderSPFamilies, renderSPWorkflow, renderSPTechSpecs, renderSPActivation, renderSPCommunity, renderSPFAQ, renderSPFinalCTA, renderSPFooter } from './syntheticProduct';
import { renderHeroDark, renderHeroLight, renderHeroGradient, renderHeroOfficial } from './heroes';
import { renderBentoGrid, renderFeatureSplit, renderStatsRow, renderRiskGrid, renderLeaderboard, renderTrustBadges, renderMultiAsset, renderWorkflowSteps, renderSecurityFees, renderCtaCommunity, renderCalculator } from './features';
import { renderTestimonials, renderSntFooter } from './forms';

export const SECTION_RENDERERS: Record<string, (content: Record<string, any>, brand: BrandConfig) => string> = {
    // PROPFIRM
    prop_hero: renderPropHero,
    prop_about: renderPropEducation,
    prop_matrix_forex: renderPropProgramsForex,
    prop_matrix_synthetic: renderPropProgramsSynthetic,
    prop_workflow: renderPropSteps,
    prop_rules: renderPropRules,
    prop_benefits: renderPropBenefits,
    prop_community: renderPropCommunity,
    prop_faq: renderPropFAQ,
    prop_final_cta: renderPropFinalCTA,
    prop_footer: renderPropFooter,
    prop_registration: renderPropRegistration,

    // MAM & COPY
    mc_hero: renderMamCopyHero,
    mc_tabs_nav: renderMamCopyNav,
    mc_intro: renderMamCopyIntro,
    mc_mam_block: renderMamBlock,
    mc_copy_block: renderCopyBlock,
    mc_comparison: renderMamCopyComparison,
    mc_benefits: renderMamCopyBenefits,
    mc_steps: renderMamCopySteps,
    mc_faq: renderMamCopyFAQ,
    mc_final_cta: renderMamCopyFinalCTA,
    mc_community: renderMCCommunity,
    mc_footer: renderMCFooter,
    mc_registration: renderMCRegistration,

    // PRO LEVERAGE X12
    lx12_hero: renderLX12Hero,
    lx12_intro: renderLX12Intro,
    lx12_pricing: renderLX12Pricing,
    lx12_example: renderLX12Example,
    lx12_rules: renderLX12Rules,
    lx12_withdrawals: renderLX12Withdrawals,
    lx12_benefits: renderLX12Benefits,
    lx12_community: renderLX12Community,
    lx12_faq: renderLX12Faq,
    lx12_final_cta: renderLX12FinalCTA,
    lx12_footer: renderLX12Footer,
    lx12_registration: renderLX12Registration,

    // INSTITUTIONAL
    inst_hero: renderInstHero,
    inst_about: renderInstAbout,
    inst_why: renderInstWhy,
    inst_ecosystem: renderInstEcosystem,
    inst_selector: renderInstSelector,
    inst_partners: renderInstPartners,
    inst_tech: renderInstTech,
    inst_workflow: renderInstWorkflow,
    inst_community: renderInstCommunity,
    inst_faq: renderInstFAQ,
    inst_final_cta: renderInstFinalCTA,
    inst_footer: renderInstFooter,
    inst_registration: renderInstRegistration,

    // SYNTHETIC UNIVERSE
    snu_hero: renderSNUHero,
    snu_value: renderSNUValue,
    snu_universes: renderSNUUniverses,
    snu_unv_bm: renderSNUUnvBM,
    snu_unv_deriv: renderSNUUnvDeriv,
    snu_unv_weltrade: renderSNUUnvWeltrade,
    snu_why: renderSNUWhy,
    snu_workflow: renderSNUWorkflow,
    snu_community: renderSNUCommunity,
    snu_faq: renderSNUFAQ,
    snu_final_cta: renderSNUFinalCTA,
    snu_footer: renderSNUFooter,
    snu_registration: renderSNURegistration,

    // V3 PREMIUM
    v3_hero: renderV3Hero,
    v3_features: renderV3Features,
    v3_header: renderV3Header,
    v3_community: renderV3Community,
    v3_footer: renderV3Footer,
    v3_registration: renderV3Registration,

    // SYNTHETIC PRODUCT (Blueprint 8)
    sp_hero: renderSPHero,
    sp_about: renderSPAbout,
    sp_advantages: renderSPAdvantages,
    sp_families: renderSPFamilies,
    sp_workflow: renderSPWorkflow,
    sp_tech_specs: renderSPTechSpecs,
    sp_activation: renderSPActivation,
    sp_community: renderSPCommunity,
    sp_faq: renderSPFAQ,
    sp_final_cta: renderSPFinalCTA,
    sp_footer: renderSPFooter,

    // SHARED / MODULAR SECTIONS
    hero_dark: renderHeroDark,
    hero_light: renderHeroLight,
    hero_gradient: renderHeroGradient,
    hero_official: renderHeroOfficial,
    bento_grid: renderBentoGrid,
    feature_split: renderFeatureSplit,
    stats_row: renderStatsRow,
    risk_grid: renderRiskGrid,
    leaderboard: renderLeaderboard,
    trust_badges: renderTrustBadges,
    multi_asset: renderMultiAsset,
    workflow_steps: renderWorkflowSteps,
    security_fees: renderSecurityFees,
    cta_community: renderCtaCommunity,
    calculator: renderCalculator,
    testimonials: renderTestimonials,
    snt_footer: renderSntFooter,
};
