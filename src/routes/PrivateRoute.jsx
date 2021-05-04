import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from '../actions/Auth';

const PrivateRoute = ({ children, ...rest }) => (
  <AuthConsumer>
    {({ isAuthFunc }) => (
      <Route {...rest} render={({ location }) =>
      isAuthFunc() ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/gardenview",
            state: { from: location }
          }}
        />
      )}
    />
    )}
  </AuthConsumer>
);

export default PrivateRoute;