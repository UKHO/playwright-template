namespace PlaywrightDotNet.PageObjectModel.Pages;

public interface ILoginPage : IBasePage
{
    Task FillFormWithValidDetailsAsync();
    Task SubmitFormAsync();
}

internal class LoginPage : BasePage, ILoginPage
{
    public ILocator UsernameFieldLocator => Page.Locator("#username");
    public ILocator PasswordFieldLocator => Page.Locator("#password");
    public ILocator LoginButtonLocator   => Page.Locator("'Login'");

    public LoginPage(IPage page) : base(page)
    {
        PagePath = "login";
    }

    public async Task FillFormWithValidDetailsAsync()
    {
        await UsernameFieldLocator.FillAsync("name");
        await PasswordFieldLocator.FillAsync("pass");
    }

    public async Task SubmitFormAsync()
    {
        await LoginButtonLocator.ClickAsync();
    }
}