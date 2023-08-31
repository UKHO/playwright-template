namespace PlaywrightDotnet.Tests
{
    internal class Settings
    {
        private static string GetParameterFromRunSettings(string parameterName)
        {
            var parameterValue = TestContext.Parameters[parameterName];
            if (string.IsNullOrWhiteSpace(parameterValue))
                throw new ArgumentException($"No {parameterName} parameter specified in runsettings");
            return parameterValue;
        }

        public bool RecordTrace
        {
            get
            {
                var parameterAsString = GetParameterFromRunSettings("RecordTrace");
                if (!bool.TryParse(parameterAsString, out var parameterAsBool))
                    throw new ArgumentException(
                        $"RecordTrace parameter should be a boolean. It was \"{parameterAsString}\"");
                return parameterAsBool;
            }
        }
    }
}