namespace Atithya_Web.Models
{
  public class APIRequest<T>
  {
    public T? Content { get; set; }
    public string? Configuration { get; set; }
  }
}
