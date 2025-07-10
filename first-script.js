import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 10, // number of virtual users
    duration: '20s', // duration of the test
};

export default function () {
    const url = 'https://quickpizza.grafana.com/test.k6.io/';
    const response = http.get(url);

    // Simulate some processing time
    sleep(1);
}