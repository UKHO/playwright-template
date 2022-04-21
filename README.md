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
