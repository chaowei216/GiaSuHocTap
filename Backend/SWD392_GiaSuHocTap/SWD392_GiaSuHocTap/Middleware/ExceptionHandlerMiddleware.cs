using Common.DTO;
using Microsoft.AspNetCore.Http.HttpResults;
using System.ComponentModel.DataAnnotations;
using System.Net;

namespace SWD392_GiaSuHocTap.Middleware
{
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context) 
        {
            try
            {
                await _next(context);
            } catch (Exception ex)
            {
                await HandleError(context, ex);
            }
        }


        private static async Task HandleError(HttpContext context, Exception ex)
        {
            var responseDTO = new ResponseDTO();

            if (ex is HttpRequestException httpRequestException)
            {
                // HttpRequestException
                switch (httpRequestException.StatusCode)
                {
                    case HttpStatusCode.BadRequest:
                        context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                        responseDTO.StatusCode = (int)HttpStatusCode.BadRequest;
                        responseDTO.Message = ex.Message;
                        break;
                    default:
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        responseDTO.StatusCode = (int)HttpStatusCode.InternalServerError;
                        responseDTO.Message = ex.Message;
                        break;
                }
            }
            else if (ex is ArgumentException argumentException)
            {
                // ArgumentException
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                responseDTO.StatusCode = (int)HttpStatusCode.BadRequest;
                responseDTO.Message = argumentException.Message;
            }
            else if (ex is ValidationException validationException)
            {
                // ValidationException
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                responseDTO.StatusCode = (int)HttpStatusCode.BadRequest;
                responseDTO.Message = validationException.Message;
            }
            else
            {
                // other exceptions
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                responseDTO.StatusCode = (int)HttpStatusCode.InternalServerError;
                responseDTO.Message = ex.Message;
            }

            responseDTO.Data = null;
            await context.Response.WriteAsJsonAsync(responseDTO);
        }
    }
}
