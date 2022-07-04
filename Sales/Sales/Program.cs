using Microsoft.EntityFrameworkCore;
using Sales.Data;

var builder = WebApplication.CreateBuilder(args);
string text = "";
// Add services to the container.
builder.Services.AddDbContext<SalesDbContext>(a=>a.UseSqlServer(builder.Configuration.GetConnectionString("myConnection")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

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
