import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 75 },
    { duration: '3m', target: 75 },
    { duration: '20s', target: 0 }
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1000']
  }
};

export default function () {
  const url = 'https://quickpizza.grafana.com';

  http.get(`${url}/contacts.php`);
  sleep(1);

  http.get(`${url}/news.php`);
  sleep(1);
}
