import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";

const Customers = (props) => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/customers")
             .then(response => response.data['hydra:member'])
             .then(data => setCustomers(data))
             .catch(error => console.log(error.response));
    }, []);

    const handleDelete = (id) => { 
        const originalCustomers = [...customers];
        setCustomers(customers.filter(customer => customer.id !== id));
        axios.delete("http://127.0.0.1:8000/api/customers/" + id)
             .then(response => 
                console.log('ok'))
             .catch(error => {
                 setCustomers(originalCustomers);
                 console.log(error.response)
                });
        };


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const itemsPerPage = 10;
    const paginatedCustomers = Pagination.getData(customers, currentPage, itemsPerPage);

    return ( 
        <div>
            <Navbar />
            <h1 className="App-title">CUSTOMERS PAGE</h1>
            <p className="App-texte">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum quas dolorem reprehenderit, quia ullam et quibusdam, maiores perspiciatis hic aut dolore atque earum ea doloremque? Explicabo unde eos eum consequuntur.</p>
        
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>id</th>
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
                                        <td>{customer.id}</td>
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

            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={customers.length} 
                    onPageChange={handlePageChange} />

        </div>
     );
}
 
export default Customers;