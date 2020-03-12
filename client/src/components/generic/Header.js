import logo from '../../images/logo.png';
import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { setIsGuest } from '../../actions';
import HeaderCategoryButtons from '../category/HeaderCategoryButtons';
import HeaderFlashCardButtons from '../flashCards/HeaderFlashCardButtons';

const Header = ({ auth, isGuest, setIsGuest, location }) => {
  const renderButtons = () => {
    if (auth || isGuest === 'true') {
      if (location.pathname === '/') {
        return <HeaderCategoryButtons />;
      } else if (location.pathname.includes('/categories/')) {
        return <HeaderFlashCardButtons />;
      }
    }
    return null;
  };

  const renderLogOutButton = () => {
    if (auth) {
      return (
        <a
          className="btn btn-outline-dark rounded-pill ml-1 ml-md-4"
          role="button"
          href="/auth/logout"
        >
          Log Out
        </a>
      );
    } else if (isGuest === 'true') {
      return (
        <button
          className="btn btn-outline-dark rounded-pill ml-1 ml-md-4"
          onClick={() => setIsGuest('false')}
        >
          Log Out
        </button>
      );
    }
    return null;
  };

  const renderToggleButton = () => {
    if (auth || isGuest === 'true') {
      return (
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#header-bar"
          aria-controls="header-bar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      );
    }
    return null;
  };

  return (
    <nav
      className="navbar navbar-expand-md fixed-top navbar-light bg-light"
      style={{ borderBottom: '2px solid rgba(148, 148, 148, 0.8)' }}
    >
      <Link to="/" className="navbar-brand py-0">
        <img
          className="mr-2"
          width="40px"
          height="40px"
          src={logo}
          alt="logo"
        />
        <span className="d-none d-sm-inline-block">Flash Cards Online</span>
      </Link>
      {renderToggleButton()}
      <div className="collapse navbar-collapse" id="header-bar">
        <div
          className="navbar-nav mr-auto mt-2 mt-lg-0"
          style={{ width: '5px' }}
        />
        <div>
          {renderButtons()}
          {renderLogOutButton()}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ auth, isGuest }) => {
  return { auth, isGuest };
};

export default connect(mapStateToProps, { setIsGuest })(withRouter(Header));
