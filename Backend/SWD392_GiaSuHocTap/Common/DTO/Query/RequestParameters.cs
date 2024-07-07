using System.ComponentModel.DataAnnotations;

namespace Common.DTO.Query
{
    public class RequestParameters : QueryStringParameters
    {
        public string? RequestType { get; set; }
        public string? Status { get; set; }
    }
}
