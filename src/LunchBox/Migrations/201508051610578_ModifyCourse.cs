namespace LunchBox.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ModifyCourse : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Courses", "Date");
            DropColumn("dbo.Courses", "AllDiners");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Courses", "AllDiners", c => c.String());
            AddColumn("dbo.Courses", "Date", c => c.DateTime(nullable: false));
        }
    }
}
