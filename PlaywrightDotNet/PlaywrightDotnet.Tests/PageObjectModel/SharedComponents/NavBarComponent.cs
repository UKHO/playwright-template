namespace PlaywrightDotnet.Tests.PageObjectModel.SharedComponents;

public interface INavBarComponent
{
    Task GotoFormAsync();
    Task GotoWelcomeAsync();
}

internal class NavBarComponent : BaseComponent, INavBarComponent
{
    private ILocator NavbarLocator => Page.Locator("app-nav");

    public ILocator ExampleResultsLinkLocator => NavbarLocator.Locator("'Example results'");
    public ILocator FormLinkLocator => NavbarLocator.Locator("'The Form'");
    public ILocator WelcomeLinkLocator => NavbarLocator.Locator("'Welcome'");

    public NavBarComponent(IPage page) : base(page) { }

    public async Task GotoFormAsync()
    {
        await FormLinkLocator.ClickAsync();
    }

    public async Task GotoWelcomeAsync()
    {
        await WelcomeLinkLocator.ClickAsync();
    }
}