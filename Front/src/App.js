import './App.css';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import Invoice from './pages/Invoice';
import Register from './pages/Register';

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
            exact path="/login"
            component={LoginPage}
          />
          <Route 
            exact path="/register"
            component={Register}
          />
          <PrivateRoute path="/customers/:id" component={Customer} />
          <PrivateRoute exact path="/customers" component={Customers} />
          <PrivateRoute path="/invoices/:id" component={Invoice} />
          <PrivateRoute exact path="/invoices" component={Invoices} />
        </Switch>   
      </div>
    </Router>
    <ToastContainer position={toast.POSITION.TOP_CENTER} pauseOnHover={false} autoClose={3000} hideProgressBar={true} />
  </AuthContext.Provider>  
  );
}

export default App;
