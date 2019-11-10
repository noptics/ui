<template>
    <v-container fluid fill-height>
        <v-row>
        <ChannelSummary 
            v-for="(channel, i) in channels"
            :key="i"
            :channel="channel" />
        </v-row>
    </v-container>
</template>

<script>
import ChannelSummary from "@/components/ChannelSummary.vue"

export default {
    name: "channels",
    components: {ChannelSummary},
    data() {
        return {

        }
    },
    created(){
        this.$store.dispatch('clusterChannels')
    },
    computed: {
        channels() {
            return this.$store.state.channels
        }
    }
}
</script>