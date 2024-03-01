using Atithya_Web.Helpers;
using Atithya_Web.Models;
using Atithya_Web.Utilities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Atithya_Web.Controllers
{
  public class AuthenticationController(IConfiguration configuration) : Controller
  {
    private readonly EncryptionHelper encHelper = new(configuration);

    public IActionResult Index()
    {
      return View();
    }
    internal string GetToken()
    {
      try
      {
        TokenAuthenticaton tokenAuthenticaton = new TokenAuthenticaton()
        {
          TokenRequestKey = encHelper.EncryptData(configuration["TokenRequestKey"] + DateTime.Now.ToString("ddMMyyyy"))
        };
        var a = JsonConvert.DeserializeObject<Tokens>(new ApiHelper().PostAsync("Authentication/GetToken", tokenAuthenticaton,"").Result);
        return a.Token;
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.ToString());
        throw;
      }
    }
  }
}
