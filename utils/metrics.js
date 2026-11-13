
import { Trend, Counter, Rate } from 'k6/metrics';

export const apiResponseTime = new Trend('api_response_time');

export const successfulRequests = new Counter('successful_requests');

export const failedRequests = new Counter('failed_requests');

export const businessFailureRate = new Rate('business_failure_rate');
