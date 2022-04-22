# Playwright Template

This project acts as a template and exemplar to using Playwright, Typescript and the Page Object Model design pattern to test a multipage application.

## Run tests

From the project directory run:

* `npx playwright test` to run all tests headless.
* `npx playwright test <path to test file> --headed` to run all tests in a file in a headed browser

See [the Playwright command line docs](https://playwright.dev/docs/test-cli) for more info.

## Launch Application under test

From the project directory run `ng serve` to spin up the web server and navigate to <http://localhost:4200/> - you don't need to do this before running tests as that's handled by the Playwright Test framework.

The app will automatically reload if you change any of the source files.

## Pipeline

The Azure Devops pipeline is configured to install prerequisites, run the tests, publish test results and then publish test result attachments as a pipeline artifact.

When a test fails in the pipeline it is retried and a trace is recorded of the retry - this trace can be analysed to see the entire flow of the test including the full dom before and after each Playwright action. See [Playwright Trace docs](https://playwright.dev/docs/trace-viewer) for information on how to view the trace.
