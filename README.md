# k6

## Table of contents

- Types of tests
    - [Smoke test](#smoke-test)

<!--
## Vocabulary

- VU - virtual user(s)
- latency - time between asking and receiving (low latency making quicker responses) - a good latency is below 300 ms
- throughput - number of requests handled in certain time (low is bad)
- iterations - repeated actions (like login)
- sleep - pause after request
- percale (more important than average) - p(90) - 90% of e.g. requests had that time
- service level objective (SLO) - it is like saying
    - The application will be available 99.8% of time
    - 90% of responses are within 0.5 seconds of receiving request
- TBD thresholds 
- TBD ramp-up, ramp-down 
-->

## Types of tests

### Smoke test

#### I. Definition

**Smoke test is a preliminary test** that checks whether the **basic and critical functionalities** of a software build **work correctly**. It is used to verify that the software is stable enough for further, more detailed testing.

> Easy explanation 
>
> Checking if a bridge is safe enough for cars and trucks.

The term comes from hardware testing, where engineers powered on a device and checked if smoke came out — if it did, testing stopped immediately.

#### II. Key characteristics

- Shallow and broad: Focuses on covering major features, not detailed behavior.
- Quick execution: Designed to run quickly to validate build stability.
- Gatekeeper: Acts as a gate before proceeding to deeper testing.
- Automated or manual: Can be automated but is often a simple checklist when manual.
- Frequent execution: Typically run on every new build to catch show-stopper issues early.

#### III. Practical examples

- Is API returning response?
- Does main page loads?
- Can user login?

#### IV. Users and time

- Number of virtual users:
  
  Smoke testing is not about concurrency or load — typically performed with **1 user** or simulated user session.

- Execution time:

  Smoke tests should be **fast** - ideal duration is a **few minutes** (e.g., 5–15 min max), depending on project complexity, to quickly give feedback on build health.

#### V. Examples with k6

a) Simple example

```js
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 1,
  iterations: 5,
};

export default function () {
  const response = http.get('https://api.example.com/health');

  check(response, {
    'status is 200': (res) => res.status === 200,
    'body is not empty': (res) => res.body.length > 0,
  });
}
```

b) Runnable example [smoke-test.js](smoke-test.js)

```bash
k6 run smoke-test.js
```

### Load test

#### I. Definition

**Load test simulates expected user traffic to measure the performance of a system under normal conditions**. It ensures that the system can handle concurrent users and transactions within acceptable performance thresholds.

> Easy explanation 
>
> Checking if a bridge can safely handle the expected daily traffic flow over time.

#### II. Key characteristics

- Focused on expected load: Simulates real-life usage scenarios with many users.
- Sustained execution: Runs over a longer period to gather performance metrics.
- Concurrent users: Measures how the system handles simultaneous user sessions.
- Performance benchmarks: Helps define acceptable response times, throughput, and error rates.
- Detects bottlenecks: Reveals performance limitations under typical usage.

#### III. Practical examples

- Can 1000 users browse the shop at the same time?
- How fast does the API respond when 500 concurrent users call it?

#### IV. Users and time

- Number of virtual users:
  
  Depends on the expected traffic. Example: simulate **100–1000 concurrent users**.

- Execution time:

  Usually between 10 minutes to **1 hour (or longer)**, long enough to measure system behavior under sustained load.

#### V. Examples with k6

a) Simple example

```js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 50 }, // ramp-up to 50 users
    { duration: '3m', target: 50 }, // hold 50 users
    { duration: '1m', target: 0 },  // ramp-down
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

b) Runnable example [load-test.js](load-test.js)

```bash
k6 run load-test.js
```

<!--
- performance tests
    significant number of users
- stress tests
- spike tests
-->