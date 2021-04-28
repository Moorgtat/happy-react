import Field from "../forms/Field";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CustomersAPI from "../services/CustomersAPI";

const Customer = ({ match, history }) => {
    
    const { id = "new" } = match.params;

    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    });

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    });
    
    const [editing, setEditing] = useState(false);

    const fetchCustomer = async id => {
        try {
            const { firstName, lastName, email, company } = await CustomersAPI.find(id);
            setCustomer({firstName, lastName, email, company});
        } catch (error) {
                history.replace("/customers");
        }
    };

    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchCustomer(id);
        }
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setCustomer({ ...customer, [name] : value });
    };

    const handleSubmit = async event => {
        event.preventDefault();
         try {
             if (editing) {
                await CustomersAPI.update(id, customer);
             } else {
                await CustomersAPI.create(customer);
                history.replace("/customers");
             }
            setErrors({});
         } catch (response) {
             const { violations } = response.data;
             if (violations) {
                 const apiErrors = {};
                 violations.forEach(({ propertyPath, message }) => {
                     apiErrors[propertyPath] = message;
                 })
                 setErrors(apiErrors);
             };
         }
    };

    return ( 
        <>
        {!editing ? <h1>Création d'un client</h1> : <h1>Modification d'un client</h1>}
        
        <form onSubmit={handleSubmit}>
            <Field  name="lastName" 
                    label="Nom de famille" 
                    placeholder="Nom de famille du client"
                    value={customer.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
            />
            <Field  name="firstName" 
                    label="Prénom" 
                    placeholder="Prénom du client"
                    value={customer.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
            />
            <Field  name="email" 
                    label="Adresse email" 
                    placeholder="Adresse email du client"
                    type="email"
                    value={customer.email}
                    onChange={handleChange}
                    error={errors.email}
            />
            <Field  name="company" 
                    label="Entreprise" 
                    placeholder="Entreprise du client"
                    value={customer.company}
                    onChange={handleChange}
                    error={errors.company}
            />
            <div className="form-group">
                <button className="btn btn-success">Enregistrer</button>
                <Link to="/customers" className="btn btn-secondary ml-2">Retourner à la liste des clients</Link>
            </div>
        </form>
        </>
     );
}
 
export default Customer;