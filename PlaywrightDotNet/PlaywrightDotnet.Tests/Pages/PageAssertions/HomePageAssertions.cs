using System.Text.RegularExpressions;

namespace PlaywrightDotnet.Tests.Pages.PageAssertions;

public class HomePageAssertions
{
    public HomePageAssertions(HomePage homePage)
    {
        HomePage = homePage;
    }

    private HomePage HomePage { get; }

    public async Task ToBeLoggedInAsync()
    {
        await Assertions.Expect(HomePage.LoginHeaderLocator).ToBeVisibleAsync();
    }

    public async Task ToBeOnHomePageAsync()
    {
        await Assertions.Expect(HomePage.Page).ToHaveURLAsync(new Regex(".+/welcome"));
    }
}