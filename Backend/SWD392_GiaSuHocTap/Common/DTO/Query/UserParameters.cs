using Common.Enum;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Common.DTO.Query
{
    public class UserParameters : QueryStringParameters
    {
        [Column(TypeName = "nvarchar(24)")]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public UserStatusEnum? Status { get; set; }
    }
}
