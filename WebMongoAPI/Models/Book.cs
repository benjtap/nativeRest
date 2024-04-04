namespace WebBoobs.Models
{
    public class Book
    {
        public string? Id { get; set; }

        public string? Title { get; set; }

        public string? Author { get; set; }
    }
    public class BlogPost
    {
        public string? Id { get; set; }

        public string? BlogName { get; set; }

        public string? BlogTitle { get; set; }

        public string? BlogDescription { get; set; }

        public string? Tags { get; set; }

    }

    public class BlogPostResponse
    {
        public IEnumerable<BlogPost>? MongoBlogPost { get; set; }
       
    }
}
