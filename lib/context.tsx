"use client";

import { createContext, useContext } from 'react';

// ─── Admin Context ───────────────────────────────────────────
export const AdminContext = createContext<{ isAdmin: boolean; setIsAdmin: (val: boolean) => void }>({
    isAdmin: false,
    setIsAdmin: () => { },
});
export const useAdmin = () => useContext(AdminContext);

// ─── Role Context ─────────────────────────────────────────────
export const RoleContext = createContext<{ userRole: string }>({ userRole: 'partner_view' });
export const useRole = () => useContext(RoleContext);
