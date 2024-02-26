using Microsoft.AspNetCore.Mvc.Filters;

namespace Atithya_Web.Filters
{
  public class CustomAsyncActionFilter : IAsyncActionFilter
  {
    public async Task OnActionExecutionAsync(ActionExecutingContext context,
        ActionExecutionDelegate next)
    {
      //To do : before the action executes
      await next();
      //To do : after the action executes
    }
  }
}
