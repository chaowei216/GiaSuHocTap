using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAO.Model
{
    public class Transaction
    {
        [Key]
        public int TransactionId { get; set; }
        public string PaymentMethod { get; set; } = null!;
        public string TransactionInfo { get; set; } = null!;
        public DateTime? TransactionDate { get; set; }
        public double Amout { get; set; }
        public bool Status { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; } = null!;
    }
}
