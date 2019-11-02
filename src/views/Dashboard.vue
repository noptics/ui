<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app>
      <v-list dense>
        <v-list-item link to="info">
          <v-list-item-action>
            <v-icon>dns</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{cluster}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="channels">
          <v-list-item-action>
            <v-icon>view_day</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Channels</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="clients">
          <v-list-item-action>
            <v-icon>device_hub</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Clients</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Noptics</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
          <router-view/>
      </v-container>
    </v-content>
    <v-footer
      color="indigo"
      app>
      <span class="white--text">Made with &hearts; by Hexly</span>
    </v-footer>
  </v-app>
</template>

<script>
import nmon from "../natsmonitor/natsmonitor"

export default {
  name: "dashboard",
  data: () => ({
    drawer: true,
    nmon: new nmon(),
    channels: [],
    clients: []
  }),
  created(){
    const path = this.$route.path.split("/")
    const natsAddress = atob(path[path.findIndex(value => value === "cluster")+1])
    let natsUrl
    if (process.env.VUE_APP_NATS_PROXY_SERVER.length){
        natsUrl = `http://127.0.0.1:8181/proxy?url=${natsAddress}`
    } else {
        natsUrl = natsAddress
    }
    this.$store.commit('cluster', {"root": natsAddress, "url": natsUrl})
    // this.updateChannels()
    // this.updateClients()
    this.refreshClusterName()
  },
  computed: {
      cluster(){
          return this.$store.getters.prettyClusterName
      }
  },
  methods: {
    async updateChannels(){
      try {
        const reply = await this.nmon.streamingChannels(this.$store.state.url)
        console.log(reply)
        this.channels = reply.names
      } catch (e) {
        console.log(e)
      }
    },
    async updateClients(){
      try {
        const reply = await this.nmon.streamingClients(this.$store.state.url)
        console.log(reply)
        this.clients = reply.clients.map((client)=>client.id)
      } catch (e) {
        console.log(e)
      }
    },
    async refreshClusterName(){
      try {
        const data = await this.nmon.streamingClusterInfo(this.$store.state.url)
        console.log(data)
        this.$store.commit('clusterName', data.cluster_id)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>