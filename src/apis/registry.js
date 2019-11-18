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
            console.log("registry api error", e)
            throw e
        }
    }

    async channelData(url, cluster, channel) {
        try{
            let response = await axios({
                method: 'get',
                url: `${url}/${cluster}/${channel}`
                });
            // console.log(response)
            return response.data
        } catch (e){
            console.log("registry api error", e)
            throw e
        }
    }

    async channels(url, cluster) {
        try{
            let response = await axios({
                method: 'get',
                url: `${url}/${cluster}`
                });
            return response.data
        } catch (e){
            console.log("registry api error", e)
            throw e
        }
    }

    async saveChannelData(url, cluster, channel, message, files){
        try {
            let response = await axios({
                method: 'post',
                url: `${url}/${cluster}/${channel}`,
                data: {
                    files: files,
                    message: message
                }
            })
            console.log(response)
            return response.data
        } catch (e) {
            console.log("registry api error", e)
             throw e
        }
    }
}

export default Registry;