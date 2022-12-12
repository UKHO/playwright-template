using PlaywrightDotNet.PageObjectModel;

namespace PlaywrightDotNet.e2eTests
{
    [TestFixture]
    public class EndToEndTests : CleanPageObjectModelTest
    {
        [Test]
        public async Task Can_login_fill_form_and_see_results()
        {
            await LoginPage.NavigateToAsync();
            await LoginPage.FillFormWithValidDetailsAsync();
            await LoginPage.SubmitFormAsync();

            await Homepage.Expect.ToBeLoggedInAsync();

            await Homepage.Navbar.GotoFormAsync();

            await FormPage.FillFormWithValidDetailsAsync();
            await FormPage.SubmitFormAsync();

            await ResultsPage.Expect.ToBeOnResultsPageAsync();
            await ResultsPage.Table.Expect.ToOnlyHaveValuesAsync(FormPage.SubmittedValues);

            await ResultsPage.Navbar.GotoWelcomeAsync();
            await Homepage.Expect.ToBeOnHomePageAsync();
        }
    }
}