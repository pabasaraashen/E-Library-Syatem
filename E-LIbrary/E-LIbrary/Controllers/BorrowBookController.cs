using Microsoft.AspNetCore.Mvc;
using E_LIbrary.Data;
using E_Library.Models;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using E_LIbrary.Models;

namespace E_LIbrary.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class BorrowBookController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public BorrowBookController(ApplicationDbContext context)
		{
			_context = context;
		}

		// Request a book
		[HttpPost("RequestBook")]
		public async Task<IActionResult> RequestBook([FromBody] BorrowBook borrowBook)
		{
			if (borrowBook == null)
			{
				return BadRequest("Invalid request data.");
			}

			try
			{
				// Check if the book has already been requested by the same user and the status is still pending
				var existingRequest = _context.BorrowBooks
					.FirstOrDefault(b => b.UserId == borrowBook.UserId && b.DonationId == borrowBook.DonationId && b.Status == "Pending");

				// If the user has already requested the book, return a conflict
				if (existingRequest != null)
				{
					return Conflict("This book has already been requested.");
				}

				// Set BorrowedDate to today and ReturnDate to 14 days after today
				
				borrowBook.BorrowedDate = DateTime.Today;
				borrowBook.ReturnDate = DateTime.Today.AddDays(14);
				borrowBook.Status = "Pending";

				// Add the BorrowBook record to the database
				_context.BorrowBooks.Add(borrowBook);
				await _context.SaveChangesAsync();

				return Ok("Book request successfully saved.");
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Internal server error: {ex.Message}");
			}
		}

		// Approve a book request
		[HttpPost("ApproveRequest/{id}")]
		public async Task<IActionResult> ApproveRequest(int id)
		{
			var borrowBook = await _context.BorrowBooks.FindAsync(id);
			if (borrowBook == null)
			{
				return NotFound("Borrow request not found.");
			}

			borrowBook.Status = "Approved";
			await _context.SaveChangesAsync();

			// Create notification for the user with image and title
			var notification = new Notification
			{
				UserId = borrowBook.UserId,
				Message = $"Your request for the book '{borrowBook.Title}' has been approved.",
				BookImage = borrowBook.BookImage,  // Include book image
				Title = borrowBook.Title           // Include book title
			};
			_context.Notifications.Add(notification);
			await _context.SaveChangesAsync();

			return Ok("Book request approved successfully.");
		}

		// Reject a book request
		[HttpPost("RejectRequest/{id}")]
		public async Task<IActionResult> RejectRequest(int id)
		{
			var borrowBook = await _context.BorrowBooks.FindAsync(id);
			if (borrowBook == null)
			{
				return NotFound("Borrow request not found.");
			}

			borrowBook.Status = "Rejected";
			await _context.SaveChangesAsync();

			// Create notification for the user with image and title
			var notification = new Notification
			{
				UserId = borrowBook.UserId,
				Message = $"Your request for the book '{borrowBook.Title}' has been rejected.",
				BookImage = borrowBook.BookImage,  // Include book image
				Title = borrowBook.Title           // Include book title
			};
			_context.Notifications.Add(notification);
			await _context.SaveChangesAsync();

			return Ok("Book request rejected successfully.");
		}

		// Get all pending book requests
		[HttpGet("GetPendingRequests")]
		public async Task<IActionResult> GetPendingRequests()
		{
			try
			{
				// Retrieve only the columns from BorrowBooks that you need, without merging related tables.
				var pendingRequests = await _context.BorrowBooks
					.Where(b => b.Status == "Pending")
					.Select(b => new
					{
						b.BorrowedId,         // BorrowedId of the request
						b.UserId,             // UserId who requested the book
						b.DonationId,         // DonationId (foreign key, but no need to include details)
						b.BorrowedDate,       // The date the book was borrowed
						b.ReturnDate,         // The date the book should be returned
						b.Status,              // Status of the request (Pending)
						b.Title,
						b.Author,
						b.BookImage
					})
					.ToListAsync();

				return Ok(pendingRequests);
			}


			catch (Exception ex)
			{
				return StatusCode(500, $"Internal server error: {ex.Message}");
			}
		}
		[HttpGet("GetBorrowedBooks/{userId}")]
		public async Task<IActionResult> GetBorrowedBooks(int userId)
		{
			try
			{
				// Retrieve books borrowed by the user that are approved
				var borrowedBooks = await _context.BorrowBooks
					.Where(b => b.UserId == userId && b.Status == "Approved")
					.Select(b => new
					{
						b.BorrowedId,         // Borrowed ID (unique for each borrow entry)
						b.BorrowedDate,       // The date the book was borrowed
						b.ReturnDate,         // The return date
						b.Title,              // The title of the book
						b.Author,             // The author of the book
						BookImageBase64 = b.BookImage != null ? Convert.ToBase64String(b.BookImage) : null // Check for null before converting
					})
					.ToListAsync();

				return Ok(borrowedBooks);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Internal server error: {ex.Message}");
			}
		}



	}
}

