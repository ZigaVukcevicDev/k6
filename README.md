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
-->

## Types of tests

### Smoke test

#### A. Definition

**Smoke test is a preliminary test** that checks whether the **basic and critical functionalities** of a software build **work correctly**. It is used to verify that the software is stable enough for further, more detailed testing.

 The term comes from hardware testing, where engineers powered on a device and checked if smoke came out — if it did, testing stopped immediately.

> Easy explanation 
>
> Checking if a bridge is safe enough for cars and trucks.

#### B. Key characteristics

- Shallow and broad: Focuses on covering major features, not detailed behavior.
- Quick execution: Designed to run quickly to validate build stability.
- Gatekeeper: Acts as a gate before proceeding to deeper testing.
- Automated or manual: Can be automated but is often a simple checklist when manual.
- Frequent execution: Typically run on every new build to catch show-stopper issues early.

#### C. Practical examples

- Is API returning response?
- Does main page loads?
- Can user login?

#### D. Virtual users and execution time

- Number of virtual users:
  
  Smoke testing is not about concurrency or load — typically performed with **1 user** or simulated user session.
- Execution time:

  Smoke tests should be **fast** - ideal duration is a **few minutes** (e.g., 5–15 min max), depending on project complexity, to quickly give feedback on build health.

#### E. Examples with k6

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

b) Runnable example [smoke-test.js](smoke-test.js).

```bash
k6 run smoke-test.js
```


<!--
- smoke test (checking if everything is working as expected, just 1 VU), can be run on cronjob on production

- performance tests
    significant number of users

- load tests
- stress tests
- spike tests

## How to run

```bash
k6 run first-script.js
```
-->