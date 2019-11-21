<template>
    <div>
        <v-card min-width="350" class="pa-2 ma-4">
            <v-card-title>
                {{ channel.channel }}
            </v-card-title>
            <v-card-text>
                <div class="d-flex flex-row">
                    <div class="ma-3">
                        Message
                    </div>
                    <div class="ma-3">
                        {{ channel.message }}
                    </div>
                </div>
                <v-list>
                    <v-list-item v-for="(file, i) in channel.files" :key="i">
                        <v-tooltip right>
                            <template #activator="{ on }">
                                <v-list-item-icon v-on="on">
                                    <v-icon>fa-file</v-icon>
                                </v-list-item-icon>
                            </template>
                            <span>{{decode(file.data)}}</span>
                        </v-tooltip>
                        {{ file.name }}
                    </v-list-item>
                </v-list>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small v-if="modify">Edit</v-btn>
                <v-btn small v-if="modify">Delete</v-btn>
                <v-btn small v-if="view" @click="openWatch()">Watch</v-btn>
            </v-card-actions>
        </v-card>
        <v-dialog v-model="watchDialog" max-width="1000px">
            <v-card min-height=600px>
                <v-card-title>
                    <span class="headline">Channel Messages</span>
                </v-card-title>
                <v-card-text>
                    <span>{{ loadingMesage }}</span>
                    <v-list max-height="600" max-width="1000" class="overflow-y-auto">
                        <v-list-item v-for="(m, i) in messages" :key="i" class="mb-4">
                            {{ m }}
                        </v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: "registryChannel",
    props: ["channel", "modify", "view"],
    data(){
        return {
            watchDialog: false,
            messages: [],
            loadingMesage: "",
            socket: null
        }
    },
    methods: {
        openWatch(){
            this.watchDialog = !this.watchDialog
            if (this.watchDialog) {
                this.streamerConnect()
            }
        },
        decode(input) {
            return atob(input)
        },
        async streamerConnect(){  
            this.loadingMesage = "connecting..."
            const streamerWSAddress = this.$store.state.streamerURL.replace(/(^\w+:|^)\/\//, 'ws://')
            console.log(`${streamerWSAddress}/${this.$store.state.cluster.cluster_id}/${this.channel.channel}`)
            this.socket = new WebSocket(`${streamerWSAddress}/${this.$store.state.cluster.cluster_id}/${this.channel.channel}`)
            this.socket.onerror = (e) => {
                console.log("socket error", e)
                this.loadingMesage = `Error connecting to streamer ${e}`
            }
            this.socket.onopen = () => {
                this.loadingMesage = "connected"
            }
            this.socket.onmessage = (event) => {
                this.messages.push(event.data)
            }   
        }
    },
    watch: {
        watchDialog(val) {
            if (!val) {
                this.socket.close()
                this.messages = []
            }
        }
    }
}
</script>