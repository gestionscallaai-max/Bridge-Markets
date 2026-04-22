// ─────────────────────────────────────────────────────────────
// REFACTORED: This file acts as a re-export bridge to avoid breaking existing imports.
// All logic has been migrated modularly to /lib/landing/
// ─────────────────────────────────────────────────────────────

export * from './landing/types';
export * from './landing/catalog';
export { SECTION_RENDERERS } from './landing/renderers';

