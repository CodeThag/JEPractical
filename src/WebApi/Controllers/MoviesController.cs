using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;
public class MoviesController : BaseApiController
{
    private readonly ILogger<MoviesController> _logger;

    public IActionResult Index()
    {
        return View();
    }
}
