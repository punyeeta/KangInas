import { create } from 'zustand';

type AppSection = 'home' | 'profile';

interface AppState {
  activeSection: AppSection;
  isMobileMenuOpen: boolean;
  setActiveSection: (section: AppSection) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const useAppStore = create<AppState>((set) => ({
  activeSection: 'home',
  isMobileMenuOpen: false,
  setActiveSection: (section) => set({ activeSection: section }),
  setIsMobileMenuOpen: (open) => set({ isMobileMenuOpen: open })
}));

export default useAppStore;