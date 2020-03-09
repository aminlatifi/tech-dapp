import React, { useContext } from "react";
import MetaMaskButton from "./MetaMaskButton";
import csLogo from "../assets/headerlogo.svg";

const Comp = ({ web3available, agreedtandc, onSetAgreedtandc }) => {
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
                    <div id="navbarMenu" class="navbar-menu">
                        <div class="navbar-end">
                            <div class="tabs is-right">
                                <ul>
                                    <li><a href="">About contribution</a></li>
                                    <li class="is-active"><a>Contribution</a></li>
                                    <li class="control"><MetaMaskButton /></li>
                                </ul>
                            </div>
                        </div>

                    </div>



                </div>
            </nav>
        </div>
    )
};

export default Comp;


