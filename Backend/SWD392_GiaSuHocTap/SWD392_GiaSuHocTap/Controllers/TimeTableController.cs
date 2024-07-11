using Common.Constant.Message;
using Common.DTO;
using Common.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.IService;
using Service.Service;
using Common.DTO.TimeTable;

namespace SWD392_GiaSuHocTap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeTableController : ControllerBase
    {
        private readonly ITimeTableService _timetableService;

        public TimeTableController(ITimeTableService timetableService)
        {
            _timetableService = timetableService;
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

            if (response)
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
    }
}
