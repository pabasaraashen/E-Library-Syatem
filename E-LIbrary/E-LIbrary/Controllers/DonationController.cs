using Microsoft.AspNetCore.Mvc;
using E_LIbrary.Models;
using E_LIbrary.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace E_LIbrary.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class DonationController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public DonationController(ApplicationDbContext context)
		{
			_context = context;
		}
		// POST: api/Donation/CreateDonation
		[HttpPost("CreateDonation")]
		public async Task<IActionResult> CreateDonation([FromForm] Donation donation, IFormFile formFile)
		{
			try
			{
				if (formFile == null || formFile.Length == 0)
				{
					return BadRequest("No file uploaded");
				}

				using (MemoryStream stream = new MemoryStream())
				{
					await formFile.CopyToAsync(stream);
					donation.BookImage = stream.ToArray();
				}

				donation.SubmissionDate = donation.SubmissionDate == default ? DateTime.UtcNow : donation.SubmissionDate;
				donation.Status = "Pending";

				await _context.Donations.AddAsync(donation);
				await _context.SaveChangesAsync();

				return Ok(new { message = "Donation submitted successfully!" });
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Error: {ex.Message}");
			}
		}

		// GET: api/Donation/GetPendingDonations
		[HttpGet("GetPendingDonations")]
		public async Task<IActionResult> GetPendingDonations()
		{
			var pendingDonations = await _context.Donations
				.Where(d => d.Status == "Pending")
				.ToListAsync();
			return Ok(pendingDonations);
		}

		// PUT: api/Donation/UpdateDonationStatus/{id}
		[HttpPut("UpdateDonationStatus/{id}")]
		public async Task<IActionResult> UpdateDonationStatus(int id, [FromBody] DonationStatusUpdateRequest request)
		{
			var donation = await _context.Donations.FindAsync(id);

			if (donation == null)
			{
				return NotFound("Donation not found.");
			}

			// Update status based on admin input
			donation.Status = request.Status;
			await _context.SaveChangesAsync();

			return Ok(donation);
		}
		// GET: api/Donation/GetApprovedDonations
		[HttpGet("GetApprovedDonations")]
		public async Task<IActionResult> GetApprovedDonations()
		{
			var approvedDonations = await _context.Donations
				.Where(d => d.Status == "Approved")
				.ToListAsync();
			return Ok(approvedDonations);
		}
		// Add this method to your DonationController
		[HttpDelete("DeleteDonation/{id}")]
		public async Task<IActionResult> DeleteDonation(int id)
		{
			var donation = await _context.Donations.FindAsync(id);

			if (donation == null)
			{
				return NotFound("Donation not found.");
			}

			_context.Donations.Remove(donation);
			await _context.SaveChangesAsync();

			return Ok(new { message = "Donation removed successfully!" });
		}
		// GET: api/Donation/GetDonation/{id}
		[HttpGet("GetDonation/{id}")]
		public async Task<IActionResult> GetDonation(int id)
		{
			var donation = await _context.Donations.FindAsync(id);

			if (donation == null)
			{
				return NotFound("Donation not found.");
			}

			return Ok(donation);
		}
		
	}

	public class DonationStatusUpdateRequest
	{
		public string Status { get; set; }
	}
}
