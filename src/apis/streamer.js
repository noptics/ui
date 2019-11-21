import axios from 'axios'

class Streamer{
  constructor(){}
  
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

}

export default Streamer;