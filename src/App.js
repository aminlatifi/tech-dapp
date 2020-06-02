import React, { useEffect } from 'react';
import pages from "./pages";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./sass/style.sass";
import MetaMaskContext from "./components/MetaMask";
import Navigation from "./components/Navigation";
import { connect } from "react-redux";

function App({ bootstrap }) {

    useEffect(() => {
        bootstrap();
    }, [bootstrap]);

    return (
        <div className="App">
            <MetaMaskContext.Provider immediate={false}>
                <section className="hero is-fullheight is-default is-bold">

                    <BrowserRouter>
                        <Switch>
                            {Object.values(pages).map(({ RootComponent, rootPath }) => (
                                <Route
                                    key={rootPath}
                                    path={rootPath}
                                    exact={rootPath === "/"}
                                    render={props => (
                                        <>
                                            <Navigation {...props} />
                                            <div className="hero-body">
                                                <div className="container has-text-centered">
                                                    <RootComponent rootpath={rootPath} {...props} />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                />
                            ))}
                        </Switch>
                    </BrowserRouter>
                </section>
            </MetaMaskContext.Provider>
        </div>
    );
}

const mapStateToProps = state => {
    return {};
};

const mapDispachToProps = dispatch => {
    return {
        bootstrap: () => dispatch({ type: "BOOTSTRAP" }),
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(App);
