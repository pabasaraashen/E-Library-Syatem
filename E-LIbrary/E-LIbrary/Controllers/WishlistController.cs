using E_LIbrary.Data;
using E_LIbrary.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace E_LIbrary.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class WishlistController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public WishlistController(ApplicationDbContext context)
		{
			_context = context;
		}

		// POST api/wishlist
		[HttpPost]
		public async Task<IActionResult> AddToWishlist([FromBody] WishlistDto request)
		{
			// Check if the book is already in the user's wishlist
			var existingWishlist = await _context.Wishlists
				.FirstOrDefaultAsync(w => w.UserId == request.UserId && w.BookId == request.BookId);

			if (existingWishlist != null)
			{
				return BadRequest("Book already in wishlist.");
			}

			var wishlist = new Wishlist
			{
				UserId = request.UserId,
				BookId = request.BookId
			};

			_context.Wishlists.Add(wishlist);
			await _context.SaveChangesAsync();

			return Ok(wishlist);
		}
		// GET api/wishlist/{userId}
		[HttpGet("{userId}")]
		public async Task<IActionResult> GetWishlist(int userId)
		{
			var wishlist = await _context.Wishlists
				.Where(w => w.UserId == userId)
				.Include(w => w.Book)  // Include the book details
				.ToListAsync();

			if (wishlist == null || wishlist.Count == 0)
			{
				return NotFound("Wishlist is empty.");
			}

			return Ok(wishlist);
		}

		// DELETE api/wishlist/{userId}/{bookId}
		[HttpDelete("{userId}/{bookId}")]
		public async Task<IActionResult> RemoveFromWishlist(int userId, int bookId)
		{
			var wishlistItem = await _context.Wishlists
				.FirstOrDefaultAsync(w => w.UserId == userId && w.BookId == bookId);

			if (wishlistItem == null)
			{
				return NotFound("Book not found in wishlist.");
			}

			_context.Wishlists.Remove(wishlistItem);
			await _context.SaveChangesAsync();

			return Ok("Book removed from wishlist.");
		}


	}

	// DTO for wishlist requests
	public class WishlistDto
	{
		public int UserId { get; set; }
		public int BookId { get; set; }
	}

}
