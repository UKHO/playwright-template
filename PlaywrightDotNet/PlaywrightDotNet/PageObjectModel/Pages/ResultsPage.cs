using PlaywrightDotNet.PageObjectModel.Pages.PageAssertions;
using PlaywrightDotNet.PageObjectModel.SharedComponents;

namespace PlaywrightDotNet.PageObjectModel.Pages;

public interface IResultsPage : IBasePage
{
    ResultsPageAssertions Expect { get; }
    ITableComponent Table { get; }
}

public class ResultsPage : BasePage, IResultsPage
{
    public ResultsPage(IPage page) : base(page)
    {
        PagePath = "n/a";

        Expect = new ResultsPageAssertions(this);
        Table = new TableComponent(page);
    }

    public override Task NavigateToAsync()
    {
        throw new NotSupportedException("Can't navigate directly to results page");
    }

    public ResultsPageAssertions Expect { get; }
    public ITableComponent Table { get; }
}