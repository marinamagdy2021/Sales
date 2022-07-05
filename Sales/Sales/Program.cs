using Microsoft.EntityFrameworkCore;
using Sales.Data;

var builder = WebApplication.CreateBuilder(args);
string text = "";
// Add services to the container.
builder.Services.AddControllers();

// Context
builder.Services.AddDbContext<SalesDbContext>(
                a=> a.UseLazyLoadingProxies().UseSqlServer(builder.Configuration.GetConnectionString("myConnection")));

// allow lazy load
builder.Services.AddControllers().AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling =
Newtonsoft.Json.ReferenceLoopHandling.Ignore);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy(text,
    builder =>
    {
        builder.WithOrigins("*");
        builder.AllowAnyMethod();
        builder.AllowAnyHeader();
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(text);
app.UseAuthorization();

app.MapControllers();

app.Run();
