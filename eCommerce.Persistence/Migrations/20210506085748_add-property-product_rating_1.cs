using Microsoft.EntityFrameworkCore.Migrations;

namespace eCommerce.Persistence.Migrations
{
    public partial class addpropertyproduct_rating_1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberStart",
                table: "ProductRating");

            migrationBuilder.AddColumn<int>(
                name: "NumberStar",
                table: "ProductRating",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberStar",
                table: "ProductRating");

            migrationBuilder.AddColumn<int>(
                name: "NumberStart",
                table: "ProductRating",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
