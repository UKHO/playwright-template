using Microsoft.Playwright;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlaywrightDotNet.NetworkInceptionTests.Pages
{
    public class SearchPage : BasePage
    {
        public SearchPage(IPage page):base(page)
        {
        }

        public ILocator UsernameFieldLocator => Page.Locator("#username");
        public ILocator PasswordFieldLocator => Page.Locator("#password");
        public ILocator LoginButtonLocator => Page.Locator("'Login'");
        public ILocator SearchTextBoxLocator => Page.Locator("#admiralty-input-1");
        public ILocator SearchButtonLocator => Page.GetByTestId("sim-search-button");
        public ILocator SearchResultsLocator => Page.Locator(".SimplifiedSearchResult");
        public ILocator FirstDivContent1Locator => Page.Locator("xpath=//div[@id='contentArea']/app-fss-search//app-fss-search-results[@class='SimplifiedSearchResult']/div[1]/admiralty-card/section[@class='card sc-admiralty-card']//table[@class='attribute-table']//tr[2]//td[1]");
        public ILocator FirstDivContent2Locator => Page.Locator("xpath=//div[@id='contentArea']/app-fss-search//app-fss-search-results[@class='SimplifiedSearchResult']/div[1]/admiralty-card/section[@class='card sc-admiralty-card']//table[@class='attribute-table']//tr[2]//td[2]");
        public ILocator FirstDivContent3Locator => Page.Locator("xpath=//div[@id='contentArea']/app-fss-search//app-fss-search-results[@class='SimplifiedSearchResult']/div[1]/admiralty-card/section[@class='card sc-admiralty-card']//table[@class='attribute-table']//tr[2]//td[3]");

        public async Task Validate_SearchResult_With_ServerResponse(string SearchText)
        {
            await SearchTextBoxLocator.FillAsync(SearchText);
            await SearchButtonLocator.ClickAsync();
            await Assertions.Expect(FirstDivContent1Locator).ToContainTextAsync("UK Coastal");
            await Assertions.Expect(FirstDivContent2Locator).ToContainTextAsync("2024-03-01");
            await Assertions.Expect(FirstDivContent3Locator).ToContainTextAsync("S-111");
        }

        public async Task Validate_SearchResult_Altered_ServerResponse_With_MockData(string SearchText)
        {
            string text;
            using (StreamReader r = new StreamReader("MockData\\BatchMockData.json"))
            {
                text = r.ReadToEnd();
            }

            //more on modify response can be found here -> https://playwright.dev/dotnet/docs/network#modify-responses
            await Page.RouteAsync("**/api/batch*", async route =>
            {
                var response = await route.FetchAsync();
                var body = await response.TextAsync();

                var headers = response.Headers;
                headers.Add("Content-Type", "text/html");

                await route.FulfillAsync(new RouteFulfillOptions()
                {
                    Body = text
                });
            });

            await SearchTextBoxLocator.FillAsync(SearchText);
            await SearchButtonLocator.ClickAsync();
            await Assertions.Expect(FirstDivContent1Locator).ToContainTextAsync("Response Altered by Playwright");
            await Assertions.Expect(FirstDivContent2Locator).ToContainTextAsync("TestProduct");
            await Assertions.Expect(FirstDivContent3Locator).ToContainTextAsync("Year Altered from Playwright");
        }
    }
}
