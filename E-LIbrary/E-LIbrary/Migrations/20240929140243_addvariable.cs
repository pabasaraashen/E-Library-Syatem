using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace E_LIbrary.Migrations
{
    /// <inheritdoc />
    public partial class addvariable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DonationId",
                table: "BorrowBooks",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DonationId",
                table: "BorrowBooks");
        }
    }
}
