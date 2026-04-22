using Microsoft.EntityFrameworkCore;
using PetAdopt.Data;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();


// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseMySql(
//         builder.Configuration.GetConnectionString("DefaultConnection"),
//         new MySqlServerVersion(new Version(8, 0, 0))
//     ));

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        
        new MySqlServerVersion(new Version(8, 0, 0))
    )
);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder => builder.WithOrigins("http://localhost:5173")
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

builder.Services.AddOpenApi();

var app = builder.Build();

app.UseCors("AllowFrontend");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapControllers();


app.MapGet("/weatherforecast", () =>
{
    return "API is working";
});

app.Run();