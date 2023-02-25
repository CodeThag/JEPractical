namespace Api.Data.Entities;

public record PreviousSearch
{
    public int Id { get; set; }
    public string Keyword   { get; set; }
    public DateTime Created { get; set; }
    public string CreatedBy { get; set; }
}
