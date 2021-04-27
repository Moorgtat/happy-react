import { useContext } from 'react';
import { Route, Redirect } from 'react-router';
import AuthContext from '../contexts/AuthContext';

const PrivateRoute = ({path, component}) => {
    const {isAuthenticated} = useContext(AuthContext);
    return isAuthenticated ?( 
        <Route path={path} component={component} />
     ) : (
        <Redirect to="/login" />
     );
}
 
export default PrivateRoute;