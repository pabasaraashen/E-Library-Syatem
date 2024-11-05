using Microsoft.EntityFrameworkCore;
using E_LIbrary.Models;
using E_Library.Models;
using E_LIbrary.Models;

namespace E_LIbrary.Data
{
	public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

		public DbSet<User> Users { get; set; }
		public DbSet<Book> Books { get; set; }
		public DbSet<Testimonial> Testimonials { get; set; }
		public DbSet<Wishlist> Wishlists { get; set; }
		public DbSet<Donation> Donations { get; set; }
		public DbSet<BorrowBook> BorrowBooks { get; set; } // Add BorrowBook DbSet
		public DbSet<Notification> Notifications { get; set; }


	}
}
