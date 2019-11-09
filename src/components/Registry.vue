<template>
    <div>
        <v-container fluid fill-height>
            <v-row>
                <v-card min-width="350">
                    <v-card-title>Registry {{cluster}}</v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col>
                                    Version
                                </v-col>
                                <v-col>
                                    {{status.version}}
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    Commit
                                </v-col>
                                <v-col>
                                    {{status.git_commit}}
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    Go
                                </v-col>
                                <v-col>
                                    {{status.go}}
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-row>
        </v-container>
        <h2>Configured Channels</h2>
    </div>    
</template>

<script>
import reg from "@/apis/registry"
import nmon from "@/apis/natsmonitor"


export default {
    name: "registry",
    data(){
        return {
            reg: new reg(),
            nmon: new nmon(),
            status: {}
        }
    },
    props: ['cluster'],
    created(){
        this.updateStatus()
    },
    watch: {
        cluster(asdf) {
            console.log("old, new",asdf)
        }
    },
    methods: {
        async updateStatus(){
            if (this.cluster.length == 0){return}
            try {
                const reply = await this.reg.status(process.env.VUE_APP_NATS_REGISTRY)
                console.log(reply)
                this.status = reply
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>