<template>
    <v-card 
    width="350"
    class="ma-2 pa-2">
    <v-card-title>{{ client.id }}</v-card-title>
    <v-card-text>
        Subscriptions:<br/>
        <div v-for="(sub, i) in client.subscriptions" :key=i>
            {{ i }}
        </div>
    </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "clientInfo",
    props: ['client'],
    created(){
        console.log(this.client)
    }
}
</script>