import { check } from 'k6';
import { currentEnvironment } from '../config/environments.js';
import { del } from '../utils/requests.js';

export const options = {
    vus: 1,
    iterations: 1
}

export default function(){
    const response = del(`${currentEnvironment.baseUrl}/products/1`)

    check(response, {
        'Status code is 200': (r) => r.status === 200,
        'Product ID is 1': (r) => r.json().id === 1,
        'Product is deleted': (r) => r.json().isDeleted === true
    })
}