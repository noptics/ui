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
import nmon from "../natsmonitor/natsmonitor"
import ChannelSummary from "../components/ChannelSummary.vue"

export default {
    name: "channels",
    components: {ChannelSummary},
    data() {
        return {
            nmon: new nmon(),
            channels: []
        }
    },
    created(){
        this.updateChannels()
    },
    methods: {
        async updateChannels(){
            try {
                const reply = await this.nmon.streamingChannels(this.$store.state.url, true)
                this.channels = reply.channels
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>