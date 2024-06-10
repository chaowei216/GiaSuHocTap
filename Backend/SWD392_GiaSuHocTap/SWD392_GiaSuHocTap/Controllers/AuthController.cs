using Common.Constant.Message;
using Common.DTO;
using Common.DTO.Auth;
using Common.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.IService;

namespace SWD392_GiaSuHocTap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ITokenService _tokenService;

        public AuthController(IAuthService authService,
                              ITokenService tokenService)
        {
            _authService = authService;
            _tokenService = tokenService;
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
    }
}
