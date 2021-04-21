import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
    return ( 
        <div className="App-navbar">
            <ul>
            <li>
                <NavLink exact to="/" activeClassName="App-active-navlink">Home</NavLink>
            </li>
            <li>
                <NavLink exact to="/invoices" activeClassName="App-active-navlink">Invoices</NavLink>
            </li>
            <li>
                <NavLink exact to="/customers" activeClassName="App-active-navlink">Customers</NavLink>
            </li>
            </ul>
            <hr />
        </div>
     );
}
 
export default Navbar;