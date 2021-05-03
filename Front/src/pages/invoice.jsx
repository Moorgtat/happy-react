import Field from "../forms/Field";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import InvoicesAPI from "../services/InvoicesAPI";
import CustomersAPI from "../services/CustomersAPI";
import Select from "../components/Select";
import { toast } from "react-toastify";

const Invoice = ({ match, history }) => {

    const { id = "new" } = match.params;

    const [customers, setCustomers] = useState([]);

    const [editing, setEditing] = useState(false);

    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: "SENT"
    });

    const [errors, setErrors] = useState({
        amount: "",
        customer: "",
        status: ""
    });

    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll();
            setCustomers(data);

            if(!invoice.customer && id === "new") {
                setInvoice({...invoice, customer: data[0].id});
            }
        } catch (error) {
            setInvoice({})
            history.replace("/invoices");
        }
    };

    const fetchInvoice = async id => {
        try {
            const { amount, status, customer } = await InvoicesAPI.find(id);
            setInvoice({ amount, status, customer: customer.id });
        } catch (error) {
            setInvoice({});
            history.replace("/invoices");
        }
    };

    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchInvoice(id);
        }
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        fetchCustomers();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setInvoice({ ...invoice, [name] : value });
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            if (editing) {
                if(invoice.amount === "") {
                    setErrors({amount: "Vous devez entrer un montant."});
                    toast.error('Nop !!');
                } else {
               await InvoicesAPI.update(id, invoice);
               toast.success('Modification réussi !!');
               setErrors({});
                }
            } else {
                if(invoice.amount === "") {
                    setErrors({amount: "Vous devez entrer un montant."});
                    toast.error('Nop !!');
                } else {
               await InvoicesAPI.create(invoice);
               toast.success('Nouvelle facture créée!');
               setErrors({});
               history.replace("/invoices");
                }
            }
        } catch (error) {
            const { violations } = error.response.data;
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
        {!editing ? <h1>Création d'une facture</h1> : <h1>Modification d'une facture</h1>}
        <form onSubmit={handleSubmit}>
            <Field  name="amount"
                    type="number"
                    label="Montant" 
                    placeholder="Montant de la facture"
                    value={invoice.amount}
                    onChange={handleChange}
                    error={errors.amount}
            />
            <Select name="customer"
                    label="client"
                    value={invoice.customer}
                    error={errors.customer}
                    onChange={handleChange}
            >
                {customers.map( customer => <option key={customer.id} value={customer.id}>{customer.firstName} {customer.lastName}</option>)}
            </Select>
            <Select name="status"
                    label="Statut"
                    value={invoice.status}
                    error={errors.status}
                    onChange={handleChange}
            >
                <option value="SENT">Envoyée</option>
                <option value="PAID">Payée</option>
                <option value="CANCELLED">Annulée</option>
            </Select>

            <div className="form-group">
                <button className="btn btn-success">Enregistrer</button>
                <Link to="/invoices" className="btn btn-secondary ml-2">Retourner à la liste des factures</Link>
            </div>

        </form>
        </>
     );
}
 
export default Invoice;