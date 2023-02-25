using Api.Data.Entities;
using Api.Dtos;
using Api.Interface;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;
public class MoviesController : BaseApiController
{
    private readonly IIntegrationRequestHandler _handler;
    private readonly ILogger<MoviesController> _logger;
    private readonly IApplicationDbContext _context;

    public MoviesController(IIntegrationRequestHandler handler, ILogger<MoviesController> logger, IApplicationDbContext context)
    {
        _handler = handler;
        _logger = logger;
        _context = context;
    }

    [HttpGet("Search")]
    public async Task<ActionResult<PaginatedList<PartialMovieDto>>> Search(string query, string? type, int? year, int page = 1)
    {
        var result = await _handler.GetSearchResultAsync(query, type, year, page);

        SaveSearchAsync(query);

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

    [HttpGet("FetchPreviousSearch")]
    public async Task<ActionResult<List<PreviousSearch>>> FetchPreviousSearch()
    {
        return await _context.PreviousSearches
            .Where(x => x.CreatedBy == GetUserId())
            .OrderByDescending(x => x.Created).Take(5)
            .ToListAsync();
    }

    private async Task SaveSearchAsync(string query, CancellationToken cancellationToken = new CancellationToken())
    {
        if (!string.IsNullOrEmpty(query))
        {
            query = query.Trim();
            var item = _context.PreviousSearches.FirstOrDefault(x => x.Keyword == query && x.CreatedBy == GetUserId());
            if (null == item)
                _context.PreviousSearches.Add(new PreviousSearch() { Keyword = query, CreatedBy = GetUserId(), Created = DateTime.Now });
            else
                item.Created = DateTime.Now; // Update the order of the history

            await _context.SaveChangesAsync(cancellationToken);
        }
    }

    /// <summary>
    /// Save the User Id in a cookie for search retrival
    /// </summary>
    /// <returns></returns>
    private string GetUserId()
    {
        var userId = Request.Cookies["userId"];
        if (string.IsNullOrEmpty(userId))
        {
            userId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("userId", userId, cookieOptions);
        }

        return userId;
    }
}
