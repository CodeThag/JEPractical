namespace Api.Dtos;

public class PartialMovieDto
{
    public string ImdbID { get; set; } // Unique Id
    public string Title { get; set; }
    public string Year { get; set; }
    public string Type { get; set; }
    public string Poster { get; set; }
}
