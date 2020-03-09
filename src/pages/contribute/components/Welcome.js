import React, { useContext } from "react";
// import { Redirect } from "react-router-dom";
// import styled from "styled-components";
import { connect } from "react-redux";
import TandC from "./TandC";
// import MetaMaskButton from "../../../components/MetaMaskButton";
import MetaMaskContext from "../../../components/MetaMask";
import WalletView from "./WalletView";

const Comp = ({ agreedtandc, web3available }) => {

    const { web3, accounts, error, awaiting, openMetaMask } = useContext(
        MetaMaskContext,
    );

    // import styled from 'styled-components'
    //     const Button = styled.button`
    // background: palevioletred;
    // border-radius: 3px;
    // border: none;
    // color: white;
    // `
    //     const TomatoButton = styled(Button)`
    // background: tomato;
    // `
    return (<>
        <section className="section has-text-left">

            <div class="tile is-ancestor">
                <div class="tile is-4 is-vertical is-parent  ">

                    <article class="tile is-child notification is-primary">
                       <WalletView/>
                    </article>

                    <article class="tile is-child notification is-primary">
                        <p class="title">Current contribution</p>
                        <p class="subtitle">...</p>
                    </article>
                </div>
                <div class="tile is-parent">
                    <article class="tile is-child notification is-primary">
                        <p class="title">Contribute to Commons Stack Iteration 1</p>
                        <p class="subtitle">With an image</p>
                        <figure class="image is-4by3">
                            <img src="https://bulma.io/images/placeholders/640x480.png" />
                        </figure>
                    </article>
                </div>



            </div>


            {/* <div className="container">
                <h1 className="title">!Welcome to the TECH token Contribution page</h1>
                <h2 className="subtitle">
                    Please connect to <strong>Metamask</strong> to continue. Click the button below...
      </h2>
                <MetaMaskButton />
                <p>Web3 {JSON.stringify(web3available)}</p>
    </div> */}
        </section>
        {/* <TomatoButton onClick={onSetAgreed}>click to agree</TomatoButton> */}
    </>);
};


const mapStateToProps = state => {

    return {
        ...state.agreedtandc,
        web3available: state.web3available
    };
};

const mapDispachToProps = dispatch => {
    return {
        // onSetAgreed: () => dispatch({ type: "AGREE_TANDC" }),
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(Comp);

