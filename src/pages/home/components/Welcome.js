import React from "react";
// import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import TandC from "./TandC";
import MetaMaskButton from "../../../components/MetaMaskButton";

const Comp = ({ agreed, onSetAgreed }) => {

    // import styled from 'styled-components'
    const Button = styled.button`
background: palevioletred;
border-radius: 3px;
border: none;
color: white;
`
    //     const TomatoButton = styled(Button)`
    // background: tomato;
    // `
    return (<>
        <section class="section">
            <div class="container">
                <h1 class="title">Section</h1>
                <h2 class="subtitle">
                    A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading
      </h2>
      <MetaMaskButton/>
            </div>
        </section>
        <TandC />
        {/* <TomatoButton onClick={onSetAgreed}>click to agree</TomatoButton> */}
    </>);
};


const mapStateToProps = state => {

    return {
        agreed: state.agreed,
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

