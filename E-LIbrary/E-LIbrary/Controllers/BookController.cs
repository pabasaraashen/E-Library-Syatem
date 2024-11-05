using E_LIbrary.Data;
using E_LIbrary.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;
using E_LIbrary.Helper;
using E_Library.Models;
using Microsoft.EntityFrameworkCore;

namespace E_LIbrary.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class BookController : ControllerBase
	{
		private readonly IWebHostEnvironment _environment;
		private readonly ApplicationDbContext _context;

		public BookController(IWebHostEnvironment environment, ApplicationDbContext context)
		{
			_environment = environment;
			_context = context;
		}

		[HttpPut("UploadImage")]
		public async Task<IActionResult> UploadImage([FromForm] Book book, IFormFile formFile)
		{
			APIResponse response = new APIResponse();
			try
			{
				// Check if the file is present
				if (formFile == null || formFile.Length == 0)
				{
					return BadRequest("No file uploaded.");
				}

				// Additional logging
				Console.WriteLine($"Received book data: {book.Title}, {book.Author}, {book.Isbn}");

				// Save the image in the database as a byte array
				using (MemoryStream stream = new MemoryStream())
				{
					await formFile.CopyToAsync(stream);
					book.BookImage = stream.ToArray(); // Save image as byte array
				}

				// Set the added date if not set
				book.AddedDate = book.AddedDate == default ? DateTime.UtcNow : book.AddedDate;

				// Add the book to the context and save it
				await _context.Books.AddAsync(book);
				await _context.SaveChangesAsync();

               // Save the image to the server as a file
				string filePath = GetFilePath(book.Productcode);
				if (!Directory.Exists(filePath))
				{
					Directory.CreateDirectory(filePath);
				}

				string imagePath = Path.Combine(filePath, book.Productcode + ".png");

				if (System.IO.File.Exists(imagePath))
				{
					System.IO.File.Delete(imagePath);
				}

				using (FileStream stream = new FileStream(imagePath, FileMode.Create))
				{
					await formFile.CopyToAsync(stream);
				}

				response.ResponseCode = 200;
				response.Result = "Book uploaded successfully!";
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error: {ex.Message}"); // Log error
				response.Message = ex.Message;
				return StatusCode(500, response); // Return a 500 error
			}

			return Ok(response);
		}


		[HttpPut("DBUploadImage")]
		public async Task<IActionResult> DBUploadImage([FromForm] Book book, IFormFile formFile)
		{
			APIResponse response = new APIResponse();
			try
			{
				// Check if the file is present
				if (formFile == null || formFile.Length == 0)
				{
					return BadRequest("No file uploaded.");
				}

				// Additional logging
				Console.WriteLine($"Received book data: {book.Title}, {book.Author}, {book.Isbn}");

				// Save the image in the database as a byte array
				using (MemoryStream stream = new MemoryStream())
				{
					await formFile.CopyToAsync(stream);
					book.BookImage = stream.ToArray(); // Save image as byte array
				}

				// Set the added date if not set
				book.AddedDate = book.AddedDate == default ? DateTime.UtcNow : book.AddedDate;

				// Add the book to the context and save it
				await _context.Books.AddAsync(book);
				await _context.SaveChangesAsync();

// Save the image to the server as a file
				//string filePath = GetFilePath(book.Productcode);
				//if (!Directory.Exists(filePath))
				//{
				//	Directory.CreateDirectory(filePath);
				//}

				//string imagePath = Path.Combine(filePath, book.Productcode + ".png");

				//if (System.IO.File.Exists(imagePath))
				//{
				//	System.IO.File.Delete(imagePath);
				//}

				//using (FileStream stream = new FileStream(imagePath, FileMode.Create))
				//{
				//	await formFile.CopyToAsync(stream);
				//}

				response.ResponseCode = 200;
				response.Result = "Book uploaded successfully!";
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error: {ex.Message}"); // Log error
				response.Message = ex.Message;
				return StatusCode(500, response); // Return a 500 error
			}

			return Ok(response);
		}


		[NonAction]
		private string GetFilePath(string productcode)
		{
			return Path.Combine(_environment.WebRootPath, "Upload", "product", productcode);
		}




		[HttpGet("GetImage")]
		public async Task<IActionResult> GetImage(string productcode)
		{
			string Imageurl = string.Empty;
			string hosturl = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
			try
			{
				string Filepath = GetFilePath(productcode);
				string imagepath = Filepath + "\\" + productcode + ".png";
				if (System.IO.File.Exists(imagepath))
				{
					Imageurl = hosturl + "/Upload/product/" + productcode + "/" + productcode + ".png";
				}
				else
				{
					return NotFound();
				}
			}
			catch (Exception ex)
			{
			}
			return Ok(Imageurl);

		}

		[HttpGet("GetDBImageDet")]
		public async Task<IActionResult> GetDBImageDet()
		{
			APIResponse response = new APIResponse();
			try
			{
				var books = await _context.Books
					.Select(book => new
					{	
						BookId= book.BookId,
						Title = book.Title,
						Author = book.Author,
						Catergory = book.Category,
						Price = book.Price,
						Descrition=book.Description,
						ImageBase64 = book.BookImage != null ? Convert.ToBase64String(book.BookImage) : null
					})
					.ToListAsync();

				if (books == null || books.Count == 0)
				{
					response.ResponseCode = 404;
					response.Message = "No books found.";
					return NotFound(response);
				}

				response.ResponseCode = 200;
				response.Result = books;
				return Ok(response);
			}
			catch (Exception ex)
			{
				response.ResponseCode = 500;
				response.Message = ex.Message;
				return StatusCode(500, response);
			}
		}



		[HttpGet("GetDBImage")]
		public async Task<IActionResult> GetDBImage()
		{
			List<string> Imageurl= new  List<string>();
			//string hosturl = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
			try
			{
				var BookImage = this._context.Books;
				if(BookImage!=null )
				{
                    foreach (var item in BookImage)
                    {
						Imageurl.Add(Convert.ToBase64String(item.BookImage));
					}
                }
				else
				{
					return NotFound();
				}
				//string Filepath = GetFilePath(productcode);
				//string imagepath = Filepath + "\\" + productcode + ".png";
				//if (System.IO.File.Exists(imagepath))
				//{
				//	Imageurl = hosturl + "/Upload/product/" + productcode + "/" + productcode + ".png";
				//}
				//else
				//{
				//	return NotFound();
				//}
			}
			catch (Exception ex)
			{
			}
			return Ok(Imageurl);

		}


		[HttpDelete("DeletBook/{id}")]
		public async Task<IActionResult> DeleteBook(int id)
		{
			// Find the book in the database
			var book = await _context.Books.FindAsync(id); // Assuming _context is your DbContext and Books is your DbSet
			if (book == null)
			{
				return NotFound(); // Return 404 if the book is not found
			}

			// Remove the book from the context
			_context.Books.Remove(book);
			await _context.SaveChangesAsync(); // Save changes to the database

			return NoContent(); // Return 204 No Content
		}

		[HttpGet("GetBook/{id}")]
		public async Task<IActionResult> GetBook(int id)
		{
			var book = await _context.Books.FindAsync(id);
			if (book == null)
			{
				return NotFound();
			}
			return Ok(book);
		}

		[HttpPut("Update/{id}")]
		public async Task<IActionResult> UpdateBook(int id, [FromForm] Book updatedBook, IFormFile formFile)
		{
			var book = await _context.Books.FindAsync(id);
			if (book == null)
			{
				return NotFound();
			}

			// Update book fields
			book.Title = updatedBook.Title;
			book.Author = updatedBook.Author;
			book.Isbn = updatedBook.Isbn;
			book.Category = updatedBook.Category;
			book.Language = updatedBook.Language;
			book.PublicationYear = updatedBook.PublicationYear;
			book.Description = updatedBook.Description;

			// If a new image is provided, update it as well
			if (formFile != null && formFile.Length > 0)
			{
				using (var stream = new MemoryStream())
				{
					await formFile.CopyToAsync(stream);
					book.BookImage = stream.ToArray(); // Update the image byte array
				}
			}

			// Save changes to the database
			_context.Books.Update(book);
			await _context.SaveChangesAsync();

			// Return success response
			return Ok(new { message = "Book updated successfully!" });
		}

		[HttpGet("GetBookUrl/{id}")]
		public async Task<IActionResult> GetBookUrl(int id)
		{
			var book = await _context.Books.FindAsync(id);
			if (book == null)
			{
				return NotFound("Book not found");
			}

			// Return the book URL
			return Ok(new { bookUrl = book.Book_Url });
		}






	}
}
