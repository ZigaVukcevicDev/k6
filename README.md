# k6

## Table of contents

- Types of tests
    - [Smoke test](#smoke-test)
    - [Load test](#load-test)
- [Vocabulary](#Vocabulary)

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

  Smoke tests should be **fast** - ideal duration is a **few minutes** (e.g. 5–15 min max), depending on project complexity, to quickly give feedback on build health.

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
> Checking if a bridge can safely carry the daily traffic of cars and trucks over time.

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

## Vocabulary

- **VU (virtual user)**: Simulated user running test scripts concurrently to emulate real-world traffic.
- **Latency**: Time between sending a request and receiving the first byte of the response.
  
  _Good latency: below 300 ms._

- **Throughput**: Number of requests successfully handled per unit of time (e.g. requests per second).

  _High throughput is good, low is bad._
- **Iterations**: How many times the test function executes (e.g. one iteration = one simulated user flow like login).
- **Sleep**: Pause between actions in a test to simulate user think-time or pacing (e.g. `sleep(1)` means 1 second pause).

- **Percentile (e.g. p(90), p(95))**: Statistical measure indicating that X% of requests completed in Y ms or less.
Example: `p(90)<500` means 90% of requests completed in less than 500 ms.

  _More useful than average because it shows distribution._

- **SLO (Service Level Objective)**: Target performance/availability goal, e.g.:
    - _Availability:_ 99.8% uptime.
    - _Performance:_ 90% of responses within 0.5s.
- **Threshold**: Pass/fail condition in k6 tests based on metrics, used to enforce SLOs programmatically.

  _Example:_ `http_req_duration: ['p(95)<500']`.
- **Ramp-up / Ramp-down**: Gradual increase or decrease in the number of virtual users during a test.

  _Ramp-up_: Avoids sudden spikes.
  
  _Ramp-down_: Allows graceful termination.



<!--
- performance tests
    significant number of users
- stress tests
- spike tests
-->