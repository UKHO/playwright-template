
using PlaywrightDotnet.Tests.PageObjectModel;

namespace PlaywrightDotnet.Tests.ComponentTests
{
    internal class FormPageTests : LoggedInPageObjectModelTest
    {
        [SetUp]
        public async Task SetUp()
        {
            await FormPage.NavigateToAsync();
        }

        [Test]
        public async Task Blank_form_should_prevent_submit()
        {
            await FormPage.Expect.ToBeUnableToSubmitFormAsync();
        }

        [Test]
        public async Task Short_last_name_should_prevent_submit()
        {
            await FormPage.FillFormWithValidDetailsAsync();
            await FormPage.SetLastNameAsync("Sm");
            await FormPage.Expect.ToBeUnableToSubmitFormAsync();
        }

        [Test]
        public async Task Invalid_email_should_prevent_submit()
        {
            await FormPage.FillFormWithValidDetailsAsync();
            await FormPage.SetEmailAsync("not an email");
            await FormPage.Expect.ToBeUnableToSubmitFormAsync();
        }

        [Test]
        public async Task Missing_hero_power_should_prevent_submit()
        {
            await FormPage.FillFormWithValidDetailsExceptHeroPowerAsync();
            await FormPage.Expect.ToBeUnableToSubmitFormAsync();
        }

        [Test]
        public async Task Valid_details_should_allow_form_submit_and_display_details_on_results_page()
        {
            await FormPage.FillFormWithValidDetailsAsync();
            await FormPage.SubmitFormAsync();

            await ResultsPage.Expect.ToBeOnResultsPageAsync();
            await ResultsPage.Table.Expect.ToOnlyHaveValuesAsync(FormPage.SubmittedValues);
        }
    }
}