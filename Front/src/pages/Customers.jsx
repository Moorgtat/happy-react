import { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import CustomersAPI from "../services/CustomersAPI";

const Customers = (props) => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll()
            setCustomers(data);
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {fetchCustomers()}, []);

    const handleDelete = async (id) => { 
        const originalCustomers = [...customers];
        setCustomers(customers.filter(customer => customer.id !== id));
        try {
            await CustomersAPI.delete(id)
        } catch (error) {
            setCustomers(originalCustomers);
            console.log(error.response)};
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
        <div>
            <Navbar />
            <h1 className="App-title">CUSTOMERS PAGE</h1>
            <p className="App-texte">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum quas dolorem reprehenderit, quia ullam et quibusdam, maiores perspiciatis hic aut dolore atque earum ea doloremque? Explicabo unde eos eum consequuntur.</p>
        
            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher..." />
            </div>

            <table className="table table-hover">
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
                                        <td>{customer.firstName} {customer.lastName}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.company}</td>
                                        <td>{customer.invoices.length}</td>
                                        <td>{customer.totalAmount.toLocaleString()} $</td>
                                        <td>
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
            </table>

            {itemsPerPage < filteredCustomers.length && (
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredCustomers.length} 
                onPageChange={handlePageChange} />
            )}

        </div>
     );
}
 
export default Customers;