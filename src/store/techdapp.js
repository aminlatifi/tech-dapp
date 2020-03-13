
import { PromiseBlackBox } from '@oqton/redux-black-box';
import ERC20Contract from 'erc20-contract-js';

const initialState = {
    agreedtandc: false,
    web3: null,
    balances: {},
};

const coins = [
    { symbol: "DAI", contractaddress: "0x6b175474e89094c44da98b954eedeac495271d0f" }
]

const reducer = (state = initialState, action) => {
    // const newState = { ...state };
    console.log(`reducer ${action.type}`, state);
    switch (action.type) {
        case "AGREE_TANDC":
            return {
                ...state,
                // call: new PromiseBlackBox(
                //     () => getAvailableCurrencies()
                //         .then(res => ({ type: "LOAD_AVAILABLE_CURRENCIES_SUCCESS", res }))
                //         .catch(e => ({ type: "LOAD_AVAILABLE_CURRENCIES_FAIL", e }))
                // )
                agreedtandc: true
            };
        case "WEB3_AVAILABLE":
            return {
                ...state,
                account: action.account,
                // web3available: true,
                web3: action.web3
            }
        case "GET_BALANCES_FOR_ADDRESS":
            if (!action.address || !state.web3) return state;
            if (!state.balances[action.address]) {
                state.balances[action.address] = coins.map((coin) => { return ({ symbol: coin.symbol, status: "??" }) })
            }
            return {
                ...state,
                BB_GET_BALANCES_FOR_ADDRESS: new PromiseBlackBox(
                    () => getBalances(state.web3, action.address, coins)
                        .then(res => ({ type: "GET_BALANCES_FOR_ADDRESS_SUCCESS", res: res, address: action.address }))
                        .catch(e => ({ type: "GET_BALANCES_FOR_ADDRESS_FAIL", e }))
                )
            }
        case "GET_BALANCES_FOR_ADDRESS_SUCCESS":
            return {
                ...state,
                balances: Object.assign({}, state.balances, {
                    [action.address]: action.res
                })
            }

        case "GET_BALANCES_FOR_ADDRESS_FAIL":
            state.balances[action.address] = state.balances[action.address].map((coin) => { coin.status = "error fetching"; return coin });
            return state;
        default:
            return state;
    }
}

const getBalances = (web3, address, coins) => {
    return Promise.all(coins.map((coin) => {
        const erc20Contract = new ERC20Contract(web3, coin.contractaddress);
        return erc20Contract.balanceOf(address).call().then((balance) => { return { ...coin, balance: web3.utils.fromWei(balance, "ether") } });
    }))
}

export default reducer;
