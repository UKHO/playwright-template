import { test } from '@playwright/test';
import { MockSocketFacade } from 'tests/page-object-model/MockSocketFacade';
import { WebsocketPage } from 'tests/page-object-model/pages/websocketpage';

test.describe('Websocket page tests', () => {
  let websocketPage: WebsocketPage;
  let mockSocket: MockSocketFacade;

  test.beforeEach(async ({ page }) => {
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
