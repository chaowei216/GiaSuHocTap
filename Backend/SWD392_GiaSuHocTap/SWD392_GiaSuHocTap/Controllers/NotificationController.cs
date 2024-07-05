using Common.Constant.Message;
using Common.DTO;
using Common.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.IService;
using System.ComponentModel.DataAnnotations;

namespace SWD392_GiaSuHocTap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;
        private readonly IUserService _userService;

        public NotificationController(INotificationService notificationService, 
                                      IUserService userService)
        {
            _notificationService = notificationService;
            _userService = userService;
        }

        [HttpGet("get-user-notification/{userId}")]
        public async Task<IActionResult> GetNotificationOfUser([Required] int userId)
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

            if (user != null)
            {
                var response = _notificationService.GetAllNotificationsOfUser(userId);

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
    }
}
