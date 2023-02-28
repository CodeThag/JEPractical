using Api.Configurations;
using Api.Dtos;
using Api.Interface;
using Api.Models;
using Newtonsoft.Json;

namespace Api.Services;

// Try to test this service.
public class IntegrationRequestHandler : IIntegrationRequestHandler
{
    private string _url;
    private readonly ILogger<IntegrationRequestHandler> _logger;

    public IntegrationRequestHandler(IntegrationConfiguration config, ILogger<IntegrationRequestHandler> logger)
    {
        _logger = logger;

        // Set up URL
        _url = $"{config.Url}/?apikey={config.Key}";
    }


    public async Task<MovieDto> GetMovieByIdAsync(string id)
    {
        var url = $"{_url}&i={id}";

        var result = await GetResponse<MovieDto>(url);

        return !result.Response || result == null ? null : result;
    }

    public async Task<MovieDto> GetMovieByTitleAsync(string name)
    {
        var url = $"{_url}&t={name}";

        var result = await GetResponse<MovieDto>(url);

        return !result.Response || result == null ? null : result;
    }

    public async Task<PaginatedList<PartialMovieDto>> GetSearchResultAsync(string q, string? type, int? year, int page = 1)
    {
        var url = $"{_url}&s={q}&page={page}";

        if (!string.IsNullOrEmpty(type))
            url += $"&type={type}";

        if (null != year)
            url += $"&y={year}";


        var result = await GetResponse<SearchResponse>(url);

        if (result == null || !result.Response)
            return default(PaginatedList<PartialMovieDto>);

        return PaginatedList<PartialMovieDto>.Create(result.Search, page, result.TotalResults);
    }

    private async Task<T> GetResponse<T>(string url)
    {
        var client = new HttpClient();
        try
        {
            using (var response = await client.GetAsync(url))
            {
                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();

                return JsonConvert.DeserializeObject<T>(responseBody);
            }
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex.Message);
            return default;
        }
    }

}
