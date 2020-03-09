
import { PromiseBlackBox } from '@oqton/redux-black-box';


export const initialState = {
    agreedtandc: false,
    web3available: false,
};

const reducer = (state = initialState, action) => {
    // const newState = { ...state };
    console.log(`reducer ${action.type}`);
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
                web3available: true,
                // web3: action.web3
            }
        default:
            return state;
    }
}

export default reducer;
