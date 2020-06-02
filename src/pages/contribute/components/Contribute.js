import React, { useContext } from "react";
import { connect } from "react-redux";
import MetaMaskContext from "../../../components/MetaMask";
import "./Contribute.css";
import MetaMaskButton from "../../../components/MetaMaskButton";
import DAI from 'cryptocurrency-icons/svg/color/dai.svg';
import BN from "bn.js";

const Comp = ({ web3available, agreedtandc, onSetAgreedtandc, setShowTandC, personalCap, numerator, denominator, softCap,
    hardCap, totalReceived }) => {

    const { accounts } = useContext(
        MetaMaskContext,
    );

    const _ratio = numerator && denominator ?
        (numerator / denominator).toFixed(2) : null;

    const _personalCap = personalCap && personalCap.div(new BN("1000000000000000000")).toString(10);

    const _softCap = softCap && softCap.div(new BN("1000000000000000000")).toString(10);
    const _hardCap = hardCap && hardCap.div(new BN("1000000000000000000")).toString(10);
    const _totalReceived = totalReceived && totalReceived.div(new BN("1000000000000000000")).toString(10);

    return (

        <div className="tile is-child">
            <div className="menu contrib level has-text-centered">
                <div className="level-item active">
                    <span>Iteration 1</span>
                </div>
                <div className="level-item">
                    <span>Iteration 2</span>
                </div>
                <div className="level-item">
                    <span>Iteration 3</span>
                </div>
                <div className="level-item">
                    <span>Iteration 4</span>
                </div>
                <div className="level-item">
                    <span>Iteration 5</span>
                </div>
            </div>
            <article className=" notification is-primary">
                <div className="contribmain">

                    <nav className="level">
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="heading">Your personal cap</p>
                                <p className="title">{_personalCap}</p>
                            </div>
                        </div>
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="heading">Current issuance rate</p>
                                {_ratio && (
                                    <p className="title">{_ratio} CSTK / DAI</p>
                                )
                                }
                            </div>
                        </div>
                    </nav>
                    <p>
                        You can contribute with DAI or any of 10 confirmed ERC-20 tokens through our automated converter built on top of 1inch.exchange
</p>


                    {(!accounts || !accounts[0]) && (
                        <div className="enable has-text-centered">


                            <p className="title">Want to contribute to Commons Stack? Connect your wallet below.</p>
                            <MetaMaskButton className="is-outlined" clickMessage="Connect Wallet" />
                        </div>
                    )}
                    <div className="slider">


                        <div className="level">
                            <div className="level-left">
                                <div className="level-item">
                                    <img src={DAI.src} alt={DAI.symbol} /><span>{_totalReceived} DAI</span>
                                </div>
                            </div>

                            <div className="level-right">
                                <div className="level-item">{_softCap} DAI</div>
                                <div className="level-item">{_hardCap} DAI</div>
                            </div>
                        </div>
                        <progress className="progress is-primary" value="15" max="100">15%</progress>

                        <div className="level">
                            <div className="level-left">
                                <div className="level-item">Total Contributed to this iteration</div>
                            </div>

                            <div className="level-right">
                                <div className="level-item">soft cap</div>
                                <div className="level-item"> hard cap</div>
                            </div>
                        </div>



                    </div>

                    {/* <p className="title">Contribute to Commons Stack Iteration 1</p>
                    <p className="subtitle">With an image</p>
                    <figure className="image is-4by3">
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
        personalCap: state.personalCap,
        numerator: state.numerator,
        denominator: state.denominator,
        softCap: state.softCap,
        hardCap: state.hardCap,
        totalReceived: state.totalReceived
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

