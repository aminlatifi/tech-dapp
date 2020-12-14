import React, { useContext } from 'react';
import { connect } from 'react-redux';
import DAI from 'cryptocurrency-icons/svg/color/dai.svg';
import ETH from 'cryptocurrency-icons/svg/color/eth.svg';
import MetaMaskContext from '../../../components/MetaMask';
import CSTK from '../../../assets/cstk.svg';
import TandC from './TandC';

const coinLogos = [
  { symbol: 'DAI', src: DAI },
  { symbol: 'ETH', src: ETH },
  { symbol: 'CSTK', src: CSTK },
  // { symbol: "ANT", src: ANT },
  // { symbol: "BAT", src: BAT },
];

const Comp = ({ agreedtandc, showtandc, account, balances, getBalancesFor, userIsWhiteListed }) => {
  const { accounts } = useContext(MetaMaskContext);

  // TODO: this should be moved to the store IMO
  React.useEffect(() => {
    if (accounts && accounts[0]) {
      getBalancesFor(accounts[0]);
    }
  }, [accounts, getBalancesFor]);

  // TODO: Will be pulled form the state, just for now
  const defaultCoins = [
    {
      symbol: 'DAI',
      contractaddress: '0xad6d458402f60fd3bd25163575031acdce07538d',
    },
    {
      symbol: 'ETH',
    },
    // {
    //   symbol: "ANT",
    // },
    // {
    //   symbol: "BAT",
    // },
  ];

  const coins = (balances && balances[account] && balances[account]) || defaultCoins;

  // DAI balance
  const daiBalance = coins
    .filter(coin => {
      return coin.symbol === 'DAI';
    })
    .map(coin => {
      const logo = coinLogos.find(coinIcon => {
        return coinIcon.symbol === coin.symbol;
      });
      return (
        <div key={coin.symbol} className="title is-6 level mb-04">
          <div className="level-left mb-04">
            <span>Total available balance</span>
            <span className="icon info-icon-small is-small has-text-info">
              <i className="fas fa-info-circle" />
            </span>
          </div>
          <div className="level-right has-text-right">
            {coin.status || coin.balanceFormatted || '~'} {coin.symbol}{' '}
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
    if (coin.symbol === 'DAI') return accum;
    const logo = coinLogos.find(coinIcon => {
      return coinIcon.symbol === coin.symbol;
    });

    accum.push(
      <div key={coin.symbol} className="title level mb-04">
        <div className="subtitle level-left mb-04">
          <span className="icon has-text-light mr-02">
            <img src={logo.src} alt={coin.symbol} />
            &nbsp;
          </span>{' '}
          {coin.symbol}
        </div>
        {balances && balances[account] ? (
          <div className="subtitle level-right">
            {coin.balanceFormatted} {coin.symbol}
          </div>
        ) : (
          <div className="subtitle level-right">
            <span>~DAI</span>
          </div>
        )}
      </div>,
    );
    return accum;
  }, []);

  if (showtandc && accounts && accounts[0]) {
    return <TandC />;
  }

  const successIcon = (
    <>
      <span className="icon has-text-success">
        <i className="fas fa-check-circle" />
      </span>
    </>
  );

  const failIcon = (
    <span className="icon">
      <i className="fas fa-times-circle" />
    </span>
  );
  return (
    <>
      <p className="title is-text-overflow mb-2">Membership Terms</p>
      <div className="subtitle mb-05">
        <div className="title-level">
          <div className="level-left">
            {agreedtandc ? successIcon : failIcon}
            <span className="is-size-7">Sign Terms and Conditions</span>
          </div>
          <div className="level-left">
            {userIsWhiteListed ? successIcon : failIcon}
            <span className="is-size-7">Member of the Trusted Seed (Allowlist)</span>
          </div>
        </div>
      </div>
      <br />
      <p className="title is-text-overflow mb-2">Total Available Balance</p>

      {account ? (
        <>
          {daiBalance}
          {otherBalances}
        </>
      ) : (
        <>
          <br />
          <br />
          <p className="subtitle mb-1 has-text-centered is-italic">
            Connect wallet to verify membership terms and your CSTK Score
          </p>
        </>
      )}
    </>
  );
};

const mapStateToProps = ({ showtandc, account, balances, agreedtandc, userIsWhiteListed }) => {
  return {
    showtandc,
    agreedtandc,
    account,
    balances,
    userIsWhiteListed,
  };
};

const mapDispachToProps = dispatch => {
  return {
    // onSetAgreed: () => dispatch({ type: "AGREE_TANDC" }),
    getBalancesFor: address => {
      dispatch({ type: 'GET_BALANCES_FOR_ADDRESS', address });
      dispatch({ type: 'GET_USER_IS_WHITELISTED', address });
      dispatch({ type: 'READ_SHOW_TANDC', address });
    },
    setShowTandC: value => dispatch({ type: 'SET_SHOW_TANDC', value }),
  };
};

export default connect(mapStateToProps, mapDispachToProps)(Comp);
