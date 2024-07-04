using Common.DTO.Payment;
using Microsoft.AspNetCore.Http;

namespace Service.IService
{
    public interface IPaymentService
    {
        /// <summary>
        /// Create payment request
        /// </summary>
        /// <param name="paymentInfo"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        Task<string> CreatePaymentRequest(PaymentRequestDTO paymentInfo, HttpContext context);

        /// <summary>
        /// Handle payment response from payment method
        /// </summary>
        /// <param name="response"></param>
        /// <returns></returns>
        Task<bool> HandlePaymentResponse(PaymentResponseDTO response);
    }
}
