import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Invoices from './pages/Invoices';
import Customers from './pages/Customers';

function App() {
return (
    <Router>
      <div>
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
