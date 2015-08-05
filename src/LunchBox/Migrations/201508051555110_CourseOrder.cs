namespace LunchBox.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CourseOrder : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CourseOrders",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Date = c.DateTime(nullable: false),
                        Name = c.String(),
                        Price = c.Double(nullable: false),
                        AllDiners = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.CourseOrders");
        }
    }
}
