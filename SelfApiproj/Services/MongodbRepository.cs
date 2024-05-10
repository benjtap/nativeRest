using Amazon.Runtime.Internal.Transform;
using Microsoft.Extensions.Hosting;
using MongoDB.Driver;
using SelfApiproj.settings;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Webhttp.Models;

namespace SelfApiproj.Repository
{
    public class MongoRepository : IMongoRepository
    {
        private  IMongoCollection<registerPostMongo> registerPostsMon;
        public  IMongoCollection<contactsPostMongo> contactsPostsMon { get; }
        public IMongoCollection<groupsPostMongo> groupsPostPostsMon { get; }

        public IMongoCollection<AudioPostMongo> AudioPostMon { get; }

        public IMongoCollection<groupcontactsPostMongo> groupcontactsPostMon { get; }

        public IMongoCollection<AudiogroupMongo> AudiogroupPostMon { get; }

        public IMongoCollection<TiminggroupMongo> TiminggroupPostMon { get; }
        public MongoRepository(IMongoDbSettings settings) {

            var database = new MongoClient(settings.ConnectionString).GetDatabase(settings.DatabaseName);
            registerPostsMon = database.GetCollection<registerPostMongo>("user");
            contactsPostsMon = database.GetCollection<contactsPostMongo>("contacts");
            groupsPostPostsMon = database.GetCollection<groupsPostMongo>("groups");
            AudioPostMon = database.GetCollection<AudioPostMongo>("Audio");
            groupcontactsPostMon = database.GetCollection<groupcontactsPostMongo>("groupcontacts");
            AudiogroupPostMon = database.GetCollection<AudiogroupMongo>("Audiogroup");
            TiminggroupPostMon = database.GetCollection<TiminggroupMongo>("Timinggroup");

        }

        public async Task<userPost> Login(loginPost post)
        {
            var Builder = Builders<registerPostMongo>.Filter;
            var query = Builder.Where(r => r.username == post.userName) &
                               Builder.Where(r => r.password == post.password);


            var myres = await registerPostsMon.FindAsync(query);


            var response = myres.FirstOrDefault();

            if (response != null)
            {
                userPost myuser = new userPost
                {
                    id = response.id.ToString(),
                    username = response.username

                };



                return myuser;
            }
            else
                return null;


        }


        public async Task createregisterPost(createregisterPost post)
        {
            registerPostMongo postM = new registerPostMongo
            {
                fullname = post.fullname,
                email = post.email,
                password = post.password,
                username = post.username

            };

            await registerPostsMon.InsertOneAsync(postM);
        }

        public async Task<IEnumerable<contactsPost>> GetcontactsPost(string id)
        {
            var query = Builders<contactsPostMongo>.Filter.Where(r => r.uid.ToString() == id);

            var myres = await contactsPostsMon.FindAsync(query);

            var res = myres.ToList();

            List<contactsPost> mylist = new List<contactsPost>();
            foreach (var item in res)
            {
                contactsPost mycontacts = new contactsPost
                {
                    id = item.id.ToString(),
                    uid = item.uid,
                    name = item.name,
                    phone = item.phone

                };

                mylist.Add(mycontacts);
            }
            return mylist;

        }

        public async Task<IEnumerable<groupsPost>> getgroupsPost(string id)
        {

            var query = Builders<groupsPostMongo>.Filter.Where(r => r.uid.ToString() == id);

            var myres = await groupsPostPostsMon.FindAsync(query);

            var res = myres.ToList();


            List<groupsPost> mylist = new List<groupsPost>();
            foreach (var item in res)
            {
                groupsPost mygroup = new groupsPost
                {
                    id = item.id.ToString(),
                    name = item.name

                };

                mylist.Add(mygroup);
            }
            return mylist;

        }

        public async Task<IEnumerable<AudioPost>> GetAudio(string id)
        {
            var query = Builders<AudioPostMongo>.Filter.Where(r => r.uid.ToString() == id);

            var myres = await AudioPostMon.FindAsync(query);

            var res = myres.ToList();



            List<AudioPost> mylist = new List<AudioPost>();
            foreach (var item in res)
            {
                AudioPost myAudio = new AudioPost
                {
                    id = item.id.ToString(),
                    name = item.name,
                    filename = item.filename

                };

                mylist.Add(myAudio);
            }
            return mylist;

        }

        static public Dictionary<string, HashSet<getTiminggroup>> get_dic_Hashet(
       IEnumerable<TiminggroupMongo> E_row, Dictionary<string, string> dicgroup)
        {

            Dictionary<string, HashSet<getTiminggroup>> Dic = new Dictionary<string, HashSet<getTiminggroup>>();

            foreach (var item in E_row)
            {
                HashSet<getTiminggroup> lst_val = null;
                DateTime datetimeday = new DateTime(1980, 1, 1);
               DateTime.TryParse(item.date, out datetimeday);

                string day = datetimeday.ToString("yyyy-MM-dd");
                 bool found = Dic.TryGetValue(day, out lst_val);

                if (found == false)
                {
                    lst_val = new HashSet<getTiminggroup>();
                    Dic.Add(day, lst_val);
                }
                string mygroup="";
                dicgroup.TryGetValue(item.groupid, out mygroup);

                getTiminggroup myclass = new getTiminggroup
                {

                    id = item.id.ToString(),
                    day = datetimeday.ToString("yyyy-MM-dd"),
                    groupname = mygroup,
                    date = datetimeday.ToShortTimeString(),
                    height= 50
                };

                lst_val.Add(myclass);
            }

            return (Dic);
        }

        public Dictionary<string, string> get_dicgroup(List<groupsPostMongo> lst)
        {
            Dictionary<string, string> dicgroup = new Dictionary<string, string>();

            foreach (var item in lst)
            {

                string id = item.id.ToString();
                string name = item.name;
                dicgroup.Add(id, name);
            }
           return dicgroup;
        }


        public async  Task<Dictionary<string, HashSet<getTiminggroup>>> getgrouptiming(string id)
        {
            Dictionary<string, HashSet<getTiminggroup>> mydic = new Dictionary<string, HashSet<getTiminggroup>>();
            try
            {
               
                var filter1 =  Builders<TiminggroupMongo>.Filter.Where(r => r.uid.ToString() == id);
               
                var myres = await TiminggroupPostMon.FindAsync(filter1);

                IEnumerable<TiminggroupMongo> res = myres.ToList();


                var query = Builders<groupsPostMongo>.Filter.Where(r => r.uid.ToString() == id);

                var myres1 = await groupsPostPostsMon.FindAsync(query);

                List<groupsPostMongo> res1 = myres1.ToList();

                Dictionary<string, string> mygroupdic = get_dicgroup(res1);

                mydic = get_dic_Hashet(res, mygroupdic);

                //Dictionary<string, HashSet<getTiminggroup>> Dic = new Dictionary<string, HashSet<getTiminggroup>>();
                //foreach (KeyValuePair<string,HashSet<getTiminggroup>> pair in mydic)
                //{
                //    string day = pair.Key;
                //    HashSet<getTiminggroup> hs = pair.Value;

                //    Dic.Add(day, hs);

                //} 



            }
            catch (Exception ex)
            {

                string msg = ex.Message;
            }

            return mydic;



        }

        

        public async Task<IEnumerable<groupcontactsPost>> getgroupcontacts(createcontactsgroupPost post, string id)
        {

            List<groupcontactsPost> mylist = new List<groupcontactsPost>();
            try
            {
                var filter = Builders<groupcontactsPostMongo>.Filter.Where(r => r.Groupid.ToString() == post.id);
                filter = filter & Builders<groupcontactsPostMongo>.Filter.Where(r => r.uid.ToString() == id);

                var res = await groupcontactsPostMon.FindAsync(filter); ;



                var myres = await res.ToListAsync();

                foreach (var item in myres)
                {
                    groupcontactsPost mygroupcontacts = new groupcontactsPost
                    {
                        id = item.id.ToString(),
                        name = item.name,
                        phone = item.phone

                    };

                    mylist.Add(mygroupcontacts);
                }

            }
            catch (Exception ex)
            {

                string msg = ex.Message;
            }

            return mylist;
        }

        public async Task<AudiogroupMongo> getAudiobyidPost(getAudiobyidReq post, string id)
        {
            var Builder = Builders<AudiogroupMongo>.Filter;

            var query = Builder.Where(r => r.groupid == post.groupid)
                & Builder.Where(r => r.uid == id); ;

            var myres = await AudiogroupPostMon.FindAsync(query);


            var reponse = myres.FirstOrDefault();
            return reponse;
        }

        public async Task deletegroupPost(deletegroup post)
        {

            try
            {
                var query = Builders<groupsPostMongo>.Filter.Where(r => r.id.ToString() == post.id);

                var DeleteResult = await groupsPostPostsMon.DeleteOneAsync(query);
            }
            catch (Exception ex)
            {

                string msg = ex.Message;
            }
        }

        public async Task deleteAudiorecordPost(deleteAudioPost post)
        {

            try
            {
                var query = Builders<AudioPostMongo>.Filter.Where(r => r.id.ToString() == post.id);

                var DeleteResult = await AudioPostMon.DeleteOneAsync(query);
            }
            catch (Exception ex)
            {

                string msg = ex.Message;
            }



        }
        public async Task deletetimimg(deletetimingPost post)
        {

            try
            {
                var query = Builders<TiminggroupMongo>.Filter.Where(r => r.id.ToString() == post.id);

                var DeleteResult = await TiminggroupPostMon.DeleteOneAsync(query);
            }
            catch (Exception ex)
            {

                string msg = ex.Message;
            }



        }
        

        public async Task bulkdeletegroupcontacts(createcontactsgroupPost post, string id)
        {



            var Builder = Builders<groupcontactsPostMongo>.Filter;
            var query = Builder.Where(r => r.Groupid == post.id) &
                               Builder.Where(r => r.uid == id);

            var personsDeleteResult = await groupcontactsPostMon.DeleteManyAsync(query);



        }

        public async Task bulkcontacts(List<createcontactsPostUid> post)
        {
            List<contactsPostMongo> lst = new List<contactsPostMongo>();


            foreach (var contact in post)
            {
                contactsPostMongo postM = new contactsPostMongo
                {
                    uid = contact.uid,
                    name = contact.name,
                    phone = contact.phone

                };
                lst.Add(postM);
            }


            await contactsPostsMon.InsertManyAsync(lst);
        }

        public async Task CreategroupsPost(creategroupsPostui post)
        {
            groupsPostMongo postM = new groupsPostMongo
            {
                name = post.name,
                uid = post.uid

            };

            await groupsPostPostsMon.InsertOneAsync(postM);
        }
        public async Task createAudiogroup(createAudiogroupPost post, string id)
        {

            //var query = Builders<AudiogroupMongo>.Filter.Where(r => r.groupid.ToString() == post.groupid);

            var filter = Builders<AudiogroupMongo>.Filter.Where(r => r.groupid.ToString() == post.groupid);
            filter = filter & Builders<AudiogroupMongo>.Filter.Where(r => r.uid.ToString() == id);



            var DeleteResult = await AudiogroupPostMon.DeleteOneAsync(filter);

            AudiogroupMongo postM = new AudiogroupMongo
            {
                uid = id,
                groupid = post.groupid,
                audioid = post.audioid

            };

            await AudiogroupPostMon.InsertOneAsync(postM);
        }

        public async Task createTiminggroup(creategrouptimingPost post, string id)
        {


            TiminggroupMongo postM = new TiminggroupMongo
            {
                uid = id,
                groupid = post.groupid,
                date = post.date

            };

            await TiminggroupPostMon.InsertOneAsync(postM);
        }
        
        public async Task bulkgroupcontacts(createcontactsgroupPost post, string id)
        {
            List<contactsPostMongo> lst = await contactsPostsMon.Find(x => true).ToListAsync();

            List<groupcontactsPostMongo> lstgrpcontacts = new List<groupcontactsPostMongo>();

            foreach (var contact in lst)
            {
                groupcontactsPostMongo postM = new groupcontactsPostMongo
                {
                    uid = id,
                    Groupid = post.id,
                    name = contact.name,
                    phone = contact.phone,

                };
                lstgrpcontacts.Add(postM);
            }


            await groupcontactsPostMon.InsertManyAsync(lstgrpcontacts);
        }

        public async Task CreateAudio(createAudio post)
        {
            AudioPostMongo postM = new AudioPostMongo
            {
                uid = post.uid,
                name = post.name,
                filename = post.filename

            };
            await AudioPostMon.InsertOneAsync(postM);
        }
    }


    public interface IMongoRepository
    {
        Task<userPost> Login(loginPost post);

        Task createregisterPost(createregisterPost post);
        Task<IEnumerable<contactsPost>> GetcontactsPost(string id);

        Task<IEnumerable<groupsPost>> getgroupsPost(string id);

         Task<IEnumerable<AudioPost>> GetAudio(string id);

        Task<IEnumerable<groupcontactsPost>> getgroupcontacts(createcontactsgroupPost post, string id);

        Task<Dictionary<string,HashSet<getTiminggroup>>> getgrouptiming(string id);
        //

        Task<AudiogroupMongo> getAudiobyidPost(getAudiobyidReq post, string id);

        Task deletegroupPost(deletegroup post);

        Task deleteAudiorecordPost(deleteAudioPost post);

        Task deletetimimg(deletetimingPost post);

        Task bulkdeletegroupcontacts(createcontactsgroupPost post, string id);

        Task bulkcontacts(List<createcontactsPostUid> post);

        Task CreategroupsPost(creategroupsPostui post);

        Task createAudiogroup(createAudiogroupPost post, string id);

        Task createTiminggroup(creategrouptimingPost post, string id);

        Task bulkgroupcontacts(createcontactsgroupPost post, string id);

        Task CreateAudio(createAudio post);
    }
}
