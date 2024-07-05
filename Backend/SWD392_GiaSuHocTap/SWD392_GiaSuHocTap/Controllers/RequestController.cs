﻿using Common.Constant.Message;
using Common.DTO;
using Common.DTO.Query;
using Common.DTO.Request;
using Common.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.IService;

namespace SWD392_GiaSuHocTap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly IRequestService _requestService;
        private readonly IUserService _userService;

        public RequestController(IRequestService requestService, IUserService userService)
        {
            _requestService = requestService;
            _userService = userService;

        }

        [HttpGet("get-tutor-offline-requests/{tutorId}")]
        public async Task<IActionResult> GetOfflineRequestsOfTutor(int tutorId, [FromQuery] RequestParameters parameters)
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

            var tutor = await _userService.GetUserById(tutorId);

            if (tutor != null)
            {
                var response = _requestService.GetOfflineRequestsOfTutor(tutorId, parameters);

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

        [HttpGet("get-tutor-online-requests/{tutorId}")]
        public async Task<IActionResult> GetOnlineRequestsOfTutor(int tutorId, [FromQuery] RequestParameters parameters)
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

            var tutor = await _userService.GetUserById(tutorId);

            if (tutor != null)
            {
                var response = _requestService.GetOnlineRequestsOfTutor(tutorId, parameters);

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

        [HttpPost("create-offline-request")]
        public async Task<IActionResult> CreateOfflineRequest([FromBody] RequestOfflineCreateDTO request)
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

            var response = await _requestService.AddOfflineRequest(request);

            if (response != null)
            {
                return Ok(new ResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.Created,
                    Message = GeneralMessage.Success,
                    Data = response
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
