using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using WebBoobs.Models;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebBoobs.DBProviders
{
	public class MongoProvider
	{
		public IMongoClient _mongoClient;
		public IMongoDatabase _mongoDatabase;
			public IMongoCollection<BlogPost> BlogPosts { get; }

		public MongoProvider(IConfiguration config, IMongoClient _client)
		{
			_mongoClient = _client;
			_mongoDatabase = _mongoClient.GetDatabase("webMongodb");
			BlogPosts = _mongoDatabase.GetCollection<BlogPost>("BlogPosts");
		}

		public async Task CreatePost(BlogPost post)
		{
			await BlogPosts.InsertOneAsync(post);
		}

		public async Task<IEnumerable<BlogPost>> GetPost()
		{
			return await BlogPosts.Find(x => true).ToListAsync();
		}
	}
}
