import axios from "axios";
import {API_URL} from '../Config';

function findAll() {
    return axios.get(API_URL + "customers")
    .then(response => response.data['hydra:member']);
};

function find(id) {
    return axios
    .get(API_URL + "customers/" + id)
    .then(response => response.data);
};

function create(customer) {
    return axios.post(API_URL + "customers", customer);
}

function update(id, customer) {
    return axios.put(API_URL + "customers/" + id, customer);
};

function deleteCustomer(id) {
    return axios.delete(API_URL + "customers/" + id);
};

// eslint-disable-next-line
export default {
    findAll,
    find,
    create,
    update,
    delete: deleteCustomer
};