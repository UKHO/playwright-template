# Playwright Mocking

This project includes examples that illustrates how to mock response for UI tests using Playwright.


## Getting started

**Before using this project it is expected that you have some experience with Playwright.** Follow the [official Playwright Getting Started Guide](https://playwright.dev/docs/intro) to get going with your first test and to become familiar with Playwright concepts.

Response mocking in playwright involves intercepting network request made by the application under test and providing pre-defined responses instead of making actual requests to external service or APIs. The interception process can be achieved using Playwright's interceptors, which allow developers/testers to intercept and modify network requests and responses at various stages during the test execution. Follow [Playwright Network Mocking](https://playwright.dev/dotnet/docs/network) to learn more.

The process of response mocking in Playwright typically involves following steps:

1. Intercepting Network Requests: Define interceptor to intercept outgoing network requests made by the application under test 

2. Providing Custom Responses: Configure the interceptors to provide custom responses based on the test scenario, including successful responses, error responses, or the responses with specific data payloads.

3. Triggering Test Scenarios: Execute UI tests while ensuring that the application interacts with the mocked responses instead of making actual requests to external services or APIs.

4. Validating Behaviour: Validate the behaviour of the application under test by asserting that expected outcome based on the mocked responses, ensuring that the UI components respond correctly to the different types of responses.


### Run tests

Open the project in Visual Studio

1. You may need to build the project then navigate to the debug bin and run pwsh playwright.ps1 install

2. In the project navigate to `Settings.json` and populate the data. 

3. Go to the test runner and run the tests.