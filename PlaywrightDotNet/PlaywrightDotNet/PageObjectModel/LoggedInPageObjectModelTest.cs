using PlaywrightDotNet.PageObjectModel.Pages;

namespace PlaywrightDotNet.PageObjectModel
{
    public class LoggedInPageObjectModelTest: PageTest
    {
        protected IFormPage FormPage { get; private set; }
        protected IHomePage Homepage { get; private set; }
        protected ILoginPage LoginPage { get; private set; }
        protected IResultsPage ResultsPage { get; private set; }
        
        [SetUp]
        public void InitialisePom()
        {
            FormPage = new FormPage(Page);
            Homepage = new HomePage(Page);
            LoginPage = new LoginPage(Page);
            ResultsPage = new ResultsPage(Page);
        }

        public override BrowserNewContextOptions ContextOptions()
        {
            return new BrowserNewContextOptions() { StorageStatePath = "loggedInStorageState.json" };
        }
    }
}
