import { check } from 'k6';
import { currentEnvironment } from '../config/environments.js';
import { post } from '../utils/requests.js';

export const options = {
    vus: 1,
    iterations: 1
}

export default function () {
    const payload = {
        title: 'PulseCheck Test Product',
        price: 99,
        category: 'software'
    }

    const response = post(`${currentEnvironment.baseUrl}/products/add`, payload)

    check(response, {
        'Status is 201': (r)=> r.status === 201,
        'Product title matches': (r) => r.json().title === payload.title,
        'Product has an ID': (r) => r.json().id !== undefined
    })
}