import React from 'react';
import pages from "./pages";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./sass/style.sass";
import MetaMaskContext from "./components/MetaMask";
import Navigation from "./components/Navigation";

function App() {
    return (
        <div className="App">
            <MetaMaskContext.Provider immediate={false}>
                <section class="hero is-fullheight is-default is-bold">

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
                                            <div class="hero-body">
                                                <div class="container has-text-centered">
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

export default App;
