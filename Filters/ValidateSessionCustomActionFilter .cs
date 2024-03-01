using Atithya_Web.Controllers;
using Atithya_Web.Utilities;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Configuration;
using System.Diagnostics;
using System.Reflection.PortableExecutable;

namespace Atithya_Web.Filters
{
  public class ValidateSessionCustomActionFilter : IActionFilter
  {
    private readonly ILogger<ValidateSessionCustomActionFilter> _logger;
    private readonly IConfiguration _configuration;
    public ValidateSessionCustomActionFilter(IConfiguration configuration)
    {
      _configuration = configuration;
    }
    public void OnActionExecuting(ActionExecutingContext context)
    {
      string? token;

      // Do something before the action executes.
      var cookies = context.HttpContext.Request.Cookies;
      cookies.TryGetValue("AuthToken", out token);
      if (token == null)
      {
        var options = new CookieOptions();
        options.Expires = DateTime.Now.AddMinutes(10);
        options.Secure = true;
        context.HttpContext.Response.Cookies.Append("AuthToken", new EncryptionHelper(_configuration).EncryptData(new AuthenticationController(_configuration).GetToken()), options); // Red squiggly on Response
      }
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
      // Do something after the action executes.
      Console.WriteLine("after" + context.Controller.ToString());
    }
  }
}
