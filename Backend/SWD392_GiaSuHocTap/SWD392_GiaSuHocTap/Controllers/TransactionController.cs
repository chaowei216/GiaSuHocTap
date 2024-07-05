using Common.Constant.Message;
using Common.DTO;
using Common.DTO.Query;
using Common.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.IService;
using System.ComponentModel.DataAnnotations;

namespace SWD392_GiaSuHocTap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;
        private readonly IUserService _userService;

        public TransactionController(ITransactionService transactionService,
                                     IUserService userService)
        {
            _transactionService = transactionService;
            _userService = userService;
        }

        [HttpGet("get-all-transactions")]
        public IActionResult GetAllTransactions([FromQuery] TransactionParameters parameters)
        {
            var response = _transactionService.GetAllTransactions(parameters);

            return Ok(new ResponseDTO
            {
                StatusCode = (int)StatusCodeEnum.OK,
                Message = GeneralMessage.Success,
                Data = response
            });
        }

        [HttpGet("get-trans-user/{userId}")]
        public async Task<IActionResult> GetTransOfUser([Required] int userId, [FromQuery] TransactionParameters parameters)
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
                var response = _transactionService.GetTransOfUser(userId, parameters);

                if (response != null)
                {
                    return Ok(new ResponseDTO
                    {
                        StatusCode = (int)StatusCodeEnum.OK,
                        Message = GeneralMessage.Success,
                        Data = response
                    });
                }
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
