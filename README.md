# Reliability and performance tests with k6 examples

Repository provides example scripts and instructions for **running tests** using [k6](https://k6.io/), a modern load testing tool.

The examples help you **quickly understand** what each test is for, how to write, execute, and analyze tests, with a focus on simplicity and practical application.

| Type                             | Easy explanation                                                           | No. of virtual users | Execution time   |
| -------------------------------- | -------------------------------------------------------------------------- | -------------------- | ---------------- |
| [Smoke test](smoke-test/text.md) | Checking if a bridge is safe enough for cars.                              | 1                    | 5–15 min         |
| [Load test](load-test/text.md)   | Checking if a bridge can safely carry the daily traffic of cars over time. | 100–1000             | 10 min to 1 hour |
| [Stress test (TODO)]()           |                                                                            |                      |                  |
| [Breakpoint test (TODO)]()       |                                                                            |                      |                  |
| [Soak test (TODO)]()             |                                                                            |                      |                  |

> To better understand the terms in testing and k6 see [vocabulary](vocabulary.md).

<!--
- performance tests
    significant number of users
- stress tests
- spike tests
-->