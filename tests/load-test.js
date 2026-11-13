import { check } from 'k6';
import { currentEnvironment } from '../config/environments.js';
import { get } from '../utils/requests.js';
import { thresholds } from '../config/thresholds.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/3.0.4/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.1.0/index.js';

import {
    apiResponseTime,
    successfulRequests,
    failedRequests,
    businessFailureRate
} from '../utils/metrics.js';

export const options = {
    stages: [
        { duration: '30s', target: 5 },
        { duration: '1m', target: 5 },
        { duration: '30s', target: 0 }
    ],

    thresholds: {
        ...thresholds,
        api_response_time: ['p(95)<1000'],
        business_failure_rate: ['rate<0.05']
    }
};

export default function () {
    const response = get(
        `${currentEnvironment.baseUrl}/products`
    );

    apiResponseTime.add(response.timings.duration);

    const requestSucceeded = response.status === 200;

    if (requestSucceeded) {
        successfulRequests.add(1);
    } else {
        failedRequests.add(1);
    }

    const businessCheck = check(response, {
        'Products are returned': (r) =>
            r.status === 200 &&
            r.json().products.length > 0
    });

    businessFailureRate.add(!businessCheck);
}

export function handleSummary(data) {
    return generateReport(data, 'load-test');
}