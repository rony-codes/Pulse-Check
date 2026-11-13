import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/3.0.4/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.1.0/index.js';

export function generateReport(data, testName) {
    return {
        [`reports/${testName}.html`]: htmlReport(data, {
            title: `PulseCheck - ${testName} Report`
        }),

        [`reports/${testName}.json`]: JSON.stringify(data, null, 2),

        stdout: textSummary(data, {
            indent: ' ',
            enableColors: true
        })
    };
}