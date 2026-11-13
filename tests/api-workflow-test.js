
import { check } from 'k6';
import { currentEnvironment } from '../config/environments.js';
import { get, post, put, patch, del } from '../utils/requests.js';
import { generateReport } from '../utils/reporting.js';

export const options = {
    stages: [
        { duration: '20s', target: 2 },
        { duration: '1m', target: 2 },
        { duration: '20s', target: 0 }
    ]
};

export default function () {
    const baseUrl = currentEnvironment.baseUrl;

    const getResponse = get(`${baseUrl}/products/1`);

    check(getResponse, {
        'GET returns 200': (r) => r.status === 200
    });

    const postPayload = {
        title: 'PulseCheck Test Product',
        price: 99,
        category: 'software'
    };

    const postResponse = post(
        `${baseUrl}/products/add`,
        postPayload
    );

    check(postResponse, {
        'POST returns 201': (r) => r.status === 201
    });

    const putPayload = {
        title: 'PulseCheck Updated Product',
        price: 149
    };

    const putResponse = put(
        `${baseUrl}/products/1`,
        putPayload
    );

    check(putResponse, {
        'PUT returns 200': (r) => r.status === 200
    });

    const patchResponse = patch(
        `${baseUrl}/products/1`,
        { title: 'PulseCheck Patched Product' }
    );

    check(patchResponse, {
        'PATCH returns 200': (r) => r.status === 200
    });

    const deleteResponse = del(`${baseUrl}/products/1`);

    check(deleteResponse, {
        'DELETE returns 200': (r) => r.status === 200,
        'Product is marked deleted': (r) =>
            r.json().isDeleted === true
    });
}

export function handleSummary(data) {
    return generateReport(data, 'api-workflow-test');
}