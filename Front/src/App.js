import './App.css';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Invoices from './pages/Invoices';
import Customer from './pages/Customer';
import Customers from './pages/Customers';
import LoginPage from './pages/LoginPage';
import AuthAPI from './services/AuthAPI';
import { useState } from 'react';
import AuthContext from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

AuthAPI.setup();

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());
  const NavbarWithRouter = withRouter(Navbar);
    
return (
  <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
    <Router>
      <NavbarWithRouter />
      <div className="container">
        <Switch>
          <Route 
            exact path="/"
            component={Home} 
          />
          <Route 
            path="/login"
            component={LoginPage}
          />
          <PrivateRoute path="/customers/:id" component={Customer} />
          <PrivateRoute exact path="/customers" component={Customers} />
          <PrivateRoute exact path="/invoices" component={Invoices} />
        </Switch>   
      </div>
    </Router>
  </AuthContext.Provider>  
  );
}

export default App;
