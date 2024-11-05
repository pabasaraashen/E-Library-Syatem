using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using E_LIbrary.Models;

namespace E_Library.Models
{
	public class Book
	{
		[Key]
		public int BookId { get; set; }

		[StringLength(50)]
		[Unicode(false)]
		public string? Productcode { get; set; }

		[Column("productimage", TypeName = "image")]
		public byte[]? BookImage { get; set; }

		// New fields added
		[Required]
		[StringLength(255)]
		public string Title { get; set; }

		[Required]
		public decimal Price { get; set; }

		[StringLength(100)]
		public string Author { get; set; }

		[StringLength(13)] // Assuming ISBN-13
		public string Isbn { get; set; }

		[StringLength(100)]
		public string Category { get; set; }

		[StringLength(50)]
		public string Language { get; set; }

		public int? PublicationYear { get; set; }

		public string? Book_Url{ get; set; }	

		[StringLength(2000)] // Assuming a longer description
		public string Description { get; set; }

		public DateTime AddedDate { get; set; } = DateTime.UtcNow;

		// Collection of BorrowBooks related to this book
		//public ICollection<BorrowBook> BorrowBooks { get; set; }  // One-to-many relationship
	}
}
