using AutoMapper;
using Common.Constant.Message;
using Common.DTO;
using Common.DTO.Auth;
using Common.DTO.User;
using Common.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.IService;
using Service.Service;
using System.ComponentModel.DataAnnotations;
using static Google.Apis.Requests.BatchRequest;

namespace SWD392_GiaSuHocTap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ITokenService _tokenService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public AuthController(IAuthService authService,
                              ITokenService tokenService,
                              IUserService userService,
                              IMapper mapper)
        {
            _authService = authService;
            _tokenService = tokenService;
            _userService = userService;
            _mapper = mapper;   
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO loginRequestDTO)
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

            var response = await _authService.Login(loginRequestDTO);

            if (response != null)
            {
                if (response.Token == null)
                {
                    return Ok(new ResponseDTO()
                    {
                        StatusCode = (int)StatusCodeEnum.InternalServerError,
                        Message = AuthMessage.Banned,
                        Data = null
                    });
                } else
                {

                    return Ok(new ResponseDTO()
                    {
                        StatusCode = (int)StatusCodeEnum.OK,
                        Message = AuthMessage.LoginSuccess,
                        Data = response
                    });
                }
            }

            return BadRequest(new ResponseDTO()
            {
                StatusCode = (int)StatusCodeEnum.BadRequest,
                Message = AuthMessage.LoginFailed,
                Data = null
            }); ;
        }

        //[Authorize]
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenRequestDTO request)
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

            var response = await _tokenService.GenerateNewToken(request.AccessToken, request.RefreshToken);

            if (response != null && response.Token != null)
            {
                return Ok(new ResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.OK,
                    Message = response.Message,
                    Data = response.Token
                });
            }

            return BadRequest(new ResponseDTO()
            {
                StatusCode = (int)StatusCodeEnum.BadRequest,
                Message = response!.Message,
                Data = null
            });
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] LogOutRequestDTO request)
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

            var response = await _authService.LogOut(request.RefreshToken);

            if (response.isSuccess)
            {
                return Ok(new ResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.OK,
                    Message = response.Message,
                    Data = null
                });
            }

            return BadRequest(new ResponseDTO()
            {
                StatusCode = (int)StatusCodeEnum.BadRequest,
                Message = response.Message,
                Data = null
            });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] EmailDTO email)
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

            var result = await _authService.ForgotPassword(email.Email);
            return Ok(result);
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ForgotPasswordDTO dto)
        {
            var result = await _authService.ResetPassword(dto);
            return Ok(result);
        }

        [HttpGet("user-by-token")]
        public async Task<IActionResult> GetUserByToken([Required] string refreshToken)
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

            var response = await _tokenService.GetUserByToken(refreshToken);

            if (response != null && response.User != null)
            {
                return Ok(new ResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.OK,
                    Message = response.Message!,
                    Data = response.User
                });
            }

            return BadRequest(new ResponseDTO()
            {
                StatusCode = (int)StatusCodeEnum.BadRequest,
                Message = response!.Message!,
                Data = null
            });
        }
        
        [HttpPost("register-tutor")]
        public async Task<IActionResult> CreateNewTutor([FromForm] TutorCreateRequestDTO tutor, IFormFile imageFile, List<IFormFile> idenFiles,
                                                                List<IFormFile> cerFiles)
        {
            try
            {
                var checkValidate = _userService.CheckCreateTutor(tutor);

                if (!checkValidate.IsSuccess)
                {
                    return BadRequest(checkValidate);
                }

                var createTutor = await _userService.AddNewTutor(tutor, imageFile, idenFiles, cerFiles);

                if (createTutor.IsSuccess)
                {
                    var response = new ResponseDTO()
                    {
                        Message = CreateUserMessage.CreateSuccess,
                        StatusCode = (int)StatusCodeEnum.Created,
                        Data = createTutor
                    };
                    return Ok(response);
                }
                else
                {
                    var response = new ResponseDTO()
                    {
                        Message = CreateUserMessage.CreateFail,
                        StatusCode = (int)StatusCodeEnum.BadRequest,
                    };
                    return BadRequest(response);
                }
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

        [HttpPost("register-parents")]
        public async Task<IActionResult> CreateNewParent([FromForm] ParentCreateRequestDTO parent, IFormFile imageFile)
        {
            try
            {
                var checkValidate = _userService.CheckCreateParent(parent);

                if (!checkValidate.IsSuccess)
                {
                    return BadRequest(checkValidate);
                }

                var createTutor = await _userService.AddNewParent(parent, imageFile);

                if (createTutor.IsSuccess)
                {
                    var response = new ResponseDTO()
                    {
                        Message = CreateUserMessage.CreateSuccess,
                        StatusCode = (int)StatusCodeEnum.Created,
                        Data = createTutor
                    };
                    return Ok(response);
                }
                else
                {
                    var response = new ResponseDTO()
                    {
                        Message = CreateUserMessage.CreateFail,
                        StatusCode = (int)StatusCodeEnum.BadRequest,
                    };
                    return BadRequest(response);
                }
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

        [HttpPost("send-verify-email")]
        public IActionResult SendEmail([FromBody] EmailDTO email)
        {
            try
            {
                _authService.SendEmailVerify(email.Email);
                var response = new ResponseDTO()
                {
                    Message = EmailNotificationMessage.SendOTPEmailSuccessfully + email.Email,
                    StatusCode= (int)StatusCodeEnum.OK,
                };
                return Ok(response);
            } catch(Exception ex)
            {
                return StatusCode(500, new ResponseDTO
                {
                    StatusCode = (int)StatusCodeEnum.InternalServerError,
                    Message = ex.Message,
                    Data = null
                });
            }
        }

        [HttpPost("verify-email")]
        public IActionResult VerifyEmail([FromBody] VerifyEmailDTO dto)
        {
            try
            {
                var checkOtpExpired = _authService.CheckOTPExpired(dto.Email);
                if (!checkOtpExpired)
                {
                    var responseExpired = new ResponseDTO()
                    {
                        Message = AuthMessage.OtpIsExpired,
                        StatusCode = (int)StatusCodeEnum.BadRequest,
                    };
                    return BadRequest(responseExpired);
                }

                var checkOtp = _authService.CheckOTP(dto.Email, dto.OtpCode);
                if (!checkOtp)
                {
                    var responseWrong = new ResponseDTO()
                    {
                        Message = AuthMessage.OtpNotMatch,
                        StatusCode = (int)StatusCodeEnum.BadRequest,
                    };
                    return BadRequest(responseWrong);
                }

                var verify = _authService.VerifyEmail(dto.Email);
                var response = new ResponseDTO()
                {
                    Message = AuthMessage.VerifySuccess,
                    StatusCode = (int)StatusCodeEnum.OK,
                };
                return Ok(response);
            } catch (Exception ex)
            {
                return StatusCode(500, new ResponseDTO
                {
                    StatusCode = (int)StatusCodeEnum.InternalServerError,
                    Message = ex.Message,
                    Data = null
                });
            }
            
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("accept-tutor")]
        public IActionResult AcceptTutor([FromBody] EmailDTO email)
        {
            try
            {
                _authService.AcceptUser(email.Email);
                var response = new ResponseDTO()
                {
                    Message = AuthMessage.Accepted,
                    StatusCode = (int)StatusCodeEnum.OK,
                };
                return Ok(response);
            } catch(Exception ex)
            {
                return StatusCode(500, new ResponseDTO
                {
                    StatusCode = (int)StatusCodeEnum.InternalServerError,
                    Message = ex.Message,
                    Data = null
                });
            }
            
        }

        //[Authorize(Roles = "Moderator")]
        [HttpPost("reject-tutor")]
        public IActionResult RejectTutor([FromBody] RejectTutorDTO dto)
        {
            try
            {
                _authService.RejectTutor(dto.Email, dto.Reason);
                var response = new ResponseDTO()
                {
                    Message = AuthMessage.Rejected,
                    StatusCode = (int)StatusCodeEnum.OK,
                };
                return Ok(response);

            } catch (Exception ex)
            {
                return StatusCode(500, new ResponseDTO
                {
                    StatusCode = (int)StatusCodeEnum.InternalServerError,
                    Message = ex.Message,
                    Data = null
                });
            } 
        }

        [Authorize]
        [HttpGet("get-by-email")]
        public IActionResult GetUserByEmail([FromQuery][Required][EmailAddress] string email)
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

            var response = _userService.GetUserByEmail(email);

            if (response != null)
            {
                return Ok(new ResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.OK,
                    Message = GeneralMessage.Success,
                    Data = _mapper.Map<UserDTO>(response)
                });
            }

            return BadRequest(new ResponseDTO()
            {
                StatusCode = (int)StatusCodeEnum.BadRequest,
                Message = GeneralMessage.Fail,
                Data = null
            });
        }

        [HttpGet("user-image")]
        public async Task<IActionResult> GetUserImage(string fileName)
        {
            try
            {
                var fileStream = await _userService.RetrieveItemAsync(fileName);
                var fileExtension = Path.GetExtension(fileName);
                string mimeType;
                switch (fileExtension.ToLower())
                {
                    case ".jpg":
                    case ".jpeg":
                        mimeType = "image/jpeg";
                        break;
                    case ".png":
                        mimeType = "image/png";
                        break;
                    case ".gif":
                        mimeType = "image/gif";
                        break;
                    case ".bmp":
                        mimeType = "image/bmp";
                        break;
                    default:
                        mimeType = "application/octet-stream"; // Fallback to a generic MIME type
                        break;
                }
                if (fileStream == null)
                {
                    return BadRequest(new ResponseDTO()
                    {
                        StatusCode =(int) StatusCodeEnum.NotFound,
                        Message = GeneralMessage.Fail,  
                    });
                }

                return File(fileStream, mimeType);
            } catch(Exception ex)
            {
                return StatusCode(500, new ResponseDTO
                {
                    StatusCode = (int)StatusCodeEnum.InternalServerError,
                    Message = ex.Message,
                    Data = null
                });
            }
        }

        [HttpPut("change-password/{id}")]
        public async Task<IActionResult> ChangePassword(int id, [FromBody] ChangePasswordDTO request)
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
            }
            else
            {
                var response = await _authService.ChangePassword(user, request.Password);

                if (response)
                {
                    return NoContent();
                } else
                {
                    return StatusCode(500, new ResponseDTO
                    {
                        StatusCode = (int)StatusCodeEnum.InternalServerError,
                        Message = GeneralMessage.Fail,
                        Data = null
                    });
                }
            }
        }
    }
}
