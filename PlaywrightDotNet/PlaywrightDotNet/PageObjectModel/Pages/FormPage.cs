using PlaywrightDotNet.PageObjectModel.Pages.PageAssertions;

namespace PlaywrightDotNet.PageObjectModel.Pages;

public interface IFormPage : IBasePage
{
    List<(string field, string answer)> SubmittedValues { get; }
    FormPageAssertions Expect { get; }
    Task FillFormWithValidDetailsAsync();
    Task SetLastNameAsync(string lastName);
    Task SubmitFormAsync();
    Task SetEmailAsync(string email);
    Task FillFormWithValidDetailsExceptHeroPowerAsync();
}

public class FormPage : BasePage, IFormPage
{
    public ILocator EmailFieldLocator => Page.Locator("#email");
    public ILocator FirstnameFieldLocator => Page.Locator("#firstName");
    public ILocator HeroPowerFieldLocator => Page.Locator("#power");
    public ILocator LastnameFieldLocator => Page.Locator("#lastName");
    public ILocator SubmitButtonFieldLocator => Page.Locator("'Submit'");

    public FormPage(IPage page) : base(page)
    {
        PagePath = "form";
        Expect = new FormPageAssertions(this);
    }

    public List<(string field, string answer)> SubmittedValues { get; } = new();

    public FormPageAssertions Expect { get; }

    public async Task FillFormWithValidDetailsAsync()
    {
        await FirstnameFieldLocator.FillAsync("MyFirstName");
        await LastnameFieldLocator.FillAsync("MyLastName");
        await EmailFieldLocator.FillAsync("myemail@email.com");
        await HeroPowerFieldLocator.SelectOptionAsync("Super Flexible");
    }

    public async Task SetLastNameAsync(string lastName)
    {
        await LastnameFieldLocator.FillAsync(lastName);
    }

    public async Task SubmitFormAsync()
    {
        SubmittedValues.Clear();

        SubmittedValues.Add((field: "First Name", answer: await FirstnameFieldLocator.InputValueAsync()));
        SubmittedValues.Add((field: "Last Name", answer: await LastnameFieldLocator.InputValueAsync()));
        SubmittedValues.Add((field: "Email", answer: await EmailFieldLocator.InputValueAsync()));
        SubmittedValues.Add((field: "Hero Power", answer: await HeroPowerFieldLocator.InputValueAsync()));

        await SubmitButtonFieldLocator.ClickAsync();
    }

    public async Task SetEmailAsync(string email)
    {
        await EmailFieldLocator.FillAsync(email);
    }

    public async Task FillFormWithValidDetailsExceptHeroPowerAsync()
    {
        await FirstnameFieldLocator.FillAsync("MyFirstName");
        await LastnameFieldLocator.FillAsync("MyLastName");
        await EmailFieldLocator.FillAsync("myemail@email.com");
    }
}