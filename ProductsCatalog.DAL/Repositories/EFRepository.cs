using Microsoft.EntityFrameworkCore;
using ProductsCatalog.Business.Models;

namespace ProductsCatalog.DAL.Repositories
{
    public class EFRepository<TEntity, TContext>(TContext context) : IDisposable 
        where TEntity : class
        where TContext : DbContext
    {
        private TContext dbContext = context;
        private DbSet<TEntity> dbSet = context.Set<TEntity>();
        private bool disposed;

        public TEntity? Get(int id)
        {
            return dbSet.Find(id);
        }

        public TEntity? GetWithoutTracking(Func<TEntity, bool> condition)
        {
            return dbSet.AsNoTracking().FirstOrDefault(condition);
        }

        public IQueryable<TEntity> GetAll()
        {
            return dbSet;
        }

        public IQueryable<TEntity> GetAllWithoutTracking()
        {
            return dbSet.AsNoTracking();
        }

        public void Add(TEntity item)
        {
            dbSet.Add(item);
        }

        public void Delete(TEntity item)
        {
            dbSet.Remove(item);
        }

        public void Update(TEntity item)
        {
            dbContext.Entry(item).State = EntityState.Modified;
        }

        public void Save()
        {
            dbContext.SaveChanges();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    dbContext?.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
