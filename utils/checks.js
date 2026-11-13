import { check } from 'k6';

export function validateStatus(response, expectedStatus = 200) {
    return check(response, {
        [`Status is ${expectedStatus}`]: (r) => r.status === expectedStatus
    });
}

export function validateJson(response) {
    return check(response, {
        'Response is valid JSON': (r) => {
            try {
                r.json();
                return true;
            } catch {
                return false;
            }
        }
    });
}