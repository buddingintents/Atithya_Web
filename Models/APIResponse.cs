using System.Runtime.Serialization;

namespace Atithya_Web.Models
{
  [DataContract(Namespace = "")]
  public class APIResponse
  {
    [DataMember]
    public string? ResponseConfig { get; set; }
    [DataMember]
    public string? Content { get; set; }
  }
}
