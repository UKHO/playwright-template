using PlaywrightDotNet.PageObjectModel.SharedComponents;

namespace PlaywrightDotNet.PageObjectModel.Pages;

public interface IBasePage
{
    Task NavigateToAsync();
    INavBarComponent Navbar { get; }
}

public abstract class BasePage : IBasePage
{
    public IPage Page { get; }

    private ILocator PopupCloseLocator => Page.Locator("'Click here to hide popup'");
    protected string PagePath { get; init; }
    public INavBarComponent Navbar { get; }

    protected BasePage(IPage page)
    {
        Page = page;
        Navbar = new NavBarComponent(page);
    }

    public virtual async Task NavigateToAsync()
    {
        await Page.GotoAsync($"http://localhost:4200/{PagePath}");
        await HandleRandomPopup();
    }

    private async Task HandleRandomPopup()
    {
        var popupOpen = await PopupCloseLocator.WaitForVisibleWithoutThrowing();

        if (popupOpen)
            await PopupCloseLocator.ClickAsync();
    }
}