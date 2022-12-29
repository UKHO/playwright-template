# Playwright Template - Application Under Test

This is an Angular web application designed to be used by the Playwright testing frameworks in `PlaywrightDotNet` and `PlaywrightTypeScript`.

## Prerequisites

You will need Node.js and Angular installed to run the application under test.

- First install Node.js - <https://nodejs.org/>
- Then install Angular - <https://angular.io/guide/setup-local#install-the-angular-cli>

## Launch Application under test

From the `ApplicationUnderTest` directory run `ng serve` to spin up the web server and navigate to <http://localhost:4200/> - you don't need to do this before running tests as that's handled by the Playwright Test framework.

The app will automatically reload if you change any of the source files.

## Launch Websocket Server

A 'Live' websocket server can be launched from the terminal by running:

`node .ApplicationUnderTest/src/servers/websocket-server.js`

This is not required for the tests (as they use a mock websocket server) but can be useful for interacting with the test application outside of the tests.
