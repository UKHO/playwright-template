# Playwright Template

[![Build Status](https://dev.azure.com/ukhogov/Pipelines/_apis/build/status/UKHO.playwright-template?branchName=main)](https://dev.azure.com/ukhogov/Pipelines/_build/latest?definitionId=318&branchName=main)

This project acts as a template and exemplar to using Playwright, Typescript and the [Page Object Model design pattern](docs/pageobjectmodel.md) to test a multipage application. See [here](docs/pageobjectmodel.md) for more information on how this exemplar uses the Page Object Model design pattern.

## Contents

* [Run tests](#run-tests)
* [Launch Application under test](#launch-application-under-test)
* [Pipeline](#pipeline)
* [Structure of this project](#structure-of-this-project)
* [Page Object Model pattern](docs/pageobjectmodel.md)
* [Do/do nots](#dodo-nots)
* [Common pitfalls with Playwright](#common-pitfalls-with-playwright)

---

## Getting started

**Before using this project it is expected that you have some experience with Playwright.** Follow the [official Playwright Getting Started Guide](https://playwright.dev/docs/intro) to get going with your first test and to become familiar with Playwright concepts.

It is advised that you use VS Code and the [Playwright Test for VSCode](https://playwright.dev/docs/getting-started-vscode) extension

### Run tests

From the project directory run:

* `npx playwright test` to run all tests headless.
* `npx playwright test <path to test file> --headed` to run all tests in a file in a headed browser

See [the Playwright command line docs](https://playwright.dev/docs/test-cli) for more info.

You can also run tests in the UI using the [Playwright Test for VSCode](https://playwright.dev/docs/getting-started-vscode) extension

### Launch Application under test

From the project directory run `ng serve` to spin up the web server and navigate to <http://localhost:4200/> - you don't need to do this before running tests as that's handled by the Playwright Test framework.

The app will automatically reload if you change any of the source files.

## Structure of this project

The root contains the [pipeline](#pipeline), website config and [Playwright config](playwright.config.ts) files.

### `docs`

Further documentation is found in the docs folder.

### `src`

This contains the website under test. This is written in angular and is **not** designed to be used as an exemplar for production code. See [Launch Application under test](#launch-application-under-test) for details on launching the website.

### `tests`

This folder is the base folder for all test code. It also contains [`global-setup.ts`](tests/global-setup.ts) which enables login code to be run once (and the state stored) before any tests are run.

### `tests/a11y`

This contains the accessibility tests. Note that the a11y config is shared and that the Page Object Model classes are used.

### `tests/component`

This contains the page specific tests. Each page has its own specs file and all tests use the Page Object Model classes.

### `tests/e2e`

This contains the tests for end-to-end flows through an application. All tests use the Page Object Model classes.

### `tests/page-object-model`

This folder is the root of the Page Object Model.

Alongside the `pages` and `shared-components` folders, it contains the `Utilities` class which allows for extension of Playwright functionality. The `Utilities` object is accessible through the `BasePage` and could also be used if needed in a component.

### `tests/page-object-model/pages`

The `tests/page-object-model/pages` folder contains a file for each web page - within each file there is a `Page` class that is responsible for interacting with the page and a `PageAssertions` class which is responsible for asserting behaviour of a page.

The `BasePage` contains properties and behaviour common to all the pages.

### `tests/page-object-model/shared-components`

This contains code to interact with components that are on multiple pages such as the nav bar or the table. Each component has its own file containing a "component" class to interact with the component and (if applicable) an assertion class which is accessed via the component.

## Page Object Model Pattern

See [here](docs/pageobjectmodel.md) for more information on our implementation of the Page Object Model pattern.

## Pipeline

The Azure Devops pipeline is configured to install prerequisites, run the tests, publish test results and then publish test result attachments as a pipeline artifact.

When a test fails in the pipeline, Playwright is configured to retry it and record a trace - this trace can be analysed to see the entire flow of the test including the full dom before and after each Playwright action. See [Playwright Trace docs](https://playwright.dev/docs/trace-viewer) for information on how to view the trace.

## Do/do nots

### Do

* Use [`locator`](https://playwright.dev/docs/locators) to select elements
* Follow [best practice](https://playwright.dev/docs/selectors#best-practices) by using user-facing attributes such as text or aria to select elements
* Use the [page object model](docs/pageobjectmodel.md) to retrieve information from the screen, drive the application and assert that screen elements are correct
* Create `locator` properties at the top of the relevant `Page` class and populate them in the constructor. Use these properties to access the screen
* Use [locator assertions](https://playwright.dev/docs/test-assertions) to verify screen content

### Do not

* **Never** use `$` or `$$` to select elements - use [`locator`](https://playwright.dev/docs/locators) to select elements
* **Never** use `$eval` or `$$eval` - use [`locator.evaluate` or `locator.evaluateAll`](https://playwright.dev/docs/api/class-locator#locator-evaluate)
* **Avoid** xpath and selectors tied to page structure
* **Never** use Playwright locators or assertions outside of the page object model classes
* **Do not** create locators on the fly within a method - reuse the properties to enable easy encapsulation
* **Do not** take text/values from the screen and assert against it - utilise [locator assertions](https://playwright.dev/docs/test-assertions)

## Common pitfalls with Playwright

* Forgetting to `await` a playwright command can cause unpredictable behaviour
