using Common.DTO;
using DAO.DAO;
using DAO.Data;
using DAO.Model;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Repository.IRepository;
using Repository.Repository;
using Service.IService;
using Service.Service;
using Service.Services;
using Swashbuckle.AspNetCore.Filters;
using SWD392_GiaSuHocTap.Middleware;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles); ;
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description =
        "JWT Authorization header using the Bearer scheme. \r\n\r\n " +
        "Enter 'Bearer' [space] and then your token in the text input below. \r\n\r\n" +
        "Example: \"Bearer 12345abcdef\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Scheme = "Bearer",
        Type = SecuritySchemeType.ApiKey
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

// auto mapper
builder.Services.AddAutoMapper(typeof(Program).Assembly);

// Authentication
var jwtSettings = builder.Configuration.GetSection("Jwt").Get<JwtSettings>();
var tokenValidationParameters =  new TokenValidationParameters
{
    ValidateIssuer = true,
    ValidateAudience = true,
    ValidateLifetime = true,
    ValidateIssuerSigningKey = true,
    ValidIssuer = jwtSettings!.Issuer,
    ValidAudience = jwtSettings!.Audience,
    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings!.Key)),
    ClockSkew = TimeSpan.Zero
};

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.SaveToken = true;
            options.RequireHttpsMetadata = false;
            options.TokenValidationParameters = tokenValidationParameters;
        });

builder.Services.AddSingleton(tokenValidationParameters);

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", 
                    b => b.AllowAnyHeader()
                            .AllowAnyOrigin()
                                .AllowAnyMethod());
});

// DAO
builder.Services.AddScoped<IGenericDAO<Role>, GenericDAO<Role>>();
builder.Services.AddScoped<IGenericDAO<TimeTable>, GenericDAO<TimeTable>>();
builder.Services.AddScoped<IGenericDAO<Transaction>, GenericDAO<Transaction>>();
builder.Services.AddScoped<IGenericDAO<User>, GenericDAO<User>>();
builder.Services.AddScoped<IGenericDAO<TutorDetail>, GenericDAO<TutorDetail>>();
builder.Services.AddScoped<IGenericDAO<Class>, GenericDAO<Class>>();
builder.Services.AddScoped<IGenericDAO<Course>, GenericDAO<Course>>();
builder.Services.AddScoped<IGenericDAO<Feedback>, GenericDAO<Feedback>>();
builder.Services.AddScoped<IGenericDAO<News>, GenericDAO<News>>();
builder.Services.AddScoped<IGenericDAO<Notification>, GenericDAO<Notification>>();
builder.Services.AddScoped<IGenericDAO<Report>, GenericDAO<Report>>();
builder.Services.AddScoped<IGenericDAO<RefreshToken>, GenericDAO<RefreshToken>>();
builder.Services.AddScoped<IGenericDAO<UserClass>, GenericDAO<UserClass>>();
builder.Services.AddScoped<IGenericDAO<UserCourse>,  GenericDAO<UserCourse>>();
builder.Services.AddScoped<IGenericDAO<UserNotification>, GenericDAO<UserNotification>>();
builder.Services.AddScoped<IGenericDAO<Request>, GenericDAO<Request>>();
builder.Services.AddScoped<IGenericDAO<RequestTime>,  GenericDAO<RequestTime>>();

// Repository
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<ITimeTableRepository, TimeTableRepository>();
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IClassRepository, ClassRepository>();
builder.Services.AddScoped<ICourseRepository, CourseRepository>();
builder.Services.AddScoped<IFeedbackRepository, FeedbackRepository>();
builder.Services.AddScoped<INewsRepository, NewsRepository>();
builder.Services.AddScoped<INotificationRepository, NotificationRepository>();
builder.Services.AddScoped<IReportRepository, ReportRepository>();
builder.Services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
builder.Services.AddScoped<IRequestRepository, RequestRepository>();

// Service
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<ITimeTableService, TimeTableService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IClassService, ClassService>();
builder.Services.AddScoped<ICourseService, CourseService>();
builder.Services.AddScoped<IFeedbackService, FeedbackService>();
builder.Services.AddScoped<INewsService, NewsService>();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<IReportService, ReportService>();
builder.Services.AddScoped<IRefreshTokenService, RefreshTokenService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IValidateHandleService, ValidateHandleService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IVnPayService, VnPayService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddScoped<IRequestService, RequestService>();

builder.Services.AddTransient<DataSeed>();
// Db context
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<DataContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddHttpContextAccessor();

var app = builder.Build();
//seed data
if (args.Length == 1 && args[0].ToLower() == "seeddata")
    SeedData(app);

async void SeedData(IHost app)
{
    var scopeFactory = app.Services.GetService<IServiceScopeFactory>();

    using (var scope = scopeFactory.CreateScope())
    {
        var service = scope.ServiceProvider.GetService<DataSeed>();
        service.TrySeed();
    }
}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionHandlerMiddleware>();

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
