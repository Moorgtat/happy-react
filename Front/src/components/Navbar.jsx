import { NavLink } from 'react-router-dom';
import AuthAPI from '../services/AuthAPI';
import AuthContext from '../contexts/AuthContext';
import {useContext} from 'react';
import { toast } from 'react-toastify';


const Navbar = ({history}) => {
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const handleLogout = () => {
        AuthAPI.logout();
        toast.info("Vous êtes déconnecté.");
        setIsAuthenticated(false);
        history.push("/login");
    }
    return ( 
        <div className="App-navbar">
            <ul>
            <li>
                <NavLink exact to="/" activeClassName="App-active-navlink">Accueil</NavLink>
            </li>
            <li>
                <NavLink exact to="/customers" activeClassName="App-active-navlink">Clients</NavLink>
            </li>
            <li>
                <NavLink exact to="/invoices" activeClassName="App-active-navlink">Factures</NavLink>
            </li>
            {!isAuthenticated ? (
            <>
                <li>
                <NavLink exact to="/register" className="btn btn-success" activeClassName="App-active-navlink">S'enregistrer</NavLink>
                </li>
                <li>
                    <NavLink exact to="/login" className="btn btn-success" activeClassName="App-active-navlink">Se connecter</NavLink>
                </li>
            </>) : (
            <>
                <li>
                <button onClick={handleLogout} className="btn btn-danger">
                    Déconnexion
                </button>
                </li>
            </>
            )}

            </ul>
            <hr />
        </div>
     );
}
 
export default Navbar;
