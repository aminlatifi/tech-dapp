import React, { useContext } from 'react';
import { connect } from 'react-redux';
import MetaMaskContext from './MetaMask';

const MetaMaskButton = ({ onWeb3Ready }) => {
  const { web3, accounts, error, awaiting, openMetaMask } = useContext(MetaMaskContext);

  if (error && error.message === 'MetaMask not installed') {
    return (
      <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
        Install MetaMask
      </a>
    );
  }
  if (error && error.message === 'User denied account authorization') {
    return (
      <button type="button" className="button is-outlined is-success" onClick={openMetaMask}>
        Please allow MetaMask to connect.
      </button>
    );
  }
  if (error && error.message === 'MetaMask is locked') {
    return (
      <button type="button" className="button is-outlined is-success" onClick={openMetaMask}>
        Please allow MetaMask to connect.
      </button>
    );
  }
  if (error) {
    return (
      <button type="button" className="button is-outlined is-success" onClick={openMetaMask}>
        UNHANDLED ERROR: {error.message}
      </button>
    );
  }
  if (!web3 && awaiting) {
    return (
      <button type="button" className="button is-outlined is-success" onClick={openMetaMask}>
        MetaMask is loading...
      </button>
    );
  }
  if (!web3) {
    return (
      <button type="button" className="button is-outlined is-success" onClick={openMetaMask}>
        Connect Wallet
      </button>
    );
  }
  if (accounts.length === 0) {
    return (
      <button type="button" className="button is-outlined is-success">
        No Wallet
      </button>
    );
  }
  // `web3` and `account` loaded 🎉
  onWeb3Ready(web3, accounts[0]);
  return (
    <button type="button" className="button is-outlined is-success">
      <>{accounts[0]}</>
    </button>
  );
};

const mapStateToProps = state => {
  return {};
};
const mapDispachToProps = dispatch => {
  return {
    onWeb3Ready: (web3, account) => dispatch({ type: 'WEB3_AVAILABLE', web3, account }),
  };
};

export default connect(mapStateToProps, mapDispachToProps)(MetaMaskButton);
