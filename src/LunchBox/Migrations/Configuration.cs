namespace LunchBox.Migrations
{
    using Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<LunchBox.Models.LunchBoxContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(LunchBox.Models.LunchBoxContext context)
        {
            context.Courses.AddOrUpdate(m => m.Name,
                new Course() { Name = "Cá", Price = 25000 },
                new Course() { Name = "Gà", Price = 20000 },
                new Course() { Name = "Bò", Price = 22000 }
            );
        }
    }
}
