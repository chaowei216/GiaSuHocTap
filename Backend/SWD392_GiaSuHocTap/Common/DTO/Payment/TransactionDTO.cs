using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Common.DTO.Payment
{
    public class TransactionDTO
    {
        public int TransactionId { get; set; }
        public string PaymentMethod { get; set; } = null!;
        public string TransactionNumber { get; set; } = null!;
        public string TransactionInfo { get; set; } = null!;
        public DateTime? TransactionDate { get; set; }
        public double Amount { get; set; }
        public string Status { get; set; } = null!;
        public int UserId { get; set; }
        public string Email { get; set; } = null!;
    }
}
