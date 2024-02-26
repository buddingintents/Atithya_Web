using Atithya_Web.Helpers;
using Atithya_Web.Utilities;
using Newtonsoft.Json;
using System.Net;

namespace Atithya_Web.Models
{
  public class ApiResponseHelper<T>
  {
    public string GetApiResponse(APIRequest<T> data, string apiPath, string apiMethod)
    {
      var errorResponse = new APIResponse();
      var responseConfig = new ResponseConfig
      {
        ResponseEncryption = "0",
        ResponseCompression = "0"
      };
      var apiResponse = string.Empty;
      try
      {
        switch (apiMethod.ToUpper())
        {
          case "GET":
            apiResponse = new ApiHelper().GetAsync(apiPath).Result;
            break;
          case "POST":
            apiResponse = new ApiHelper().PostAsync(apiPath, data).Result;
            break;
        }

        if (apiResponse.Contains("API CALL FAILED"))
        {
          responseConfig.Status = ((int)HttpStatusCode.BadRequest).ToString();
          responseConfig.Description = HttpStatusCode.BadRequest.ToString();
          errorResponse.ResponseConfig = new CompressionHelper().CompressString(JsonConvert.SerializeObject(responseConfig));
          errorResponse.Content = apiResponse.Split(':')[1].Trim();
          return JsonConvert.SerializeObject(errorResponse);
        }
        else
          return apiResponse;
      }
      catch (TimeoutException ex)
      {
        responseConfig.Status = ((int)HttpStatusCode.RequestTimeout).ToString();
        responseConfig.Description = HttpStatusCode.RequestTimeout.ToString();
        errorResponse.ResponseConfig = new CompressionHelper().CompressString(JsonConvert.SerializeObject(responseConfig));
        errorResponse.Content = ex.Message;

        return JsonConvert.SerializeObject(errorResponse);
      }
      catch (Exception ex)
      {
        responseConfig.Status = ((int)HttpStatusCode.InternalServerError).ToString();
        responseConfig.Description = HttpStatusCode.InternalServerError.ToString();
        errorResponse.ResponseConfig = new CompressionHelper().CompressString(JsonConvert.SerializeObject(responseConfig));
        errorResponse.Content = JsonConvert.SerializeObject(ex.Message);
        return JsonConvert.SerializeObject(errorResponse);
      }
    }
    public string GetInvalidModelStateApiResponse()
    {
      var errorResponse = new APIResponse();
      var responseConfig = new ResponseConfig
      {
        ResponseEncryption = "0",
        ResponseCompression = "0",
        Status = ((int)HttpStatusCode.BadRequest).ToString(),
        Description = HttpStatusCode.BadRequest.ToString()
      };
      errorResponse.ResponseConfig = new CompressionHelper().CompressString(JsonConvert.SerializeObject(responseConfig));
      errorResponse.Content = "Invalid Model State";
      return JsonConvert.SerializeObject(errorResponse);
    }
  }
}
