import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Comp = ({ agreed, onSetAgreed }) => {

    //     const TomatoButton = styled(Button)`
    // background: tomato;
    // `
    return (<>
        <section className="section">
            <div className="container">
                <h1 className="title">Welcome to the TECH token Contribution page</h1>
                <h2 className="subtitle">
                    <Link
                        className=" button is-success is-outlined is-large"
                        to={{
                            pathname: "/contribute"
                        }}
                    >Start the contribution DApp</Link>
                </h2>
              
            </div>
        </section>
    </>);
};


const mapStateToProps = state => {

    return {
        // agreed: state.agreed,
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

