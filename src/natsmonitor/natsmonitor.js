import axios from 'axios'

class NatsMonitor {
    constructor(){
    }

    async streamingClusterInfo(url){
        try{
            let response = await axios({
                method: 'get',
                url: `${url}/streaming/serverz`
                });
            // console.log(response)
            return response.data
        } catch (e){
            console.log(e)
        }
    }

    async streamingChannels(url, subs){
        const getSubs = subs ? 1 : 0
        try{
            let response = await axios({
                method: 'get',
                url: `${url}/streaming/channelsz?subs=${getSubs}`
                });
            // console.log(response)
            return response.data
        } catch (e){
            console.log(e)
        }
    }
    
    async streamingClients(url, subs){
        const getSubs = subs ? 1 : 0
        try{
            let response = await axios({
                method: 'get',
                url: `${url}/streaming/clientsz?subs=${getSubs}`
                });
            // console.log(response)
            return response.data
        } catch (e){
            console.log(e)
        }
    }
}

export default NatsMonitor;