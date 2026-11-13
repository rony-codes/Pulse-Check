import {check} from 'k6';
import { currentEnvironment } from '../config/environments.js';
import { patch } from '../utils/requests.js';

export const options = {
    vus: 1,
    iterations: 1
};


export default function () {
    const payload = {
        title: 'PulseCheck Updated Title'
    };

    const response = patch(`${currentEnvironment.baseUrl}/products/1`, payload)

    check(response, {
        'Status is 200': (r) => r.status === 200,
        'Product title updated': (r) => r.json().title === payload.title
    });
}