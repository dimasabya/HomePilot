import { create } from "zustand";

interface OfflineQueueState {
  pending: number;
  setPending: (count: number) => void;
  increase: () => void;
  decrease: () => void;
}

export const useOfflineQueueStore = create<OfflineQueueState>((set) => ({
  pending: 0,
  setPending: (count) => set({ pending: count }),
  increase: () => set((state) => ({ pending: state.pending + 1 })),
  decrease: () => set((state) => ({ pending: state.pending - 1 })),
}));
