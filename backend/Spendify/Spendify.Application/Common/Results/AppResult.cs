using Spendify.Application.Common.Errors;

namespace Spendify.Application.Common.Results;

public sealed class AppResult<T>
{
    public bool IsSuccess { get; }
    public bool IsFailure => !IsSuccess;
    public T? Value { get; }
    public AppError? Error { get; }

    private AppResult(T value)
    {
        IsSuccess = true;
        Value = value;
    }

    private AppResult(AppError error)
    {
        IsSuccess = false;
        Error = error;
    }

    public static AppResult<T> Success(T value) => new(value);

    public static AppResult<T> Failure(AppError error) => new(error);
}
