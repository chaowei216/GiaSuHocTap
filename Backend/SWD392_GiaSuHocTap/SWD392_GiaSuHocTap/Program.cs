using DAO.DAO;
using DAO.Model;
using Microsoft.EntityFrameworkCore;
using Repository.IRepository;
using Repository.Repository;
using Service.IService;
using Service.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DAO
builder.Services.AddScoped<IGenericDAO<Role>, GenericDAO<Role>>();
builder.Services.AddScoped<IGenericDAO<TimeTable>, GenericDAO<TimeTable>>();
builder.Services.AddScoped<IGenericDAO<Transaction>, GenericDAO<Transaction>>();
builder.Services.AddScoped<IGenericDAO<User>, GenericDAO<User>>();
builder.Services.AddScoped<IGenericDAO<TutorDetail>, GenericDAO<TutorDetail>>();

// Repository
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<ITimeTableRepository, TimeTableRepository>();
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

// Service
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<ITimeTableService, TimeTableService>();
builder.Services.AddScoped<IUserService, UserService>();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<DataContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
builder.Services.AddHttpContextAccessor();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
