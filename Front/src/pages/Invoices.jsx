import { useEffect, useState } from 'react';
import Pagination from "../components/Pagination";
import InvoicesAPI from '../services/InvoicesAPI';
import moment from 'moment';

const Invoices = (props) => {

    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const STATUS_LABELS = {
        PAID: "success",
        SENT: "info",
        CANCELLED: "danger"
    }

    const STATUS_TRAD = {
        PAID: "Payée",
        SENT: "Envoyée",
        CANCELLED: "Annulée"
    }

    const fetchInvoices = async () => {
        try {
            const data = await InvoicesAPI.findAll()
            setInvoices(data);
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {fetchInvoices()}, []);

    const handleDelete = async (id) => { 
        const originalInvoices = [...invoices];
        setInvoices(invoices.filter(invoice => invoice.id !== id));
        try {
            await InvoicesAPI.delete(id)
        } catch (error) {
            setInvoices(originalInvoices);
            console.log(error.response)};
        };


    const handlePageChange = (page) => setCurrentPage(page);

    const handleSearch = (event) => {
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);
    };

    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    const filteredInvoices = invoices.filter( i =>
                                               i.customer.firstName.toLowerCase().includes(search.toLocaleLowerCase())
                                            || i.customer.lastName.toLowerCase().includes(search.toLocaleLowerCase())
                                            || i.amount.toString().startsWith(search.toLocaleLowerCase())
                                            || STATUS_TRAD[i.status].toLowerCase().includes(search.toLocaleLowerCase()));

    const itemsPerPage = 50;

    const paginatedInvoices = Pagination.getData(filteredInvoices, currentPage, itemsPerPage);

    return ( 
        <div>
            <h1 className="App-title">Factures</h1>
            <p className="App-texte">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum quas dolorem reprehenderit, quia ullam et quibusdam, maiores perspiciatis hic aut dolore atque earum ea doloremque? Explicabo unde eos eum consequuntur.</p>
        
            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher..." />
            </div>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Chrono</th>
                        <th>Client</th>
                        <th>Date d'envoi</th>
                        <th>Statut</th>
                        <th>Montant</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    { paginatedInvoices.map(
                        invoice =>
                                    <tr key={invoice.id}>
                                        <td>{invoice.chrono}</td>
                                        <td>{invoice.customer.firstName} {invoice.customer.lastName}</td>
                                        <td>{formatDate(invoice.sentAt)}</td>
                                        <td>
                                            <span className={"badge badge-" + STATUS_LABELS[invoice.status]}>
                                            {STATUS_TRAD[invoice.status]}
                                            </span>
                                        </td>
                                        <td>{invoice.amount}</td>
                                        <td>
                                        <button
                                            onClick={() => handleDelete(invoice.id)}
                                            className="btn btn-warning m-1">
                                                    Editer
                                            </button>
                                            <button
                                            onClick={() => handleDelete(invoice.id)}
                                            className="btn btn-danger m-1">
                                                    Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                    )
                        }
                    
                </tbody>
            </table>

            {itemsPerPage < filteredInvoices.length && (
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredInvoices.length} 
                onPageChange={handlePageChange} />
            )}
        </div>
     );
}
 
export default Invoices;