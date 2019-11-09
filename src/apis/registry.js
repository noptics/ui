import axios from 'axios'

class Registry {
    constructor(){
    }

    async status(url){
        try{
            let response = await axios({
                method: 'get',
                url: `${url}`
                });
            // console.log(response)
            return response.data
        } catch (e){
            console.log("registry error", e)
        }
    }

    async channelData(url, cluster, channel) {
        try{
            let response = await axios({
                method: 'get',
                url: `${url}/${cluster}/${channel}`
                });
            console.log(response)
            return response.data
        } catch (e){
            console.log("registry error", e)
        }
    }
}

export default Registry;