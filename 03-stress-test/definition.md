# Stress test

Table of contents

- [I. Definition](#i-definition)
- [II. Scheme](#ii-scheme)
- [III. Key characteristics](#iii-key-characteristics)
- [IV. Practical examples](#iv-practical-examples)
- [V. Users and time](#v-users-and-time)
- [VI. Examples with k6](#vi-examples-with-k6)
  - [a) Simple example](#a-simple-example)
  - [b) Runnable example](#b-runnable-example)

## I. Definition

**Stress test evaluates how a system performs under extreme but sustained conditions** that exceed normal operational capacity. The goal is to observe performance degradation and system behavior under heavy load — not necessarily to cause failure.

> Easy explanation 
>
> Checking how a bridge behaves when overloaded with more cars than usual.

## II. Scheme

![Chart](chart.png)

## III. Key characteristics

- Simulates extreme conditions: Load well above expected peak traffic.
- Sustained stress: Holds the system at high load to observe performance degradation.
- Degradation focus: Measures response times, errors, and stability under stress.
- Recovery observation: Checks whether the system can return to normal performance after removing stress.
- Capacity planning: Helps determine safe operational limits and buffer capacity.

## IV. Practical examples

- How does the system perform when subjected to 1.5x or 2x peak traffic for an hour?
- Does the application slow down gracefully or fail suddenly under heavy stress?

## V. Users and time

- Number of virtual users:
  
  Simulates load above the expected. Example: if load is 500 users - test with 750–1000 users (**1,5-2x of the load**).

- Execution time:

  Typically **10 min to 1 h**, long enough to observe behavior under prolonged stress.

## VI. Examples with k6

### a) Simple example

```js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    // approx. 10% of duration, ramp-up to 1,5-2x of the load users
    { duration: '3m', target: 150 }, 
    // hold 150 users for 30m
    { duration: '30m', target: 150 },  
    // approx. 10% of duration, ramp-down to 0 users
    { duration: '3m', target: 0 },  
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],    // <1% errors
    http_req_duration: ['p(95)<1000'], // 95% of requests < 1s
  },
};

export default function () {
  const response = http.get('https://api.example.com/products');

  check(response, {
    'status is 200': (res) => res.status === 200,
  });

  sleep(1);
}
```

### b) Runnable example

See [runnable example](runnable-example.md).