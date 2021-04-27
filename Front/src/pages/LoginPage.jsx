import AuthAPI from "../services/AuthAPI";
import { useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';


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
            history.replace("/customers");
            } catch (error) {
            console.log(error.response);
            setError("Les informations fournies sont incorrectes.")
        }
    }

    return ( 
        <div>
            <h1 className="App-title">Connexion</h1>
            <p className="App-texte">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum quas dolorem reprehenderit, quia ullam et quibusdam, maiores perspiciatis hic aut dolore atque earum ea doloremque? Explicabo unde eos eum consequuntur.</p>
            <form onSubmit={handleSubmit}>
            <div className="form-group"><label htmlFor="username">Adresse Email</label>
                <input 
                    value={credentials.username}
                    onChange={handleChange}
                    type="email" 
                    placeholder="Entrez votre adresse email" 
                    name="username" 
                    id="username" 
                    className={"form-control" + (error && " is-invalid")}
                />
               {error && <p className="invalid-feedback">
                    {error}
                </p>} 
            </div>

            <div className="form-group"><label htmlFor="password">Mot de passe</label>
                <input
                    value={credentials.password}
                    onChange={handleChange}
                    type="password" 
                    placeholder="Entrez votre mot de passe" 
                    name="password" 
                    id="password" 
                    className={"form-control" + (error && " is-invalid")}
                />
                {error && <p className="invalid-feedback">
                    {error}
                </p>} 
            </div>

            <div className="form-group">
                <button className="btn btn-success">Valider</button>
            </div>
            </form>

        </div>
     );
}
 
export default LoginPage;