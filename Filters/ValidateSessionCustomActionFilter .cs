using Microsoft.AspNetCore.Mvc.Filters;
using System.Diagnostics;

namespace Atithya_Web.Filters
{
  public class ValidateSessionCustomActionFilter : IActionFilter
  {
    public void OnActionExecuting(ActionExecutingContext context)
    {
      // Do something before the action executes.
      Debug.WriteLine(context.Controller.ToString());
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
      // Do something after the action executes.
    }
  }
}
