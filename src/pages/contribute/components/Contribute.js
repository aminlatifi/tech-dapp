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

const Comp = ({
    web3available,
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
    const { accounts } = useContext(MetaMaskContext);

    const _ratio =
        numerator && denominator ? (numerator / denominator).toFixed(2) : null;

    const _personalCap =
        personalCap && personalCap.div(new BN("1000000000000000000")).toString(10);

    return (
        <div className="tile is-child">
            <article className=" notification is-primary">
                <div className="contribmain">

                    <p className="subtitle mb-2">
                        YOUR MEMBERSSHIP SCORE
              </p>

                    <article class="media">
                        <figure class="media-left">
                            <p class="image is-64x64">
                                <img alt="CSTK logo" src={Cstk} />
                            </p>
                        </figure>
                        <div class="media-content">
                            <div class="content">
                                <p className="heading is-size-2">0 CSTK</p>
                            </div>
                        </div>
                    </article>
                    <br />
                    <p>
                        You can pay membership dues with DAI only. You can aquire DAI on <a rel="noopener noreferrer" target="_blank" href="https://1inch.exchange">1inch.exchange</a>
                    </p>
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
                            <p className="subtitle mb-2">
                                FOR YOUR CONTRIBUTION YOU WILL ALSO RECEIVE:
              </p>
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
        web3available: state.web3available,
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
