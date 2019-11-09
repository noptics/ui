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
                        <v-toolbar-title>Connetc to NATS Streaming Cluster</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid">
                        <v-text-field
                            label="nats monitoring url (http://127.0.0.1:8222)"
                            name="address"
                            prepend-icon="fa-server"
                            type="text"
                            :rules="natsAddressRules"
                            required
                            v-model="natsAddress"
                        ></v-text-field>
                        <v-text-field
                            label="nats proxy url (http://127.0.0.1:8282)"
                            name="proxy"
                            prepend-icon="fa-project-diagram"
                            type="text"
                            :rules="proxyAddressRules"
                            v-model="proxyAddress">
                            <v-tooltip right slot="append">
                                <template #activator="{ on }">
                                    <v-icon v-on="on">fa-question-circle</v-icon>
                                </template>
                                <span>Required if nats cluster is on a different domain (CORS)</span>
                            </v-tooltip>
                        </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn 
                            color="primary"
                            :loading="loading"
                            :disabled="!valid || loading"
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
        "natsAddress": '',
        "natsAddressRules": [
            v => !!v || 'Monitoring address is required',
            v => /^(?:http(s)?:\/\/)[\w.-]+(?:.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(v) || 'must be a valid url'
        ],
        "proxyAddress": "",
        "proxyAddressRules": [
            v => /^(?:http(s)?:\/\/)[\w.-]+(?:.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(v) || 'must be a valid url'
        ],
        "error": null,
        "nmon": null,
        "valid": false,
    }), 
    methods: {
        connect(){
            this.loading = true
            let natsUrl
            if (this.proxyAddress.length){
                natsUrl = `${this.proxyAddress}/proxy?url=${this.natsAddress}`
            } else {
                natsUrl = this.natsAddress
            }
            axios({
                method: 'get',
                url: `${natsUrl}/streaming`
                })
                .then(response => {
                    if (response.status != 200) {
                        throw response.status
                    }
                    const encoded = btoa(natsUrl)
                    console.log("url", natsUrl, "encoded", encoded)
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