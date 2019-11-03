<template>
<div>
    <v-container fluid fill-height>
        <v-row>
            <v-card min-width="350">
                <v-card-title>Channel: {{ this.channelID }}</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col>
                                Messages:
                            </v-col>
                            <v-col>
                                {{ messages }}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                Data:
                            </v-col>
                            <v-col>
                                {{ bytes | prettyBytes }}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                First Sequence:
                            </v-col>
                            <v-col>
                                {{ firstSeq }}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                Last Sequence:
                            </v-col>
                            <v-col>
                                {{ lastSeq }}
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-row>
    </v-container>
    <h2>Subscriptions:</h2>
    <v-container>
        <v-row>
            <Subscription v-for="(sub, i) in channel.subscriptions" :key="i" :sub="sub"/>
        </v-row>
    </v-container>
        </div>
</template>

<script>
import nmon from "@/natsmonitor/natsmonitor"
import Subscription from "@/components/Subscription.vue"

export default {
    name: "channel",
    props: ['channelID'],
    data(){
        return {
            nmon: new nmon(),
            channel: {}
        }
    },
    components: {Subscription},
    created(){
        this.refreshInfo()
    },
    computed: {
        messages(){
            return this.channel.msgs ? this.channel.msgs : 0
        },
        bytes(){
            return this.channel.bytes ? this.channel.bytes : 0
        },
        firstSeq(){
            return this.channel.first_seq ? this.channel.first_seq : 0
        },
        lastSeq(){
            return this.channel.last_seq ? this.channel.last_seq : 0
        }
    },
    methods: {
        async refreshInfo(){
            const data = await this.nmon.streamingChannels(this.$store.state.url, true)
            this.channel = data.channels.find(channel => {return channel.name == this.channelID})
        }
    }
}
</script>