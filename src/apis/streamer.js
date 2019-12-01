import axios from 'axios'

class Streamer{
  constructor(){}
  
  async status(url, natsAddress, clusterID){
    try{
        let response = await axios({
            method: 'get',
            url: `${url}`,
            params: {'natsAddress': natsAddress, "stanCluster": clusterID}
            });
        console.log(response)
        return response.data
    } catch (e){
        console.log("registry api error", e)
        throw e
    }
  }

}

export default Streamer;