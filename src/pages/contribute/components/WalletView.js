import React, { useContext } from "react";
import MetaMaskContext from "../../../components/MetaMask";
import { connect } from "react-redux";
import DAI from 'cryptocurrency-icons/svg/color/dai.svg';
import ETH from 'cryptocurrency-icons/svg/color/eth.svg';
import TandC from "./TandC";
import ToDai from "./ToDai";

const coinLogos = [
    { symbol: "DAI", src: DAI },
    { symbol: "ETH", src: ETH }
];

const Comp = ({ agreedtandc, showtandc, account, balances, getBalancesFor, setShowTandC }) => {

    const { accounts } = useContext(
        MetaMaskContext,
    );

    React.useEffect(() => {
        if (accounts && accounts[0]) {
            getBalancesFor(accounts[0]);
        }
    }, [accounts, getBalancesFor]);

    // balance in DAI
    const daiBalance = balances && balances[account] && balances[account].filter((coin) => {
        return (coin.symbol === "DAI")
    }).map((coin)=>{
        const logo = coinLogos.find((coinIcon) => { return coinIcon.symbol === coin.symbol });
        return (
            <div key={coin.symbol} className="title level">
            <div className="level-left">Total available balance</div>
            <div className="level-right has-text-right">{coin.status || coin.balanceFormatted} {coin.symbol} <span class="icon has-text-light">&nbsp;<img src={logo.src} alt={coin.symbol} /></span></div>
        </div>
        )
    })
    
    // all other known balances - except DAI
    const otherBalances = balances && balances[account] && balances[account].reduce((accum,coin) => {
        if (coin.symbol === "DAI") return accum;
        const logo = coinLogos.find((coinIcon) => { return coinIcon.symbol === coin.symbol });
        accum.push(<>
            <div key={coin.symbol} className="title level">
                <div className="level-left"><span class="icon has-text-light"><img src={logo.src} alt={coin.symbol} />&nbsp;</span> {coin.status || coin.balanceFormatted} {coin.symbol}</div>
                <div className="level-right has-text-right"><ToDai coin={coin.symbol} balance={coin.balance}/> DAI</div>
            </div>
        </>);
        return accum;
    },[])

    if (showtandc && accounts && accounts[0]) {
        return (
            <TandC />
        );
    }

    return (<>

        <p class="title is-text-overflow">{`Wallet ${account || ""}`}</p>
        <p class="subtitle">
            Terms and conditions signed
     {(agreedtandc !== true && accounts && accounts[0]) ? (
                <>
                    [no] <span onClick={() => { setShowTandC(true) }}>[sign]</span>
                    {/* <TandC /> */}
                </>
            ) : (
                    <>
                        [X]
           
                    </>

                )}

        </p>
        <br />
    {accounts && accounts[0] && (
        <>
        {daiBalance}
        <p>Other balances</p>
        {otherBalances}
</>
    )}
    </>
    );
};


const mapStateToProps = ({ showtandc, account, balances, needagreetandc }) => {
    return {
        showtandc,
        needagreetandc,
        account,
        balances,
    };
};

const mapDispachToProps = dispatch => {
    return {
        // onSetAgreed: () => dispatch({ type: "AGREE_TANDC" }),
        getBalancesFor: (address) => dispatch({ type: "GET_BALANCES_FOR_ADDRESS", address }),
        setShowTandC: (value) => dispatch({ type: "SET_SHOW_TANDC", value })
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(Comp);
