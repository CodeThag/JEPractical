using Api.Dtos;

namespace Api.Models;

public class SearchResponse
{
    public List<PartialMovieDto> Search { get; set; }
    public int TotalResults { get; set; }
    public bool Response { get; set; }
}
