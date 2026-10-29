import { create } from 'zustand';
import { SERVICES } from '@/data/services';
import type { ServiceId } from '@/types';

interface ServicesState {
  activeId: ServiceId;
  setActive: (id: ServiceId) => void;
}

/** The service currently selected in the home page showcase. */
export const useServicesStore = create<ServicesState>()((set) => ({
  activeId: SERVICES[0].id,
  setActive: (activeId) => set({ activeId }),
}));
