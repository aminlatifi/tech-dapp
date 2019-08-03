import React from 'react';
import logo from './logo.svg';
import './App.sass';

function App() {
  return (
    <section class="hero is-medium has-text-white">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-mobile">
              <div class="column is-8-desktop is-10 is-offset-1">
                    <h1 class="title is-1 is-spaced has-text-white">TECH-Dapp</h1>
                    <div class="media">
                        <div class="media-left">
                            {/* <figure class="image is-48x48">
                                <img class="is-rounded has-background-white" src="./assets/logo_vipnode.png"/>
                            </figure> */}
                        </div>
                        <div class="media-content">
                            <p class="">Welcome to the commons stack. Here you can contribute to the commons stack roadmap and acquire some TECH tokens.</p>
                            <p><span class="title is-6"><a href="https://commonsstack.org">https://commonsstack.org/</a></span></p>

                        </div>
                    </div>
                    <div class="setting">
                        <h3 class="is-size-5">How would you like setting 1 to be? *</h3>
                        <div class="field">
                            <p class="control">
                                <input class="input" type="text" placeholder="Normal input"/>
                            </p>
                            <p class="help is-danger">
                                This setting is required
                            </p>
                        </div>
                    </div>
                    <div class="setting">
                        <h3 class="is-size-5">Do you want setting 2 on or off? *</h3>
                        <nav class="level switch_w_options">
                            <div class="level-left">
                                <div class="level-item">
                                    <p>Setting off</p>
                                </div>
                                <div class="level-item">
                                    <div class="field">
                                        <input id="switchRoundedDefault" type="checkbox" name="switchRoundedDefault" class="switch is-rounded is-link" checked="checked"/>
                                        <label for="switchRoundedDefault">Setting on</label>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        <p class="help is-danger">
                            This setting is required
                        </p>
                    </div>
                    <div class="setting">
                        <h3 class="is-size-5">Set a password.</h3>
                        <div class="field">
                            <p class="control">
                                <input class="input" type="password" placeholder="Normal input"/>
                            </p>
                            <p class="help is-danger">
                                This setting is required
                            </p>
                        </div>
                    </div>
                    <div class="field is-grouped buttons">
                        <p class="control">
                            <a class="button is-medium is-link">Cancel</a>
                        </p>
                        <p class="control">
                            <a class="button is-medium is-success">Submit</a>
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <footer class="footer">
            <div class="content has-text-centered">
                <p>The Commons Stack</p>
            </div>
        </footer>
    </section>
  );
}

export default App;
