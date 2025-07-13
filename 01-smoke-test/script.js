import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '20s'
};

export default function () {
  const url = 'https://quickpizza.grafana.com';

  // Valid address
  http.get(`${url}`);
  sleep(1);

  // Address not available
  // k6 shows warning no such host
  http.get(`${url}.local`);
  sleep(1);

  // Valid address but server returns 404
  // k6 will treat this as request failed and output it in percentage of failed requests (not showing any warning))
  http.get(`${url}/example.php`);
  sleep(1);

  // Valid address
  http.get(`${url}/contacts.php`);
  sleep(1);

  // Valid address
  http.get(`${url}/news.php`);
  sleep(1);
}
