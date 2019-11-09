<template>
    <v-card min-width="350">
        <v-card-title>{{ this.channel }}</v-card-title>
    </v-card>
    
</template>

<script>
import reg from "@/apis/registry"

export default {
    name: "registryChannel",
    props: ["cluster", "channel"],
    data(){
        return {
            reg: new reg(),
            channelData: {}
        }
    },
    created(){
        this.channelData()
    },
    methods:{
        async channelData(){
            try{
                const data = await this.reg.channelData(process.env.VUE_APP_NATS_REGISTRY, this.cluster, this.channel)
                this.channelData = data
            }catch (e){
                console.log(e)
            }
        }
    }
}
</script>