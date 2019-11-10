<template>
    <v-card min-width="350" class="pa-2 ma-4">
        <v-card-title>{{ channel.channel }}</v-card-title>
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
    </v-card>
    
</template>

<script>
export default {
    name: "registryChannel",
    props: ["channel"],
    data(){
        return {
        }
    },
    methods: {
        decode(input) {
            return atob(input)
        }
    }
}
</script>