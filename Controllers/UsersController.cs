
using Atithya_Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace Atithya_Web.Controllers
{
  public class UsersController : Controller
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
        var cookies = HttpContext.Request.Cookies;
        cookies.TryGetValue("AuthToken", out token);
        return new ApiResponseHelper<string>().GetApiResponse(data, "Subscription/GetSubscriptionData", "POST", token);
      }
      else
        return new ApiResponseHelper<string>().GetInvalidModelStateApiResponse();
    }
  }
}
