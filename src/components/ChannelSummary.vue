<template>
    <v-card 
    width="350"
    class="ma-2 pa-2"
    @click="clicked">
    <v-card-title>{{ channel.name }}</v-card-title>
    <v-card-text>
        <v-container>
            <v-row>
                <v-col>
                    Messages:
                </v-col>
                <v-col>
                    {{ channel.msgs }}
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    Bytes:
                </v-col>
                <v-col>
                    {{ channel.bytes || 0 | prettyBytes }}
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    Subscribers:
                </v-col>
                <v-col>
                    {{ channel.subscriptions ? channel.subscriptions.length : 0 }}
                </v-col>
            </v-row>
        </v-container>
    </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "channelSummary",
    props: ['channel'],
    methods: {
        clicked(){
            this.$router.push(`${this.$route.path}/${this.channel.name}`)
        }
    }
}
</script>