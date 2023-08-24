namespace PlaywrightDotnet.Tests.PageObjectModel.SharedComponents
{
    public abstract class BaseComponent
    {
        protected IPage Page { get; }

        protected BaseComponent(IPage page)
        {
            Page = page;
        }
    }
}