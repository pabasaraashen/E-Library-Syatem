using E_LIbrary.Data;
using E_LIbrary.Helper;
using E_LIbrary.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
	private readonly ApplicationDbContext _context;

	public AuthController(ApplicationDbContext context)
	{
		_context = context;
	}

	[HttpPost("register")]
	public async Task<IActionResult> Register([FromBody] User user)
	{
		if (_context.Users.Any(u => u.Email == user.Email))
		{
			return BadRequest("Email already in use.");
		}

		// Hash the password before storing it
		user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

		_context.Users.Add(user);
		await _context.SaveChangesAsync();

		return Ok(new { message = "Registration successful." });
	}

	[HttpPost("login")]
	public IActionResult Login([FromBody] LoginRequest loginRequest)
	{
		var user = _context.Users.SingleOrDefault(u => u.Email == loginRequest.Email);

		if (user == null || !BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.PasswordHash))
		{
			return Unauthorized("Invalid email or password.");
		}

		// Include the role in the response
		return Ok(new { message = "Login successful.",userId=user.Id,role = user.Role });
	}

	[HttpPost("GetUserData/{id}")]
	public async Task<IActionResult> GetUserData(int id)
	{
		APIResponse response = new APIResponse();
		try
		{
			var user = await _context.Users
				.Where(u => u.Id == id)
				.Select(u => new
				{
					Id = u.Id,
					FullName = u.FullName,
					Email = u.Email,
					Role = u.Role,
					CreatedAt = u.CreatedAt
				})
				.FirstOrDefaultAsync();

			if (user == null)
			{
				return NotFound(new { message = "User not found." });
			}

			response.ResponseCode = 200;
			response.Result = user;
			return Ok(response);
		}
		catch (Exception ex)
		{
			response.ResponseCode = 500;
			return StatusCode(500, response);
		}
	}

	[HttpPut("UpdateUser/{id}")]
	public async Task<IActionResult> UpdateUser(int id, [FromForm] User userUpdate)
	{
		var user = await _context.Users.FindAsync(id);
		if (user == null)
		{
			return NotFound(new { message = "User not found." });
		}

		// Update user fields
		user.FullName = userUpdate.FullName;
		user.Email = userUpdate.Email;

		if (!string.IsNullOrEmpty(userUpdate.Role))
		{
			user.Role = userUpdate.Role;
		}

		// Check if a new password is provided
		if (!string.IsNullOrEmpty(userUpdate.PasswordHash))
		{
			// Hash the new password before updating
			user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(userUpdate.PasswordHash);
		}

		// Save changes to the database
		_context.Users.Update(user);
		await _context.SaveChangesAsync();

		// Return success response
		return Ok(new { message = "User updated successfully!" });
	}

	[HttpGet("GetAllUsers")]
	public async Task<IActionResult> GetAllUsers()
	{
		var users = await _context.Users
			.Select(u => new
			{
				u.Id,
				u.FullName,
				u.Role
			})
			.ToListAsync();

		var groupedUsers = users
			.GroupBy(u => u.Role)
			.ToDictionary(g => g.Key, g => g.ToList());

		return Ok(groupedUsers);
	}

	[HttpDelete("RemoveUser/{id}")]
	public async Task<IActionResult> RemoveUser(int id)
	{
		var user = await _context.Users.FindAsync(id);
		if (user == null)
		{
			return NotFound(new { message = "User not found." });
		}

		_context.Users.Remove(user);
		await _context.SaveChangesAsync();

		return Ok(new { message = "User removed successfully!" });
	}



}

public class LoginRequest
{
	public string Email { get; set; }
	public string Password { get; set; }
}
