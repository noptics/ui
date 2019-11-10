<template>
    <v-card 
    width="350"
    class="ma-2 pa-2">
    <v-card-title>{{ client.id }}</v-card-title>
    <v-card-text>
        <div v-for="(sub, i) in client.subscriptions" :key=i>
            <router-link :to="{ name: 'channel', params: { channelID: i} }">{{ i }}</router-link>
        </div>
    </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "clientInfo",
    props: ['client']
}
</script>