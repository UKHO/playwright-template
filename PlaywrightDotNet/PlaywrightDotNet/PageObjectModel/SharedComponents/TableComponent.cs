using PlaywrightDotNet.PageObjectModel.SharedComponents.PageAssertions;

namespace PlaywrightDotNet.PageObjectModel.SharedComponents
{
    public interface ITableComponent
    {
        TableComponentAssertions Expect { get; }
    }

    public class TableComponent : BaseComponent, ITableComponent
    {
        public TableComponentAssertions Expect { get; }
        public ILocator tableComponentLocator => Page.Locator("app-form-results");
        public ILocator _rowsLocator => tableComponentLocator.Locator("tr");

        public TableComponent(IPage page) : base(page)
        {
            Expect = new TableComponentAssertions(this);
        }
        
        public ILocator CellLocator(int row, int column) {
            return _rowsLocator.Nth(row).Locator("td").Nth(column);
        }
}
}