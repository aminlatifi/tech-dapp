const axios = require("axios");
const config = require("../config");

export default {
    getSignature: (address) => {
        return axios.get(`${config.apiGateway.URL}/signature/${address}`);
        // .then((res) => {
        //     // debugger;
        //     return true;
        // }).catch((e)=>{
        //     if (e.response && e.response.status === 404){
        //         // does not exist yet
        //         return false;
        //     }
        //     return false;
        //     // debugger;            
        // })
    },

    postSignature: (message, signature, address) => {
        return axios.post(`${config.apiGateway.URL}/signature`, {
            message,
            address,
            signature
        });
    }

}