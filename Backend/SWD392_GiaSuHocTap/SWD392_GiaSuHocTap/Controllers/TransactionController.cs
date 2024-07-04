using Common.Constant.Message;
using Common.DTO;
using Common.DTO.Query;
using Common.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.IService;

namespace SWD392_GiaSuHocTap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
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
    }
}
