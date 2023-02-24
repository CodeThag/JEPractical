using Api.Dtos;
using Api.Models;

namespace Api.Interface;

public interface IIntegrationRequestHandler
{
    public Task<PaginatedList<PartialMovieDto>> GetSearchResultAsync(string q, string? type, int? year, int page = 1);
    public Task<MovieDto> GetMovieByIdAsync(string id);
    public Task<MovieDto> GetMovieByTitleAsync(string name);
}
