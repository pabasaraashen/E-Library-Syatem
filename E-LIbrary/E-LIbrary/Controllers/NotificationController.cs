using Microsoft.AspNetCore.Mvc;
using E_LIbrary.Data;
using E_Library.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace E_LIbrary.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class NotificationController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public NotificationController(ApplicationDbContext context)
		{
			_context = context;
		}

		// Get notifications for a specific user
		[HttpGet("GetUserNotifications/{userId}")]
		public async Task<IActionResult> GetUserNotifications(int userId)
		{
			var notifications = await _context.Notifications
				.Where(n => n.UserId == userId && !n.IsRead) // Fetch unread notifications
				.OrderByDescending(n => n.CreatedAt)
				.ToListAsync();

			return Ok(notifications);
		}

		// Mark notification as read
		[HttpPost("MarkNotificationAsRead/{id}")]
		public async Task<IActionResult> MarkNotificationAsRead(int id)
		{
			var notification = await _context.Notifications.FindAsync(id);
			if (notification == null)
			{
				return NotFound("Notification not found.");
			}

			notification.IsRead = true;
			await _context.SaveChangesAsync();

			return Ok("Notification marked as read.");
		}
	}
}
