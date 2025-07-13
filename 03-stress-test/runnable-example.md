# Runnable example of stress test

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
k6 run 03-stress-test/script.js
```

## Analysis

Output from k6:

![result](result.png)

### Test summary

- Stress profile:
  - Up to 75 virtual users (VUs).
  - 3 stages over 3m40s, followed by a 30s graceful ramp-down.
  - Total duration: ~4m10s (including graceful stops).
- 6,656 iterations completed.

### Observed behavior

- The system successfully handled up to 75 concurrent VUs.
- No request failures (`http_req_failed=0.00%`).
- Response times stayed well below defined thresholds throughout the test.

### Metrics highlights

- Requests: 13,312 total (approx. 60 requests/sec).
- Response time:
  - Average: 131.23ms
  - Median: 130.51ms
  - 95th percentile (p95): 140.19ms (well below 1000ms threshold).
- Iteration duration:
  - Average: 2.26s
  - 95th percentile: 2.29s.

### Data transferred

- Total received: ~20 MB (~89 kB/sec).
- Total sent: ~2.1 MB (~9.5 kB/sec).

### Overall analysis

The service maintained stable performance under gradually increasing load, peaking at 75 VUs without degradation or failures. Response times remained consistent and comfortably under threshold targets, indicating solid scalability.

### Suggestions / takeaways

- The system handled the stress conditions without performance issues.
- Further testing could explore higher VU limits or longer sustained periods to find actual system limits.
- Monitoring backend resource utilization (CPU, memory, DB load) during the test would provide deeper insight into system bottlenecks.