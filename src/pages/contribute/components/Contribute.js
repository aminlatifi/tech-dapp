import React, { useContext } from "react";
import { connect } from "react-redux";
import MetaMaskContext from "../../../components/MetaMask";
import "./Contribute.sass";
import MetaMaskButton from "../../../components/MetaMaskButton";
import BN from "bn.js";
import GovernanceRights from "../../../assets/governanceRights.svg";
import Access from "../../../assets/access.svg";
import Membership from "../../../assets/membership.svg";
import Slider from "../../../components/Slider";
import Cstk from "../../../assets/cstk.svg";
import ContributeForm from "./ContributeForm";

const Comp = ({
    web3,
    agreedtandc,
    onSetAgreedtandc,
    setShowTandC,
    personalCap,
    numerator,
    denominator,
    softCap,
    hardCap,
    totalReceived,
}) => {

    const viewStates = Object.freeze({
        "INIT": 1,
        "WAITINGTOCONTRIBUTE": 2,
        "STARTDONATING": 3,
    });

    const changeViewState = (from, to) => {
        // make sure you can only transition from a known state to another known state
        if (viewState === from) {
            setViewState(to);
        } else {
            console.log(`Cannot transition to this VS`);
        }
    }

    React.useEffect(() => {
        if (web3 && agreedtandc) {
            changeViewState(viewStates.INIT, viewStates.WAITINGTOCONTRIBUTE);
        }
    }, [web3, agreedtandc]);


    const [viewState, setViewState] = React.useState(viewStates.INIT);

    const { accounts } = useContext(MetaMaskContext);

    return (
        <div className="tile is-child">
            <article className=" notification is-primary">
                <div className="contribmain">

                    <p className="subtitle mb-2">
                        YOUR MEMBERSHIP SCORE
              </p>

                    <div class="level">
                        <div class="level-left">
                            <div class="level-item">
                                <article class="media">
                                    <figure class="media-left">
                                        <p class="image is-64x64">
                                            <img alt="CSTK logo" src={Cstk} />
                                        </p>
                                    </figure>
                                    <div class="media-content">
                                        <div class="content">
                                            <p className="heading is-size-2 has-text-weight-bold">0 CSTK</p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                        <div class="level-right">
                            <div class="level-item">
                                <span>
                                    {viewState === viewStates.WAITINGTOCONTRIBUTE && (
                                        <button onClick={() => { changeViewState(viewStates.WAITINGTOCONTRIBUTE, viewStates.STARTDONATING) }} class="button is-success is-medium">Make Contribution</button>
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                    <br />
                    <p>
                        You can pay membership dues with DAI only. You can acquire DAI on <a rel="noopener noreferrer" target="_blank" href="https://1inch.exchange">1inch.exchange</a>
                    </p>

                    {viewState === viewStates.STARTDONATING && (
                        <ContributeForm />
                    )}

                    {(!accounts || !accounts[0]) && (
                        <div className="enable has-text-centered">
                            <p className="title">
                                Want to contribute to Commons Stack? Connect your wallet below.
                            </p>
                            <MetaMaskButton
                                className="is-outlined"
                                clickMessage="Connect Wallet"
                            />
                        </div>
                    )}
                    <div className="is-divider mt-2 mb-2"></div>
                    <Slider />
                    <div className="is-divider mt-2 mb-2"></div>
                    <div className="title-level">
                        <div className="level-left">
                            <p className="subtitle mb-2">FOR YOUR CONTRIBUTION YOU WILL ALSO RECEIVE:</p>
                        </div>

                        <div className="level">
                            <div className="items-container">
                                <div className="level-item">
                                    <div className="title-level">
                                        <div className="item-container">
                                            <img src={GovernanceRights} alt="Governance Rights" />

                                            <p className="subtitle">
                                                <span>Governance Rights</span>
                                                <span class="icon info-icon-small is-small has-text-info">
                                                    <i class="fas fa-info-circle"></i>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="level-item">
                                    <div className="title-level">
                                        <div className="item-container">
                                            <img
                                                src={Access}
                                                alt="Access to Future ABC Hatch Phases"
                                            />
                                            <p className="subtitle">
                                                <span>Access to Future ABC Hatch Phases</span>
                                                <span class="icon info-icon-small is-small has-text-info">
                                                    <i class="fas fa-info-circle"></i>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="level-item">
                                    <div className="title-level">
                                        <div className="item-container">
                                            <img
                                                src={Membership}
                                                alt="Membership in Swiss Commons Stack Associations"
                                            />
                                            <p className="subtitle">
                                                <span>
                                                    Membership in Swiss Commons Stack Associations
                        </span>
                                                <span class="icon info-icon-small is-small has-text-info">
                                                    <i class="fas fa-info-circle"></i>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div >
    );
};

const mapStateToProps = (state) => {
    return {
        agreedtandc: state.agreedtandc,
        web3: state.web3,
        personalCap: state.personalCap,
        numerator: state.numerator,
        denominator: state.denominator,
        softCap: state.softCap,
        hardCap: state.hardCap,
        totalReceived: state.totalReceived,
    };
};

const mapDispachToProps = (dispatch) => {
    return {
        onSetAgreedtandc: (signature) =>
            dispatch({ type: "AGREE_TANDC", signature }),
        setShowTandC: (value) => dispatch({ type: "SET_SHOW_TANDC", value }),
    };
};

export default connect(mapStateToProps, mapDispachToProps)(Comp);
