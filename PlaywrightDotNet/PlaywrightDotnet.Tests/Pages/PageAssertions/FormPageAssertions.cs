using PlaywrightDotnet.Tests.Pages;

namespace PlaywrightDotnet.Tests.PageAssertions;

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