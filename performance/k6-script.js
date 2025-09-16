import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.02'],
    http_req_duration: ['p(95)<800']
  },
  scenarios: {
    smoke: { executor: 'constant-vus', vus: 1, duration: '1m' },
    ramp:  { executor: 'ramping-vus', startVUs: 1, stages: [ { duration: '2m', target: 15 } ] },
    soak:  { executor: 'constant-vus', vus: 5, duration: '5m' }
  }
};

export default function() {
  const res = http.get('https://buggy.justtestit.org/');
  check(res, { 'status 200': r => r.status === 200 });
  sleep(1);
}
