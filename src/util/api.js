const axios = require("axios");
const config = require("../config");

export default {
    getSignature: (address) => {
        return axios.get(`${config.apiGateway.URL}/signature/${address}`);
    },

    postSignature: (message, signature, address) => {
        return axios.post(`${config.apiGateway.URL}/signature`, {
            message,
            address,
            signature
        });
    }

}