using Common.DTO.Payment;
using Microsoft.AspNetCore.Http;

namespace Service.IService
{
    public interface IVnPayService
    {
        /// <summary>
        /// Create Payment Request To VnPay
        /// </summary>
        /// <param name="paymentInfo"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        string CreatePaymentUrl(PaymentRequestDTO paymentInfo, HttpContext context);
    }
}
