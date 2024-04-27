import { create } from "zustand";

const useAdminStore = create((set) => ({
  settings: {
    themeColor: "blue",
    showNews: true,
    showMarketData: true,
  },
  menuItems: [
    { label: "Market", path: "/", content: "Market data and trends" },
    { label: "Favorites", path: "/favorites", content: "Your favorite cryptocurrencies" },
    { label: "News", path: "/news", content: "Latest cryptocurrency news" },
  ],
  updateSettings: (newSettings) => set((state) => ({ settings: { ...state.settings, ...newSettings } })),
  addMenuItem: (item) => set((state) => ({ menuItems: [...state.menuItems, item] })),
  removeMenuItem: (label) => set((state) => ({ menuItems: state.menuItems.filter((item) => item.label !== label) })),
  updateMenuItem: (label, updatedContent) =>
    set((state) => ({
      menuItems: state.menuItems.map((item) => (item.label === label ? { ...item, content: updatedContent } : item)),
    })),
}));

export default useAdminStore;
