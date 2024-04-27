import { create } from "zustand";

const useAdminStore = create((set) => ({
  settings: {
    themeColor: "blue",
    showNews: true,
    showMarketData: true,
  },
  updateSettings: (newSettings) => set((state) => ({ settings: { ...state.settings, ...newSettings } })),
}));

export default useAdminStore;
