using PlaywrightDotNet.PageObjectModel.Pages.PageAssertions;

namespace PlaywrightDotNet.PageObjectModel.Pages;

public interface IHomePage : IBasePage
{
    HomePageAssertions Expect { get; }
}

public class HomePage : BasePage, IHomePage
{
    public ILocator LoginHeaderLocator => Page.Locator("'You are logged in'");
    public HomePageAssertions Expect { get; }

    public HomePage(IPage page) : base(page)
    {
        Expect = new HomePageAssertions(this);
    }
}