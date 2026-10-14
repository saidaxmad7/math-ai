import { create } from "zustand";

type SidebarStore = {
    collapsed: boolean;
    mobileOpen: boolean;
    toggle: () => void;
    setCollapsed: (collapsed: boolean) => void;
    setMobileOpen: (open: boolean) => void;
    toggleMobile: () => void;
    closeMobile: () => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
    collapsed: false,
    mobileOpen: false,
    toggle: () =>
        set((state) => ({
            collapsed: !state.collapsed,
        })),
    setCollapsed: (collapsed) => set({ collapsed }),
    setMobileOpen: (open) => set({ mobileOpen: open }),
    toggleMobile: () =>
        set((state) => ({
            mobileOpen: !state.mobileOpen,
        })),
    closeMobile: () => set({ mobileOpen: false }),
}));