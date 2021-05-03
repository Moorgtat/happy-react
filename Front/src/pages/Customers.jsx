import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Pagination from "../components/Pagination";
import CustomersAPI from "../services/CustomersAPI";

const Customers = (props) => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll()
            setCustomers(data);
            setLoading(false);
        } catch (error) {
            toast.error("Erreur lors du chargement de utilisateurs.");
            setCustomers([]);
        }
    };

    useEffect(() => {fetchCustomers()}, []);

    const handleDelete = async (id) => { 
        const originalCustomers = [...customers];
        setCustomers(customers.filter(customer => customer.id !== id));
        try {
            await CustomersAPI.delete(id);
            toast.success("Utilisateur supprimé");
        } catch (error) {
            toast.error("Erruer lors de la suppression");
            setCustomers(originalCustomers);
            };
        };


    const handlePageChange = (page) => setCurrentPage(page);

    const handleSearch = (event) => {
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);
    };

    const filteredCustomers = customers.filter(c => c.firstName.toLowerCase().includes(search.toLocaleLowerCase())
                                                || c.lastName.toLowerCase().includes(search.toLocaleLowerCase())
                                                || c.email.toLowerCase().includes(search.toLocaleLowerCase())
                                                || c.company.toLowerCase().includes(search.toLocaleLowerCase()));

    const itemsPerPage = 10;

    const paginatedCustomers = Pagination.getData(filteredCustomers, currentPage, itemsPerPage);

    return ( 
        <>
            <div className="d-flex justify-content-between align-items-center py-3">
                <h1 className="App-title">Clients</h1>
                <Link to="/customers/new" className="btn btn-primary mr-3">Créer un client</Link>
            </div>
            
            <p className="App-texte">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum quas dolorem reprehenderit, quia ullam et quibusdam, maiores perspiciatis hic aut dolore atque earum ea doloremque? Explicabo unde eos eum consequuntur.</p>
        
            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher..." />
            </div>

            {!loading && <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Entreprise</th>
                        <th>Factures</th>
                        <th>Montant</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    { paginatedCustomers.map(
                        customer =>
                                    <tr key={customer.id}>
                                        <td>{customer.id} {customer.firstName} {customer.lastName}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.company}</td>
                                        <td>{customer.invoices.length}</td>
                                        <td>{customer.totalAmount.toLocaleString()} $</td>
                                        <td>
                                            <Link
                                                to={"/customers/" + customer.id}
                                                className="btn btn-warning m-1">
                                                        Editer
                                            </Link>
                                            <button
                                            onClick={() => handleDelete(customer.id)}
                                            disabled={customer.invoices.length > 0} 
                                            className="btn btn-danger">
                                                    Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                    )
                        }
                    
                </tbody>
            </table>}
            
            <Loader />
            
            {itemsPerPage < filteredCustomers.length && (
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredCustomers.length} 
                onPageChange={handlePageChange} />
            )}

        </>
     );
}
 
export default Customers;