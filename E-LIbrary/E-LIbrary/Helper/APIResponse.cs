namespace E_LIbrary.Helper
{
	public class APIResponse
	{
		public int ResponseCode { get; set; }
		public object Result { get; set; } // Changed from string to object to handle any type of data (e.g., list of books)
		public string Message { get; set; }
	}
}
