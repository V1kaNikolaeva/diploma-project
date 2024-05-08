import { defineStore } from "pinia";

export const useStatsStore = defineStore({
  id: "stats",

  state: () => ({
    stats: {
      spending: null,
      balance: null,
    },
  }),

  actions: {
    initStore() {
        if (localStorage.getItem("user.access")) {
            this.stats.spending = localStorage.getItem("stats.spending");
            this.stats.balance = localStorage.getItem("stats.balance");
            console.log('get stats')
        }
    },

    setStats(stats) {
      this.stats.spending = stats.spending;
      this.stats.balance = stats.balance;

      localStorage.setItem("stats.spending", this.stats.spending);
      localStorage.setItem("stats.balance", this.stats.balance);
    },

    removeStats() {
      this.stats.spending = null;
      this.stats.balance = null;

      localStorage.setItem("stats.spending", '');
      localStorage.setItem("stats.balance", '');
    }
  },
});
