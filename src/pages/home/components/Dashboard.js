import React from "react";
// import { Redirect } from "react-router-dom";
import styled from "styled-components";

const Comp = () => {
    // import styled from 'styled-components'
    const Button = styled.button`
background: palevioletred;
border-radius: 3px;
border: none;
color: white;
`
    const TomatoButton = styled(Button)`
background: tomato;
`
    return (<>
        <Button>I'm purple.</Button>
        <br />
        <TomatoButton>I'm red.</TomatoButton>
    </>);


};

export default Comp;