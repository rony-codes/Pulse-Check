import { check } from 'k6';
import { SharedArray } from 'k6/data';
import { currentEnvironment } from '../config/environments.js';
import { get } from '../utils/requests.js';
import { validateStatus, validateJson } from '../utils/checks.js';

const testData = new SharedArray('search test data', function () {
    return [JSON.parse(open('../data/test-data.json'))];
});

export const options = {
    vus: 1,
    iterations: 3
};

export default function() {
    const queries = testData[0].searchQueries;
    const searchQuery = queries[__ITER % queries.length];

    const response = get(
        `${currentEnvironment.baseUrl}/products/search?q=${encodeURIComponent(searchQuery)}`
    );
    
    validateStatus(response, 200);
    validateJson(response);

    check(response, {
        'Search returns products': (r) => r.json().products.length > 0,
        'Search query is present': (r) => r.json().products.some(
            (product) => product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
    });

}