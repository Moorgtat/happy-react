import axios from "axios";
import {API_URL} from '../Config';

function findAll() {
    return axios.get(API_URL + "invoices")
    .then(response => response.data['hydra:member']);
};

function find(id) {
    return axios
    .get(API_URL + "invoices/" + id)
    .then(response => response.data);
};

function create(invoice) {
    return axios.post(API_URL + "invoices", {...invoice, amount: Number(invoice.amount), customer: `/api/customers/${invoice.customer}`});
}

function update(id, invoice) {
    return axios.put(API_URL + "invoices/" + id, {...invoice, customer: `/api/customers/${invoice.customer}`});
};

function deleteInvoice(id) {
    return axios.delete(API_URL + "invoices/" + id);
};

// eslint-disable-next-line
export default {
    findAll,
    find,
    create,
    update,
    delete: deleteInvoice
};