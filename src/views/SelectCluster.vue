<template>
    <div>
        <v-app>
            <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                <v-flex
                    xs12
                    sm8
                    md4>
                    <v-alert type="error" :value="error">
                    {{error}}
                    </v-alert>
                    <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>NATS Streaming Cluster</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                        <v-text-field
                            label="nats monitoring url (http://127.0.0.1:8222)"
                            name="address"
                            prepend-icon="fa-server"
                            type="text"
                            v-model="natsAddress"
                        ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn 
                            color="primary"
                            :loading="loading"
                            :disabled="loading"
                            v-on:click="connect">Connect</v-btn>
                    </v-card-actions>
                    </v-card>
                </v-flex>
                </v-layout>
            </v-container>
            </v-content>
        </v-app>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "SelectCluster",
    data: () => ({
        "loading": false,
        "natsAddress": "",
        "error": null,
        "nmon": null
    }), 
    methods: {
        connect(){
            this.loading = true
            let natsUrl
            if (process.env.VUE_APP_NATS_PROXY_SERVER.length){
                natsUrl = `http://127.0.0.1:8181/proxy?url=${this.natsAddress}`
            } else {
                natsUrl = this.natsAddress
            }
            axios({
                method: 'get',
                url: `${natsUrl}/streaming`
                })
                .then(() => {
                    const encoded = btoa(this.natsAddress)
                    this.$router.push(`/cluster/${encoded}/info`)
                })
                .catch(error => {
                    console.log(error)
                    this.error = 'There was an error connecting to the NATS cluster. Please check the address and try again.'
                })
                .finally(() => this.loading = false)
        }
    }
};
</script>