﻿using Common.Constant.Message;
using Common.DTO;
using Common.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.IService;
using Service.Service;

namespace SWD392_GiaSuHocTap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private readonly IClassService _classService;
        public ClassController(IClassService classService)
        {
            _classService = classService;
        }

        [HttpGet("get-all-classes")]
        public IActionResult GetAllClasses()
        {
            try
            {
                var classes = _classService.GetAllClasses();
                var response = new ResponseDTO()
                {
                    Message = GeneralMessage.Success,
                    StatusCode = (int)StatusCodeEnum.NoContent,
                    Data = classes
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