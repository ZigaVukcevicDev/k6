# k6

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

## Types of tests

- smoke test (checking if everything is working as expected, just 1 VU)

- performance tests
    significant number of users

- load tests
- stress tests
- spike tests

## How to run

```

```