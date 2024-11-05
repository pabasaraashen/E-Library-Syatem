using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace E_LIbrary.Migrations
{
    /// <inheritdoc />
    public partial class addborrowetable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Author",
                table: "BorrowBooks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<byte[]>(
                name: "BookImage",
                table: "BorrowBooks",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "BorrowBooks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Author",
                table: "BorrowBooks");

            migrationBuilder.DropColumn(
                name: "BookImage",
                table: "BorrowBooks");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "BorrowBooks");
        }
    }
}
