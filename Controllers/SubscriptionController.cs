using Atithya_Web.Models;
using Atithya_Web.Utilities;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;

namespace Atithya_Web.Controllers
{
  public class SubscriptionController(IConfiguration configuration) : Controller
  {
    public IActionResult Index()
    {
      return View();
    }

    [HttpPost]
    public string GetSubscriptionData(APIRequest<string> data)
    {

      if (ModelState.IsValid)
      {
        string? token;

        // Do something before the action executes.
        var cookies = HttpContext.Request.Cookies;
        cookies.TryGetValue("AuthToken", out token);
        return new ApiResponseHelper<string>().GetApiResponse(data, "Subscription/GetSubscriptionData", "POST", new EncryptionHelper(configuration).DecryptData(token));
      }

      else
        return new ApiResponseHelper<string>().GetInvalidModelStateApiResponse();
    }
  }
}
