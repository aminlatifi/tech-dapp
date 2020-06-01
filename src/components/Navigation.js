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
    <div class="hero-head">
      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item" href="../">
              <img src={csLogo} alt="Logo" />
            </a>
            <span class="navbar-burger burger" data-target="navbarMenu">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>

          <div id="navMenu" class="navbar-menu">
            <div class="navbar-start">
              <div
                class={
                  activeNavItem === 1 ? "navbar-item is-active" : "navbar-item"
                }
              >
                <Link to="/">
                  <span>About contribution</span>
                </Link>
              </div>
              <div
                class={
                  activeNavItem === 2 ? "navbar-item is-active" : "navbar-item"
                }
              >
                <Link to="/contribute">
                  <span>Contribute</span>
                </Link>
              </div>
              <div
                class={
                  activeNavItem === 3 ? "navbar-item is-active" : "navbar-item"
                }
              >
                <span>Need help?</span>
              </div>
            </div>

            <div class="navbar-end">
              <div class="tabs is-right">
                <div class="navbar-item">
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
