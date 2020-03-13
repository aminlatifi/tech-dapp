// MetaMaskButton.js
import React, { useContext } from "react";
import { connect } from "react-redux";
import MetaMaskContext from "./MetaMask";

const MetaMaskButton = ({ onWeb3Ready }) => {
    const { web3, accounts, error, awaiting, openMetaMask } = useContext(
        MetaMaskContext,
    );

    // function handleButtonClick() {
    //     alert(`Web3 (${web3.version}) is enabled`);
    // }

    if (error && error.message === "MetaMask not installed") {
        return (
            <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
                Install MetaMask
      </a>
        );
    } else if (error && error.message === "User denied account authorization") {
        return (
            <button type="button" className="button is-success" onClick={openMetaMask}>
                Please allow MetaMask to connect.
      </button>
        );
    } else if (error && error.message === "MetaMask is locked") {
        return (
            <button type="button" className="button is-success" onClick={openMetaMask}>
                Please allow MetaMask to connect.
      </button>
        );
    } else if (error) {
        return (
            <button type="button" className="button is-success" onClick={openMetaMask}>
                UNHANDLED ERROR: {error.message}
            </button>
        );
    } else if (!web3 && awaiting) {
        return (
            <button type="button" className="button is-success" onClick={openMetaMask}>
                MetaMask is loading...
      </button>
        );
    } else if (!web3) {
        return (
            <button type="button" className="button is-success" onClick={openMetaMask}>
                Please open and allow MetaMask
      </button>
        );
    } else if (accounts.length === 0) {
        return <button type="button">className="button is-success" No Wallet 🦊</button>;
    } else {
        // `web3` and `account` loaded 🎉
        onWeb3Ready(web3, accounts[0]);
        return (
            <button type="button" className="button is-success">
                <>{accounts[0]}</> 🦊
      </button>
        );
    }
}


const mapStateToProps = state => {
    return {
    };
};
const mapDispachToProps = dispatch => {
    return {
        onWeb3Ready: (web3, account) => dispatch({ type: "WEB3_AVAILABLE", web3, account }),
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(MetaMaskButton);