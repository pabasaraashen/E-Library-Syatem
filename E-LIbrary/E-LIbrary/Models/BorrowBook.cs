using E_Library.Models;
using System.ComponentModel.DataAnnotations;

namespace E_LIbrary.Models
{
	public class BorrowBook
	{
		[Key]
		public int BorrowedId { get; set; } // Primary key
		public int DonationId { get; set; }
		public int UserId { get; set; } // Foreign key to User table
		public int BookId { get; set; } // Foreign key to Book table
		public DateTime BorrowedDate { get; set; } // The date when the book is borrowed (today's date)
		public DateTime ReturnDate { get; set; } // The date when the book should be returned (14 days after borrowed date)
		public string Status { get; set; } // Status of the borrowing, e.g., "Pending"
		public String Title { get; set; }
		public string Author { get; set; }
		public byte[]? BookImage { get; set; }

		// Navigation property to the Book table
		//public Book Book { get; set; }  // This allows you to access the related book entity

		// Navigation property to the User table
		//public User User { get; set; }  // This allows you to access the related user entity
	}
}
