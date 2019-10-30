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
}

export default NatsMonitor;