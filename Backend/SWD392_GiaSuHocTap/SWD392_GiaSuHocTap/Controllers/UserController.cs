﻿using AutoMapper;
using Common.Constant.Message;
using Common.DTO;
using Common.DTO.Query;
using Common.DTO.User;
using Common.Enum;
using Microsoft.AspNetCore.Mvc;
using Service.IService;

namespace SWD392_GiaSuHocTap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin,Moderator")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet()]
        public IActionResult GetAllUsers([FromQuery] UserParameters queries)
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

            var response = _userService.GetPagedUserList(queries);

            return Ok(new ResponseDTO
            {
                StatusCode = (int)StatusCodeEnum.OK,
                Message = GeneralMessage.Success,
                Data = response
            });
        }

        [HttpGet("get-pending-tutor")]
        public IActionResult GetPendingTutor([FromQuery] UserParameters queries)
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

            try
            
            {
                var user = _userService.GetAllPendingUser(queries);
                var response = new ResponseDTO()
                {
                    Message = GeneralMessage.Success,
                    StatusCode = (int)StatusCodeEnum.OK,
                    Data = user
                };
                return Ok(response);

            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResponseDTO
                {
                    StatusCode = (int)StatusCodeEnum.InternalServerError,
                    Message = ex.Message,
                    Data = null
                });
            }
        }

        [HttpGet("get-active-users")]
        public IActionResult GetActiveUsers([FromQuery] UserParameters queries)
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

            try
            {
                var user = _userService.GetAllActiveUser(queries);
                var response = new ResponseDTO()
                {
                    Message = GeneralMessage.Success,
                    StatusCode = (int)StatusCodeEnum.OK,
                    Data = user
                };
                return Ok(response);

            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResponseDTO
                {
                    StatusCode = (int)StatusCodeEnum.InternalServerError,
                    Message = ex.Message,
                    Data = null
                });
            }
        }

        [HttpPut("update-tutor-detail")]
        public async Task<IActionResult> UpdateTutorDetail([FromBody] UpdateTutorDTO updatedInfo)
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

            var response = await _userService.UpdateTutorLastStep(updatedInfo);

            if (response)
            {
                return Ok(new ResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.NoContent,
                    Message = GeneralMessage.Success,
                    Data = null
                });
            }

            return BadRequest(new ResponseDTO()
            {
                StatusCode = (int)StatusCodeEnum.BadRequest,
                Message = GeneralMessage.Fail,
                Data = null
            });
        }

        [HttpGet("get-tutor-teach-online")]
        public IActionResult GetTutorTeachOnline([FromQuery] UserParameters queries)
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

            try

            {
                var user = _userService.GetTutorTeachOnline(queries);
                var response = new ResponseDTO()
                {
                    Message = GeneralMessage.Success,
                    StatusCode = (int)StatusCodeEnum.OK,
                    Data = user
                };
                return Ok(response);

            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResponseDTO
                {
                    StatusCode = (int)StatusCodeEnum.InternalServerError,
                    Message = ex.Message,
                    Data = null
                });
            }
        }

        [HttpGet("get-tutor-teach-offline")]
        public IActionResult GetTutorTeachOffline([FromQuery] UserParameters queries)
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

            try

            {
                var user = _userService.GetTutorTeachOffline(queries);
                var response = new ResponseDTO()
                {
                    Message = GeneralMessage.Success,
                    StatusCode = (int)StatusCodeEnum.OK,
                    Data = user
                };

                return Ok(response);

            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResponseDTO
                {
                    StatusCode = (int)StatusCodeEnum.InternalServerError,
                    Message = ex.Message,
                    Data = null
                });
            }
        }

        [HttpGet("get-user-by-email")]
        public IActionResult GetUserByEmail([FromQuery] string email)
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

            var response = _userService.GetUserByEmailInclude(email);

            return Ok(new ResponseDTO
            {
                StatusCode = (int)StatusCodeEnum.OK,
                Message = GeneralMessage.Success,
                Data = response
            });
        }

        [HttpGet("get-top-tutor")]
        public IActionResult GetTopTutor()
        {
            var response = _userService.GetTopTutor();

            return Ok(new ResponseDTO
            {
                StatusCode = (int)StatusCodeEnum.OK,
                Message = GeneralMessage.Success,
                Data = response
            });
        }
    }
}
