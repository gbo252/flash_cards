import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { setIsGuest } from '../../actions';
import LoginButton from './LoginButton';

const Login = ({ auth, isGuest, setIsGuest, location }) => {
  const [googleLoading, setGoogleLoading] = React.useState(false);
  const [facebookLoading, setFacebookLoading] = React.useState(false);
  const [guestLoading, setGuestLoading] = React.useState(false);

  const { from } = location.state || { from: { pathname: '/' } };

  if (auth || isGuest === 'true') {
    return <Redirect to="/" />;
  }

  const renderError = () => {
    if (isGuest === 'error') {
      return (
        <>
          <small className="text-danger">
            GUEST LOGIN ERROR: read/write to localStorage unavailable
          </small>
          <small className="text-danger">
            - try turning off private browsing or enabling cookies
          </small>
        </>
      );
    }
    return null;
  };

  return (
    <div
      className="d-flex justify-content-center align-items-start overflow-auto"
      style={{
        position: 'fixed',
        top: '60px',
        left: '0',
        right: '0',
        bottom: '0'
      }}
    >
      <div
        className="d-flex flex-column align-items-center justify-content-center mx-2 py-4 px-3 px-sm-5 border rounded-lg bg-light text-center"
        style={{
          boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.3)',
          margin: 'auto 0'
        }}
      >
        <h3 className="mb-0">Welcome to</h3>
        <h1 className="mb-3">Flash Cards Online</h1>
        <p className="h6">Please sign in below</p>
        <LoginButton
          className="warning"
          icon={faSignInAlt}
          login="Guest"
          from={from.pathname}
          loading={guestLoading}
          setLoading={setGuestLoading}
          isGuest={isGuest}
          setIsGuest={setIsGuest}
        />
        {renderError()}
        <LoginButton
          className="danger"
          icon={faGoogle}
          login="Google"
          from={from.pathname}
          loading={googleLoading}
          setLoading={setGoogleLoading}
        />
        <LoginButton
          className="primary"
          icon={faFacebookF}
          login="Facebook"
          from={from.pathname}
          loading={facebookLoading}
          setLoading={setFacebookLoading}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth, isGuest }) => {
  return { auth, isGuest };
};

export default connect(mapStateToProps, { setIsGuest })(Login);
