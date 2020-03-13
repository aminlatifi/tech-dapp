import React, { useContext } from "react";
import MetaMaskContext from "../../../components/MetaMask";
import { connect } from "react-redux";
import DAI from 'cryptocurrency-icons/svg/color/dai.svg';

const coinLogos = [
    { symbol: "DAI", src: DAI }
];


const Comp = ({ agreedtandc, account, balances, getBalancesFor }) => {

    const { web3, accounts, error, awaiting, openMetaMask } = useContext(
        MetaMaskContext,
    );

    React.useEffect(() => {
        if (accounts && accounts[0]) {
            getBalancesFor(accounts[0]);
        }
    }, [accounts, getBalancesFor]);



    const b = balances && balances[account] && balances[account].map((coin) => {
        const logo = coinLogos.find((coinIcon) => { return coinIcon.symbol === coin.symbol });
        return (<>
            <div className="title level">
                <div className="level-left">Available Balance</div>
                <div className="level-right has-text-right">{coin.status || coin.balance} {coin.symbol} &nbsp;<span class="icon has-text-light"><img src={logo.src} alt={coin.symbol} /></span></div>
            </div>
        </>);
    })

    if (!account) {
        return (
            <>
                <p class="title is-text-overflow">{`Wallet`}</p>
                <p class="subtitle">Please connect your wallet to view your balances</p>
            </>
        )
    }


    return (<>
        <p class="title is-text-overflow">{`Wallet ${account || ""}`}</p>
        <p class="subtitle">
            Terms and conditions signed
     {agreedtandc !== true ? (
                <>
                    [no]
             {/* <TandC /> */}
                </>
            ) : (
                    <>
                        [X]
             {/* <TandC /> */}
                    </>

                )}

        </p>
        <br/>
        {b}
    </>
    );
};


const mapStateToProps = ({ agreedtandc, account, balances }) => {

    return {
        agreedtandc,
        account,
        balances,
    };
};

const mapDispachToProps = dispatch => {
    return {
        // onSetAgreed: () => dispatch({ type: "AGREE_TANDC" }),
        getBalancesFor: (address) => dispatch({ type: "GET_BALANCES_FOR_ADDRESS", address }),

    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(Comp);
