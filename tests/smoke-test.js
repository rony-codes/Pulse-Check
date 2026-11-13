import { check } from 'k6';
import { SharedArray } from 'k6/data';
import { currentEnvironment } from '../config/environments.js';
import { get } from '../utils/requests.js';
import { validateStatus, validateJson } from '../utils/checks.js';

const testData = new SharedArray('test data', function () {
    return [JSON.parse(open('../data/test-data.json'))];
});

export const options = {
    vus: 1,
    iterations: 5
};

export default function () {
    const productIds = testData[0].productIds;
    const productId = productIds[__ITER % productIds.length];

    const response = get(
        `${currentEnvironment.baseUrl}/products/${productId}`
    );

    validateStatus(response, 200);
    validateJson(response);

    check(response, {
        'Product ID is correct': (r) => r.json().id === productId,
        'Product title exists': (r) => r.json().title !== ''
    });
}