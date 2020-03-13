import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import MetaMaskButton from "../../../components/MetaMaskButton";
import MetaMaskContext from "../../../components/MetaMask";
import * as util from "../../../util/techcontroller"
import sigUtil from "eth-sig-util";

const Comp = ({ web3available }) => {

    const { web3 } = useContext(
        MetaMaskContext,
    );

    const [isWhitelistAdmin, setIsWhitelistAdmin] = React.useState(false);
    const [loginSignature, setLoginSignature] = React.useState(false);

    useEffect(() => {
        if (web3) {
            util.isWhitelistAdmin(web3, web3.currentProvider.selectedAddress).then((iswl) => {
                setIsWhitelistAdmin(iswl);
            });
        }
    }, [web3]);

    if (!web3available || !web3) {

        return (
            <section className="section">
                <div className="container">
                    <h1 className="title">Welcome to the TECH token admin page</h1>
                    <h2 className="subtitle">Please connect to <strong>Metamask</strong> to continue. Click the button below...</h2>
                    <MetaMaskButton />
                </div>
            </section>
        )
    }

    const loginSign = () => {
        if (!loginSignature && web3) {

            const msgParams = [
                {
                    type: 'string',      // Any valid solidity type
                    name: 'Message',     // Any string label you want
                    value: 'Login Request'  // The value to sign
                },
                //    {   
                //      type: 'uint32',
                //         name: 'A number',
                //         value: '1337'
                //     }
            ];
            const from = web3.currentProvider.selectedAddress;

            web3.currentProvider.sendAsync({
                method: 'eth_signTypedData',
                params: [msgParams, from],
                from: from,
            }, function (err, result) {
                if (err) return console.error(err)
                if (result.error) {
                    return console.error(result.error.message)
                }

                const recovered = sigUtil.recoverTypedSignature({
                    data: msgParams,
                    sig: result.result
                })
                if (recovered === from) {
                    // alert('Recovered signer: ' + from)
                    // debugger;
                    setLoginSignature(result.result);
                } else {
                    alert('Failed to verify signer, got: ' + result)
                }
            });


        }
    };



    return (<>
        <section className="section">
            <div className="container">
                <h1 className="title">Welcome to the whitelist admin page</h1>
                <h2 className="subtitle">{web3.currentProvider.selectedAddress}</h2>
                {isWhitelistAdmin !== undefined ? (<p>you are whitelistadmin</p>) : (<p>you are no whitelistadmin</p>)}
                <button onClick={loginSign}>Sign in to API</button>
                {JSON.stringify(loginSignature)}
            </div>
        </section>

        {/* <TomatoButton onClick={onSetweb3available}>click to agree</TomatoButton> */}
    </>);
};


const mapStateToProps = state => {

    return {
        web3available: state.web3available,
        // web3: state.web3
    };
};

const mapDispachToProps = dispatch => {
    return {
        // onSetweb3available: () => dispatch({ type: "AGREE_TANDC" }),
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(Comp);

