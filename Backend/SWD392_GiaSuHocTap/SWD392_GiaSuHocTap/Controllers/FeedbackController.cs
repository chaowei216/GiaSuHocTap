using Common.Constant.Message;
using Common.DTO.Notification;
using Common.DTO;
using Common.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.IService;
using Service.Service;
using Common.DTO.Feedback;

namespace SWD392_GiaSuHocTap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;

        public FeedbackController(IFeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        [HttpPost("create-feedback")]
        public async Task<IActionResult> CreateSystemNotification([FromBody] FeedbackCreateDTO feedbackInfo)
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

            var feedback = await _feedbackService.AddNewFeedback(feedbackInfo);

            if (feedback == null)
            {
                return StatusCode(404, new ResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.NotFound,
                    Message = GeneralMessage.NotFound,
                    Data = null
                });
            }

            if (feedback != null)
            {
                return Ok(new ResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.OK,
                    Message = GeneralMessage.Success,
                    Data = feedback
                });
            }

            return StatusCode(500, new ResponseDTO()
            {
                StatusCode = (int)StatusCodeEnum.InternalServerError,
                Message = GeneralMessage.Fail,
                Data = null
            });
        }
    }
}
