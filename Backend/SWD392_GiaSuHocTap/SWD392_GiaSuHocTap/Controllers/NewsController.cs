using Common.Constant.Message;
using Common.DTO.Feedback;
using Common.DTO;
using Common.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.IService;
using Service.Services;
using Common.DTO.News;
using Common.DTO.Query;

namespace SWD392_GiaSuHocTap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly INewsService _newsService;

        public NewsController(INewsService newsService)
        {
            _newsService = newsService;
        }

        [HttpGet("get-news-paging")]
        public async Task<IActionResult> GetNewsPaging([FromQuery] NewsParameters parameters)
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

            var response = _newsService.GetPagedNewsList(parameters);

            return Ok(new ResponseDTO()
            {
                StatusCode = (int)StatusCodeEnum.OK,
                Message = GeneralMessage.Success,
                Data = response
            });
        }

        [HttpPost("create-news")]
        public async Task<IActionResult> CreateNews([FromForm] NewsCreateDTO newsInfo, IFormFile imageFile)
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

            var feedback = await _newsService.AddNewNews(newsInfo, imageFile);

            if (feedback == null)
            {
                return StatusCode(404, new ResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.NotFound,
                    Message = GeneralMessage.NotFound,
                    Data = null
                });
            }

            if (feedback != null)
            {
                return Ok(new ResponseDTO()
                {
                    StatusCode = (int)StatusCodeEnum.OK,
                    Message = GeneralMessage.Success,
                    Data = feedback
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
