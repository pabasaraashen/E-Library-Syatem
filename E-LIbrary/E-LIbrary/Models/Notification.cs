using System;
using System.ComponentModel.DataAnnotations;

namespace E_Library.Models
{
	public class Notification
	{
		[Key]
		public int NotificationId { get; set; }
		public int UserId { get; set; } // The user who will receive the notification
		public string Message { get; set; } // Notification message
		public bool IsRead { get; set; } = false; // To track whether the notification has been read
		public DateTime CreatedAt { get; set; } = DateTime.Now; // Timestamp when notification was created
		public byte[]? BookImage { get; set; }  // Base64 encoded image of the book
		public string Title { get; set; }       // Book title
	}
}
