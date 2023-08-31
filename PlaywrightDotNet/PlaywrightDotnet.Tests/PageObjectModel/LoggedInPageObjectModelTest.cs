namespace PlaywrightDotnet.Tests.PageObjectModel
{
    public class LoggedInPageObjectModelTest: CleanPageObjectModelTest
    {
        public override BrowserNewContextOptions ContextOptions()
        {
            return new BrowserNewContextOptions() { StorageStatePath = "loggedInStorageState.json" };
        }
    }
}