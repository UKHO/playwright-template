namespace PlaywrightDotNet.PageObjectModel.Pages.PageAssertions;

public class FormPageAssertions
{
    private FormPage FormPage { get; }

    public FormPageAssertions(FormPage formPage)
    {
        FormPage = formPage;
    }

    public async Task ToBeUnableToSubmitFormAsync()
    {
        await Assertions.Expect(FormPage.SubmitButtonFieldLocator).Not.ToBeEnabledAsync();
    }
}