using E_LIbrary.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
	private readonly ApplicationDbContext _context;

	public UsersController(ApplicationDbContext context)
	{
		_context = context;
	}

	// POST: api/Users/UpdatePoints
	[HttpPost("UpdatePoints")]
	public async Task<IActionResult> UpdatePoints([FromBody] UpdatePointsRequest request)
	{
		try
		{
			// Log userId and points for debugging
			Console.WriteLine($"Updating points for User ID: {request.Id} with {request.Points} points");

			// Find the user by their ID
			var user = await _context.Users.FindAsync(request.Id);
			if (user == null)
			{
				Console.WriteLine("User not found");
				return NotFound(new { message = "User not found" });
			}

			// Add points to the user's account
			user.Points += request.Points;

			// Save changes to the database
			var result = await _context.SaveChangesAsync();

			// Check if database was updated
			if (result > 0)
			{
				Console.WriteLine("Points updated successfully");
				return Ok(new { message = "Points updated successfully", totalPoints = user.Points });
			}
			else
			{
				Console.WriteLine("Failed to update points in database");
				return StatusCode(500, "Failed to update points in database");
			}
		}
		catch (Exception ex)
		{
			Console.WriteLine($"Error updating points: {ex.Message}");
			return StatusCode(500, new { message = "An error occurred", error = ex.Message });
		}
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetUser(int id)
	{
		var user = await _context.Users.FindAsync(id);
		if (user == null)
		{
			return NotFound(new { message = "User not found" });
		}

		return Ok(new { points = user.Points });
	}

	// GET: api/Users/Leaderboard

	[HttpGet("Leaderboard")]
	public async Task<IActionResult> GetLeaderboard()
	{
		var topUsers = await _context.Users
			.Where(u => u.Role == "student")
			.OrderByDescending(u => u.Points)
			.Take(10) // Fetch top 10 users
			.Select(u => new
			{
				u.Id,
				u.FullName,
				u.Email,
				u.Points
			})
			.ToListAsync();

		Console.WriteLine($"Top Users: {JsonConvert.SerializeObject(topUsers)}"); // Log API response

		return Ok(topUsers); // Ensure this returns correctly formatted JSON
	}


}




// Request model
public class UpdatePointsRequest
{
	public int Id { get; set; }
	public int Points { get; set; } = 10; // Default points value
}