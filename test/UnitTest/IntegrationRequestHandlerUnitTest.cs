using Api.Configurations;
using Api.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Moq;

namespace UnitTest;

public class IntegrationRequestHandlerUnitTest
{
    private IntegrationRequestHandler _integrationRequestHandler;

    [SetUp]
    public void Setup()
    {
        // mock ILogger
        var mock = new Mock<ILogger<IntegrationRequestHandler>>();
        var logger = mock.Object;

        var config = new IntegrationConfiguration
        {
            Url = "https://omdbapi.com",
            Key = "38e7a025"
        };

        _integrationRequestHandler = new IntegrationRequestHandler(config, logger);
    }

    [Test]
    public async Task GetMovieByIdAsync_Positive_Test()
    {
        var result = "Batman";
        var id = "tt0096895";

        var movie = await _integrationRequestHandler.GetMovieByIdAsync(id);

        // Assert.IsNotNull(movie);

        Assert.That(movie.Title, Is.EqualTo(result));        
    }


    [Test]
    public async Task GetMovieByTitleAsync_Positive_Test()
    {
        var title = "Batman";
        var id = "tt0096895";

        var movie = await _integrationRequestHandler.GetMovieByTitleAsync(title);

        //Assert.IsNotNull(movie);

        Assert.That(movie.ImdbID, Is.EqualTo(id));
    }

    [Test]
    public async Task GetSearchResultAsync_Positive_Test()
    {
        var queryTerm = "Batman";
        var search = await _integrationRequestHandler.GetSearchResultAsync(queryTerm, null, null);

        Assert.IsNotNull(search);
    }

    [Test]
    public async Task GetSearchResultAsync_Negative_Test()
    {
        var queryTerm = "Batmaaaan";
        var search = await _integrationRequestHandler.GetSearchResultAsync(queryTerm, null, null);

        Assert.IsNull(search);
    }
}