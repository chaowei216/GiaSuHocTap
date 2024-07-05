using Common.Constant.Message;
using Common.DTO;
using Common.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.IService;

namespace SWD392_GiaSuHocTap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpGet("get-all-courses")]
        public IActionResult GetAllCourses()
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

            try
            {
                var courses = _courseService.GetAllCourses();
                var response = new ResponseDTO()
                {
                    Message = GeneralMessage.Success,
                    StatusCode = (int)StatusCodeEnum.OK,
                    Data = courses
                };
                return Ok(response);

            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResponseDTO
                {
                    StatusCode = (int)StatusCodeEnum.InternalServerError,
                    Message = ex.Message,
                    Data = null
                });
            }
        }
    }
}
