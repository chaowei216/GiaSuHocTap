using Common.DTO;
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
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            context.Response.ContentType = "application/json";

            var response = new ResponseDTO()
            {
                StatusCode = (int)HttpStatusCode.InternalServerError,
                Message = ex.Message,
                Data = null
            };

            await context.Response.WriteAsJsonAsync(response);
        }
    }
}
