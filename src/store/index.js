import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    root: "",
    url: "",
    name: "",
  },
  mutations: {
    cluster (state, payload){
      state.root = payload.root
      state.url = payload.url
    },
    clusterName(state, name) {
      state.name = name
    }
  },
  getters: {
    prettyClusterName: state => {
      return state.name != "" ? state.name : state.root
    }
  },
  actions: {},
  modules: {}
});
