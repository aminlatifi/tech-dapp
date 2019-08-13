
import { PromiseBlackBox } from '@oqton/redux-black-box';


export const initialState = {
    agreed: false
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
                agreed: true
            };

        default:
            return state;
    }
}

export default reducer;
