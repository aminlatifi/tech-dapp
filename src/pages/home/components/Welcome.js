import React from "react";
// import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import TandC from "./TandC";

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
        <Button>Agreed : {`val=${agreed}`}</Button>
        <br />
        <TandC/>
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

