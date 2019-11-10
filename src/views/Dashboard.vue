<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app>
      <v-list dense>
        <v-list-item :to="{name: 'info'}">
          <v-list-item-action>
            <v-icon>fa-server</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{clusterName}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{name: 'channellist'}">
          <v-list-item-action>
            <v-icon>fa-stream</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Channels</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{name: 'clients'}">
          <v-list-item-action>
            <v-icon>device_hub</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Clients</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      
        <v-divider/>
        <v-list-item :to="{name: 'registry', params:{cluster: 'clusterId'}}" :cluster="clusterId">
          <v-list-item-action>
            <v-icon>fa-layer-group</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Registry</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>nOptics</v-toolbar-title>
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
export default {
  name: "dashboard",
  data: () => ({
    drawer: true,
    channels: [],
    clients: [],
    clusterId: ""
  }),
  created(){
    this.$store.commit('clusterURL', this.clusterEncodedAddress())
    this.$store.dispatch('clusterInfo')
  },
  computed: {
      clusterName(){
        return this.$store.getters.prettyClusterName
      }
  },
  methods: {
    clusterEncodedAddress(){
      const path = this.$route.path.split("/")
      return path[path.findIndex(value => value === "cluster")+1]
    },
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
        this.clusterId = data.cluster_id
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>