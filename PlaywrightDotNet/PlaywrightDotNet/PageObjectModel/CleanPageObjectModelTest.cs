using PlaywrightDotNet.PageObjectModel.Pages;

namespace PlaywrightDotNet.PageObjectModel
{
    public class CleanPageObjectModelTest: PageTest
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

        [SetUp]
        public async Task StartTrace()
        {
            await Context.Tracing.StartAsync(new TracingStartOptions
            {
                Screenshots = true,
                Snapshots = true
            });
        }

        [TearDown]
        public async Task StopTrace()
        {
            await Context.Tracing.StopAsync(new TracingStopOptions
            {
                Path= "trace.zip"
            });
        }
    }
}
