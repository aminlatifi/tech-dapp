import React from 'react';
// import { Redirect } from "react-router-dom";
// import styled from "styled-components";
import { connect } from 'react-redux';
import MetaMaskButton from '../../../components/MetaMaskButton';

const Comp = ({ web3available }) => {
  if (!web3available) {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Welcome to the TECH token admin page</h1>
          <h2 className="subtitle">
            Please connect to <strong>Metamask</strong> to continue. Click the button below...
          </h2>
          <MetaMaskButton />
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="title">Welcome to the whitelist admin page</h1>
        </div>
      </section>

      {/* <TomatoButton onClick={onSetweb3available}>click to agree</TomatoButton> */}
    </>
  );
};

const mapStateToProps = state => {
  return {
    web3available: state.web3available,
    // web3: state.web3
  };
};

// eslint-disable-next-line no-unused-vars
const mapDispachToProps = dispatch => {
  return {
    // onSetweb3available: () => dispatch({ type: "AGREE_TANDC" }),
  };
};

export default connect(mapStateToProps, mapDispachToProps)(Comp);
