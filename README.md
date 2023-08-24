# Playwright Template

[![Build Status](https://dev.azure.com/ukhogov/Pipelines/_apis/build/status/UKHO.playwright-template?branchName=main)](https://dev.azure.com/ukhogov/Pipelines/_build/latest?definitionId=318&branchName=main)

This project acts as a template and exemplar to using Playwright in Typescript and C# with the [Page Object Model design pattern](docs/pageobjectmodel.md) to test a multipage application. See [here](docs/pageobjectmodel.md) for more information on how this exemplar uses the Page Object Model design pattern.

## Contents

* [Run tests](#run-tests)
* [Launch Application under test](#launch-application-under-test)
* [Pipeline](#pipeline)
* [Structure of this project](#structure-of-this-project)
* [Page Object Model pattern](docs/pageobjectmodel.md)

---

## Test projects

Before using this project it is expected that you have some experience with Playwright. Follow the official Playwright Getting Started Guide to get going with your first test and to become familiar with Playwright concepts.

## C#
It is advised that you use Visual Studio or JetBrains Rider.

Build the project.

Use the test runner in Visual Studio or Rider to run he tests

## TypeScript

It is advised that you use VS Code and the Playwright Test for VSCode extension

For first time environment setup run:

npm install
npx playwright install to download the latest playwright browser binaries. Make sure you run this command as an admin user!
Run tests
From the project directory run:

npx playwright test to run all tests headless.
npx playwright test <path to test file> --headed to run all tests in a file in a headed browser
See the Playwright command line docs for more info.

You can also run tests in the UI using the Playwright Test for VSCode extension

### Launch Application under test

From the project directory run ng serve to spin up the web server and navigate to http://localhost:4200/ - you don't need to do this before running tests as that's handled by the Playwright Test framework.

The app will automatically reload if you change any of the source files.

### Launch Websocket Server
A 'Live' websocket server can be launched from the terminal by running:

node ./src/servers/websocket-server.js

This is not required for the tests (as they use a mock websocket server) but can be useful for interacting with the test application outside of the tests.

## Structure of this project

The root contains the [pipeline](#pipeline), website config and [Playwright config](playwright.config.ts) files.

### `docs`

Further documentation is found in the docs folder.

### `ApplicationUnderTest`

This contains the website under test. This is written in angular and is **not** designed to be used as an exemplar for production code. See [Launch Application under test](ApplicationUnderTest/README.md#launch-application-under-test) for details on launching the website.

## Page Object Model Pattern

See [here](docs/pageobjectmodel.md) for more information on our implementation of the Page Object Model pattern.

## Pipeline

The Azure Devops pipeline is configured to install prerequisites, run the tests, publish test results and then publish test result attachments as a pipeline artifact.

When a test fails in the pipeline, Playwright is configured to retry it and record a trace - this trace can be analysed to see the entire flow of the test including the full dom before and after each Playwright action. See [Playwright Trace docs](https://playwright.dev/docs/trace-viewer) for information on how to view the trace.
