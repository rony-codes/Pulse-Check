import { check } from 'k6';
import { currentEnvironment } from '../config/environments.js';
import { post, get } from '../utils/requests.js';
import { getAuthHeaders } from '../utils/auth.js';

export const options = {
    vus: 1,
    iterations: 1
};

export function setup() {
    const credentials = {
        username: 'emilys',
        password: 'emilyspass'
    };

    const response = post(
        `${currentEnvironment.baseUrl}/auth/login`,
        credentials
    );

    check(response, {
        'Login successful': (r) => r.status === 200,
        'Access token received': (r) => !!r.json().accessToken
    });

    return {
        token: response.json().accessToken
    };
}

export default function (data) {
    const response = get(
        `${currentEnvironment.baseUrl}/auth/me`,
        getAuthHeaders(data.token)
    );

    check(response, {
        'Authenticated request successful': (r) => r.status === 200,
        'Username is correct': (r) => r.json().username === 'emilys'
    });
}