using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_LIbrary.Models
{
	public class Donation
	{
		[Key]
		public int DonationId { get; set; }

		public int UserId { get; set; }  // Foreign Key to User who donated

		[Required]
		[MaxLength(255)]
		public string BookTitle { get; set; }

		[Required]
		[MaxLength(255)]
		public string Author { get; set; }

		[Required]
		[MaxLength(50)]
		public string Category { get; set; }

		[Column("Bookimage", TypeName = "image")]
		public byte[]? BookImage { get; set; }

		[Required]
		[MaxLength(50)]
		public string Status { get; set; } = "Pending";  // Default value is "Pending"

		public DateTime SubmissionDate { get; set; } = DateTime.Now;

	}
}
