using E_LIbrary.Data;
using E_LIbrary.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_LIbrary.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TestimonialController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public TestimonialController(ApplicationDbContext context)
		{
			_context = context;
		}

		[HttpPost("AddTestimonial")]
		public async Task<IActionResult> AddTestimonial([FromBody] Testimonial testimonial)
		{

			if (testimonial == null || string.IsNullOrEmpty(testimonial.Content))
			{
				return BadRequest("Invalid testimonial");
			}

			// Save to the database
			_context.Testimonials.Add(testimonial);
			await _context.SaveChangesAsync();

			return Ok("Testimonial added successfully");
		}
		[HttpGet("GetTestimonials")]
		public async Task<IActionResult> GetTestimonials()
		{
			var testimonials = await _context.Testimonials
				.OrderByDescending(t => t.Date) // Order by most recent
				.ToListAsync();

			return Ok(testimonials);
		}


	}
}
