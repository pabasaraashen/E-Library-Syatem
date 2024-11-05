namespace E_LIbrary.Models
{
	public class Testimonial
	{
		public int Id { get; set; }
		public int UserId { get; set; }
		public String Name { get; set; }
		public string Content { get; set; }
		public int Rating { get; set; } // Optional, if you want to include ratings
		public DateTime Date { get; set; } = DateTime.Now; // Automatically set to the current date
	}

}
