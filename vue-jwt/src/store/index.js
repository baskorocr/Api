import { createStore, Vuex } from "vuex";

export default createStore({
  state: {
    isLoggedIn: !!localStorage.getItem("user"),
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
