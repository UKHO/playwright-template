using System.Diagnostics;

namespace PlaywrightDotNet.PageObjectModel
{
    internal static class Utilities
    {
        /// <summary>
        /// Uses a retry pattern to wait for the locator to be visible.
        /// Only use if there is true uncertainty about an element appearing.
        /// If an element is there in some environments but not others
        /// then use environment variables to determine whether or not to look for it
        /// </summary>
        /// <param name="locator"></param>
        /// <returns></returns>
        public static async Task<bool> WaitForVisibleWithoutThrowing(this ILocator locator)
        {
            const int timeout = 2000; // We need to use a relatively short timeout to ensure we don't hold up tests
            const int step = 500;

            var sw = Stopwatch.StartNew();
            await locator.Page.WaitForLoadStateAsync(LoadState.NetworkIdle);

            while (sw.ElapsedMilliseconds < timeout)
            {
                if (await locator.IsVisibleAsync())
                {
                    return true;
                }
                
                await Task.Delay(step);
            }

            return false;
        }
    }
}
