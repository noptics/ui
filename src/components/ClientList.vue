<template>
    <v-container fluid fill-height>
        <v-row>
            <ClientInfo v-for="(client, i) in clients" :key="i" :client="client"/>
        </v-row>
    </v-container>
</template>

<script>
import ClientInfo from "@/components/Client.vue"

export default {
    name: "clientsInfo",
    components: {ClientInfo},
    created(){
        this.$store.dispatch('clusterClients')
    },
    computed: {
        clients(){
            return this.$store.state.clients
        }
    }
}
</script>