using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using Webhttp.Models;

using MongoDB.Bson;
using System.Collections.Generic;
using Microsoft.Extensions.Hosting;

namespace Webhttp.DBProviders
{
	public class MongoProvider
	{
		public IMongoClient _mongoClient;
		public IMongoDatabase _mongoDatabase;
	   public IMongoCollection<contactsPostMongo> contactsPostsMon { get; }
       public IMongoCollection<groupsPostMongo> groupsPostPostsMon { get; }
        public IMongoCollection<groupcontactsPostMongo> groupcontactsPostMon { get; }

        public IMongoCollection<AudioPostMongo> AudioPostMon { get; }

        public IMongoCollection<AudiogroupMongo> AudiogroupPostMon { get; }

        public MongoProvider(IConfiguration config, IMongoClient _client)
		{
			_mongoClient = _client;
			_mongoDatabase = _mongoClient.GetDatabase("contact_group");
            contactsPostsMon = _mongoDatabase.GetCollection<contactsPostMongo>("contacts");
            groupsPostPostsMon = _mongoDatabase.GetCollection<groupsPostMongo>("groups");
            groupcontactsPostMon = _mongoDatabase.GetCollection<groupcontactsPostMongo>("groupcontacts");
            AudioPostMon = _mongoDatabase.GetCollection<AudioPostMongo>("Audio");
            AudiogroupPostMon = _mongoDatabase.GetCollection<AudiogroupMongo>("Audiogroup");
        }

        


        public async Task bulkcontacts(List<createcontactsPost> post)
        {
			List<contactsPostMongo> lst = new List<contactsPostMongo>();


            foreach (var contact in post)
			{
                contactsPostMongo postM = new contactsPostMongo
                {
                    name = contact.name,
                    phone = contact.phone

                };
                lst.Add(postM);
            }


			await contactsPostsMon.InsertManyAsync(lst);
        }


        public async Task bulkdeletegroupcontacts(createcontactsgroupPost post)
        {
      

            var Filter = Builders<groupcontactsPostMongo>.Filter
                                .And(
                                    Builders<groupcontactsPostMongo>.Filter.Eq(dp => dp.Groupid, post.id)
                                    );

            var personsDeleteResult = await groupcontactsPostMon.DeleteManyAsync(Filter);
           
         

        }

      

        public async Task<AudiogroupMongo> getAudiobyidPost(getAudiobyidReq post)
        {
            var query = Builders<AudiogroupMongo >.Filter.Where(r => r.groupid.ToString() == post.groupid);

            var myres = await AudiogroupPostMon.FindAsync(query);

           
           var reponse= myres.FirstOrDefault() ;
            return reponse;
        }


        public async Task bulkgroupcontacts(createcontactsgroupPost post)
        {
            List<contactsPostMongo> lst  = await contactsPostsMon.Find(x => true).ToListAsync();

            List<groupcontactsPostMongo> lstgrpcontacts = new List<groupcontactsPostMongo>(); 

            foreach (var contact in lst)
            {
                groupcontactsPostMongo postM = new groupcontactsPostMongo
                {
                    ContactId = contact.id.ToString(),
                    Groupid = post.id,
                    name = contact.name,
                    phone = contact.phone,  

                };
                lstgrpcontacts.Add(postM);
            }


            await groupcontactsPostMon.InsertManyAsync(lstgrpcontacts);
        }

      

        


        public async Task CreatecontactsPost(createcontactsPost post)
		{
			contactsPostMongo postM = new contactsPostMongo
			{
				name = post.name,
				phone = post.phone

			};
			
			await contactsPostsMon.InsertOneAsync(postM);
		}
      
        public async Task CreategroupsPost(creategroupsPost post)
        {
            groupsPostMongo postM = new groupsPostMongo
            {
                name = post.name
  
            };

            await groupsPostPostsMon.InsertOneAsync(postM);
        }

        public async Task createAudiogroup(createAudiogroupPost post)
        {

            var query = Builders<AudiogroupMongo>.Filter.Where(r => r.groupid.ToString() == post.groupid);
            var DeleteResult = await AudiogroupPostMon.DeleteOneAsync(query);

            AudiogroupMongo postM = new AudiogroupMongo
            {
                groupid = post.groupid,
                audioid = post.audioid

            };

            await AudiogroupPostMon.InsertOneAsync(postM);
        }

        public async Task deleteAudiorecordPost(deleteAudioPost post)
        {
            
            try
            {
                var query = Builders<AudioPostMongo>.Filter.Where(r => r.id.ToString()== post.id);

                var DeleteResult = await AudioPostMon.DeleteOneAsync(query);
            }
            catch (Exception ex)
            {

                string msg = ex.Message;
            }             

          

        }


        public async Task CreateAudio(createAudio post)
        {
            AudioPostMongo postM = new AudioPostMongo
            {
                name = post.name,
                filename = post.filename

            };
            await AudioPostMon.InsertOneAsync(postM);
        }

        public async Task<IEnumerable<AudioPost>> GetAudio()
        {
            IEnumerable<AudioPostMongo> res = await AudioPostMon.Find(x => true).ToListAsync();

            List<AudioPost> myres = new List<AudioPost>();
            foreach (var item in res)
            {
                AudioPost myAudio = new AudioPost
                {
                    id = item.id.ToString(),
                    name = item.name,
                    filename = item.filename

                };

                myres.Add(myAudio);
            }
            return myres;

        }

        public async Task<IEnumerable<contactsPost>> GetcontactsPost()
		{
            IEnumerable < contactsPostMongo > res = await contactsPostsMon.Find(x => true).ToListAsync();

            List<contactsPost> myres = new List<contactsPost>();
            foreach (var item in res)
            {
				contactsPost mycontacts = new contactsPost
				{
					id = item.id.ToString(),
					name = item.name,
					phone = item.phone

				};
				
                myres.Add(mycontacts);
            }
            return myres;

        }

        public async Task<IEnumerable<groupcontactsPost>> getgroupcontacts(createcontactsgroupPost post)
        {

            List<groupcontactsPost> myres = new List<groupcontactsPost>();
            try
            {
                var res = await groupcontactsPostMon.Find(s => s.Groupid == post.id).ToListAsync();
                foreach (var item in res)
                {
                    groupcontactsPost mygroupcontacts = new groupcontactsPost
                    {
                        id = item.id.ToString(),
                        name = item.name,
                        phone = item.phone

                    };

                    myres.Add(mygroupcontacts);
                }

            }
            catch (Exception ex)
            {

                string msg = ex.Message;
            }

            return myres;
        }

        public async Task<IEnumerable<groupsPost>> getgroupsPost()
        {
            IEnumerable<groupsPostMongo> res = await groupsPostPostsMon.Find(x => true).ToListAsync();

            List<groupsPost> myres = new List<groupsPost>();
            foreach (var item in res)
            {
                groupsPost mygroup = new groupsPost
                {
                    id = item.id.ToString(),
                    name= item.name

                };

                myres.Add(mygroup);
            }
            return myres;

        }


    }
}
