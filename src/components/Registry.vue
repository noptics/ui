<template>
    <div>
        <div class="d-flex flex-column ma-4" v-if="!registryURL">
            <v-alert type="error" :value="(error.length > 0)" width="450">
                    {{error}}
            </v-alert>
            <v-card width="450">
                <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Connect nOptics Registry</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form" v-model="valid">
                        <v-text-field
                            label="registry url (http://127.0.0.1:7776)"
                            name="registry"
                            prepend-icon="fa-server"
                            type="text"
                            :rules="registryRules"
                            required
                            v-model="registryInput"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                        color="primary"
                        :loading="loading"
                        :disabled="!valid || loading"
                        v-on:click="checkRegistry">Connect</v-btn>
                </v-card-actions>
            </v-card>
        </div>
        <div v-if="registryURL">
            <div class="d-flex flex-row ma-4">
                <v-card min-width="250">
                    <v-card-title>Registry ({{ clusterName }})</v-card-title>
                    <v-card-text>
                        <div class="d-flex flex-row">
                             <div class="ma-3">
                                Version
                            </div>
                            <div class="ma-3">
                                {{ registry.version }}
                            </div>
                        </div>
                        <div class="d-flex flex-row">
                             <div class="ma-3">
                                Commit
                            </div>
                            <div class="ma-3">
                                {{ registry.git_commit }}
                            </div>
                        </div>
                        <div class="d-flex flex-row">
                             <div class="ma-3">
                                Go
                            </div>
                            <div class="ma-3">
                                {{ registry.go }}
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </div>
            <div class="d-flex flex-row ma-4">
                <h2>Configured Channels</h2>
            </div>
            <div class="d-flex flex-row flex-wrap">
                <RegistryChannel v-for="(chan, i) in channels" :key="i" :channel="chan"/>
            </div>
        </div>
    </div>    
</template>

<script>
import axios from 'axios'
import RegistryChannel from "@/components/RegistryChannel.vue"

export default {
    name: "registry",
    data(){
        return {
            loading: false,
            valid: false,
            registryInput: '',
            registryRules: [
                v => !!v || 'registry address is required',
                v => /^(?:http(s)?:\/\/)[\w.-]+(?:.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(v) || 'must be a valid url'
            ],
            error: ''
        }
    },
    components: {RegistryChannel},
    created(){
        this.$store.dispatch('registryInfo')
    },
    computed: {
        registryURL(){
            return this.$store.state.registryUrl
        },
        registry(){
            return this.$store.state.registry
        },
        clusterName() {
            return this.$store.getters.prettyClusterName
        },
        channels(){
            return this.$store.state.registryChannels
        }
    },
    methods: {
        checkRegistry(){
            this.loading = true
            this.error = ''
            axios({
                method: 'get',
                url: this.registryInput
            })
            .then(response =>{
                if (response.status != 200) {
                    throw response.status
                }
                this.$store.commit('registryURL', this.registryInput)
                this.$store.dispatch('registryInfo')
            })
            .catch(error => {
                console.log(error)
                this.error = 'there was an error connecting to the registry. Please check the address and try again'
            })
            .finally(() => this.loading = false)
        }
    }
}
</script>