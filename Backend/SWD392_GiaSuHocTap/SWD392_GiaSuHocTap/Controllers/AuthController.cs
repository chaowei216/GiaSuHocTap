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

        public AuthController(IAuthService authService,
                              ITokenService tokenService,
                              IUserService userService)
        {
            _authService = authService;
            _tokenService = tokenService;
            _userService = userService;
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
                return Ok(new ResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.OK,
                    Message = AuthMessage.LoginSuccess,
                    Data = response
                });
            }

            return BadRequest(new ResponseDTO()
            {
                StatusCode = (int)StatusCodeEnum.BadRequest,
                Message = AuthMessage.LoginFailed,
                Data = null
            }); ;
        }

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
        public async Task<IActionResult> ForgotPassword(string email)
        {
            var result = await _authService.ForgotPassword(email);
            return Ok(result);
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ForgotPasswordDTO dto)
        {
            var result = await _authService.ResetPassword(dto);
            return Ok(result);
        }

        /*[HttpPost("reset-password")]
        public IActionResult */

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
                var response = new ResponseDTO()
                {
                    Message = ex.Message,
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                };
                return BadRequest(response);
            }
        }

        [HttpPost("register-parent")]
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
                var response = new ResponseDTO()
                {
                    Message = ex.Message,
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                };
                return BadRequest(response);
            }
        }

        [HttpPost("send-verify-email")]
        public IActionResult SendEmail(string email)
        {
            try
            {
                _authService.SendEmailVerify(email);
                var response = new ResponseDTO()
                {
                    Message = EmailNotificationMessage.SendOTPEmailSuccessfully + email,
                    StatusCode= (int)StatusCodeEnum.NoContent,
                };
                return Ok(response);
            } catch(Exception ex)
            {
                var response = new ResponseDTO()
                {
                    Message = ex.Message,
                };
                return BadRequest(response);
            }
        }

        [HttpPost("verify-email")]
        public IActionResult VerifyEmail(string otpCode, string email)
        {
            try
            {
                var checkOtpExpired = _authService.CheckOTPExpired(email);
                if (!checkOtpExpired)
                {
                    var responseExpired = new ResponseDTO()
                    {
                        Message = AuthMessage.OtpIsExpired,
                        StatusCode = (int)StatusCodeEnum.BadRequest,
                    };
                    return BadRequest(responseExpired);
                }

                var checkOtp = _authService.CheckOTP(email, otpCode);
                if (!checkOtp)
                {
                    var responseWrong = new ResponseDTO()
                    {
                        Message = AuthMessage.OtpNotMatch,
                        StatusCode = (int)StatusCodeEnum.BadRequest,
                    };
                    return BadRequest(responseWrong);
                }

                var verify = _authService.VerifyEmail(email);
                var response = new ResponseDTO()
                {
                    Message = AuthMessage.VerifySuccess,
                    StatusCode = (int)StatusCodeEnum.NoContent,
                };
                return Ok(response);
            } catch (Exception ex)
            {
                var response = new ResponseDTO()
                {
                    Message = ex.Message,
                };
                return BadRequest(response);
            }
            
        }

        [HttpPost("accept-tutor")]
        public IActionResult AcceptTutor(string email)
        {
            try
            {
                _authService.AcceptUser(email);
                var response = new ResponseDTO()
                {
                    Message = AuthMessage.Accepted,
                    StatusCode = (int)StatusCodeEnum.NoContent,
                };
                return Ok(response);
            } catch(Exception ex)
            {
                var response = new ResponseDTO()
                {
                    Message = ex.Message,
                };
                return BadRequest(response);
            }
            
        }

        [HttpPost("reject-tutor")]
        public IActionResult RejectTutor(string email, string reason)
        {
            try
            {
                _authService.RejectTutor(email, reason);
                var response = new ResponseDTO()
                {
                    Message = AuthMessage.Rejected,
                    StatusCode = (int)StatusCodeEnum.NoContent,
                };
                return Ok(response);

            } catch (Exception ex)
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
