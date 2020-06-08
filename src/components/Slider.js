import React from "react";
import { connect } from "react-redux";
import DAI from "cryptocurrency-icons/svg/color/dai.svg";
import BN from "bn.js";
import Spinner from "./Spinner";
import "./Slider.sass";

const Slider = ({ softCap, hardCap, totalReceived, loading }) => {
  const getProgressBarStyles = ({ _softCap, _hardCap, _totalReceived }) => {
    let fill, shadow, full;

    if (_totalReceived < _softCap) {
      fill = (_totalReceived / _hardCap) * 100;
      shadow = ((_softCap - _totalReceived) / _hardCap) * 100;
      full = ((_hardCap - _softCap) / _hardCap) * 100;
    } else {
      fill = (_softCap / _hardCap) * 100;
      shadow = ((_totalReceived - _softCap) / _hardCap) * 100;
      full = ((_hardCap - _totalReceived) / _hardCap) * 100;
    }

    return {
      fill,
      shadow,
      full,
    };
  };

  const _softCap =
    softCap && softCap.div(new BN("1000000000000000000")).toString(10);
  const _hardCap =
    hardCap && hardCap.div(new BN("1000000000000000000")).toString(10);
  const _totalReceived =
    totalReceived &&
    totalReceived.div(new BN("1000000000000000000")).toString(10);

  // Just for testing purposes
  // const _softCap = 18;
  // const _hardCap = 20;
  // const _totalReceived = 19;
  // const _softCap = 18;
  // const _hardCap = 20;
  // const _totalReceived = 10;

  const progressBarStyles = getProgressBarStyles({
    _softCap,
    _hardCap,
    _totalReceived,
  });

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
              {loading ? <Spinner /> : <span>{_totalReceived} DAI</span>}
            </div>
          </div>
        </div>

        <div className="level-right">
          <div className="level-item">
            <p className="subtitle is-6">
              {loading ? (
                <p className="level mr-05">
                  <Spinner />
                  DAI
                </p>
              ) : (
                <p>{_softCap} DAI</p>
              )}
            </p>
          </div>
          <div className="level-item">
            <p className="subtitle is-6">
              {loading ? (
                <p className="level mr-05">
                  <Spinner />
                  DAI
                </p>
              ) : (
                <p>{_softCap} DAI</p>
              )}
            </p>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="progress">
          <div className="progress-bar full" style={{ width: "100%" }}></div>
        </div>
      ) : (
        <div className="progress">
          <div
            className="progress-bar fill"
            style={{ width: `${progressBarStyles.fill}%` }}
          ></div>
          <div
            className="progress-bar shadow"
            style={
              _softCap - _totalReceived > 0
                ? {
                    width: `${progressBarStyles.shadow}%`,
                    backgroundColor: "#4A5D6F",
                  }
                : {
                    width: `${progressBarStyles.shadow}%`,
                    background:
                      "linear-gradient(270deg, #8E2DE2 0%, #4A00E0 100%)",
                  }
            }
          ></div>
          <div
            className="progress-bar full"
            style={{ width: `${progressBarStyles.full}%` }}
          ></div>
        </div>
      )}

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
    loading: state.loading,
  };
};

export default connect(mapStateToProps)(Slider);
