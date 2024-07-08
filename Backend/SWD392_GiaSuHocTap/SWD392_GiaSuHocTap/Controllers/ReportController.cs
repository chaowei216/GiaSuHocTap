using Common.Constant.Message;
using Common.DTO;
using Common.DTO.Query;
using Common.DTO.Report;
using Common.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.IService;

namespace SWD392_GiaSuHocTap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;
        private readonly IUserService _userService;

        public ReportController(IReportService reportService,
                                IUserService userService)
        {
            _reportService = reportService;
            _userService = userService;
        }

        [HttpGet("get-all-reports")]
        public IActionResult GetAllReport([FromQuery] ReportParameters parameters)
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

            var response = _reportService.GetReportsWithPagination(parameters);

            return Ok(new ResponseDTO()
            {
                StatusCode = (int)StatusCodeEnum.OK,
                Message = GeneralMessage.Success,
                Data = response
            });
        }

        [HttpPost("create-new-report")]
        public async Task<IActionResult> CreateNewReport([FromBody] ReportCreateDTO reportInfo)
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

            var user = await _userService.GetUserById(reportInfo.UserId);
            var tutor = await _userService.GetUserById(reportInfo.TutorId);

            if (user == null || tutor == null
                || user.Status == UserStatusEnum.InActive
                || tutor.Status == UserStatusEnum.InActive)
            {
                return BadRequest(new ResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.BadRequest,
                    Message = GeneralMessage.Fail,
                    Data = null
                });
            }

            var response = await _reportService.AddNewReport(reportInfo);

            if (response != null)
            {
                return Ok(new ResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.Created,
                    Message = GeneralMessage.Success,
                    Data = response
                });
            }

            return StatusCode(500, new ResponseDTO()
            {
                StatusCode = (int)StatusCodeEnum.InternalServerError,
                Message = GeneralMessage.Fail,
                Data = null
            });
        }

        [HttpGet("get-user-reports/{userId}")]
        public async Task<IActionResult> GetUserReports(int userId, [FromQuery] ReportParameters parameters)
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
                return StatusCode(404, new ResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.NotFound,
                    Message = GeneralMessage.NotFound,
                    Data = null
                });
            }

            var response = _reportService.GetPagedReportOfUser(userId, parameters);

            return Ok(new ResponseDTO()
            {
                StatusCode = (int)StatusCodeEnum.OK,
                Message = GeneralMessage.Success,
                Data = response
            });
        }

        [HttpPut("handle-report/{reportId}")]
        public async Task<IActionResult> HandleReport(int reportId, [FromBody] ReportUpdateDTO reportInfo)
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

            var report = await _reportService.GetReportById(reportId);
            
            if (report == null)
            {
                return StatusCode(404, new ResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.NotFound,
                    Message = GeneralMessage.NotFound,
                    Data = null
                });
            }

            var response = await _reportService.HandleReport(report, reportInfo);

            if (response)
            {
                return Ok(new ResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.NoContent,
                    Message = GeneralMessage.Success,
                    Data = null
                });
            }

            return StatusCode(500, new ResponseDTO()
            {
                StatusCode = (int)StatusCodeEnum.InternalServerError,
                Message = GeneralMessage.Fail,
                Data = null
            });
        }
    }
}
