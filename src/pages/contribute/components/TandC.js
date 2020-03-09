import React, { useContext } from "react";
// import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import MetaMaskContext from "../../../components/MetaMask";
import tandcData from "../../../assets/tandc.json";

const Comp = ({ web3available, agreedtandc, onSetAgreedtandc }) => {

    const { web3, accounts, error, awaiting, openMetaMask } = useContext(
        MetaMaskContext,
    );

    const [agreetandc, setAgreetandc] = React.useState(false);
    const [box2, setBox2] = React.useState(false);
    const [box3, setBox3] = React.useState(false);
    const [enableSubmit, setEnableSubmit] = React.useState(false);

    React.useEffect(() => {
        setEnableSubmit(agreetandc && box2 && box3);
        console.log("Check all ??", agreetandc ? "true" : "false", box2 ? "true" : "false", box3 ? "true" : "false", enableSubmit ? "true" : "false");
    }, [setEnableSubmit, enableSubmit, agreetandc, box2, box3]);


    return (
        <>
            <div className="is-active">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Terms And Conditions</p>
                        {/* <button className="delete" aria-label="close"></button> */}
                    </header>
                    <section className="modal-card-body">
                        <pre>
                            {tandcData.data}
                        </pre>

                        <div className="field">


                            <div className="control">
                                <label className="checkbox">
                                    <input
                                        name="agreetandc"
                                        type="checkbox"
                                        checked={agreetandc}
                                        onChange={(e) => { setAgreetandc(e.target.checked) }}
                                    />
                                    I agree to these terms and conditions

                      </label>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                                <label className="checkbox">
                                    <input
                                        name="box2"
                                        type="checkbox"
                                        checked={box2}
                                        onChange={(e) => { setBox2(e.target.checked) }}
                                    />
                                    and to this
                            </label>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                                <label className="checkbox">
                                    <input
                                        name="box3"
                                        type="checkbox"
                                        checked={box3}
                                        onChange={(e) => { setBox3(e.target.checked) }}
                                    />
                                    <span>I agree to cryptographically sign a copy by signing the IPFS hash {tandcData.hash}</span>
                                </label>
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button disabled={!enableSubmit} onClick={onSetAgreedtandc} className="button is-success">Sign these T&C with my wallet</button>
                    </footer>
                </div>
            </div >
        </>);
};


const mapStateToProps = state => {

    return {
        agreedtandc: state.agreedtandc,
        web3available: state.web3available,
    };
};

const mapDispachToProps = dispatch => {
    return {
        onSetAgreedtandc: () => dispatch({ type: "AGREE_TANDC" }),
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(Comp);

