import Vue from "vue";
import Vuex from "vuex";
// import registry from "@/apis/registry"
import natsmonitor from "@/apis/natsmonitor"

// const reg = new registry()
const nmon = new natsmonitor()


Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    url: "",
    cluster: {},
    channels: [],
    clients: [],
    registry: "",

  },
  mutations: {
    clusterURL (state, address){
      state.url = decodeClusterAddress(address)
    },
    clusterData(state, data) {
      state.cluster = data
    },
    clusterChannels(state, data) {
      state.channels = data
    },
    clusterClients(state, data) {
      state.clients = data
    },
    registry(state, registry){
      state.registry = registry
    }
  },
  getters: {
    prettyClusterName: state => {
      return state.cluster.cluster_id ? state.cluster.cluster_id : state.url
    }
  },
  actions: {
    async clusterInfo ({ commit, state }) {
      if (state.url.length == 0){
        console.log("url must be set first")
        return
      }
      try {
        const clusterData = await nmon.streamingClusterInfo(state.url)
        commit('clusterData', clusterData)
      } catch (e) {
        console.log(e)
      }
    },
    async clusterChannels({ commit, state }) {
      if (state.url.length == 0){
        console.log("url must be set first")
        return
      }
      try {
        const reply = await nmon.streamingChannels(state.url, true)
        commit('clusterChannels', reply.channels)
      } catch (e) {
          console.log(e)
      }
    },
    async clusterClients({ commit, state }) {
      if (state.url.length == 0){
        console.log("url must be set first")
        return
      }
      try {
        const reply = await nmon.streamingClients(state.url, true)
        commit('clusterClients', reply.clients)
      } catch (e) {
          console.log(e)
      }
    }
  },
  modules: {}
});

function decodeClusterAddress(address) {
  return atob(address)
}