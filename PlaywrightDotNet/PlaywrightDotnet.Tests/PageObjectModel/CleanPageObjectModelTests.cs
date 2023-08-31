
using PlaywrightDotnet.Tests.Pages;

namespace PlaywrightDotnet.Tests.PageObjectModel
{
    public class CleanPageObjectModelTest: PageTest
    {
        private Settings _settings;
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
        public async Task SetUp()
        {
            _settings = new Settings();

            if (_settings.RecordTrace)
            {
                await Context.Tracing.StartAsync(new()
                {
                    Screenshots = true,
                    Snapshots = true,
                    Sources = true
                });
            }
        }

        [TearDown]
        public async Task TearDown()
        {
            if (_settings.RecordTrace)
            {
                var traceFileName = $"playwright_trace_{TestContext.CurrentContext.Test.MethodName}.zip";
                await Context.Tracing.StopAsync(new()
                {
                    Path = traceFileName
                });

                TestContext.AddTestAttachment(traceFileName);
            }
        }
    }
}