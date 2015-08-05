using System.Data.Entity;

namespace LunchBox.Models
{
    public class LunchBoxContext : DbContext
    {
        public LunchBoxContext() : base("name=LunchBoxContext") { }

        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseOrder> CourseOrders { get; set; }
    }
}
