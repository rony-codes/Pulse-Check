
import { check } from 'k6';

import { currentEnvironment } from '../config/environments.js';

import {
    get,
    post,
    put,
    patch,
    del
} from '../utils/requests.js';

export const options = {
    vus: 1,
    iterations: 1
};

export default function () {

    const getResponse = get(`${currentEnvironment.baseUrl}/products/1`);

    check(getResponse, {
        'GET: Status is 200': (r) => r.status === 200,
        'GET: Product ID is 1': (r) => r.json().id === 1
    });


    const newProduct = {
        title: 'PulseCheck Product',
        price: 99,
        category: 'software'
    };

    const postResponse = post(
        `${currentEnvironment.baseUrl}/products/add`,
        newProduct
    );

    check(postResponse, {
        'POST: Status is 201': (r) => r.status === 201,
        'POST: Product created': (r) => r.json().title === newProduct.title
    });


    const updatedProduct = {
        title: 'PulseCheck Replacement',
        price: 149,
        description: 'Updated product'
    };

    const putResponse = put(
        `${currentEnvironment.baseUrl}/products/1`,
        updatedProduct
    );

    check(putResponse, {
        'PUT: Status is 200': (r) => r.status === 200,
        'PUT: Title updated': (r) => r.json().title === updatedProduct.title
    });


    const partialUpdate = {
        title: 'PulseCheck Final Title'
    };

    const patchResponse = patch(
        `${currentEnvironment.baseUrl}/products/1`,
        partialUpdate
    );

    check(patchResponse, {
        'PATCH: Status is 200': (r) => r.status === 200,
        'PATCH: Title updated': (r) => r.json().title === partialUpdate.title
    });


    const deleteResponse = del(
        `${currentEnvironment.baseUrl}/products/1`
    );

    check(deleteResponse, {
        'DELETE: Status is 200': (r) => r.status === 200,
        'DELETE: Product deleted': (r) => r.json().isDeleted === true
    });
}
