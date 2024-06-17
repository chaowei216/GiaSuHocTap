using Common.Constant.Message;
using Common.DTO;
using Common.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.IService;
using Service.Service;

namespace SWD392_GiaSuHocTap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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
                var response = new ResponseDTO()
                {
                    Message = ex.Message,
                };
                return BadRequest(response);
            }
        }
    }
}
