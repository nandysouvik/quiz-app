import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Home = () => (
  <Fragment>
    <Helmet>
      <title>Quiz App- Home</title>
    </Helmet>
    <div id="home">
      <section>
        <div style={{ textAlign: 'center' }}>
          <span className="mdi mdi-cube-outline cube "></span>
        </div>
        <h1 className="headerTitle">Quiz App</h1>
        <div className="playButtonContainer">
          <ul>
            <li><Link className="playButton" to="/play/instructions" >Play</Link></li>
          </ul>
        </div>
        <div className="authContainer">
          <Link className="authButton" id="loginButton" to="/login">Login</Link>
          <Link className="authButton" id="registerButton" to="/register">Register</Link>
        </div>
      </section>
    </div>
  </Fragment>
)

export default Home
