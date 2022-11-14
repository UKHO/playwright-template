import { test } from '@playwright/test';
import { MockSocketFacade } from 'tests/page-object-model/MockSocketFacade';
import { WebsocketPage } from 'tests/page-object-model/pages/websocketpage';

test.describe('Websocket page tests', () => {
  let websocketPage: WebsocketPage;
  let mockSocket: MockSocketFacade;

  test.beforeEach(async ({ page }) => {
    websocketPage = new WebsocketPage(page);
    mockSocket = new MockSocketFacade();
    await mockSocket.startServer();
    await websocketPage.navigateTo();
  });

  test('should display message from websocket', async () => {
    await websocketPage.expect.toHaveLastMessage('');
    mockSocket.sendMessage('I am a message');
    await websocketPage.expect.toHaveLastMessage('I am a message');
  });

});
