import { PromiseBlackBox } from "@oqton/redux-black-box";
import ERC20Contract from "erc20-contract-js";

const initialState = {
  agreedtandc: false,
  showtandc: false,
  web3: null,
  balances: {},
  currentIteration: undefined,
  cstackBalance: undefined,
  rcstackBalance: undefined,
  softCap: undefined,
  hardCap: undefined,
  softCapTimestamp: undefined,
  totalReceived: undefined,
  loading: false,
};

const coins = [
  {
    symbol: "DAI",
    contractaddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
  },
];

const reducer = (state = initialState, action) => {
  // const newState = { ...state };
  console.log(`reducer ${action.type}`, state);
  switch (action.type) {
    case "BOOTSTRAP":
      console.log("Bootstrap");
      return {
        ...state,
      };

    case "SET_SHOW_TANDC":
      return {
        ...state,
        showtandc: action.value,
      };
    case "AGREE_TANDC":
      debugger;
      return {
        ...state,
        agreedtandc: true,
        showtandc: false,
        tandcsignature: action.signature,
      };
    case "WEB3_AVAILABLE":
      return {
        ...state,
        account: action.account,
        web3: action.web3,
      };
    case "READ_FUNDING_CONTRACT":
      return {
        ...state,
        loading: true,
        READ_FUNDING_CONTRACT: new PromiseBlackBox(() => {
          return new Promise((resolve) => {
            setTimeout(resolve, 1000);
          })
            .then((res) => ({ type: "READ_FUNDING_CONTRACT_SUCCESS", res }))
            .catch((e) => ({ type: "READ_FUNDING_CONTRACT_FAIL", e }));
        }),
      };
    case "READ_FUNDING_CONTRACT_SUCCESS":
      delete state.BB_READ_FUNDING_CONTRACT;
      if (!state.web3) {
        return state;
      }

      // TODO : wire this up to the actual contract
      return {
        ...state,
        loading: false,
        currentIteration: 0,
        cstackBalance: new state.web3.utils.BN("4000000000000000000"),
        rcstackBalance: new state.web3.utils.BN("12345000000000000000000"),
        softCap: new state.web3.utils.BN("850000000000000000000000"),
        hardCap: new state.web3.utils.BN("1200000000000000000000000"),
        softCapTimestamp: undefined,
        totalReceived: new state.web3.utils.BN("24000000000000000000000"),
        personalCap: new state.web3.utils.BN("15000000000000000000000"),
        numerator: 3,
        denominator: 2,
      };

    case "READ_FUNDING_CONTRACT_FAIL":
      delete state.BB_READ_FUNDING_CONTRACT;
      console.warn("fail");
      return {
        ...state,
        loading: false,
      };
    case "GET_BALANCES_FOR_ADDRESS":
      if (!action.address || !state.web3) return state;
      if (!state.balances[action.address]) {
        state.balances[action.address] = coins.map((coin) => {
          return { symbol: coin.symbol, status: "??" };
        });
      }
      return {
        ...state,
        BB_GET_BALANCES_FOR_ADDRESS: new PromiseBlackBox(() =>
          getBalances(state.web3, action.address, coins)
            .then((res) => ({
              type: "GET_BALANCES_FOR_ADDRESS_SUCCESS",
              res: res,
              address: action.address,
            }))
            .catch((e) => ({ type: "GET_BALANCES_FOR_ADDRESS_FAIL", e }))
        ),
      };
    case "GET_BALANCES_FOR_ADDRESS_SUCCESS":
      delete state.BB_GET_BALANCES_FOR_ADDRESS;
      const addressBalances = action.res.map((item) => {
        item.balanceFormatted = parseFloat(
          state.web3.utils.fromWei(item.balance, "ether")
        ).toFixed(2);
        return item;
      });
      return {
        ...state,
        balances: Object.assign({}, state.balances, {
          [action.address]: addressBalances,
        }),
      };

    case "GET_BALANCES_FOR_ADDRESS_FAIL":
      delete state.BB_GET_BALANCES_FOR_ADDRESS;
      state.balances[action.address] = state.balances[action.address].map(
        (coin) => {
          coin.status = "error fetching";
          return coin;
        }
      );
      return state;
    default:
      return state;
  }
};

const getBalances = async (web3, address, coins) => {
  return Promise.all([
    ...coins.map((coin) => {
      const erc20Contract = new ERC20Contract(web3, coin.contractaddress);
      return erc20Contract
        .balanceOf(address)
        .call()
        .then((balance) => {
          return { ...coin, balance: balance };
        });
    }),
    { symbol: "ETH", balance: await web3.eth.getBalance(address) },
  ]);
};

export default reducer;
