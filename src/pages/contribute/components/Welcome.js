import React from "react";
import { connect } from "react-redux";
import WalletView from "./WalletView";

const Comp = ({ agreedtandc, web3available }) => {
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
                            <img alt="Placehodler" src="https://bulma.io/images/placeholders/640x480.png" />
                        </figure>
                    </article>
                </div>
            </div>
        </section>
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

