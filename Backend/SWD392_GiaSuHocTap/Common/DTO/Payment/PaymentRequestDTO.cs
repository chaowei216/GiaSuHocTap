using System.ComponentModel.DataAnnotations;

namespace Common.DTO.Payment
{
    public class PaymentRequestDTO
    {
        public int UserId { get; set; }
        public string PaymentMethod { get; set; } = null!;
        public double TotalPrice { get; set; }
        public int Coin { get; set; }
    }
}
