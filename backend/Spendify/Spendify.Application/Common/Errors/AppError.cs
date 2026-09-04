namespace Spendify.Application.Common.Errors;

public sealed class AppError
{
    public string Code { get; }
    public int StatusCode { get; }
    public IReadOnlyDictionary<string, string>? FieldErrors { get; }

    public AppError(
        string code,
        int statusCode,
        IReadOnlyDictionary<string, string>? fieldErrors = null)
    {
        Code = code;
        StatusCode = statusCode;
        FieldErrors = fieldErrors;
    }
}
