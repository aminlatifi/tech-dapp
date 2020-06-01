import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import MetaMaskButton from "./MetaMaskButton";
import csLogo from "../assets/headerlogo.svg";
import "./Navigation.sass";

const Comp = ({ web3available, agreedtandc, onSetAgreedtandc }) => {
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState(1);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setActiveNavItem(1);
        break;
      case "/contribute":
        setActiveNavItem(2);
        break;
      // case "/help":
      // setActiveNavItem(3)
      // break
      default:
        break;
    }
  }, [location.pathname]);

  return (
    <div className="hero-head">
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="../">
              <img src={csLogo} alt="Logo" />
            </a>
            <span className="navbar-burger burger" data-target="navbarMenu">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>

          <div id="navMenu" className="navbar-menu">
            <div className="navbar-start">
              <div
                className={
                  activeNavItem === 1 ? "navbar-item is-active" : "navbar-item"
                }
              >
                <Link to="/">
                  <span>About contribution</span>
                </Link>
              </div>
              <div
                className={
                  activeNavItem === 2 ? "navbar-item is-active" : "navbar-item"
                }
              >
                <Link to="/contribute">
                  <span>Contribute</span>
                </Link>
              </div>
              <div
                className={
                  activeNavItem === 3 ? "navbar-item is-active" : "navbar-item"
                }
              >
                <span>Need help?</span>
              </div>
            </div>

            <div className="navbar-end">
              <div className="tabs is-right">
                <div className="navbar-item">
                  <MetaMaskButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Comp;
