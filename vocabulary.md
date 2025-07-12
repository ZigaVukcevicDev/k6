# Vocabulary

# VU

Stands for virtual user — simulated user running test scripts concurrently to emulate real-world traffic.

## Latency

Time between sending a request and receiving the first byte of the response.
  
_Good latency is below 300 ms._

## Throughput

Number of requests successfully handled per unit of time (e.g., requests per second).

_High throughput is good, low is bad._

## Iterations

How many times the test function executes (e.g., one iteration = one simulated user flow like login).

## Sleep

Pause between actions in a test to simulate user think-time or pacing (e.g., `sleep(1)` means 1 second pause).

## Percentile

E.g., `p(90)` or `p(95)` — statistical measure indicating that X% of requests completed in Y ms or less.

Example: `p(90)<500` means 90% of requests completed in less than 500 ms.

_More useful than average because it shows distribution._

## SLO (Service Level Objective)

Target performance/availability goal, e.g.:
- _Availability:_ 99.8% uptime.
- _Performance:_ 90% of responses within 0.5s.

## Threshold

Pass/fail condition in k6 tests based on metrics, used to enforce SLOs programmatically.

Example: `http_req_duration: ['p(95)<500']`.

## Ramp-up / Ramp-down

Gradual increase or decrease in the number of virtual users during a test.

- _Ramp-up_: Avoids sudden spikes.
- _Ramp-down_: Allows graceful termination.
