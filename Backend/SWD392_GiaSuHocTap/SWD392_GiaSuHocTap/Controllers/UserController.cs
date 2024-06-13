﻿using Common.Constant.Message;
using Common.DTO;
using Common.DTO.User;
using Common.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.IService;
using Service.Service;

namespace SWD392_GiaSuHocTap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("get-pending-tutor")]
        public IActionResult GetPendingTutor()
        {
            try
            {
                var user = _userService.GetAllPendingUser();
                var response = new ResponseDTO()
                {
                    Message = GeneralMessage.Success,
                    StatusCode = (int)StatusCodeEnum.NoContent,
                    Data = user
                };
                return Ok(response);

            }
            catch (Exception ex)
            {
                var response = new ResponseDTO()
                {
                    Message = ex.Message,
                };
                return BadRequest(response);
            }
        }
    }
}
