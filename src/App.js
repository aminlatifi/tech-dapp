import React from 'react';
import pages from "./pages";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "./sass/style.sass";

function App() {
    return (
        <div className="App">

            <BrowserRouter>
                <Switch>
                    {Object.values(pages).map(({ RootComponent, rootPath }) => (
                        <Route
                            key={rootPath}
                            path={rootPath}
                            exact={rootPath === "/"}
                            render={props => (
                                <RootComponent rootpath={rootPath} {...props} />
                            )}
                        />
                    ))}
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
