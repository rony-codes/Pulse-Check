import http from 'k6/http';

const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

function getParams(params = {}) {
    return {
        ...params,
        headers: {
            ...defaultHeaders,
            ...params.headers
        }
    };
}

export function get(url, params = {}) {
    return http.get(url, getParams(params));
}

export function post(url, payload, params = {}) {
    return http.post(url, JSON.stringify(payload), getParams(params));
}

export function put(url, payload, params = {}) {
    return http.put(url, JSON.stringify(payload), getParams(params));
}

export function patch(url, payload, params = {}) {
    return http.patch(url, JSON.stringify(payload), getParams(params));
}

export function del(url, params = {}) {
    return http.del(url, null, getParams(params));
}
