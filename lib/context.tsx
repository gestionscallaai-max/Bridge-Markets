"use client";

import { createContext, useContext } from 'react';

// ─── Admin Context ───────────────────────────────────────────
export const AdminContext = createContext<{ isAdmin: boolean; setIsAdmin: (val: boolean) => void }>({
    isAdmin: false,
    setIsAdmin: () => { },
});
export const useAdmin = () => useContext(AdminContext);

// ─── Role Context ─────────────────────────────────────────────
export interface PartnerData {
    id?: string;
    partner_id?: string;
    name?: string;
    full_name?: string;
    email?: string;
    role?: string;
    tier?: string;
    referral_link?: string;
    wallet_balance?: number;
    monthly_goal?: number;
}

export const RoleContext = createContext<{ 
    userRole: string; 
    partnerData: PartnerData | null;
    loading: boolean;
}>({ 
    userRole: 'partner', 
    partnerData: null,
    loading: true
});

export const useRole = () => useContext(RoleContext);
