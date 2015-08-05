namespace LunchBox.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Price : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Courses", "Price", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Courses", "Price");
        }
    }
}
