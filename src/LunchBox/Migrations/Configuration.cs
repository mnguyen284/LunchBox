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
                new Course() { Id = 1, Date = DateTime.Today, Name = "Cá" },
                new Course() { Id = 2, Date = DateTime.Today, Name = "Gà" },
                new Course() { Id = 3, Date = DateTime.Today, Name = "Bò" }
            );
        }
    }
}
