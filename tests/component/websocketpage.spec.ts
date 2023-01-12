import { test } from '@playwright/test';
import { MockSocketFacade } from 'tests/page-object-model/mockSocketFacade';
import { WebsocketPage } from 'tests/page-object-model/pages/websocketpage';

// Due to the websockets tests launching a websocket server on a specific port,
// we cannot have websocket tests running in parallel.
// This test.describe.configure forces the tests within this file to execute
// one at a time.
test.describe.configure({ mode: 'serial' });
// By default browsers run tests in parallel with each other so we are restricting
// the websocket tests to only run on one browser
test.skip(({ browserName }) => browserName !== 'chromium');

test.describe('Websocket page tests', () => {
  let websocketPage: WebsocketPage;
  let mockSocket: MockSocketFacade;

  test.beforeEach(async ({ page, browserName }) => {
    websocketPage = new WebsocketPage(page);
    mockSocket = new MockSocketFacade();

    mockSocket.startServer();
    await websocketPage.navigateTo();
  });

  test.afterEach(async () => {
    mockSocket.stopServer();
  });

  test('should display message from websocket', async () => {
    await websocketPage.expect.toHaveLastMessage('');
    mockSocket.sendMessage('I am a message');
    await websocketPage.expect.toHaveLastMessage('I am a message');
  });
  
  test('should send "Hello" and then "count x" messages', async () => {
    await mockSocket.expectToHaveMessage('"Hello"');
    await mockSocket.expectToHaveMessage('"count 1"');
    await mockSocket.expectToHaveMessage('"count 2"');
    await mockSocket.expectToHaveMessage('"count 3"');
  });

});
