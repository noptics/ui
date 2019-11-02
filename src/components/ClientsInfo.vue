<template>
    <v-container fluid fill-height>
        <ClientInfo v-for="(client, i) in clients" :key="i" :client="client"/>
    </v-container>
</template>

<script>
import nmon from "../natsmonitor/natsmonitor"
import ClientInfo from "../components/ClientInfo.vue"

export default {
    name: "clientsInfo",
    components: {ClientInfo},
    data() {
        return {
            nmon: new nmon(),
            clients: []
        }
    },
    created(){
        this.updateClients()
    },
    methods: {
        async updateClients(){
            try {
            const reply = await this.nmon.streamingClients(this.$store.state.url, true)
            console.log(reply)
            this.clients = reply.clients
            } catch (e) {
            console.log(e)
            }
        }
    }
}
</script>