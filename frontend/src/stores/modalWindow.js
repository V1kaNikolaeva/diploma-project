import { defineStore } from "pinia";

export const useModalWindowStore = defineStore({
  id: "modalWindow",

  state: () => ({
    settings: {
      showDeleteSpending: false,
      switchDeleteSpending: false,
    },
  }),

  actions: {
    initStore() {
        if (localStorage.getItem("user.access")) {
            this.settings.showDeleteSpending = localStorage.getItem("settings.showDeleteSpending");
            this.settings.switchDeleteSpending = localStorage.getItem("settings.switchDeleteSpending");
            console.log('get settings')
        }
    },

    setSettings(settings) {
      this.settings.showDeleteSpending = settings.showDeleteSpending;
      this.settings.switchDeleteSpending = settings.switchDeleteSpending;

      localStorage.setItem("settings.showDeleteSpending", this.settings.showDeleteSpending);
      localStorage.setItem("settings.switchDeleteSpending", this.settings.switchDeleteSpending);
    },

    removeSettings() {
      this.settings.showDeleteSpending = null;
      this.settings.switchDeleteSpending = null;

      localStorage.setItem("settings.showDeleteSpending", '');
      localStorage.setItem("settings.switchDeleteSpending", '');
    }
  },
});