import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({
  className,
  icon,
  login,
  from,
  loading,
  setLoading,
  isGuest,
  setIsGuest
}) => {
  React.useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, [setLoading]);

  const renderButton = () => {
    if (!loading) {
      const atts = {};
      if (!setIsGuest) {
        atts.href = `/auth/${login.toLowerCase()}?next=${from}`;
      }

      return (
        <a
          className={
            `btn btn-${className} ` + (isGuest === 'error' ? 'disabled' : '')
          }
          role="button"
          {...atts}
          style={{ width: '12rem', cursor: 'pointer' }}
          onClick={() => {
            setLoading(true);
            if (setIsGuest) {
              setTimeout(() => {
                setIsGuest('true');
              }, 1500);
            }
          }}
        >
          {setIsGuest ? 'Continue as Guest' : `Sign in with ${login}`}
        </a>
      );
    } else {
      return (
        <button
          className={`btn btn-${className}`}
          type="button"
          style={{ width: '12rem' }}
          disabled
        >
          <span
            className="spinner-border spinner-border-sm mr-1"
            role="status"
            aria-hidden="true"
          ></span>
          Loading...
        </button>
      );
    }
  };

  return (
    <div className="btn-group my-1">
      <a
        className={`btn btn-${className} d-flex align-items-center text-light disabled`}
        href="/"
      >
        <FontAwesomeIcon
          icon={icon}
          style={{ width: '1.5rem', fontSize: '1.3rem' }}
        />
      </a>
      {renderButton()}
    </div>
  );
};
