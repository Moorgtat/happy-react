import { useState } from "react";
import Field from "../forms/Field";
import { Link } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";

const Register = ({ history }) => {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUser({ ...user, [name] : value });
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const apiErrors = {};
        if(user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = "Votre confirmation n'est pas valide";
            setErrors(apiErrors);
            return
        }
        try {
            await axios.post("http://127.0.0.1:8000/api/users", user);
            setErrors({});
            toast.success("Vous êtes bien enregistré ! ");
            history.replace("/login");
        } catch (error) {
            const { violations } = error.response.data;
            if (violations) {
                violations.forEach(({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                })
                setErrors(apiErrors);
            };
        }
   };

    return ( 
        <>
        <h1 className="App-title">S'enregistrer</h1>
        <form onSubmit={handleSubmit}>
            <Field  name="firstName"
                    label="Votre prénom" 
                    placeholder="Tapper votre prénom"
                    value={user.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
            />
            <Field  name="lastName"
                    label="Votre nom" 
                    placeholder="Tapper votre nom"
                    value={user.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
            />
            <Field  name="email"
                    label="Votre email" 
                    placeholder="Tapper votre email"
                    value={user.email}
                    onChange={handleChange}
                    error={errors.email}
            />
            <Field  name="password"
                    type="password"
                    label="Votre passwoed" 
                    placeholder="Tapper votre password"
                    value={user.password}
                    onChange={handleChange}
                    error={errors.password}
            />
            <Field  name="passwordConfirm"
                    type="password"
                    label="Votre confirmation de password" 
                    placeholder="Tapper votre password à nouveau"
                    value={user.passwordConfirm}
                    onChange={handleChange}
                    error={errors.passwordConfirm}
            />
            <div className="form-group">
                <button className="btn btn-success">S'enregistrer</button>
                <Link to="/login" className="btn btn-secondary ml-2">Se connecter</Link>
            </div>
        </form>
        </>
     );
}
 
export default Register;