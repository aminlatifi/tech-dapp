import React from "react";
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

                    <div id="navMenu" class="navbar-menu">
                        <div class="navbar-start">
                            <div class="navbar-item"><span >About contribution</span></div>
                            <div class="navbar-item"><span>Contribution</span></div>
                        </div>


                        <div class="navbar-end">
                            <div class="tabs is-right">
                                <div class="navbar-item"><MetaMaskButton /></div>
                            </div>
                        </div>

                    </div>



                </div>
            </nav>
        </div>
    )
};

export default Comp;


