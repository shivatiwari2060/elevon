import { create } from 'zustand';

interface UiState {
  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
}

/** Global UI state: the mobile navigation panel. */
export const useUiStore = create<UiState>()((set) => ({
  menuOpen: false,
  openMenu: () => set({ menuOpen: true }),
  closeMenu: () => set({ menuOpen: false }),
  toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
}));
