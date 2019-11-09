<template>
    <v-card 
    max-width="350"
    class="ma-2 pa-2"
    :loading="loading">
    <v-card-title >{{ info.cluster_id }} ({{ info.state }})</v-card-title>
    <v-card-text>
        <p>
            Channels: {{ info.channels }}<br/>
            Clients: {{ info.clients }}<br/>
            Subscriptions: {{ info.subscriptions }}
        </p>
        <v-divider/>
        <br/>
        Message total: {{ info.total_msgs }}<br/>
        Bytes total {{ info.total_bytes || 0 | prettyBytes }}
    </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "clusterinfo",
    data: function(){
        return {
            loading: false
        }
    },
    created(){
        this.$store.dispatch('clusterInfo')
    },
    computed: {
        info(){
            return this.$store.state.cluster
        }
    },
    methods: {
        async refreshInfo(){
            this.loading = true
            const data = await this.nmon.streamingClusterInfo(this.$store.state.url)
            this.info = data
            this.$store.commit('clusterName', data.cluster_id)
            this.loading = false
        }
    }
}
</script>