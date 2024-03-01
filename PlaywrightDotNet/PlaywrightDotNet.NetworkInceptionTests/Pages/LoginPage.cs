using Microsoft.Playwright;
using PlaywrightDotNet.NetworkInceptionTests.Support;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlaywrightDotNet.NetworkInceptionTests.Pages
{
    public class LoginPage : BasePage
    {
        public LoginPage(IPage page) :base(page)
        {
        }

        private string EmailFieldId => "#signInEmail";
        private string PasswordFieldID => "#password";
        private string SigninButtonName => "Sign in";
        private string ContinueButton => "#continue";
        public TestData TestData { get; set; }

        public async Task UserLogsIn()
        {
            await Page.GotoAsync(TestData.Url);
            var page1 = await Page.RunAndWaitForPopupAsync(async () =>
            {
                await Page.GetByRole(AriaRole.Button, new() { Name = "Sign in", Exact = true }).ClickAsync();
            });

            if (string.IsNullOrEmpty(TestData.UserName) || string.IsNullOrEmpty(TestData.Password))
                Assert.Ignore("UserName and password are not set in TestData.json. A user should be created before running the test");

            await page1.Locator(EmailFieldId).FillAsync(TestData.UserName);
            await page1.Locator(ContinueButton).ClickAsync();
            await page1.Locator(PasswordFieldID).FillAsync(TestData.Password);
            await page1.GetByRole(AriaRole.Button, new() { Name = "Sign in" }).ClickAsync();
            await page1.CloseAsync();
        }
    }
}
