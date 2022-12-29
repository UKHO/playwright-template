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

* C#
* TypeScript

### Launch Application under test

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
