<template>
    <v-card 
    min-width="250"
    class="ma-2 pa-2"
    :to="{name: 'channel', params: { 'channelID': this.channel.name}}">
    <v-card-title>{{ channel.name }}</v-card-title>
    <v-card-text>
        <div
            class="d-flex flex-row justify-space-between">
            <v-card
                class="pa-2 justify-start"
                tile
                flat>
                Messages:
            </v-card>
            <v-card
                class="pa-2"
                tile
                flat>
                {{ channel.msgs }}
            </v-card>
        </div>
        <div
            class="d-flex flex-row justify-space-between">
            <v-card
                class="pa-2"
                tile
                flat>
                Bytes:
            </v-card>
            <v-card
                class="pa-2"
                tile
                flat>
                {{ channel.bytes || 0 | prettyBytes }}
            </v-card>
        </div>
        <div
            class="d-flex flex-row justify-space-between">
            <v-card
                class="pa-2"
                tile
                flat>
                Subscribers:
            </v-card>
            <v-card
                class="pa-2"
                tile
                flat>
                {{ channel.subscriptions ? channel.subscriptions.length : 0 }}
            </v-card>
        </div>
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