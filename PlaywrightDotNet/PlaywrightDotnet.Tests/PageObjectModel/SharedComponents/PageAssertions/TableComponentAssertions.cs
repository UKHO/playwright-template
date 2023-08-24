namespace PlaywrightDotnet.Tests.PageObjectModel.SharedComponents.PageAssertions;

public class TableComponentAssertions
{
    public TableComponentAssertions(TableComponent tableComponent)
    {
        TableComponent = tableComponent;
    }

    private TableComponent TableComponent { get; }

    public async Task ToOnlyHaveValuesAsync(List<(string field, string answer)> values)
    {
        await Assertions.Expect(TableComponent._rowsLocator).ToHaveCountAsync(values.Count);

        var actualRowCount = await TableComponent._rowsLocator.CountAsync();

        foreach (var (field, answer) in values) {
            var foundMatch = false;
            for (var i = 0; i < actualRowCount; i++)
            {
                var fieldCellLocator = TableComponent.CellLocator(i, 0);
                var answerCellLocator = TableComponent.CellLocator(i, 1);

                var actualFieldContent = await fieldCellLocator.TextContentAsync();
                if (actualFieldContent == field)
                {
                    await Assertions.Expect(answerCellLocator).ToHaveTextAsync(answer);
                    foundMatch = true;
                    break;
                }
            }

            Assert.That(foundMatch, Is.True, $"expected to find row [{field}, {answer}]");
        }
    }
}