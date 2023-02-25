using Api.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Api.Interface;

public interface IApplicationDbContext
{
    DbSet<PreviousSearch> PreviousSearches { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
