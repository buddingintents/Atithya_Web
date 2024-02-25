using Atithya_Web.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Diagnostics;

namespace Atithya_Web.Controllers
{
  public class HomeController : Controller
  {
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
      _logger = logger;
    }
    public IActionResult Index()
    {
      return View();
    }
    public IActionResult Privacy()
    {
      return View();
    }
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
      return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
    private string GetPayloadEncryptionParameters()
    {
      string encPass_Phrase = System.Configuration.ConfigurationManager.AppSettings["passPhrase"];
      string enc_iv = System.Configuration.ConfigurationManager.AppSettings["enciv"];

      return JsonConvert.SerializeObject(new ModelEncryptionParams
      {
        Key = encPass_Phrase,
        IV = enc_iv,
        Version = "1.0"
      });
    }
  }
}
