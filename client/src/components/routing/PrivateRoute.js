import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { fetchCategories } from '../../actions';

const PrivateRoute = ({
  component: Component,
  auth,
  categories,
  isGuest,
  fetchCategories,
  history,
  ...rest
}) => {
  const [validCategory, setValidCategory] = React.useState(false);

  const { category } = { ...rest }.computedMatch.params;

  React.useEffect(() => {
    if (category) {
      if (!categories) {
        fetchCategories();
      } else {
        const categoryNames = categories.map(x => x.category);
        !categoryNames.includes(category)
          ? history.push('/404')
          : setValidCategory(true);
      }
    }
  }, [fetchCategories, categories, category, history]);

  return (
    <Route
      {...rest}
      render={props => {
        if (isGuest === "true" && category) {
          return validCategory ? <Component {...props} /> : null;
        } else if (isGuest === "true") {
          return <Component {...props} />;
        }

        switch (auth) {
          case null:
            return null;
          case false:
            return (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location }
                }}
              />
            );
          default:
            if (category) {
              return validCategory ? <Component {...props} /> : null;
            }
            return <Component {...props} />;
        }
      }}
    />
  );
};

const mapStateToProps = ({ auth, categories, isGuest }) => {
  return { auth, categories, isGuest };
};

export default connect(mapStateToProps, { fetchCategories })(
  withRouter(PrivateRoute)
);
