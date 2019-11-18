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
            <div class="d-flex flex-row ma-4 mb-8">
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
            <div class="d-flex flex-row ma-4 mb-8 align-center">
                <h2>Configured Channels</h2>
                <v-dialog v-model="channelDialog" max-width="600px">
                    <template v-slot:activator="{ on }">
                        <v-btn class="mx-3" fab dark small color="indigo" v-on="on">
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Add Channel Configuration</span>
                        </v-card-title>
                        <v-card-text>
                            <v-form ref="form" v-model="valid">
                            <v-text-field
                                label="Channel Name"
                                name="channelName"
                                type="text"
                                :rules="channelNameRules"
                                required
                                v-model="channelNameInput">
                            </v-text-field>
                            <v-text-field
                                label="Channel Message"
                                name="channelMessage"
                                type="text"
                                :rules="channelMessageRules"
                                v-model="channelMessageInput">
                                <v-tooltip right slot="append">
                                    <template #activator="{ on }">
                                        <v-icon v-on="on">fa-question-circle</v-icon>
                                    </template>
                                    <span>Root message sent across the channel (e.g. name.proto)</span>
                                </v-tooltip>
                            </v-text-field>
                            </v-form>
                            <p class="mt-4"><span class="headline">Proto Files</span></p>
                            <v-list>
                                <v-list-item v-for="(file, i) in inputFiles" :key="i">
                                    <v-tooltip right>
                                        <template #activator="{ on }">
                                            <v-list-item-icon v-on="on">
                                                <v-icon>fa-file</v-icon>
                                            </v-list-item-icon>
                                        </template>
                                        <span>{{decode(file.data)}}</span>
                                    </v-tooltip>
                                    {{ file.name }}
                                    <v-list-item-avatar @click="removeFile(i)">
                                        <v-icon small>fa-times-circle</v-icon>
                                    </v-list-item-avatar>
                                </v-list-item>
                            </v-list>
                            <v-form ref="fileInputForm" v-model="fileInputValid">
                            <v-file-input 
                                accept="text/*, .proto"
                                label="File input"
                                ref="fileInput"
                                :loading="fileInputLoading"
                                :enabled="!fileInputLoading"
                                @change="fileChange"></v-file-input>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn 
                                color="primary"
                                :loading="loading"
                                :disabled="!valid || !fileInputValid || loading"
                                v-on:click="saveChannel">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                
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
            error: '',
            channelNameInput: '',
            channelNameRules: [
                v => !!v || 'channel name is required',
            ],
            channelMessageInput: '',
            channelMessageRules: [],
            channelDialog: false,
            inputFiles: [],
            fileInputLoading: false,
            fileInputValid: false
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
        },
        saveChannel(){
            this.$refs.form.validate()
            this.loading = true
            this.$store.dispatch('channelFiles', {files: this.inputFiles, channel: this.channelNameInput, message: this.channelMessageInput})
                .finally(()=>{
                    this.loading = false
                    this.channelDialog = false
                })
                .catch(e => {
                    console.log(e)
                })
        },
        fileChange(file){
            if (!file || !file.name){return}

            const reader = new FileReader();
            reader.addEventListener('loadstart', () => {
                this.fileInputLoading = true
            })
            reader.addEventListener('load', () => {
                this.inputFiles.push({name: file.name, data: btoa(reader.result)})
                this.$refs.fileInputForm.reset()
            })
            reader.addEventListener('error', () => {
                console.log("file read error!")
            })
            reader.addEventListener('loadend', () => {
                this.fileInputLoading = false
            })

            reader.readAsText(file)
        },
        decode(input) {
            return atob(input)
        },
        removeFile(index) {
            this.inputFiles.splice(index, 1)
        }
    },
    watch: {
        channelDialog(val) {
            if (!val) {
                this.$refs.form.reset()
                this.loading = false
                this.inputFiles = []
            }
        }
    }
}
</script>