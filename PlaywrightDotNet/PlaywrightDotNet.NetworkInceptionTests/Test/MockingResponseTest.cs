using Microsoft.Extensions.Configuration;
using Microsoft.Playwright;
using PlaywrightDotNet.NetworkInceptionTests.Pages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlaywrightDotNet.NetworkInceptionTests.Test
{
    [TestFixture]
    public class MockingResponseTest
    {
        private LoginPage _loginPage;
        private SearchPage _searchPage;

        [SetUp]
        public async Task SetUp()
        {
            var playwright = await Playwright.CreateAsync();
            var chromium = await playwright.Chromium.LaunchAsync(
                new BrowserTypeLaunchOptions()
                {
                    SlowMo = 1000,
                    Headless = false,
                    Args = new List<string> { "--start-maximized" }
                });

            var page = await chromium.NewPageAsync();
            _loginPage = new LoginPage(page);

            var config = new ConfigurationBuilder()
                         .AddJsonFile("TestData.json")
                         .Build();
            config.Bind(_loginPage);
            _searchPage = new SearchPage(_loginPage.Page);
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

    }
}
