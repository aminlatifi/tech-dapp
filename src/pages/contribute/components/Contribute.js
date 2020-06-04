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
                {_ratio && <p className="title">{_ratio} CSTK / DAI</p>}
              </div>
            </div>
          </nav>
          <p>
            You can contribute with DAI or any of 10 confirmed ERC-20 tokens
            through our automated converter built on top of 1inch.exchange
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
