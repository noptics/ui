<template>
    <div>
        <div class="d-flex flex-row ma-4">
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
            <div >
                
            </div>
        </div>
        <div class="d-flex flex-row ma-4">
            <h2>Subscriptions:</h2>
        </div>
        <div class="d-flex flex-row flex-wrap">
            <Subscription v-for="(sub, i) in channel.subscriptions" :key="i" :sub="sub"/>
        </div>
        <div class="d-flex flex-row ma-4" v-if="regsitryChannel">
            <h2>Registry:</h2>
        </div>
        <div class="d-flex flex-row" v-if="regsitryChannel">
            <RegistryChannel :view="streamer" :channel="regsitryChannel"></RegistryChannel>
        </div>
    </div>
</template>

<script>
import nmon from "@/apis/natsmonitor"
import Subscription from "@/components/Subscription.vue"
import RegistryChannel from "@/components/RegistryChannel.vue"

export default {
    name: "channel",
    props: ['channelID'],
    data(){
        return {
            nmon: new nmon(),
            channel: {}
        }
    },
    components: {Subscription, RegistryChannel},
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
        },
        regsitryChannel(){
            const channel = this.$store.getters.registryChannel(this.channelID)
            console.log(channel)
            return channel 
        },
        streamer(){
            return this.$store.state.streamerURL ? true : false
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