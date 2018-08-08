import Vue from "vue";
import Vuex from "vuex";
import common from "./modules/common";
import app from "./modules/app";
import getters from "./getter";

Vue.use(Vuex);

export default new Vuex.Store({
  getters,
  modules: {
    common,
    app
  },
  strict: false
});
