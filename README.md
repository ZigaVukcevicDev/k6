# Reliability and performance tests with k6 examples

Repository provides example scripts and instructions for **running tests** using [k6](https://k6.io/), a modern load testing tool.

The examples help you **quickly understand** what each test is for, how to write, execute, and analyze tests, with a focus on simplicity and practical application.

| Type                                                | Easy explanation                                                           | No. of virtual users | Execution time   |
| --------------------------------------------------- | -------------------------------------------------------------------------- | -------------------- | ---------------- |
| [Smoke test](01-smoke-test/definition.md)           | Checking if a bridge is safe enough for cars.                              | 1                    | 5-15 min         |
| [Load test](02-load-test/definition.md)             | Checking if a bridge can safely carry the daily traffic of cars over time. | 100–1000             | 10-60 min |
| [Stress test](03-stress-test/definition.md)         | Checking how a bridge behaves when overloaded with more cars than usual.                                                                       | 1,5-2x of the load                 | 10-60 min             |
| [Spike test](04-spike-test/definition.md)         | TODO                                                                       | TODO                 | TODO             |
| [Breakpoint test](05-breakpoint-test/definition.md) | TODO                                                                       | TODO                 | TODO             |
| [Soak test](06-soak-test/definition.md)             | TODO                                                                       | TODO                 | TODO             |

> To better understand the terms in testing and k6 see [vocabulary](vocabulary.md).

To install k6 see [instructions](https://grafana.com/docs/k6/latest/set-up/install-k6/).

### Resources

- [What is Smoke Testing? | Definition from TechTarget](https://www.techtarget.com/searchsoftwarequality/definition/smoke-testing)
- [What is Load Testing? | Splunk](https://www.splunk.com/en_us/blog/learn/load-testing.html)
- [Stress testing (software) - Wikipedia](https://en.wikipedia.org/wiki/Stress_testing_(software))
- [Performance Testing: Introduction to k6 for Beginners](https://www.udemy.com/course/k6-load-testing-performance-testing/)