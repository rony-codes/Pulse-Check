
import http from 'k6/http';
import { check } from 'k6';
import { currentEnvironment } from '../config/environments.js';

export const options = {
    vus: 1,
    iterations: 1
};

export default function () {
    const response = http.get(
        `${currentEnvironment.baseUrl}/products/1`
    );

    check(response, {
        'Status is 200': (r) => r.status === 200,
        'Product ID is 1': (r) => r.json().id === 1,
        'Product title exists': (r) => r.json().title !== ''
    });
}
