﻿namespace Common.DTO.Payment
{
    public class PaymentResponseDTO
    {
        public int UserId { get; set; }
        public string TransactionInfo { get; set; } = null!;
        public string TransactionNumber { get; set; } = null!;
        public bool IsSuccess { get; set; }
    }
}
