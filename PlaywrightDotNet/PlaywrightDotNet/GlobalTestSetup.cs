using PlaywrightDotNet.PageObjectModel.Pages;

// ReSharper disable once CheckNamespace -
// This class needs to be outside of a namespace in order for NUnit
// to recognise it as the OneTimeSetup for the entire assembly
namespace PlaywrightDotNet;

[SetUpFixture]
public class GlobalTestSetup
{
    [OneTimeSetUp]
    public async Task ConfigureStorageStates()
    {
        var playwright = await Playwright.CreateAsync();
        var chromium = await playwright.Chromium.LaunchAsync();
        var page = await chromium.NewPageAsync();

        var loginPage = new LoginPage(page);

        await loginPage.NavigateToAsync();
        await loginPage.FillFormWithValidDetailsAsync();
        await loginPage.SubmitFormAsync();

        await page.Context.StorageStateAsync(new BrowserContextStorageStateOptions
        {
            Path = "loggedInStorageState.json"
        });
    }
}