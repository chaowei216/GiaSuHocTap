using Common.Constant.Message;
using Common.DTO;
using Common.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.IService;

namespace SWD392_GiaSuHocTap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticController : ControllerBase
    {
        private readonly IStatisticService _statisticService;

        public StatisticController(IStatisticService statisticService)
        {
            _statisticService = statisticService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("statistic-system")]
        public IActionResult GetStatistic()
        {
            var response = _statisticService.GetStatisticOfSystem();

            return Ok(new ResponseDTO
            {
                StatusCode = (int)StatusCodeEnum.OK,
                Message = GeneralMessage.Success,
                Data = response
            });
        }

        [HttpGet("general-data")]
        public IActionResult GetGeneralData()
        {
            var response = _statisticService.GetGeneralData();

            return Ok(new ResponseDTO
            {
                StatusCode = (int)StatusCodeEnum.OK,
                Message = GeneralMessage.Success,
                Data = response
            });
        }
    }
}
