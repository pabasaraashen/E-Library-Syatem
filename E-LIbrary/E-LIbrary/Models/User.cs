using System.ComponentModel.DataAnnotations;

namespace E_LIbrary.Models
{
	public class User
	{
		[Key]
		public int Id { get; set; }
		public string FullName { get; set; }
		public string Email { get; set; }
		public string PasswordHash { get; set; }
		public string Role { get; set; }
		public DateTime CreatedAt { get; set; } = DateTime.Now;

		[Required]
		[Range(0, int.MaxValue, ErrorMessage = "Points must be a positive value.")]
		public int Points { get; set; } = 0; // Initialize points to 0


		// Collection of BorrowBooks related to this book
		//public ICollection<BorrowBook> BorrowBooks { get; set; }  // One-to-many relationship
	}
}
 