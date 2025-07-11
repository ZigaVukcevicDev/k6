# Load test

Table of contents

- [I. Definition](#i-definition)
- [II. Key characteristics](#ii-key-characteristics)
- [III. Practical examples](#iii-practical-examples)
- [IV. Users and time](#iv-users-and-time)
- [V. Examples with k6](#v-examples-with-k6)
  - [a) Simple example](#a-simple-example)
  - [b) Runnable example](#b-runnable-example)
    - [Analysis](#analysis)
      - [Test summary](#test-summary)
      - [Observed behavior](#observed-behavior)
      - [Metrics highlights](#metrics-highlights)
      - [Data transferred](#data-transferred)
      - [Overall analysis](#overall-analysis)
      - [Suggestions / takeaways](#suggestions--takeaways)

## I. Definition

**Load test simulates expected user traffic to measure the performance of a system under normal conditions**. It ensures that the system can handle concurrent users and transactions within acceptable performance thresholds.

> Easy explanation 
>
> Checking if a bridge can safely carry the daily traffic of cars and trucks over time.

## II. Key characteristics

- Focused on expected load: Simulates real-life usage scenarios with many users.
- Sustained execution: Runs over a longer period to gather performance metrics.
- Concurrent users: Measures how the system handles simultaneous user sessions.
- Performance benchmarks: Helps define acceptable response times, throughput, and error rates.
- Detects bottlenecks: Reveals performance limitations under typical usage.

## III. Practical examples

- Can 1000 users browse the shop at the same time?
- How fast does the API respond when 500 concurrent users call it?

## IV. Users and time

- Number of virtual users:
  
  Depends on the expected traffic. Example: simulate **100–1000 concurrent users**.

- Execution time:

  Usually between **10 minutes to 1 hour** (or longer), long enough to measure system behavior under sustained load.

## V. Examples with k6

### a) Simple example

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

### b) Runnable example

See script for [load test](script.js).

```bash
k6 run load-test/script.js
```

#### Analysis

Output from k6:

TODO

##### Test summary

TODO

##### Observed behavior

TODO

##### Metrics highlights

TODO

##### Data transferred

TODO

##### Overall analysis

TODO

##### Suggestions / takeaways

TODO