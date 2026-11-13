# PulseCheck ⚡
### API Performance Testing Framework

![k6](https://img.shields.io/badge/k6-Performance_Testing-7D64FF?logo=k6&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?logo=githubactions&logoColor=white)
![Status](https://img.shields.io/badge/Project-In_Progress-orange)

**PulseCheck** is a JavaScript-based API performance testing framework built using [Grafana k6](https://k6.io/).

It provides a structured and reusable approach to API testing, performance measurement, custom metrics collection, automated reporting, and CI/CD integration through GitHub Actions.

The goal is to make API performance testing repeatable, configurable, and easier to analyze.

---

## Features

- **Reusable API utilities** – Centralized HTTP request methods for GET, POST, PUT, PATCH, and DELETE.
- **Multiple performance scenarios** – Smoke, load, stress, spike, and soak testing.
- **API workflow testing** – Validate sequences of API operations.
- **Authentication testing** – Test authenticated API endpoints using bearer tokens.
- **Custom metrics** – Track API response times, successful requests, failed requests, and business failure rates.
- **Performance thresholds** – Define measurable performance expectations.
- **Automated reporting** – Generate HTML and JSON reports using k6-reporter.
- **CI/CD integration** – Execute smoke tests automatically through GitHub Actions.
- **Artifact management** – Store generated test reports as downloadable GitHub Actions artifacts.

## Tech Stack

| Technology | Purpose |
|---|---|
| JavaScript (ES6+) | Test scripting |
| Grafana k6 | API and performance testing |
| k6-reporter | HTML reporting |
| Git & GitHub | Version control |
| GitHub Actions | CI/CD automation |

## Project Structure

```text
pulsecheck/
│
├── tests/
│   ├── smoke-test.js
│   ├── load-test.js
│   ├── stress-test.js
│   ├── spike-test.js
│   ├── soak-test.js
│   ├── api-workflow-test.js
│   ├── auth-test.js
│   └── search-test.js
│
├── config/
│   ├── environments.js
│   └── thresholds.js
│
├── utils/
│   ├── auth.js
│   ├── requests.js
│   ├── checks.js
│   ├── metrics.js
│   └── reporting.js
│
├── data/
│   └── test-data.json
│
├── reports/
│
├── .github/
│   └── workflows/
│       └── performance.yml
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- Grafana k6
- Git

### 1. Clone the repository

```bash
git clone https://github.com/rony-codes/Pulse-Check.git
cd Pulse-Check
```

### 2. Install k6

On Windows, using Winget:

```powershell
winget install k6 --source winget
```

Verify installation:

```bash
k6 version
```

### 3. Configure the environment

Set the API base URL.

PowerShell:

```powershell
$env:BASE_URL="https://your-api.example.com"
```

Linux/macOS:

```bash
export BASE_URL="https://your-api.example.com"
```

The project currently defaults to DummyJSON when no `BASE_URL` is provided.

### 4. Run your first test

```bash
npm run test:smoke
```

## Available Test Scenarios

| Scenario | Command | Purpose |
|---|---|---|
| Smoke | `npm run test:smoke` | Verify basic API functionality |
| Load | `npm run test:load` | Evaluate performance under expected load |
| Stress | `npm run test:stress` | Gradually increase workload |
| Spike | `npm run test:spike` | Evaluate sudden traffic increases |
| Soak | `npm run test:soak` | Evaluate sustained workload |
| API Workflow | `npm run test:workflow` | Validate multiple API operations |
| Authentication | `npm run test:auth` | Validate authenticated endpoints |
| Search | `npm run test:search` | Validate API search functionality |

Additional individual request tests:

```bash
npm run test:post
npm run test:put
npm run test:patch
npm run test:delete
```

**Note:** Performance profiles are configurable examples, not certified capacity benchmarks. Only run load, stress, spike, and soak tests against systems you own or have explicit permission to test.

## Performance Metrics

PulseCheck uses built-in k6 metrics alongside custom metrics.

### Custom metrics

| Metric | Description |
|---|---|
| `api_response_time` | Tracks API response duration |
| `successful_requests` | Counts successful HTTP responses |
| `failed_requests` | Counts unsuccessful HTTP responses |
| `business_failure_rate` | Tracks failed business checks |

### Thresholds

Performance expectations are configured in:

```text
config/thresholds.js
```

Current baseline thresholds include:

- Average response time below 500 ms.
- 90th percentile below 800 ms.
- 95th percentile below 1000 ms.
- 99th percentile below 1500 ms.
- HTTP request failure rate below 1%.
- Check success rate above 95%.

These are configurable starting targets, not universal performance standards.

## Reporting

PulseCheck generates two report formats:

**1. HTML Report**

A visual report containing performance statistics, response-time distributions, request metrics, and check results.

**2. JSON Report**

Structured test summary data for further analysis and processing.

Reports are generated inside:

```text
reports/
├── smoke-test.html
├── smoke-test.json
├── load-test.html
└── load-test.json
```

The reporting system uses a shared utility:

```javascript
import { generateReport } from '../utils/reporting.js';

export function handleSummary(data) {
    return generateReport(data, 'smoke-test');
}
```

Generated reports are excluded from Git tracking.

## CI/CD Integration

PulseCheck integrates with GitHub Actions.

Workflow location:

```text
.github/workflows/performance.yml
```

The current CI workflow:

1. Checks out the repository.
2. Sets up k6 on the GitHub runner.
3. Executes the API smoke test.
4. Verifies generated reports.
5. Uploads reports as GitHub Actions artifacts.

Workflow triggers:

- Push events
- Pull requests
- Manual workflow dispatch

Reports are uploaded with a seven-day retention period.

[View GitHub Actions](https://github.com/rony-codes/Pulse-Check/actions)

## Current Project Status

| Component | Status |
|---|---|
| Project foundation | Complete |
| Reusable API utilities | Complete |
| Performance test scenarios | Implemented |
| Custom metrics and thresholds | Implemented |
| HTML and JSON reporting | Implemented |
| GitHub Actions CI | Working |
| Configurable CI environments | Planned |
| Extended CI/CD automation | Planned |

## Future Improvements

- Configurable test environments in CI/CD.
- Automated execution of selected performance scenarios.
- Improved test result analysis.
- Historical performance comparison.
- More advanced performance regression detection.

## Author

**Rohan Kumar**

Software Engineer | API Testing | Performance Engineering

GitHub: [@rony-codes](https://github.com/rony-codes)

---

*PulseCheck — Measure. Analyze. Improve.*