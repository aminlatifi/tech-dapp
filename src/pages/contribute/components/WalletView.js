import React, { useContext } from "react";
import MetaMaskContext from "../../../components/MetaMask";
import { connect } from "react-redux";
import DAI from "cryptocurrency-icons/svg/color/dai.svg";
import ETH from "cryptocurrency-icons/svg/color/eth.svg";
import ANT from "cryptocurrency-icons/svg/color/ant.svg";
import BAT from "cryptocurrency-icons/svg/color/bat.svg";
import TandC from "./TandC";
import ToDai from "./ToDai";

const coinLogos = [
  { symbol: "DAI", src: DAI },
  { symbol: "ETH", src: ETH },
  { symbol: "ANT", src: ANT },
  { symbol: "BAT", src: BAT },
];

const Comp = ({
  agreedtandc,
  showtandc,
  account,
  balances,
  getBalancesFor,
  setShowTandC,
}) => {
  const { accounts } = useContext(MetaMaskContext);

  // TODO: this should be moved to the store IMO
  React.useEffect(() => {
    if (accounts && accounts[0]) {
      getBalancesFor(accounts[0]);
    }
  }, [accounts, getBalancesFor]);

  //TODO: Will be pulled form the state, just for now
  const defaultCoins = [
    {
      symbol: "DAI",
      contractaddress: "0xad6d458402f60fd3bd25163575031acdce07538d",
    },
    {
      symbol: "ETH",
    },
    {
      symbol: "ANT",
    },
    {
      symbol: "BAT",
    },
  ];

  const coins =
    (balances && balances[account] && balances[account]) || defaultCoins;

  // DAI balance
  const daiBalance = coins
    .filter((coin) => {
      return coin.symbol === "DAI";
    })
    .map((coin) => {
      const logo = coinLogos.find((coinIcon) => {
        return coinIcon.symbol === coin.symbol;
      });
      return (
        <div key={coin.symbol} className="title is-6 level mb-04">
          <div className="level-left mb-04">
            <span>Total available balance</span>
            <span class="icon info-icon-small is-small has-text-info">
              <i class="fas fa-info-circle"></i>
            </span>
          </div>
          <div className="level-right has-text-right">
            {coin.status || coin.balanceFormatted || "~"} {coin.symbol}{" "}
            <span className="icon is-small has-text-light">
              &nbsp;
              <img src={logo.src} alt={coin.symbol} />
            </span>
          </div>
        </div>
      );
    });

  // all other known balances - except DAI
  const otherBalances = coins.reduce((accum, coin) => {
    if (coin.symbol === "DAI") return accum;
    const logo = coinLogos.find((coinIcon) => {
      return coinIcon.symbol === coin.symbol;
    });
    accum.push(
      <div key={coin.symbol} className="title level mb-04">
        <div className="subtitle level-left mb-04">
          <span className="icon has-text-light mr-02">
            <img src={logo.src} alt={coin.symbol} />
            &nbsp;
          </span>{" "}
          {coin.symbol}
        </div>
        {balances && balances[account] ? (
          <div className="subtitle level-right">
            <ToDai coin={coin.symbol} balance={coin.balance} /> DAI
          </div>
        ) : (
          <div className="subtitle level-right">
            <span>~DAI</span>
          </div>
        )}
      </div>
    );
    return accum;
  }, []);

  if (showtandc && accounts && accounts[0]) {
    return <TandC />;
  }

  return (
    <>
      <p className="title is-text-overflow mb-2">
        {account ? `Wallet ${account}` : "No Wallet Connected"}
      </p>
      <div className="subtitle mb-08">
        <div class="title-level">
          <div class="level-left">
            <span class="icon">
              <i class="fas fa-times-circle"></i>
            </span>
            <span className="is-size-7">Terms and Conditions signed</span>
          </div>
          <div class="level-left">
            <span class="icon">
              <i class="fas fa-times-circle"></i>
            </span>
            <span className="is-size-7">
              Applied to Trusted Seed (Whitelist)
            </span>
          </div>
        </div>
      </div>
      <div class="is-divider mb-08"></div>
      {/* <p className="subtitle">
        <span>Terms and conditions signed</span>
        {agreedtandc !== true && accounts && accounts[0] ? (
          <>
            [no]{" "}
            <span
              onClick={() => {
                setShowTandC(true);
              }}
            >
              [sign]
            </span>
          </>
        ) : (
          <>
            <span>[X]</span>
          </>
        )}
      </p> */}
      <>
        {daiBalance}
        {otherBalances}
      </>
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

const mapDispachToProps = (dispatch) => {
  return {
    // onSetAgreed: () => dispatch({ type: "AGREE_TANDC" }),
    getBalancesFor: (address) =>
      dispatch({ type: "GET_BALANCES_FOR_ADDRESS", address }),
    setShowTandC: (value) => dispatch({ type: "SET_SHOW_TANDC", value }),
  };
};

export default connect(mapStateToProps, mapDispachToProps)(Comp);
