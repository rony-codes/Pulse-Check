
import { check } from 'k6';
import { currentEnvironment } from '../config/environments.js';
import { get } from '../utils/requests.js';

export const options = {
    stages: [
        { duration: '30s', target: 3 },
        { duration: '2m', target: 3 },
        { duration: '30s', target: 0 }
    ]
};

export default function () {
    const response = get(
        `${currentEnvironment.baseUrl}/products`
    );

    check(response, {
        'Status is 200': (r) => r.status === 200,
        'Products are returned': (r) =>
            r.json().products.length > 0
    });
}
