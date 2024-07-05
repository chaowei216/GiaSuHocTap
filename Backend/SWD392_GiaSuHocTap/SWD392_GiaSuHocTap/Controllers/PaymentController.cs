using Common.Constant.Message;
using Common.DTO;
using Common.DTO.Payment;
using Common.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.IService;
using System;
using static Google.Apis.Requests.BatchRequest;

namespace SWD392_GiaSuHocTap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost("create-request-payment")]
        public async Task<IActionResult> CreatePaymentRequest([FromBody] PaymentRequestDTO request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = ModelState.ToString()!,
                    Data = null
                });
            }

            var response = await _paymentService.CreatePaymentRequest(request, HttpContext);

            if (!string.IsNullOrEmpty(response))
            {
                return Ok(new ResponseDTO
                {
                    StatusCode = (int)StatusCodeEnum.OK,
                    Message = GeneralMessage.Success,
                    Data = response
                });
            }

            return StatusCode(500, new ResponseDTO
            {
                StatusCode = (int)StatusCodeEnum.InternalServerError,
                Message = GeneralMessage.Fail,
                Data = null
            });
        }

        [HttpPost("handle-response-payment")]
        public async Task<IActionResult> HandleResponse([FromBody] PaymentResponseDTO responseInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = ModelState.ToString()!,
                    Data = null
                });
            }

            var response = await _paymentService.HandlePaymentResponse(responseInfo);

            if (response)
            {
                return Ok(new ResponseDTO
                {
                    StatusCode = (int)StatusCodeEnum.OK,
                    Message = GeneralMessage.Success,
                    Data = null
                });
            }

            return StatusCode(500, new ResponseDTO
            {
                StatusCode = (int)StatusCodeEnum.InternalServerError,
                Message = GeneralMessage.Fail,
                Data = null
            });
        }
    }
}
