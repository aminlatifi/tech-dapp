import React from "react";
// import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";

const Comp = ({ agreed, onSetAgreed }) => {

    const [agreetandc, setAgreetandc] = React.useState(false);
    const [box2, setBox2] = React.useState(false);
    const [box3, setBox3] = React.useState(false);
    const [enableSubmit, setEnableSubmit] = React.useState(false);

    React.useEffect(() => {
        console.log("Check all ??");
        setEnableSubmit(agreetandc && box2 && box3);
    }, [agreetandc, box2, box3]);


    return (<>
        <div className={`modal ${agreed ? '' : 'is-active'}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Terms And Conditions</p>
                    <button className="delete" aria-label="close"></button>
                </header>
                <section className="modal-card-body">

                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input
                                    name="tandc"
                                    type="checkbox"
                                    checked={agreetandc}
                                    onChange={(e) => { setAgreetandc(e.target.checked) }}
                                />
                                I agree to the terms and conditions
    </label>
                        </div>
                    </div>



                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input
                                    name="tandc"
                                    type="checkbox"
                                    checked={box2}
                                    onChange={(e) => { setBox2(e.target.checked) }}
                                />
                                and to this
                            </label>
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input
                                    name="tandc"
                                    type="checkbox"
                                    checked={box3}
                                    onChange={(e) => { setBox3(e.target.checked) }}
                                />
                                and this as well
                            </label>
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <button disabled={!enableSubmit} onClick={onSetAgreed} className="button is-success">Continue</button>
                </footer>
            </div>
        </div >
    </>);
};


const mapStateToProps = state => {

    return {
        agreed: state.agreed,
    };
};

const mapDispachToProps = dispatch => {
    return {
        onSetAgreed: () => dispatch({ type: "AGREE_TANDC" }),
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(Comp);

