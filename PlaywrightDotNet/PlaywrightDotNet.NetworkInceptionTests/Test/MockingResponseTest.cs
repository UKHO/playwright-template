using Microsoft.Extensions.Configuration;
using Microsoft.Playwright;
using PlaywrightDotNet.NetworkInceptionTests.Pages;
using PlaywrightDotNet.NetworkInterceptionTests.Pages;

namespace PlaywrightDotNet.NetworkInceptionTests.Test
{
    [TestFixture]
    public class MockingResponseTest
    {
        private LoginPage _loginPage;
        private SearchPage _searchPage;
        private ESSPage _encPage;

        [SetUp]
        public async Task SetUp()
        {
            var playwright = await Playwright.CreateAsync();
            var chromium = await playwright.Chromium.LaunchAsync(
                new BrowserTypeLaunchOptions()
                {
                    SlowMo = 1500,
                    Headless = false,
                    Args = new[] { "--start-maximized" }
                });

            var context = await chromium.NewContextAsync(new BrowserNewContextOptions
            {
                ViewportSize = ViewportSize.NoViewport
            });
            var page = await context.NewPageAsync();

            //var page = await chromium.NewPageAsync();
            _loginPage = new LoginPage(page);

            var config = new ConfigurationBuilder()
                         .AddJsonFile("TestData.json")
                         .Build();
            config.Bind(_loginPage);
            _searchPage = new SearchPage(_loginPage.Page);
            _encPage = new ESSPage(_loginPage.Page);    
        }

        [Test]
        public async Task Validate_ServerResponse_On_UI()
        {
            await _loginPage.UserLogsIn();
            await _searchPage.Validate_SearchResult_With_ServerResponse("Test");
        }

        [Test]
        public async Task Validate_Altered_ServerResponse_On_UI()
        {
            await _loginPage.UserLogsIn();
            await _searchPage.Validate_SearchResult_Altered_ServerResponse_With_MockData("Test");
        }

        [Test]
        public async Task Validate_UI_With_400ServerError()
        {
            await _loginPage.UserLogsIn();
            await _encPage.NavigateToESSDownload(_loginPage.TestData.EncCell);
            await _encPage.ValidateErrorMessageWhenServerReturns400();
        }

        [Test]
        public async Task Validate_UI_With_403ServerError()
        {
            await _loginPage.UserLogsIn();
            await _encPage.NavigateToESSDownload(_loginPage.TestData.EncCell);
            await _encPage.ValidateErrorMessageWhenServerReturns403();
        }
    }
}
