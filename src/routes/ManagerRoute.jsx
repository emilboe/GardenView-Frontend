import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from '../actions/Auth';

const ManagerRoute = ({ children, ...rest }) => (
  <AuthConsumer>
    {({ isManagerFunc }) => (
      <Route {...rest} render={({ location }) =>
      isManagerFunc() ? (
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

export default ManagerRoute;