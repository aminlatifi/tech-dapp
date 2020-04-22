import React, { useContext } from "react";
import { connect } from "react-redux";
import MetaMaskContext from "../../../components/MetaMask";
import tandcData from "../../../assets/tandc.json";
import "./Contribute.css";
import MetaMaskButton from "../../../components/MetaMaskButton";
import DAI from 'cryptocurrency-icons/svg/color/dai.svg';

const Comp = ({ web3available, agreedtandc, onSetAgreedtandc, setShowTandC }) => {

    const { web3, accounts, error, awaiting, openMetaMask } = useContext(
        MetaMaskContext,
    );

    // console.log("accounts", accounts);

    // const [agreetandc, setAgreetandc] = React.useState(false);
    // const [box3, setBox3] = React.useState(false);
    // const [enableSubmit, setEnableSubmit] = React.useState(false);

    // const [signError, setSignError] = React.useState();


    // React.useEffect(() => {
    //     setEnableSubmit(agreetandc && box3);
    //     console.log("Check all ??", agreetandc ? "true" : "false", box3 ? "true" : "false", enableSubmit ? "true" : "false");
    // }, [setEnableSubmit, enableSubmit, agreetandc, box3]);


    // if (!accounts || !accounts[0]) {
    //     return (<div>Waiting for web3 provider</div>);
    // }

    // const signIt = (message) => {

    //     const msgParams = [
    //         {
    //             type: 'string',      // Any valid solidity type
    //             name: 'Commons Stack signature',     // Any string label you want
    //             value: message  // The value to sign
    //         },
    //     ];
    //     const from = web3.currentProvider.selectedAddress;

    //     web3.currentProvider.sendAsync({
    //         method: 'eth_signTypedData',
    //         params: [msgParams, from],
    //         from: from,
    //     }, function (err, result) {
    //         debugger;
    //         if (err) {
    //             return setSignError("Signature failed.");
    //         }
    //         // if (err) return console.error(err)
    //         if (result.error) {
    //             return setSignError(`Signature error. ${result.error.message}`);
    //             // return console.error()
    //         }

    //         if (!result.result) {
    //             return setSignError("No signature received.");
    //         }

    //         onSetAgreedtandc(result.result);

    //     });
    // }


    return (

        <div class="tile is-child">
            <div class="menu contrib level has-text-centered">
                <div class="level-item active">
                    Iteration 1
</div>
                <div class="level-item">
                    Iteration 2
</div>
                <div class="level-item">
                    Iteration 3
</div>
                <div class="level-item">
                    Iteration 4
</div>
                <div class="level-item">
                    Iteration 5
</div>
            </div>
            <article class=" notification is-primary">
                <div class="contribmain">


                    <nav class="level">
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">Your personal cap</p>
                                <p class="title">3,456 CSTK</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">Current issuance rate</p>
                                <p class="title">2.5 CSTK / DAI</p>
                            </div>
                        </div>
                    </nav>
                    <p>
                        You can contribute with DAI or any of 10 confirmed ERC-20 tokens through our automated converter built on top of 1inch.exchange
</p>


                    {(!accounts || !accounts[0]) && (
                        <div className="enable has-text-centered">


                            <p class="title">Want to contribute to Commons Stack? Connect your wallet below.</p>
                            <MetaMaskButton className="is-outlined" clickMessage="Connect Wallet" />
                        </div>
                    )}
                    <div className="slider">


                        <div class="level">
                            <div class="level-left">
                                <div class="level-item">
                                    <img src={DAI.src} alt={DAI.symbol} /><span>24000 DAI</span>
                                </div>
                            </div>

                            <div class="level-right">
                                <div class="level-item">984K DAI</div>
                                <div class="level-item"> 1.25M DAI</div>
                            </div>
                        </div>
                        <progress class="progress is-primary" value="15" max="100">15%</progress>

                        <div class="level">
                            <div class="level-left">
                                <div class="level-item">Total Contributed to this iteration</div>
                            </div>

                            <div class="level-right">
                                <div class="level-item">soft cap</div>
                                <div class="level-item"> hard cap</div>
                            </div>
                        </div>



                    </div>

                    {/* <p class="title">Contribute to Commons Stack Iteration 1</p>
                    <p class="subtitle">With an image</p>
                    <figure class="image is-4by3">
                        <img alt="Placehodler" src="https://bulma.io/images/placeholders/640x480.png" />
                    </figure>*/}
                </div>
            </article>
        </div>
    );
};


const mapStateToProps = state => {

    return {
        agreedtandc: state.agreedtandc,
        web3available: state.web3available,
    };
};

const mapDispachToProps = dispatch => {
    return {
        onSetAgreedtandc: (signature) => dispatch({ type: "AGREE_TANDC", signature }),
        setShowTandC: (value) => dispatch({ type: "SET_SHOW_TANDC", value })
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(Comp);

