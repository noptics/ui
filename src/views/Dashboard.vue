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
        <v-list-group
          prepend-icon="view_day">
          <template v-slot:activator>
          <v-list-item-title>Channels</v-list-item-title>
        </template>
        </v-list-group>
        <v-list-group
          prepend-icon="device_hub">
          <template v-slot:activator>
          <v-list-item-title>Clients</v-list-item-title>
        </template>
        </v-list-group>
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
export default {
  name: "dashboard",
  data: () => ({
    drawer: true
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
  },
  computed: {
      cluster(){
          return this.$store.getters.prettyClusterName
      }
  }
}
</script>