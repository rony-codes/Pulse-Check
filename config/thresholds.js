
export const thresholds = {
    http_req_duration: [
        'avg<500',
        'p(90)<800',
        'p(95)<1000',
        'p(99)<1500'
    ],

    http_req_failed: [
        'rate<0.01'
    ],

    checks: [
        'rate>0.95'
    ]
};
