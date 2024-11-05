using E_Library.Models;

namespace E_LIbrary.Models
{
	public class Wishlist
	{
		public int Id { get; set; } // Unique identifier
		public int UserId { get; set; } // Foreign key for the user
		public int BookId { get; set; } // Foreign key for the book

		// Navigation properties (optional but recommended for Entity Framework)
		public User User { get; set; }
		public Book Book { get; set; }
	}

}
