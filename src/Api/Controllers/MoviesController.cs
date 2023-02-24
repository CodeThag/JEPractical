using Api.Dtos;
using Api.Interface;
using Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;
public class MoviesController : BaseApiController
{
    private readonly IIntegrationRequestHandler _handler;
    private readonly ILogger<MoviesController> _logger;

    public MoviesController(IIntegrationRequestHandler handler, ILogger<MoviesController> logger)
    {
        _handler = handler;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<PaginatedList<PartialMovieDto>>> Search(string query, string? type, int? year, int page = 1)
    {
         var result = await _handler.GetSearchResultAsync(query, type, year, page);

        return result;
    }

    [HttpGet("GetMovieById")]
    public async Task<ActionResult<MovieDto>> GetMovieById(string id)
    {
        var result = await _handler.GetMovieByIdAsync(id);

        return result;
    }

    [HttpGet("GetMovieByTitle")]
    public async Task<ActionResult<MovieDto>> GetMovieByTitle(string name)
    {
        var result = await _handler.GetMovieByTitleAsync(name);

        return result;
    }
}
