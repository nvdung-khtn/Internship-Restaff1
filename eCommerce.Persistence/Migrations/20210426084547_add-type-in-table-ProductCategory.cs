using Microsoft.EntityFrameworkCore.Migrations;

namespace eCommerce.Persistence.Migrations
{
    public partial class addtypeintableProductCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "C1Lable",
                table: "ProductCategory",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "C1Options",
                table: "ProductCategory",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "C2Lable",
                table: "ProductCategory",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "C2Options",
                table: "ProductCategory",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "C3Lable",
                table: "ProductCategory",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "C3Options",
                table: "ProductCategory",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "C4Lable",
                table: "ProductCategory",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "C4Options",
                table: "ProductCategory",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "C5Lable",
                table: "ProductCategory",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "C5Options",
                table: "ProductCategory",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "C1Lable",
                table: "ProductCategory");

            migrationBuilder.DropColumn(
                name: "C1Options",
                table: "ProductCategory");

            migrationBuilder.DropColumn(
                name: "C2Lable",
                table: "ProductCategory");

            migrationBuilder.DropColumn(
                name: "C2Options",
                table: "ProductCategory");

            migrationBuilder.DropColumn(
                name: "C3Lable",
                table: "ProductCategory");

            migrationBuilder.DropColumn(
                name: "C3Options",
                table: "ProductCategory");

            migrationBuilder.DropColumn(
                name: "C4Lable",
                table: "ProductCategory");

            migrationBuilder.DropColumn(
                name: "C4Options",
                table: "ProductCategory");

            migrationBuilder.DropColumn(
                name: "C5Lable",
                table: "ProductCategory");

            migrationBuilder.DropColumn(
                name: "C5Options",
                table: "ProductCategory");
        }
    }
}
