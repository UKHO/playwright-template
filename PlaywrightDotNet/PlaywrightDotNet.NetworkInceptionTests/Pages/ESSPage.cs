using Microsoft.Playwright;
using PlaywrightDotNet.NetworkInceptionTests.Pages;

namespace PlaywrightDotNet.NetworkInterceptionTests.Pages
{
    public class ESSPage : BasePage
    {
        public ESSPage(IPage page) : base(page)
        {
        }
        public ILocator AddEncLocator => Page.Locator("#admiralty-radio-1");
        public ILocator AddEncInputLocator => Page.Locator("#admiralty-input-4");
        public ILocator ProceedButtonLocator => Page.GetByRole(AriaRole.Button, new() { Name = "Proceed" });
        public ILocator SelectAllLinkLocator => Page.GetByRole(AriaRole.Link, new() { Name = "Select all" });
        public ILocator RequestEncLocator => Page.GetByRole(AriaRole.Button, new() { Name = "Request ENCs" });
        public ILocator MakeExchangeSetServiceLinkLocator => Page.GetByLabel("You can make a small (250 ENC");
        public ILocator t => Page.Locator("admiralty-dialogue");

        public async Task NavigateToESSDownload(string EncCell)
        {
            await MakeExchangeSetServiceLinkLocator.ClickAsync();
            await AddEncLocator.CheckAsync();
            await AddEncInputLocator.FillAsync(EncCell);
            await ProceedButtonLocator.ClickAsync();
            await SelectAllLinkLocator.ClickAsync();
        }

        public async Task ValidateErrorMessageWhenServerReturns400()
        {
            //more on modify response can be found here -> https://playwright.dev/dotnet/docs/network#modify-responses
            await Page.RouteAsync("**/productData/productIdentifiers", async route =>
            {
                /*
                var response = await route.FetchAsync();
                FetchAsync() will send the request to the server.
                **/
                await route.FulfillAsync(new RouteFulfillOptions()
                {
                    Status = 400,
                    Body = "Bad Request - Mocked Response"
                });
            });

            await RequestEncLocator.ClickAsync();
            await Assertions.Expect(Page.GetByText("There has been an error")).ToBeVisibleAsync();
        }

        public async Task ValidateErrorMessageWhenServerReturns403()
        { 
            await Page.RouteAsync("**/productData/productIdentifiers", async route =>
            {
                //request is not sent to the server and a mocked response is returned 
                await route.FulfillAsync(new RouteFulfillOptions()
                {
                    Status = 403,
                    Body = "forbidden - Mocked Response"
                });
            });

            await RequestEncLocator.ClickAsync();
            await Assertions.Expect(Page.GetByText("There has been an error")).ToBeVisibleAsync();
        }
    }
}
