<template>
    <v-container fluid fill-height>
        <ChannelInfo v-for="(channel, i) in channels" :key="i" :channel="channel"/>
    </v-container>
</template>

<script>
import nmon from "../natsmonitor/natsmonitor"
import ChannelInfo from "../components/ChannelInfo.vue"

export default {
    name: "channelsInfo",
    components: {ChannelInfo},
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