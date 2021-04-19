import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Invoices from './pages/Invoices';
import Customers from './pages/Customers';

function App() {
return (
    <Router>
      <div>

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/invoices">Invoices</Link>
          </li>
          <li>
            <Link to="/customers">Customers</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/invoices">
            <Invoices />
          </Route>
          <Route path="/customers">
            <Customers />
          </Route>
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
