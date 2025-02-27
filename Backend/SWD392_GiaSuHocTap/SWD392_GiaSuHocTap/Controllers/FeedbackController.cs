﻿using Common.Constant.Message;
using Common.DTO.Notification;
using Common.DTO;
using Common.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.IService;
using Service.Service;
using Common.DTO.Feedback;
using Common.DTO.Query;
using Microsoft.AspNetCore.Authorization;

namespace SWD392_GiaSuHocTap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;
        private readonly IUserService _userService;

        public FeedbackController(IFeedbackService feedbackService, IUserService userService)
        {
            _feedbackService = feedbackService;
            _userService = userService;
        }

        [Authorize]
        [HttpGet("get-all-feedbacks")]
        public IActionResult GetAllFeedbacks([FromQuery] FeedbackParameters parameters)
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

            var response = _feedbackService.GetPagedFeedbacksList(parameters);

            return Ok(new ResponseDTO()
            {
                StatusCode = (int)StatusCodeEnum.OK,
                Message = GeneralMessage.Success,
                Data = response
            });


            return StatusCode(404, new ResponseDTO()
            {
                StatusCode = (int)StatusCodeEnum.NotFound,
                Message = GeneralMessage.NotFound,
                Data = null
            });
        }

        [Authorize]
        [HttpGet("get-feedbacks-of-tutors")]
        public IActionResult GetFeedbacksOfTutor(string tutorEmail, [FromQuery] FeedbackParameters parameters)
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

            var tutor = _userService.GetUserByEmail(tutorEmail);

            if (tutor != null)
            {
                var response = _feedbackService.GetFeedbacksOfTutor(tutor.UserId, parameters);

                return Ok(new ResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.OK,
                    Message = GeneralMessage.Success,
                    Data = response
                });
            }

            return StatusCode(404, new ResponseDTO()
            {
                StatusCode = (int)StatusCodeEnum.NotFound,
                Message = GeneralMessage.NotFound,
                Data = null
            });
        }

        [Authorize(Roles = "Parents")]
        [HttpPost("create-feedback")]
        public async Task<IActionResult> CreateNewFeedback([FromBody] FeedbackCreateDTO feedbackInfo)
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
