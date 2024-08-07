using Amazon.Runtime.Internal.Transform;
using Microsoft.Extensions.Hosting;
using MongoDB.Bson;
using MongoDB.Driver;
using SelfApiproj.settings;
using System;
using System.Runtime;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Webhttp.Models;
using Newtonsoft.Json.Linq;
using System.Threading.Channels;



namespace SelfApiproj.Repository
{
    public class MongoRepository : IMongoRepository
    {
        private  IMongoCollection<registerPostMongo> registerPostsMon;
        public  IMongoCollection<contactsPostMongo> contactsPostsMon { get; }

        public IMongoCollection<menuPostMongo> menuPostsMon { get; }

        public IMongoCollection<AudioPostMongo> AudioPostMon { get; }
        public IMongoCollection<applicationPostMongo> appPostsMon { get; }

         public IMongoCollection<applicationMenuPostMongo> applicationMenuPostMon { get; }

        public IMongoCollection<applicationContactsPostMongo> applicationContactsPostMon { get; }
        

          public IMongoCollection<applicationTimingMongo> ApplicationTimingPostMon { get; }

        public  IMongoCollection<BsonDocument> collectionaudioconvert { get; }

        public IMongoCollection<BsonDocument> collectionevent { get; }

        public MongoRepository(IMongoDbSettings settings) {

            var database = new MongoClient(settings.ConnectionString).GetDatabase(settings.DatabaseName);
            registerPostsMon = database.GetCollection<registerPostMongo>("user");
            contactsPostsMon = database.GetCollection<contactsPostMongo>("contacts");
            menuPostsMon = database.GetCollection<menuPostMongo>("menu");
            appPostsMon = database.GetCollection<applicationPostMongo>("application");
            AudioPostMon = database.GetCollection<AudioPostMongo>("Audio");
            applicationMenuPostMon = database.GetCollection<applicationMenuPostMongo>("applicationmenu");
            ApplicationTimingPostMon = database.GetCollection<applicationTimingMongo>("applicationtiming");
            applicationContactsPostMon = database.GetCollection<applicationContactsPostMongo>("applicationcontact");
            collectionevent = database.GetCollection<BsonDocument>("BSevent");
            collectionaudioconvert = database.GetCollection<BsonDocument>("audio_convert");
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

        
             public async Task<IEnumerable<contactsfilesPost>> GetAllfilescontactsPost( string id)
        {
            var Builder = Builders<contactsPostMongo>.Filter;
            var query = Builder.Where(r => r.uid == id);

            var myres = await contactsPostsMon.DistinctAsync<string>("filename", query);



            var res = myres.ToList();

            List<contactsfilesPost> mylist = new List<contactsfilesPost>();
            foreach (var item in res)
            {
                contactsfilesPost mycontacts = new contactsfilesPost
                {                   
                    filename = item

                };

                mylist.Add(mycontacts);
            }
            return mylist;

        }


        public async Task<IEnumerable<menufilesPost>> getAllfilesMenu(string id)
        {
            var Builder = Builders<menuPostMongo>.Filter;
            var query = Builder.Where(r => r.uid == id);

            var myres = await menuPostsMon.DistinctAsync<string>("filename", query);



            var res = myres.ToList();

            List<menufilesPost> mylist = new List<menufilesPost>();
            foreach (var item in res)
            {
                menufilesPost mymenus = new menufilesPost
                {
                    filename = item

                };

                mylist.Add(mymenus);
            }
            return mylist;

        }

        public async Task<List<AppliEventPost>> getallAppliEvent(string filename, string id)
        {
          


            var myres = collectionevent.FindAsync(_ => true);
            List<BsonDocument> res = myres.Result.ToList();

            List<AppliEventPost> lst = new List<AppliEventPost>();
            foreach (BsonDocument item in res)
            {
                AppliEventPost myAppliEventPost = new AppliEventPost
                {

                    ChannelId = item["ChannelId"] == BsonNull.Value ? "" : item["ChannelId"].AsString,

                    uid = item["uid"] == BsonNull.Value ? "" : item["uid"].AsString,

                    application = item["application"] == BsonNull.Value ? "" : item["application"].AsString,

                    phone = item["phone"] == BsonNull.Value ? "" : item["phone"].AsString,

                    date = item["mydate"] == BsonNull.Value ? "" : item["mydate"].AsString,

                    events = item["event"] == BsonNull.Value ? "" : item["event"].AsString,


                    datebeginstasis = item["event"].AsString == "StasisStartEvent" ? item["mydate"].AsString : "",

                    dateendstasis = item["event"].AsString == "StasisEndEvent" ? item["mydate"].AsString : "",

                    digit = item["event"].AsString == "ChannelDtmfReceivedEvent" ? item["digit"].AsString : "",

                    levelmenu = item["event"].AsString == "ChannelDtmfReceivedEvent" ? item["level"].AsInt32 : -1,



                };

                lst.Add(myAppliEventPost);

            }

            Dictionary<Tuple<string, string>, Dictionary<string, AppliEventPost>> dic =
      new Dictionary<Tuple<string, string>, Dictionary<string, AppliEventPost>>();

            foreach (AppliEventPost item in lst)
            {

                Tuple<string, string> tpl = new Tuple<string, string>(item.application, item.uid);

                Dictionary<string, AppliEventPost> dicinternal;
                bool rc = dic.TryGetValue(tpl, out dicinternal);

                if (rc == false)
                {
                    dicinternal = new Dictionary<string, AppliEventPost>();
                    dic.Add(tpl, dicinternal);
                }

                AppliEventPost myapp;
                bool found = dicinternal.TryGetValue(item.ChannelId, out myapp);

                if (found == false)
                {
                    myapp = new AppliEventPost();
                    dicinternal.TryAdd(item.ChannelId, myapp);
                }

                myapp.diclevelname = await getdicMenunamelevel_byApp(item.application, item.uid);

                myapp.isrunning = await getrunning_byApp(item.application, item.uid);
                myapp.phone = item.phone;

                myapp.ChannelId = item.ChannelId;

                if (item.events == "StasisStartEvent")
                    myapp.datebeginstasis = item.date;


                if (item.events == "ChannelDtmfReceivedEvent")
                {
                    Tuple<int?, string> mytpl = new Tuple<int?, string>(item.levelmenu, item.digit);

                    myapp.Tplleveldigits.Add(mytpl);

                }


                if (item.events == "StasisEndEvent")
                    myapp.dateendstasis = item.dateendstasis;

            }

            Tuple<string, string> mytpl1 = new Tuple<string, string>(filename,  id);

            Dictionary<string, AppliEventPost> mydic;


            bool foundapi = dic.TryGetValue(mytpl1,out mydic);

            if (foundapi == false)
                return null;

            List<AppliEventPost> mylst = [.. mydic.Values];
            
            return mylst;
        }


        async Task<bool> getrunning_byApp(string Appname, string uid)
        {
            Dictionary<int, string> dicpair = new Dictionary<int, string>();

            var Builder2 = Builders<applicationPostMongo>.Filter;
            var query2 = Builder2.Where(r => r.filename == Appname) &
                Builder2.Where(r => r.uid == uid);

            var myres2 = await appPostsMon.FindAsync(query2);

            var res = myres2.FirstOrDefault();

            bool isrunning =(bool)res.isrunning;

       return isrunning;



        }




            public async  Task<Dictionary<int, string>> getdicMenunamelevel_byApp(string Appname, string uid)
        {
            Dictionary<int, string> dicpair = new Dictionary<int, string>();

            var Builder2 = Builders<applicationMenuPostMongo>.Filter;
            var query2 = Builder2.Where(r => r.fileAppli == Appname) &
                Builder2.Where(r => r.uid == uid);

            var myres2 = await applicationMenuPostMon.FindAsync(query2);

            var pr2 = myres2.FirstOrDefault();

            var Builder3 = Builders<menuPostMongo>.Filter;
            var query3 = Builder3.Where(r => r.filename == pr2.fileMenu) &
                Builder3.Where(r => r.uid == uid);

            var resmenu = await menuPostsMon.FindAsync(query3);




            menuPostMongo memu = resmenu.FirstOrDefault();

            var jsonarray = memu.jsonarray;

            JArray textArray = JArray.Parse(memu.jsonarray);



            foreach (var jobj in textArray.OfType<JObject>())
            {
                string title = jobj.GetValue("title").ToString();
                dicpair[1] = title;
                if (jobj["items"] != null)
                {

                    foreach (var address in jobj["items"])
                    {
                        string title1 = address.Value<string>("title");
                        dicpair[2] = title1;
                        if (address["items"] != null)
                        {

                            foreach (var address1 in address["items"])
                            {
                                string title2 = address1.Value<string>("title");
                                dicpair[3] = title2;


                            }
                        }
                    }
                }

            }

            return dicpair;

        }


        public async Task<AppliInfoPost> getallAppliInfo(string filename, string id)
        {
            var Builder = Builders<applicationPostMongo>.Filter;
            var query = Builder.Where(r => r.filename == filename) &
                Builder.Where(r => r.uid == id);

            var myres = await appPostsMon.FindAsync(query);

            var pr=myres.FirstOrDefault();

            bool? isenabled = pr.isenabled;

            var Builder1 = Builders<applicationContactsPostMongo>.Filter;
            var query1 = Builder1.Where(r => r.fileAppli == filename) &
                Builder1.Where(r => r.uid == id);

            var myres1 = await applicationContactsPostMon.FindAsync(query1);

            var pr1 = myres1.FirstOrDefault();

            var Builder2 = Builders<applicationMenuPostMongo>.Filter;
            var query2 = Builder2.Where(r => r.fileAppli == filename) &
                Builder2.Where(r => r.uid == id);

            var myres2 = await applicationMenuPostMon.FindAsync(query2);

            var pr2 = myres2.FirstOrDefault();

            var Builder3 = Builders<applicationTimingMongo>.Filter;
            var query3= Builder3.Where(r => r.fileAppli == filename) &
                Builder3.Where(r => r.uid == id);

            var myres3 = await ApplicationTimingPostMon.FindAsync(query3);
            var pr3 = myres3.FirstOrDefault();

            string? date = "";
            if (pr3 == null)
                date = "0000-01-01T00:00:00.000Z";
            else
                date = pr3.date;
            

            AppliInfoPost myAppliInfoPost = new AppliInfoPost
            {
                filecontacts= pr1.fileContacts,
                filemenu = pr2.fileMenu,
                isenabled = pr.isenabled,
                date = date
            };
            return myAppliInfoPost;

        }


        public async Task<IEnumerable<contactsPost>> GetfilecontactsPosts(string filename,string id)
        {
            var Builder = Builders<contactsPostMongo>.Filter;
            var query = Builder.Where(r => r.filename == filename) &
                Builder.Where(r => r.uid == id);

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

        //public async Task<IEnumerable<groupsPost>> getgroupsPost(string id)
        //{

        //    var query = Builders<groupsPostMongo>.Filter.Where(r => r.uid.ToString() == id);

        //    var myres = await groupsPostPostsMon.FindAsync(query);

        //    var res = myres.ToList();


        //    List<groupsPost> mylist = new List<groupsPost>();
        //    foreach (var item in res)
        //    {
        //        groupsPost mygroup = new groupsPost
        //        {
        //            id = item.id.ToString(),
        //            name = item.name

        //        };

        //        mylist.Add(mygroup);
        //    }
        //    return mylist;

        //}


        public async Task<menuPostMongo> GetMenu(string filename,string id)
        {
            var query = Builders<menuPostMongo>.Filter.Where(r => r.uid.ToString() == id);
            query = query & Builders<menuPostMongo>.Filter.Where(r => r.filename == filename);

            var myres = await menuPostsMon.FindAsync(query);

            menuPostMongo ret = myres.FirstOrDefault();


            return ret;

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

        public async Task<IEnumerable<AppliPost>> GetApplis(string id)
        {
            var query = Builders<applicationPostMongo>.Filter.Where(r => r.uid.ToString() == id);

            var myres = await appPostsMon.FindAsync(query);

            var res = myres.ToList();



            List<AppliPost> mylist = new List<AppliPost>();
            foreach (var item in res)
            {
                AppliPost myAppli = new AppliPost
                {
                    id = item.id.ToString(),
                   
                    filename = item.filename,

                    enabled = item.isenabled

                };

                mylist.Add(myAppli);
            }
            return mylist;

        }



        static public Dictionary<string, HashSet<getappliTiming>> get_dic_Hashet(
       IEnumerable<applicationTimingMongo> E_row, Dictionary<string, string> dicgroup)
        {

            Dictionary<string, HashSet<getappliTiming>> Dic = new Dictionary<string, HashSet<getappliTiming>>();

            foreach (var item in E_row)
            {
                HashSet<getappliTiming> lst_val = null;
                DateTime datetimeday = new DateTime(1980, 1, 1);
                DateTime.TryParse(item.date, out datetimeday);

                string day = datetimeday.ToString("yyyy-MM-dd");
                bool found = Dic.TryGetValue(day, out lst_val);

                if (found == false)
                {
                    lst_val = new HashSet<getappliTiming>();
                    Dic.Add(day, lst_val);
                }
                string myappli = "";
                //dicgroup.TryGetValue(item.fileAppli, out myappli);

                getappliTiming myclass = new getappliTiming
                {

                    id = item.id.ToString(),
                    day = datetimeday.ToString("yyyy-MM-dd"),
                    filename = item.fileAppli,
                    date = datetimeday.ToShortTimeString(),
                    height = 50
                };

                lst_val.Add(myclass);
            }

            return (Dic);
        }

        public Dictionary<string, string> get_dicappli(List<applicationPostMongo> lst)
        {
            Dictionary<string, string> dicappli = new Dictionary<string, string>();

            foreach (var item in lst)
            {

                string id = item.id.ToString();
                string name = item.filename;
                dicappli.Add(id, name);
            }
            return dicappli;
        }


        public async  Task<Dictionary<string, HashSet<getappliTiming>>> getApplicationtiming(string id)
        {
            Dictionary<string, HashSet<getappliTiming>> mydic = new Dictionary<string, HashSet<getappliTiming>>();
            try
            {
               
                var filter1 =  Builders<applicationTimingMongo>.Filter.Where(r => r.uid.ToString() == id);
               
                var myres = await ApplicationTimingPostMon.FindAsync(filter1);

                IEnumerable<applicationTimingMongo> res = myres.ToList();


               var query = Builders<applicationPostMongo>.Filter.Where(r => r.uid.ToString() == id);

                 var myres1 = await appPostsMon.FindAsync(query);

                 List<applicationPostMongo> res1 =   myres1.ToList();

                Dictionary<string, string> myapplidic = get_dicappli(res1);

               mydic = get_dic_Hashet(res, myapplidic);

             


            }
            catch (Exception ex)
            {

                string msg = ex.Message;
            }

            return mydic;



        }



        

              public async Task<bool> deletefilesMenu(string filename, string id)
        {

            try
            {

                var Builder1 = Builders<applicationMenuPostMongo>.Filter;
                var query1 = Builder1.Where(r => r.fileMenu == filename) &
                    Builder1.Where(r => r.uid == id);

                var filenameList = await applicationMenuPostMon.FindAsync(query1);

                var fList = filenameList.FirstOrDefault();


                if (fList != null)
                {
                    return false;
                }


                var query = Builders<menuPostMongo>.Filter.Where(r => r.id.ToString() == id);
                query = query & Builders<menuPostMongo>.Filter.Where(r => r.filename == filename);


                var DeleteResult = await menuPostsMon.DeleteManyAsync(query);

                return true;
            }
            catch (Exception ex)
            {

                string msg = ex.Message;

                return false;
            }



        }

        public async Task<bool> deletefilescontacts(string filename,string id)
        {

            try
            {

                var Builder1 = Builders<applicationContactsPostMongo>.Filter;
                var query1 = Builder1.Where(r => r.fileContacts == filename) &
                    Builder1.Where(r => r.uid == id);

                var filenameList = await applicationContactsPostMon.FindAsync(query1);

                var fList = filenameList.FirstOrDefault();


                if (fList != null)
                {
                    return false;
                }


                var query = Builders<contactsPostMongo>.Filter.Where(r => r.id.ToString() ==id);
                query = query & Builders<contactsPostMongo>.Filter.Where(r => r.filename == filename );


                var DeleteResult =  await contactsPostsMon.DeleteManyAsync(query);

                return true;
            }
            catch (Exception ex)
            {

                string msg = ex.Message;

                return false;
            }



        }

        public  async Task<bool> deleteAudiorecordPost(deleteAudioPost post,string id)
        {

            try
            {
                var query = Builders<AudioPostMongo>.Filter.Where(r => r.id.ToString() == post.id);

                var Result = await AudioPostMon.FindAsync(query);

                var presult = Result.FirstOrDefault();

                var fname = presult.filename;

                var Builder = Builders<menuPostMongo>.Filter;
                var query1 = Builder.Where(r => r.uid == id);

               
                var Result1 = await menuPostsMon.FindAsync(query1);

                var res = Result1.ToList();

                bool isexists = false;
                foreach (var item in res)
                {
                    if(item.jsonarray.Contains(fname))
                    {
                        isexists = true;
                        return false;   

                    }

                }

                     var DeleteResult = await AudioPostMon.DeleteOneAsync(query);

                return true;
            }
            catch (Exception ex)
            {  string msg = ex.Message;
                return false;
            }



        }


        

             public async Task bulkdeleteditcontacts(string filename, string id)
        {
           


            var Builder = Builders<contactsPostMongo>.Filter;
            var query = Builder.Where(r => r.filename == filename) &
                               Builder.Where(r => r.uid == id);

            var personsDeleteResult = await contactsPostsMon.DeleteManyAsync(query);

            

        }

        public async Task DeleteAppliTiming(string filename, string id)
        {

            var Builder3 = Builders<applicationTimingMongo>.Filter;
            var query3 = Builder3.Where(r => r.fileAppli == filename) &
                               Builder3.Where(r => r.uid == id);

            await ApplicationTimingPostMon.DeleteManyAsync(query3);

        }


        
       public async Task updaterunappli(string filename, string id)
        {


           var Builder = Builders<applicationPostMongo>.Filter;
           var query = Builder.Where(r => r.filename == filename) &
                       Builder.Where(r => r.uid == id);

            var update = Builders<applicationPostMongo>.Update
                .Set(pn => pn.is2run, true);

            await appPostsMon.UpdateOneAsync(query, update);


        }

        public async Task DeleteAppli(string filename, string id)
        {
          

            var Builder = Builders<applicationPostMongo>.Filter;
            var query = Builder.Where(r => r.filename == filename) &
                               Builder.Where(r => r.uid == id);

                  await appPostsMon.DeleteManyAsync(query);


            var Builder1 = Builders<applicationMenuPostMongo>.Filter;
            var query1 = Builder1.Where(r => r.fileAppli == filename) &
                               Builder1.Where(r => r.uid == id);

            await applicationMenuPostMon.DeleteManyAsync(query1);


            var Builder2 = Builders<applicationContactsPostMongo>.Filter;
            var query2 = Builder2.Where(r => r.fileAppli == filename) &
                               Builder2.Where(r => r.uid == id);

            await applicationContactsPostMon.DeleteManyAsync(query2);

            var Builder3 = Builders<applicationTimingMongo>.Filter;
            var query3 = Builder3.Where(r => r.fileAppli == filename) &
                               Builder3.Where(r => r.uid == id);

            await ApplicationTimingPostMon.DeleteManyAsync(query3);


        }
        public async Task<bool> bulkdeleteditmenu(string filename, string id)
        {

            var Builder1 = Builders<applicationMenuPostMongo>.Filter;
            var query1 = Builder1.Where(r => r.fileMenu == filename) &
                Builder1.Where(r => r.uid == id);

            var filenameList = await applicationMenuPostMon.FindAsync(query1);

            var fList = filenameList.FirstOrDefault();

            if (fList != null)
            {
                return false;
            }

            var Builder = Builders<menuPostMongo>.Filter;
            var query = Builder.Where(r => r.filename == filename) &
                               Builder.Where(r => r.uid == id);

            var personsDeleteResult = await menuPostsMon.DeleteManyAsync(query);

            return true;

        }

        

              public async Task<AudioPostMongo> isfilesaklataExist(string id, string name)
        {

            var filter = new BsonDocument();

            var Builder = Builders<AudioPostMongo>.Filter;
            var query = Builder.Where(r => r.name == name) &
                Builder.Where(r => r.uid == id);

            var filenameList = await AudioPostMon.FindAsync(query);
            var reponse = filenameList.FirstOrDefault();
            return reponse;


        }


        

             public async Task<applicationPostMongo> isfilesappliExist(string id, string filename)
        {

            var filter = new BsonDocument();

            var Builder = Builders<applicationPostMongo>.Filter;
            var query = Builder.Where(r => r.filename == filename) &
                Builder.Where(r => r.uid == id);

            var filenameList = await appPostsMon.FindAsync(query);
            var reponse = filenameList.FirstOrDefault();
            return reponse;


        }
        public async Task<menuPostMongo> isfilesmenuExist(string id, string filename)
        {

            var filter = new BsonDocument();

            var Builder = Builders<menuPostMongo>.Filter;
            var query = Builder.Where(r => r.filename == filename) &
                Builder.Where(r => r.uid == id);

            var filenameList = await menuPostsMon.FindAsync(query);
            var reponse = filenameList.FirstOrDefault();
            return reponse;

           
        }

        public async Task<contactsPostMongo> isfilescontactExist(string id, string filename)
        {

            var filter = new BsonDocument();

            var Builder = Builders<contactsPostMongo>.Filter;
            var query = Builder.Where(r => r.filename == filename) &
                Builder.Where(r => r.uid == id);

            var filenameList = await contactsPostsMon.FindAsync(query);
            var reponse = filenameList.FirstOrDefault();
            return reponse;

       
        }

        public async Task bulkcontacts(List<createcontactsPostUid> post,
            string filename, string id)
        {

            var query = Builders<contactsPostMongo>.Filter.Where(r => r.uid == id);
            query = query & Builders<contactsPostMongo>.Filter.Where(r => r.filename == filename);


            var DeleteResult = await contactsPostsMon.DeleteManyAsync(query);

            List<contactsPostMongo> lst = new List<contactsPostMongo>();


            foreach (var contact in post)
            {
                contactsPostMongo postM = new contactsPostMongo
                {
                    uid = contact.uid,
                    name = contact.name,
                    phone = contact.phone,
                    filename= contact.filename,
                };
                lst.Add(postM);
            }


            await contactsPostsMon.InsertManyAsync(lst);
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


            var Builder = Builders<AudioPostMongo>.Filter;
            var query = Builder.Where(r => r.filename == post.filename) &
                Builder.Where(r => r.uid == post.uid);

            var filenameList = await AudioPostMon.FindAsync(query);
            var reponse = filenameList.FirstOrDefault();
            var myid = reponse.id.ToString();

            var doc = new BsonDocument{
                                     { "insert_date",   DateTime.Now },
                                       { "filename",post.filename },
                                         { "id",  myid }
                                       };


            collectionaudioconvert.InsertOne(doc);
        
        
        }

            
        


        public async Task CreateAppliMenu(createApp post)
        {
            applicationMenuPostMongo postM = new applicationMenuPostMongo
            {
                uid = post.uid,
                fileAppli = post.filename,
                fileMenu = post.filemenu

            };
            await applicationMenuPostMon.InsertOneAsync(postM);
        }


        

        public async Task CreateAppliContact(createApp post)
        {
            applicationContactsPostMongo postM = new applicationContactsPostMongo
            {
                uid = post.uid,
                fileAppli = post.filename,
                fileContacts = post.filecontact

            };
            await applicationContactsPostMon.InsertOneAsync(postM);
        }


        public async Task CreateAppliTiming(createApp post)
        {


            applicationTimingMongo postM = new applicationTimingMongo
            {
                uid = post.uid,
                fileAppli = post.filename,
                date = post.date

            };

            await ApplicationTimingPostMon.InsertOneAsync(postM);
        }

        public async Task CreateAppli(createApp post)
        {
            applicationPostMongo postM = new applicationPostMongo
            {
                uid = post.uid,
                isenabled= post.isenabled,
                filename = post.filename,
                is2run= post.is2run,
                isrunning= post.isrunning,

            };
            await appPostsMon.InsertOneAsync(postM);
        }

        public async Task UpdateAppli(createApp post)
        {
           
            var Builder = Builders<applicationPostMongo>.Filter;
           
            var query = Builder.Where(r => r.uid == post.uid) &
                              Builder.Where(r => r.filename == post.filename);


            var update = Builders<applicationPostMongo>.Update
               .Set(pn => pn.isenabled, post.isenabled);

           await appPostsMon.UpdateOneAsync(query, update);

        }
        public async Task UpdateAppliMenu(createApp post)
        {
          
            var Builder = Builders<applicationMenuPostMongo>.Filter;

            var query = Builder.Where(r => r.uid == post.uid) &
                              Builder.Where(r => r.fileAppli == post.filename);


            var update = Builders<applicationMenuPostMongo>.Update
               .Set(pn => pn.fileMenu, post.filemenu);

            await applicationMenuPostMon.UpdateOneAsync(query, update);

        }

        public async Task UpdateAppliTiming(createApp post)
        {

            var Builder = Builders<applicationTimingMongo>.Filter;

            var query = Builder.Where(r => r.uid == post.uid) &
                              Builder.Where(r => r.fileAppli == post.filename);


            var filenameList = await ApplicationTimingPostMon.FindAsync(query);
            var response = filenameList.FirstOrDefault();
            if (response == null)
            {
                applicationTimingMongo postM = new applicationTimingMongo
                {
                    uid = post.uid,
                    fileAppli = post.filename,
                    date = post.date

                };

                await ApplicationTimingPostMon.InsertOneAsync(postM);
                return;
            }

            var update = Builders<applicationTimingMongo>.Update
               .Set(pn => pn.date, post.date);

            await ApplicationTimingPostMon.UpdateOneAsync(query, update);

        }

        

        public async Task UpdateAppliContact(createApp post)
        {

            var Builder = Builders<applicationContactsPostMongo>.Filter;

            var query = Builder.Where(r => r.uid == post.uid) &
                              Builder.Where(r => r.fileAppli == post.filename);


            var update = Builders<applicationContactsPostMongo>.Update
               .Set(pn => pn.fileContacts, post.filecontact);

            await applicationContactsPostMon.UpdateOneAsync(query, update);

        }

        

        public async Task CreateMenu(createMenu post, string filename, string id)
        {
            var query = Builders<menuPostMongo>.Filter.Where(r => r.uid == id);
            query = query & Builders<menuPostMongo>.Filter.Where(r => r.filename == filename);


            var DeleteResult = await menuPostsMon.DeleteManyAsync(query);

            menuPostMongo postM = new menuPostMongo
            {
                uid = post.uid,
                jsonarray = post.jsonarr,
                filename = post.filename

            };
            await menuPostsMon.InsertOneAsync(postM);
        }

    }

  
}


public interface IMongoRepository
    {
        Task<userPost> Login(loginPost post);

        Task createregisterPost(createregisterPost post);
        Task<IEnumerable<contactsPost>> GetcontactsPost(string id);

        Task<IEnumerable<menufilesPost>> getAllfilesMenu(string id);

    Task<IEnumerable<contactsfilesPost>> GetAllfilescontactsPost(string id);

    Task<IEnumerable<contactsPost>> GetfilecontactsPosts(string filename, string id);

    Task<AppliInfoPost> getallAppliInfo(string filename, string id);

    Task<List<AppliEventPost>> getallAppliEvent(string filename, string id);

    Task<IEnumerable<AppliPost>> GetApplis(string id);

     

         Task<IEnumerable<AudioPost>> GetAudio(string id);

    
       Task<bool> deleteAudiorecordPost(deleteAudioPost post, string id);

        Task<bool> deletefilescontacts(string filename, string id);

       Task<bool> deletefilesMenu(string filename, string id);

       Task bulkcontacts(List<createcontactsPostUid> post,string filename,string id);

        Task<contactsPostMongo> isfilescontactExist(string id, string filename);

        Task<menuPostMongo> isfilesmenuExist(string id, string filename);

       Task<applicationPostMongo> isfilesappliExist(string id, string filename);

    Task<AudioPostMongo> isfilesaklataExist(string id, string name);

      //Task bulkdeleteditcontacts(string filename, string id);

       //Task bulkdeleteditmenu(string filename, string id);



    Task<Dictionary<string, HashSet<getappliTiming>>> getApplicationtiming(string id);



        Task CreateAudio(createAudio post);
        Task<menuPostMongo> GetMenu(string filename, string id);
       Task CreateMenu(createMenu post,string filename, string id);

      Task CreateAppli(createApp post);

    Task UpdateAppli(createApp post);
    Task CreateAppliMenu(createApp post);
   Task UpdateAppliMenu(createApp post);
    Task CreateAppliContact(createApp post);
    Task UpdateAppliContact(createApp post);
    Task CreateAppliTiming(createApp post);
   Task UpdateAppliTiming(createApp post);


    Task DeleteAppli(string filename, string id);

    Task updaterunappli(string filename, string id);

    Task DeleteAppliTiming(string filename, string id);
}

