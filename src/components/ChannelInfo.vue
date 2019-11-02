<template>
    <v-card 
    width="350"
    class="ma-2 pa-2">
    <v-card-title>{{ channel.name }}</v-card-title>
    <v-card-text>
        Messages: {{ channel.msgs }}<br/>
        Bytes: {{ channel.bytes || 0 | prettyBytes }} <br/>
        Subscribers: {{ channel.subscriptions ? channel.subscriptions.length : 0 }}
    </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "channelInfo",
    props: ['channel']
}
</script>