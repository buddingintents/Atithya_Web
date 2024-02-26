using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Net;
using System.Text;

namespace Atithya_Web.Helpers
{
  public class ApiHelper : IDisposable
  {
    private readonly TimeSpan _timeout;
    private HttpClient _httpClient;
    private HttpClientHandler _httpClientHandler;
    private readonly string _baseUrl = "https://localhost:7143/api/";
    private const string ClientUserAgent = "my-api-client-v1";
    private const string MediaTypeJson = "application/json";

    public ApiHelper(TimeSpan? timeout = null)
    {
      _timeout = timeout ?? TimeSpan.FromSeconds(30);
    }
    public async Task<string> GetAsync(string url)
    {
      try
      {
        EnsureHttpClientCreated();
        _httpClient.DefaultRequestHeaders.Clear();

        HttpResponseMessage response = await _httpClient.GetAsync(NormalizeBaseUrl(_baseUrl) + url, HttpCompletionOption.ResponseHeadersRead).ConfigureAwait(false);//
        if (response.IsSuccessStatusCode)
        {                                                                                                                              //response.EnsureSuccessStatusCode();
          HttpContent strResponseContent = response.Content;
          return await strResponseContent.ReadAsStringAsync();
        }
        else
        {
          HttpContent strResponseContent = response.Content;
          string tmp = await strResponseContent.ReadAsStringAsync();
          //LoggingHelper.logEvent(LoggingHelper.LogLevel.DEBUG, "Response Code:: " + response.StatusCode.ToString() + " URL:: " + NormalizeBaseUrl(_baseUrl) + url + "::API RESPONSE: " + response.ReasonPhrase, true); //":: HRMS ID:" + Convert.ToString(HttpContext.Current.Session["PFI"]) == null ? Convert.ToString(HttpContext.Current.Session["ia_hrms"]) : Convert.ToString(HttpContext.Current.Session["PFI"])
          return "API CALL FAILED: " + response.ReasonPhrase;
        }
      }
      catch (Exception ex)
      {
        return "API CALL FAILED: " + ex.Message;
      }
    }
    public async Task<string> GetAsyncExtern(string url)
    {
      try
      {
        EnsureHttpClientCreated();
        _httpClient.DefaultRequestHeaders.Clear();

        HttpResponseMessage response = await _httpClient.GetAsync(url, HttpCompletionOption.ResponseHeadersRead).ConfigureAwait(false);//
        if (response.IsSuccessStatusCode)
        {                                                                                                                              //response.EnsureSuccessStatusCode();
          HttpContent strResponseContent = response.Content;
          return await strResponseContent.ReadAsStringAsync();
        }
        else
        {
          //LoggingHelper.logEvent(LoggingHelper.LogLevel.DEBUG, "Response Code:: " + response.StatusCode.ToString() + URL::  + NormalizeBaseUrl(_baseUrl) + url + ":: HRMS ID:" + Convert.ToString(HttpContext.Current.Session["PFI"]) == null ? Convert.ToString(HttpContext.Current.Session["ia_hrms"]) : Convert.ToString(HttpContext.Current.Session["PFI"]), true);
          return default(string);
        }
      }
      catch (Exception ex)
      {
        return ex.ToString();
      }
    }
    public async Task<string> PostAsync(string url, object input)
    {
      try
      {
        EnsureHttpClientCreated();
        _httpClient.DefaultRequestHeaders.Clear();

        HttpContent reqContent = new StringContent(JsonConvert.SerializeObject(input), Encoding.UTF8, MediaTypeJson);
        HttpResponseMessage response = await _httpClient.PostAsync(NormalizeBaseUrl(_baseUrl) + url, reqContent).ConfigureAwait(false);
        if (response.IsSuccessStatusCode)
        {
          HttpContent strResponseContent = response.Content;
          return await strResponseContent.ReadAsStringAsync();
        }
        else
        {
          HttpContent strResponseContent = response.Content;
          string tmp = await strResponseContent.ReadAsStringAsync();
          //LoggingHelper.logEvent(LoggingHelper.LogLevel.DEBUG, "Response Code:: " + response.StatusCode.ToString() + " URL:: " + NormalizeBaseUrl(_baseUrl) + url + "::API RESPONSE: " + response.ReasonPhrase, true); //":: HRMS ID:" + Convert.ToString(HttpContext.Current.Session["PFI"]) == null ? Convert.ToString(HttpContext.Current.Session["ia_hrms"]) : Convert.ToString(HttpContext.Current.Session["PFI"])
          return "API CALL FAILED: " + response.ReasonPhrase;
        }
      }
      catch (Exception ex)
      {
        //LoggingHelper.logEvent(LoggingHelper.LogLevel.DEBUG, ex.ToString(), true);
        return "API CALL FAILED: " + ex.Message;
      }
    }
    public void Dispose()
    {
      _httpClientHandler?.Dispose();
      _httpClient?.Dispose();
    }
    private void CreateHttpClient()
    {
      _httpClientHandler = new HttpClientHandler
      {
        AutomaticDecompression = DecompressionMethods.Deflate | DecompressionMethods.GZip
      };
      _httpClient = new HttpClient(_httpClientHandler, false)
      {
        Timeout = _timeout
      };

      _httpClient.DefaultRequestHeaders.UserAgent.ParseAdd(ClientUserAgent);

      if (!string.IsNullOrWhiteSpace(_baseUrl))
      {
        _httpClient.BaseAddress = new Uri(_baseUrl);
      }
      _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(MediaTypeJson));
    }
    private void EnsureHttpClientCreated()
    {
      if (_httpClient == null)
      {
        CreateHttpClient();
      }
    }
    private static string NormalizeBaseUrl(string url)
    {
      return url.EndsWith("/") ? url : url + "/";
    }
    public async Task<string> GetAsyncByUri(string url)
    {
      try
      {
        EnsureHttpClientCreated();
        HttpResponseMessage response = await _httpClient.GetAsync("http://localhost:8080/api/" + url, HttpCompletionOption.ResponseHeadersRead).ConfigureAwait(false);//
        if (response.IsSuccessStatusCode)
        {                                                                                                                              //response.EnsureSuccessStatusCode();
          HttpContent strResponseContent = response.Content;
          return await strResponseContent.ReadAsStringAsync();
        }
        else
          return default(string);
      }
      catch (System.Net.Sockets.SocketException ex)
      {
        return ex.ToString();
      }
      catch (Exception ex)
      {
        return ex.ToString();
      }
    }
    public async Task<string> PostInternalAsync(string url, object input)
    {
      try
      {
        EnsureHttpClientCreated();
        _httpClient.DefaultRequestHeaders.Clear();

        HttpContent reqContent = new StringContent(JsonConvert.SerializeObject(input), Encoding.UTF8, MediaTypeJson);
        HttpResponseMessage response = await _httpClient.PostAsync(NormalizeBaseUrl(_baseUrl) + url, reqContent).ConfigureAwait(false);
        if (response.IsSuccessStatusCode)
        {
          HttpContent strResponseContent = response.Content;
          return await strResponseContent.ReadAsStringAsync();
        }
        else
        {
          HttpContent strResponseContent = response.Content;
          string tmp = await strResponseContent.ReadAsStringAsync();
          //LoggingHelper.logEvent(LoggingHelper.LogLevel.DEBUG, "Response Code:: " + response.StatusCode.ToString() + " URL:: " + NormalizeBaseUrl(_baseUrl) + url + "::API RESPONSE: " + response.ReasonPhrase, true); //":: HRMS ID:" + Convert.ToString(HttpContext.Current.Session["PFI"]) == null ? Convert.ToString(HttpContext.Current.Session["ia_hrms"]) : Convert.ToString(HttpContext.Current.Session["PFI"])
          return "API CALL FAILED: " + response.ReasonPhrase;
        }
      }
      catch (Exception ex)
      {
        return "API CALL FAILED: " + ex.Message;
      }
    }
  }
}
