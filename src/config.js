const configs = {
    development: {
        name: "dev",
        apiGateway: {
            URL: "http://localhost:5005"
        },
        ETH: {
            rpcEndpoint: "https://ropsten.infura.io/v3/766661aa3a1e414584b9d2c2b73e6930",
            rpcEndpointXdai: "https://rpc.xdaichain.com/"
        },
        bridgeAddress: "0x30f938fed5de6e06a9a7cd2ac3517131c317b1e7",   // TODO
        CSSTKTokenAddress: "0xc4fbE68522ba81a28879763C3eE33e08b13c499E" // this is on XDAI chain

    },

    production: {
        name: "prod",
        apiGateway: {
            URL: "http://localhost:5003"    //TODO
        },
        ETH: {
            rpcEndpoint: "https://mainnet.eth.cloud.ava.do",
            rpcEndpointXdai: "https://rpc.xdaichain.com/"
        },
        bridgeAddress: "0x30f938fed5de6e06a9a7cd2ac3517131c317b1e7",
        CSSTKTokenAddress: "0xc4fbE68522ba81a28879763C3eE33e08b13c499E"

    }
};
let config = process.env.REACT_APP_STAGE
    ? configs[process.env.REACT_APP_STAGE]
    : configs.development;

module.exports=config;
