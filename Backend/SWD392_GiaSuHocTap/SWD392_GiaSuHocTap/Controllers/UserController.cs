using AutoMapper;
using Common.Constant.Message;
using Common.DTO;
using Common.DTO.Query;
using Common.DTO.User;
using Common.Enum;
using Microsoft.AspNetCore.Mvc;
using Service.IService;
using static Google.Apis.Requests.BatchRequest;

namespace SWD392_GiaSuHocTap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin,Moderator")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IStatisticService _statisticService;

        public UserController(IUserService userService, IStatisticService statisticService)
        {
            _userService = userService;
            _statisticService = statisticService;
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

        [HttpGet("get-all-tutors")]
        public IActionResult GetAllTutors([FromQuery] UserParameters queries)
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

            var response = _userService.GetPagedTutorList(queries);

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
        public IActionResult GetTutorTeachOnline([FromQuery] TutorParameters queries)
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
        public IActionResult GetTutorTeachOffline([FromQuery] TutorParameters queries)
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

        [HttpPut("update-user/{userId}")]
        public async Task<IActionResult> UpdateUser(int userId, [FromBody] UserUpdateDTO userInfo)
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

            var user = await _userService.GetUserById(userId);

            if (user == null)
            {
                return StatusCode(404, new ResponseDTO ()
                {
                    StatusCode = (int)StatusCodeEnum.NotFound,
                    Message = GeneralMessage.NotFound,
                    Data = null
                });
            } 

            var response = await _userService.UpdateUser(user, userInfo);

            if (response != null)
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

        [HttpPost("add-new-moderator")]
        public async Task<IActionResult> AddNewModerator([FromBody] ModeratorCreateRequestDTO request)
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

            var response = await _userService.AddNewModerator(request);

            if (response != null)
            {
                return Ok(new ResponseDTO
                {
                    StatusCode = (int)StatusCodeEnum.Created,
                    Message = GeneralMessage.Success,
                    Data = response
                });
            } else
            {
                return BadRequest(new ResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = ModelState.ToString()!,
                    Data = null
                });
            }
        }

        [HttpPut("unblock-account/{id}")]
        public async Task<IActionResult> UnBlockAccount(int id)
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

            var user = await _userService.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            } else if (user.RoleId != (int)RoleEnum.Tutor && user.Status != UserStatusEnum.InActive)
            {
                return BadRequest(new ResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = GeneralMessage.Fail,
                    Data = null
                });
            }

            var resposne = await _userService.UnBlockAccount(user);

            if (resposne)
            {
                return NoContent();
            }

            return StatusCode(500, new ResponseDTO
            {
                StatusCode = (int)StatusCodeEnum.InternalServerError,
                Message = GeneralMessage.Fail,
                Data = null
            });
        }

        [HttpGet("rent-info-parents/{id}")]
        public async Task<IActionResult> GetRentingInfoOfParents(int id)
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

            var user = await _userService.GetUserById(id);

            if (user == null) 
            { 
                return NotFound(); 
            } else if (user.RoleId != (int)RoleEnum.Parents)
            {
                return BadRequest(new ResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = GeneralMessage.Fail,
                    Data = null
                });
            }

            var response = _statisticService.GetUserRentingInfo(user);

            return Ok(new ResponseDTO
            {
                StatusCode = (int)StatusCodeEnum.OK,
                Message = GeneralMessage.Success,
                Data = response
            });
        }
    }
}
