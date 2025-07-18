# Runnable example of load test

Table of contents

- [Script and how to run](#script-and-how-to-run)
- [Analysis](#analysis)
  - [Test summary](#test-summary)
  - [Observed behavior](#observed-behavior)
  - [Metrics highlights](#metrics-highlights)
  - [Data transferred](#data-transferred)
  - [Overall analysis](#overall-analysis)
  - [Suggestions / takeaways](#suggestions--takeaways)

## Script and how to run

See [script for k6](script.js). To run use:

```bash
k6 run 02-load-test/script.js
```

## Analysis

Output from k6:

![result](result.png)

### Test summary

- Script simulated traffic to https://quickpizza.grafana.com:
  - `contacts.php`
  - `news.php`
- Load pattern:
  - Ramp-up: 0 → 50 VUs in 20s
  - Sustained: 50 VUs for 3m
  - Ramp-down: 50 → 0 VUs in 20s
- Total duration: ~3m41.8s
- 4452 iterations completed, ~20 iterations/sec

### Observed behavior

- Application responded consistently under load.
- No HTTP request failures observed (`0.00% failure rate`).
- 95% of requests completed within 152.3ms (well below 1s threshold).

### Metrics highlights

- Response time:
  - Avg: 132.93ms
  - p(90): 135.1ms
  - p(95): 152.3ms
  - Max: 3.98s
- Request rate:
  - 39.96 requests/sec overall.
- Iterations:
  - 4432 iterations (avg iteration ~2.27s)

### Data transferred

- Received: ~13 MB (~59 kB/s)
- Sent: ~1.4 MB (~6.3 kB/s)

### Overall analysis

Thresholds met:
- p(95)<1000ms: 152.3ms
- HTTP failures <1%: 0%

Performance stable under 50 concurrent users.

### Suggestions / takeaways

- Good performance baseline: The service is performant under moderate load.
- Next steps:
  - Test higher loads (e.g., 100+ VUs) for scalability limits.
  - Add checks/assertions to validate content correctness.
  - Monitor backend resource utilization (CPU, memory) alongside k6 metrics.