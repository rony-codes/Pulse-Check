
import { check } from 'k6';
import { currentEnvironment } from '../config/environments.js';
import { get } from '../utils/requests.js';
import { generateReport } from '../utils/reporting.js';

export const options = {
    stages: [
        { duration: '20s', target: 2 },
        { duration: '5s', target: 15 },
        { duration: '30s', target: 15 },
        { duration: '5s', target: 2 },
        { duration: '20s', target: 2 },
        { duration: '5s', target: 0 }
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

export function handleSummary(data) {
    return generateReport(data, 'spike-test');
}