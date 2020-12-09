class AllowList {
  constructor(web3, address) {
    this.contract = new web3.eth.Contract(GivethBridge.compilerOutput.abi, address);
  }
}

export default AllowList;
