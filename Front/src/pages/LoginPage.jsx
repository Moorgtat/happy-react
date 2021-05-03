import AuthAPI from "../services/AuthAPI";
import { useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import Field from "../forms/Field";
import { toast } from "react-toastify";

const LoginPage = ({history}) => {
  
    const {setIsAuthenticated} = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        setCredentials({...credentials, [name]: value})
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await AuthAPI.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            toast.success("Vous êtes connecté !!");
            history.replace("/customers");
            } catch (error) {
            setError("Les informations fournies sont incorrectes.");
            setCredentials({});
        }
    }

    return ( 
        <div>
            <h1 className="App-title">Connexion</h1>
            <p className="App-texte">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum quas dolorem reprehenderit, quia ullam et quibusdam, maiores perspiciatis hic aut dolore atque earum ea doloremque? Explicabo unde eos eum consequuntur.</p>
            
            <form onSubmit={handleSubmit}>

            <Field  name="username" 
                    label="Adresse email" 
                    value={credentials.username} 
                    type="email" 
                    onChange={handleChange} 
                    placeholder="Entrez votre email" 
                    error={error}
            />

            <Field  name="password" 
                    label="Mot de passe" 
                    value={credentials.password}
                    type="password" 
                    onChange={handleChange} 
                    placeholder="Entrez votre mot de passe" 
                    error={error}
            />

            <div className="form-group">
                <button className="btn btn-success">Valider</button>
            </div>
            
            </form>

        </div>
     );
}
 
export default LoginPage;