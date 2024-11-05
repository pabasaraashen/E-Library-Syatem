using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace E_LIbrary.Migrations
{
    /// <inheritdoc />
    public partial class addbookurl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Book_Url",
                table: "Books",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Book_Url",
                table: "Books");
        }
    }
}
