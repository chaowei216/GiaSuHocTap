using Common.Constant.Message;
using Common.DTO;
using Common.DTO.User;
using Common.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.IService;

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

        [HttpPost("AddNewTutor")]
        public async Task<IActionResult> CreateNewTutor([FromBody] TutorCreateRequestDTO tutor)
        {
            try
            {
                var checkValidate = _userService.CheckCreateTutor(tutor);

                if(!checkValidate.IsSuccess)
                {
                    return BadRequest(checkValidate);
                }

                var createTutor = await _userService.AddNewTutor(tutor);

                if(!createTutor.IsSuccess)
                {
                    var response = new ResponseDTO()
                    {
                        Message = CreateUserMessage.CreateSuccess,
                        StatusCode = (int)StatusCodeEnum.Created,
                        Data = createTutor
                    };
                    return Ok(response);
                } else
                {
                    var response = new ResponseDTO()
                    {
                        Message = CreateUserMessage.CreateSuccess,
                        StatusCode = (int)StatusCodeEnum.BadRequest,
                    };
                    return BadRequest(response);
                }
            } catch (Exception ex)
            {
                var response = new ResponseDTO()
                {
                    Message = ex.Message,
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                };
                return BadRequest(response);
            }
        }

        [HttpPost("AddNewParent")]
        public async Task<IActionResult> CreateNewParent([FromBody] ParentCreateRequestDTO parent)
        {
            try
            {
                var checkValidate = _userService.CheckCreateParent(parent);

                if (!checkValidate.IsSuccess)
                {
                    return BadRequest(checkValidate);
                }

                var createTutor = await _userService.AddNewParent(parent);

                if (!createTutor.IsSuccess)
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
                        Message = CreateUserMessage.CreateSuccess,
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
    }
}
