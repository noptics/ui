import Vue from "vue";
import Vuex from "vuex";
import registry from "@/apis/registry"
import natsmonitor from "@/apis/natsmonitor"

const reg = new registry()
const nmon = new natsmonitor()


Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    url: "",
    cluster: {},
    channels: [],
    clients: [],
    registryUrl: "",
    registry: {},
    registryChannels: []

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
    registryURL(state, address){
      console.log(address)
      state.registryUrl = address
    },
    registryData(state, data){
      state.registry = data
    },
    registryChannelData(state, payload) {
      const index = state.registryChannels.findIndex(item => {
        return payload.channel === item.channel
      })
      if (index !== -1) {
        console.log("set index", index)
        state.registryChannels[index] = payload
      } else {
        console.log("push channel")
        state.registryChannels.push(payload)
      }
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
    },
    async registryInfo({ commit, state, dispatch }){
      if (state.registryUrl == 0){
        console.log("url and registry must be set first")
        return
      }
      try {
          const reply = await reg.status(state.registryUrl)
          console.log(reply)
          commit('registryData', reply)
      } catch (e) {
          console.log('registry error', e)
      }
      dispatch('registryChannels')
    },
    async registryChannels({ state, commit }){
      if (state.registryUrl == 0){
        console.log("url and registry must be set first")
        return
      }
      
      let channels
      try {
        const reply = await reg.channels(state.registryUrl, state.cluster.cluster_id)
        console.log(reply)
        channels = reply
      } catch (e) {
        console.log('registry error', e)
        return
      }

      channels.forEach(async channel => {
        try{
          const data = await reg.channelData(state.registryUrl, state.cluster.cluster_id, channel)
          console.log(data)
          
          commit('registryChannelData', data)

        } catch (e) {
          console.log("error getting channel data", e)
        }
      })
    }
  },
  modules: {}
});

function decodeClusterAddress(address) {
  return atob(address)
}