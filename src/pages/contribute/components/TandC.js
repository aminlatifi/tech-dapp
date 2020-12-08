import React, { useContext } from "react";
import { connect } from "react-redux";
import MetaMaskContext from "../../../components/MetaMask";
import tandcData from "../../../assets/tandc.json";
import "./TandC.sass";

const Comp = ({
                  onSetAgreedtandc,
              }) => {
    const { web3, accounts } = useContext(
        MetaMaskContext
    );

    console.log("accounts", accounts);

    const [agreetandc, setAgreetandc] = React.useState(false);
    const [box3, setBox3] = React.useState(false);
    const [enableSubmit, setEnableSubmit] = React.useState(false);

    const [signError, setSignError] = React.useState();

    React.useEffect(() => {
        setEnableSubmit(agreetandc && box3);
        console.log(
            "Check all ??",
            agreetandc ? "true" : "false",
            box3 ? "true" : "false",
            enableSubmit ? "true" : "false"
        );
    }, [setEnableSubmit, enableSubmit, agreetandc, box3]);

    if (!accounts || !accounts[0]) {
        return <div>Waiting for web3 provider</div>;
    }

    const signIt = (message) => {
        const from = web3.currentProvider.selectedAddress;

        web3.eth.personal.sign(
            message, from, '',
            (err, signature) => {

                if (err) {
                    return setSignError("Signature failed.");
                }

                if (!signature) {
                    return setSignError("No signature received.");
                }
                onSetAgreedtandc(message, signature, accounts[0]);
            }
        );
    };

    return (
        <>
            <div className="tandc modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Terms And Conditions</p>
                        {/* <button
              className="delete"
              onClick={() => {
                setShowTandC(false);
              }}
              aria-label="close"
            ></button> */}
                    </header>
                    <div class="is-divider"></div>
                    <section className="modal-card-body">
                        <p class="tandccontent">{tandcData.data}</p>

                        <div className="field">
                            <div className="control">
                                <label className="checkbox">
                                    <input
                                        name="agreetandc"
                                        type="checkbox"
                                        checked={agreetandc}
                                        onChange={(e) => {
                                            setAgreetandc(e.target.checked);
                                        }}
                                    />
                                    I agree to these terms and conditions
                                </label>
                            </div>
                        </div>
                        {/*
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
                        </div> */}
                        <div className="field">
                            <div className="control">
                                <label className="checkbox">
                                    <input
                                        name="box3"
                                        type="checkbox"
                                        checked={box3}
                                        onChange={(e) => {
                                            setBox3(e.target.checked);
                                        }}
                                    />
                                    <span>
                                        I agree to cryptographically sign a copy of these Terms and
                    Conditions by signing its IPFS hash{" "}
                                        <a
                                            target="_new"
                                            href={`https://ipfs.io/ipfs/${tandcData.hash}`}
                                        >
                                            {tandcData.hash}
                                        </a>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </section>
                    <div class="is-divider"></div>
                    <footer className="modal-card-foot">
                        <div class="tile is-ancestor">
                            <div class="tile is-vertical ">
                                <div class="level">
                                    <div class="level-left">
                                        <span class="icon has-text-info is-medium">
                                            <i class="fas fa-info-circle"></i>
                                        </span>
                                        <span className="is-size-7">
                                            Be sure to connect the right wallet which will be
                                            whitelisted and from which you will make contribution
                    </span>
                                        {signError && <p class="help is-danger">{signError}</p>}
                                    </div>
                                </div>
                            </div>
                            <div class="tile is-vertical ">
                                <div class="">
                                    <button
                                        disabled={!enableSubmit}
                                        onClick={() => {
                                            signIt(
                                                `I agree with Terms and Conditions corresponding to IPFS hash ${tandcData.hash}`
                                            );
                                        }}
                                        className="button is-pulled-right is-outlined is-success"
                                    >
                                        Sign with my wallet
                                    </button>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        agreedtandc: state.agreedtandc,
        web3available: state.web3available,
    };
};

const mapDispachToProps = (dispatch) => {
    return {
        onSetAgreedtandc: (message, signature, address) =>
            dispatch({ type: "AGREE_TANDC", message, signature, address }),
        setShowTandC: (value) => dispatch({ type: "SET_SHOW_TANDC", value }),
    };
};

export default connect(mapStateToProps, mapDispachToProps)(Comp);
