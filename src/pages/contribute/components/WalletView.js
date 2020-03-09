import React, { useContext } from "react";
import MetaMaskContext from "../../../components/MetaMask";
import { connect } from "react-redux";

const Comp = ({ agreedtandc, web3available }) => {

    const { web3, accounts, error, awaiting, openMetaMask } = useContext(
        MetaMaskContext,
    );

    return (<>
        <p class="title is-text-overflow">{`Wallet ${accounts && accounts.length > 0 ? accounts[0] : ""}`}</p>
        <p class="subtitle">
            Terms and conditions signed
     {agreedtandc !== true ? (
                <>
                    [no]
             {/* <TandC /> */}
                </>
            ) : (
                    <>
                        [X]
             {/* <TandC /> */}
                    </>

                )}

        </p>
    </>
    );
};


const mapStateToProps = state => {

    return {
        ...state.agreedtandc,
        web3available: state.web3available
    };
};

const mapDispachToProps = dispatch => {
    return {
        // onSetAgreed: () => dispatch({ type: "AGREE_TANDC" }),
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(Comp);
