using Microsoft.AspNetCore.Mvc;
using WebBoobs.DBProviders;
using WebBoobs.Models;

namespace WebBoobs.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WebBoobsController : ControllerBase
    {
        private readonly ILogger logger;

        private static readonly string[] Summaries = new[]
        {
                "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
            };

        MongoProvider _mongo;
        public WebBoobsController(MongoProvider mongo, ILogger<WebBoobsController> logger)
        {
            _mongo = mongo;
            this.logger = logger;
        }
        

        [HttpPost]
        public async Task<IActionResult> CreateDiscountCoupon(BlogPost post)
        {
            

            
            post.BlogTitle = "Connecting to Dockerized mongodb from Asp.net Core";
            await _mongo.CreatePost(post);
            return Ok();
        }

        [HttpGet(Name = "GetWebBoobs")]
        public async Task<IActionResult> GetBlogPost()
        {
            var response = new BlogPostResponse();

            response.MongoBlogPost = await _mongo.GetPost();

            return Ok(response);
        }

        //[HttpGet(Name = "GetWeatherForecast")]
        //public IEnumerable<WeatherForecast> Get()
        //{
        //    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        //    {
        //        Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
        //        TemperatureC = Random.Shared.Next(-20, 55),
        //        Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        //    })
        //    .ToArray();
        //}
    }

}




        //        private readonly IBookRepository books;
        //        private readonly ILogger logger;

        //        public WeatherForecastController(IBookRepository books, ILogger<WeatherForecastController> logger)
        //        {
        //            this.books = books;
        //            this.logger = logger;
        //        }

        //        [HttpGet]
        //        public IEnumerable<Book> GetAll()
        //        {
        //            return this.books.GetAll();
        //        }

        //        [HttpGet("{id}", Name = "GetBook")]
        //        public IActionResult GetById(string id)
        //        {
        //            var book = this.books.Find(id);
        //            if (book == null)
        //            {
        //                return this.NotFound();
        //            }

        //            return this.Ok(book);
        //        }

        //        [HttpPost]
        //        public IActionResult Create([FromBody] Book book)
        //        {
        //            if (book == null)
        //            {
        //                return this.BadRequest();
        //            }

        //            this.books.Add(book);

        //            this.logger.LogTrace("Added {0} by {1}", book.Title, book.Author);

        //            return this.CreatedAtRoute("GetBook", new { id = book.Id }, book);
        //        }

        //        [HttpPut("{id}")]
        //        public IActionResult Update(string id, [FromBody] Book book)
        //        {
        //            if (book.Id != id)
        //            {
        //                return this.BadRequest();
        //            }

        //            var existingBook = this.books.Find(id);
        //            if (existingBook == null)
        //            {
        //                return this.NotFound();
        //            }

        //            this.books.Update(book);

        //            this.logger.LogTrace(
        //                "Updated {0} by {1} to {2} by {3}",
        //                existingBook.Title,
        //                existingBook.Author,
        //                book.Title,
        //                book.Author);

        //            return new NoContentResult();
        //        }

        //        [HttpDelete("{id}")]
        //        public NoContentResult Delete(string id)
        //        {
        //            this.books.Remove(id);
        //            return new NoContentResult();
        //        }

        //    }
        //}

       

