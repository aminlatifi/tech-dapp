import React, { useContext } from "react";
// import MetaMaskContext from "../../../components/MetaMask";
import { connect } from "react-redux";
import BN from "bn.js";
// import DAI from 'cryptocurrency-icons/svg/color/dai.svg';
// import ETH from 'cryptocurrency-icons/svg/color/eth.svg';
// import TandC from "./TandC";
// import ToDai from "./ToDai";

// const coinLogos = [
//     { symbol: "DAI", src: DAI },
//     { symbol: "ETH", src: ETH }
// ];

const Comp = ({ account, readFundingContract, cstackBalance, rcstackBalance }) => {

    // const { accounts } = useContext(
    //     MetaMaskContext,
    // );

    React.useEffect(() => {
        if (account) {
            readFundingContract(account);
        }
    }, [account, readFundingContract]);

    // // balance in DAI
    // const daiBalance = balances && balances[account] && balances[account].filter((coin) => {
    //     return (coin.symbol === "DAI")
    // }).map((coin)=>{
    //     const logo = coinLogos.find((coinIcon) => { return coinIcon.symbol === coin.symbol });
    //     return (
    //         <div key={coin.symbol} className="title level">
    //         <div className="level-left">Total available balance</div>
    //         <div className="level-right has-text-right">{coin.status || coin.balanceFormatted} {coin.symbol} <span className="icon has-text-light">&nbsp;<img src={logo.src} alt={coin.symbol} /></span></div>
    //     </div>
    //     )
    // })

    // // all other known balances - except DAI
    // const otherBalances = balances && balances[account] && balances[account].reduce((accum,coin) => {
    //     if (coin.symbol === "DAI") return accum;
    //     const logo = coinLogos.find((coinIcon) => { return coinIcon.symbol === coin.symbol });
    //     accum.push(<>
    //         <div key={coin.symbol} className="title level">
    //             <div className="level-left"><span className="icon has-text-light"><img src={logo.src} alt={coin.symbol} />&nbsp;</span> {coin.status || coin.balanceFormatted} {coin.symbol}</div>
    //             <div className="level-right has-text-right"><ToDai coin={coin.symbol} balance={coin.balance}/> DAI</div>
    //         </div>
    //     </>);
    //     return accum;
    // },[])

    // if (showtandc && accounts && accounts[0]) {
    //     return (
    //         <TandC />
    //     );
    // }

    return (<>

        <p className="title">Your Current CSTK Holdings</p>
        {/* <p className="subtitle">...</p> */}
        {(rcstackBalance !== undefined) && (
            <div className="subtitle">{rcstackBalance.div(new BN("1000000000000000000")).toString(10)} rCSTK</div>
        )}
        {(cstackBalance !== undefined) && (
            <div className="subtitle">{cstackBalance.div(new BN("1000000000000000000")).toString(10)} CSTACK </div>
        )}
        {(rcstackBalance === new BN(0) && cstackBalance === new BN(0)) && (
         <p className="subtitle">You haven't contributed anything yet.</p>
        )}
    </>
    );
};


const mapStateToProps = ({ account, cstackBalance, rcstackBalance }) => {
    return {
        account,
        cstackBalance,
        rcstackBalance,
    };
};

const mapDispachToProps = dispatch => {
    return {
        readFundingContract: (value) => dispatch({ type: "READ_FUNDING_CONTRACT", value })
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(Comp);
