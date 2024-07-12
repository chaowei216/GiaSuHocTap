using Common.Constant.Message;
using Common.DTO;
using Common.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.IService;
using Service.Service;
using Common.DTO.TimeTable;
using Common.DTO.Query;

namespace SWD392_GiaSuHocTap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeTableController : ControllerBase
    {
        private readonly ITimeTableService _timetableService;
        private readonly IUserService _userService;

        public TimeTableController(ITimeTableService timetableService, IUserService userService)
        {
            _timetableService = timetableService;
            _userService = userService;
        }

        [HttpPut("update-timetable/{timetableId}")]
        public async Task<IActionResult> UpdateTimeTable(int timetableId, [FromBody] UpdateTimeTableDTO timetableInfo)
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

            var timetable = await _timetableService.GetTimeTableById(timetableId);

            if (timetable == null)
            {
                return StatusCode(404, new ResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.NotFound,
                    Message = GeneralMessage.NotFound,
                    Data = null
                });
            }

            var response = await _timetableService.UpdateTimeTable(timetableId, timetableInfo);

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

        [HttpDelete("delete-timetable/{timetableId}")]
        public async Task<IActionResult> DeleteTimetable(int timetableId)
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
            var response = await _timetableService.DeleteTimetable(timetableId);

            if (response != null)
            {
                return Ok(new ResponseDTO
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

        [HttpPut("enable-timetable/{timetableId}")]
        public async Task<IActionResult> EnableTimetable(int timetableId)
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
            var response = await _timetableService.EnableTimetable(timetableId);

            if (response != null)
            {
                return Ok(new ResponseDTO
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

        [HttpGet("get-timetable-by-email/{email}")]
        public IActionResult GetAllUsers(string email, [FromQuery]  TimeTableParameters queries)
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

            var response = _userService.GetTimeTableByEmail(email, queries);

            return Ok(new ResponseDTO
            {
                StatusCode = (int)StatusCodeEnum.OK,
                Message = GeneralMessage.Success,
                Data = response
            });
        }
    }
}
