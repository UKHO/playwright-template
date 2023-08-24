using PlaywrightDotNet.PageObjectModel.Pages;

namespace PlaywrightDotNet.PageObjectModel
{
    public class LoggedInPageObjectModelTest: CleanPageObjectModelTest
    {
        public override BrowserNewContextOptions ContextOptions()
        {
            return new BrowserNewContextOptions() { StorageStatePath = "loggedInStorageState.json" };
        }
    }
}