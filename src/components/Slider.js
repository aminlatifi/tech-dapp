import React from "react";
import { connect } from "react-redux";
import DAI from "cryptocurrency-icons/svg/color/dai.svg";
import BN from "bn.js";
import "./Slider.sass";

const Slider = ({ softCap, hardCap, totalReceived }) => {
  const _softCap =
    softCap && softCap.div(new BN("1000000000000000000")).toString(10);
  const _hardCap =
    hardCap && hardCap.div(new BN("1000000000000000000")).toString(10);
  const _totalReceived =
    totalReceived &&
    totalReceived.div(new BN("1000000000000000000")).toString(10);

  return (
    <div className="slider">
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <span className="icon is-small has-text-light">
              <img src={DAI} alt={DAI} />
              &nbsp;
            </span>

            <div className="linear-gradient-text">
              <p>{_totalReceived} DAI</p>
            </div>
          </div>
        </div>

        <div className="level-right">
          <div className="level-item">
            <p className="subtitle is-6">{_softCap} DAI</p>
          </div>
          <div className="level-item">
            <p className="subtitle is-6">{_hardCap} DAI</p>
          </div>
        </div>
      </div>
      <div className="progress">
        <div className="progress-bar fill"></div>
        <div className="progress-bar shadow"></div>
        <div className="progress-bar full"></div>
      </div>

      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <p className="subtitle is-7">Total Contributed to this iteration</p>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <p className="subtitle is-7">Soft Cap</p>
          </div>
          <div className="level-item">
            <p className="subtitle is-7">Hard Cap</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    softCap: state.softCap,
    hardCap: state.hardCap,
    totalReceived: state.totalReceived,
  };
};

export default connect(mapStateToProps)(Slider);
