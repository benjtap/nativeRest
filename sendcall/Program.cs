﻿using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Core.Configuration;
using System.Collections.Concurrent;
using Docker.DotNet;
using Docker.DotNet.Models;
using System.Collections.Generic;
using System;
using System.Diagnostics;
using System.Linq;
using Amazon.Runtime.Internal.Transform;
using System.Net.Sockets;
using System.Net;
using AsterNET.ARI.Models;
using AsterNET.ARI;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Reflection;
using Newtonsoft.Json.Linq;
using System.Threading.Channels;
using System.Reflection.Emit;
using System.Threading;
using Amazon.Auth.AccessControlPolicy;
using MongoDB.Driver.Core.Bindings;
//using static System.Runtime.InteropServices.JavaScript.JSType;



public static class DB
{
    static string ConnectionString = @"mongodb://userdb:100171@localhost:27017/?authMechanism=SCRAM-SHA-256";
    static string DatabaseName = "contact_group";
    static IMongoDatabase database = new MongoClient(ConnectionString).GetDatabase(DatabaseName);
    static IMongoCollection<contactsPostMongo> contactsPostsMon = database.GetCollection<contactsPostMongo>("contacts");
    static IMongoCollection<menuPostMongo> menuPostsMon = database.GetCollection<menuPostMongo>("menu");
    static IMongoCollection<applicationPostMongo> appPostsMon = database.GetCollection<applicationPostMongo>("application");
    static IMongoCollection<AudioPostMongo> AudioPostMon = database.GetCollection<AudioPostMongo>("Audio");
    static IMongoCollection<applicationMenuPostMongo> applicationMenuPostMon = database.GetCollection<applicationMenuPostMongo>("applicationmenu");
    static IMongoCollection<applicationTimingMongo> ApplicationTimingPostMon = database.GetCollection<applicationTimingMongo>("applicationtiming");
     
    static IMongoCollection<applicationContactsPostMongo> applicationContactsPostMo = database.GetCollection<applicationContactsPostMongo>("applicationcontact");

    static IMongoCollection<BsonDocument> collectionevent= database.GetCollection<BsonDocument>("BSevent");
    static IMongoCollection<BsonDocument> collectioneventhistory = database.GetCollection<BsonDocument>("collectioneventhistory");

    public static Dictionary<Tuple<string, string>, applicationContactsPostMongo> Dicapplication_contact;
    public static Dictionary<Tuple<string, string>, List<contactsPostMongo>> Diccontacts;

    public static Dictionary<Tuple<string, string>, applicationMenuPostMongo> Dicapplication_Menu;
    public static Dictionary<Tuple<string, string>, menuPostMongo> DicMenu;

    public static Dictionary<Tuple<string, string>, AudioPostMongo> DicAudio;

    public static BlockingCollection<KeyValuePair<Tuple<string, string>, Tuple<object, object>>> bQueueevent = new BlockingCollection<KeyValuePair<Tuple<string,string>, Tuple<object, object>>>() ;
   
    public static BlockingCollection<KeyValuePair<Tuple<string, AriClient>, contactsPostMongo>> bQueueinitial = new BlockingCollection<KeyValuePair<Tuple<string, AriClient>, contactsPostMongo>>();

    public static ConcurrentDictionary<string,  AriClient> dicclient = new ConcurrentDictionary<string, AriClient>();

    public static ConcurrentDictionary<string, string> dicchannel = new ConcurrentDictionary<string, string>();

    public static ConcurrentDictionary<string, int> dicmenulevel = new ConcurrentDictionary<string, int>();
   
    public static ConcurrentDictionary<string, CancellationTokenSource> diccancelationtasks = new ConcurrentDictionary<string, CancellationTokenSource>();

   






    public static Dictionary<string, string> get_dic_file(List<BsonDocument> lst)
    {

        Dictionary<string, string> Dic = new Dictionary<string, string>();

         


        foreach (BsonDocument item in lst)
        {
          
            var _Id = item["id"] == BsonNull.Value ? "" : item["id"].AsString;

            var filename =item["filename"] == BsonNull.Value ? "" : item["filename"].AsString;

            Dic.Add(_Id, filename);
                }
        return Dic;
        }

    public static async Task<IEnumerable<AudioPostMongo>> get_Audio()
    {
        var result = await Task.Run(() => Handle_data_get_Audio());
        return result;
    }

    public static async Task<IEnumerable<menuPostMongo>> get_Menu()
    {
        var result = await Task.Run(() => Handle_data_get_Menu());
        return result;
    }

    public static async Task<IEnumerable<contactsPostMongo>> get_Contacts()
    {
        var result = await Task.Run(() => Handle_data_get_Contacts());
        return result;
    }
    public static async Task<IEnumerable<applicationPostMongo>> get_Application()
    {
        IEnumerable<applicationPostMongo> result = await Task.Run(() => Handle_data_get_Application());
        return result;
    }

    public static async Task<IEnumerable<applicationMenuPostMongo>> get_ApplicationMenu()
    {
        var result = await Task.Run(() => Handle_data_get_ApplicationMenu());
        return result;
    }

    public static async Task<IEnumerable<applicationContactsPostMongo>> get_application_contact()
    {
        var result = await Task.Run(() => Handle_data_get_application_contact());
        return result;
    }
    public static async Task<IEnumerable<applicationTimingMongo>> get_Application_timing()
    {
        var result = await Task.Run(() => Handle_data_get_Application_timing());
        return result;
    }



    private static List<contactsPostMongo> Handle_data_get_Contacts()
    {
        var myres =contactsPostsMon.FindAsync(_ => true);
        List<contactsPostMongo> res = myres.Result.ToList();
         return res;
    }


    private static List<menuPostMongo> Handle_data_get_Menu()
    {
        var myres = menuPostsMon.FindAsync(_ => true);
        List<menuPostMongo> res = myres.Result.ToList();
        return res;
    }

    private static List<applicationPostMongo> Handle_data_get_Application()
    {
        var myres = appPostsMon.FindAsync(_ => true);
        List<applicationPostMongo> res = myres.Result.ToList();
        return res;
    }
    private static List<applicationMenuPostMongo> Handle_data_get_ApplicationMenu()
    {
        var myres = applicationMenuPostMon .FindAsync(_ => true);
        List<applicationMenuPostMongo> res = myres.Result.ToList();
        return res;
    }

    private static List<AudioPostMongo> Handle_data_get_Audio()
    {
        var myres = AudioPostMon.FindAsync(_ => true);
        List<AudioPostMongo> res = myres.Result.ToList();
        return res;
    }
    
        private static List<applicationContactsPostMongo> Handle_data_get_application_contact()
    {
        var myres = applicationContactsPostMo.FindAsync(_ => true);
        List<applicationContactsPostMongo> res = myres.Result.ToList();
        return res;
    }
    
    private static List<applicationTimingMongo> Handle_data_get_Application_timing()
    {
        var myres = ApplicationTimingPostMon.FindAsync(_ => true);
        List<applicationTimingMongo> res = myres.Result.ToList();
        return res;
    }




    private static async Task GetFromQueueevent(int processid)
    {


        KeyValuePair<Tuple<string, string>, Tuple<object, object>> data;



    bool success = bQueueevent.TryTake(out data);


        while (success)
        {

            Tuple<string, string> tpl = data.Key;

            Tuple<object, object>  item = data.Value;


            string Channelid = tpl.Item1;

            if (tpl.Item2== "StasisStartEvent")
            {
                IAriClient sender = (IAriClient)item.Item1;

                StasisStartEvent e = (StasisStartEvent)item.Item2;

                string Appname = e.Application;
               
                   bool Isaudio = false;
               string audio = getAudioMenubyApp(Appname, Channelid,out Isaudio);


                if (string.IsNullOrEmpty(audio) == false)
                {
                    await sender.Channels.AnswerAsync(Channelid);

                     

                    await sender.Channels.PlayAsync(Channelid, "sound:"+ audio);
                    CancellationTokenSource source;
                    bool found=  diccancelationtasks.TryGetValue(Channelid, out source);

                    if (found)
                    {
                        CancellationToken Token = source.Token;
                        try
                        {
                             Task.Delay(30000).ContinueWith(
                                async task =>
                                {
                                   // await sender.Channels.PlayAsync(Channelid, "sound:goodbye");
                                    await sender.Channels.HangupAsync(Channelid, "normal");
                                }
                                , Token);
                        }
                        catch (OperationCanceledException)
                        {

                        }
                    }



                }
          
            }
            if (tpl.Item2 == "ChannelDtmfReceivedEvent")
            {
               

                IAriClient sender = (IAriClient)item.Item1;

                ///sender.Channels.StartSilence(Channelid);

                ChannelDtmfReceivedEvent e = (ChannelDtmfReceivedEvent)item.Item2;

                string Appname = e.Application;

                CancellationTokenSource source;
                bool found = diccancelationtasks.TryGetValue(Channelid, out source);

                //if (found)
                //    source.Cancel();


                CancellationToken Token = source.Token;
                try
                {
                    Task.Delay(30000).ContinueWith(
                       async task =>
                       {
                          // await sender.Channels.PlayAsync(Channelid, "sound:goodbye");
                           await sender.Channels.HangupAsync(Channelid, "normal");
                       }
                       , Token);
                }
                catch (OperationCanceledException)
                {

                }


                bool Isaudio = false;
                string audio = getAudioMenubyApp(Appname, Channelid, out Isaudio,e.Digit);

                if (string.IsNullOrEmpty(audio) == false && Isaudio)
                     await sender.Channels.PlayAsync(Channelid, "sound:" + audio);
                  
                else
                {
                  // await sender.Channels.PlayAsync(Channelid, "sound:goodbye");
                    await sender.Channels.HangupAsync(Channelid, "normal");
                }

            }

            if (tpl.Item2 == "ChannelDtmfReceivedEventWrong")
            {
                IAriClient sender = (IAriClient)item.Item1;

                ChannelDtmfReceivedEvent e = (ChannelDtmfReceivedEvent)item.Item2;

                string Appname = e.Application;

                string audiowrong = "wrong";

               await sender.Channels.PlayAsync(Channelid, "sound:" + audiowrong);
                CancellationTokenSource source;
                bool found = diccancelationtasks.TryGetValue(Channelid, out source);

                if (found)
                    source.Cancel();
                CancellationToken Token = source.Token;
                try
                {
                    Task.Delay(30000).ContinueWith(
                       async task =>
                       {
                          // await sender.Channels.PlayAsync(Channelid, "sound:goodbye");
                           await sender.Channels.HangupAsync(Channelid, "normal");
                       }
                       , Token);
                }
                catch (OperationCanceledException)
                {

                }
            }

            if (tpl.Item2 == "StasisEndEvent")
            {

                Tuple<string, string> tpl1 = data.Key;

                Tuple<object, object> item1= data.Value;

                StasisEndEvent e = (StasisEndEvent)item1.Item2;

                string Appname = e.Application;

                

                AriClient myclient;
                bool found = dicclient.TryGetValue(Appname, out myclient);
                if (found)
                {
                    try
                    {
                      

                      //  dicclient.TryRemove(e.Application, out myclient);
                       

                        // Reset 2run and is running
                      
                    }
                    catch (Exception ex)
                    {
                        string msg =ex.Message;
                        
                    }
                 
                }

            }

            if (tpl.Item2 == "HangupEvent")
            {
                Tuple<string, string> tpl1 = data.Key;

                Tuple<object, object> item1 = data.Value;

                ChannelHangupRequestEvent e = (ChannelHangupRequestEvent)item1.Item2;

                string Appname = e.Application;


                string pt;
                dicchannel.TryRemove(e.Channel.Id, out pt);
                int level;
                dicmenulevel.TryRemove(e.Channel.Id, out level);

                CancellationTokenSource source;
                diccancelationtasks.TryRemove(e.Channel.Id, out source);

            }
                

                success = bQueueevent.TryTake(out data);
        }

    }


    public static string getAudioMenubyApp(string Appname,string Channelid,out bool Isaudio,string digit = "")
    {
        string retaudio="";
         Isaudio = false;
       
        string[] stringSeparators = new string[] { "!!!!" };
        var result = Appname.Split(stringSeparators, StringSplitOptions.None);

        Tuple<string, string> mytpl = new Tuple<string, string>(result[0], result[1]);
        applicationMenuPostMongo myapplimenu;
        bool found = Dicapplication_Menu.TryGetValue(mytpl, out myapplimenu);
        if (found)
        {
            //  mymenu.
            Tuple<string, string> mytplmenu = new Tuple<string, string>(myapplimenu.fileMenu, myapplimenu.uid);
            menuPostMongo mymenu;
            bool foundMenu = DicMenu.TryGetValue(mytplmenu, out mymenu);
            if (foundMenu)
            {
                JArray textArray = JArray.Parse(mymenu.jsonarray);
                int level;
                bool foundmenu = dicmenulevel.TryGetValue(Channelid, out level);
                string audioname = "";
                string makchim = "";
                if (level == 0)
                    foreach (var jobj in textArray.OfType<JObject>())
                    {
                        audioname = jobj.GetValue("audioname").ToString();
                        makchim = "";
                        Isaudio = true;
                        break;

                    }
                else if (level == 1)
                    foreach (var jobj in textArray.OfType<JObject>())
                    {
                        if (jobj["items"] != null)
                        {
                            foreach (var address in jobj["items"])
                            {
                                if (address["items"] != null)
                                {
                                    audioname = address.Value<string>("audioname");
                                    makchim = address.Value<string>("makchim");
                                    if (makchim == digit)
                                        Isaudio = true;

                                    break;
                                }
                            }
                        }

                    }
                else if (level == 2)
                    foreach (var jobj in textArray.OfType<JObject>())
                    {
                        if (jobj["items"] != null)
                        {
                            foreach (var address in jobj["items"])
                            {
                                if (address["items"] != null)
                                {
                                    foreach (var address1 in address["items"])
                                    {
                                        //Level2
                                        if (address1["items"] != null)
                                        {
                                            audioname = address1.Value<string>("audioname");
                                            makchim = address1.Value<string>("makchim");
                                            if (makchim == digit)
                                                Isaudio = true;
                                            break;

                                        }

                                    }
                                }
                            }
                        }

                    }





                Tuple<string, string> tpl = new Tuple<string, string>(audioname, result[1]);
                AudioPostMongo myaudio;
                bool foundAudio= DicAudio.TryGetValue(tpl, out myaudio);
               if(foundAudio)
                retaudio = myaudio.id.ToString();

               
            }

        }
        return retaudio;
    }


    public static List<string> getdigitMenubylevel_byApp(string Appname, string Channelid)
    {
        string ret = "";

        string[] stringSeparators = new string[] { "!!!!" };
        var result = Appname.Split(stringSeparators, StringSplitOptions.None);

        Tuple<string, string> mytpl = new Tuple<string, string>(result[0], result[1]);
        applicationMenuPostMongo myapplimenu;
        List<string> listmakchim = new List<string>();
        bool found = Dicapplication_Menu.TryGetValue(mytpl, out myapplimenu);
        if (found)
        {
            Tuple<string, string> mytplmenu = new Tuple<string, string>(myapplimenu.fileMenu, myapplimenu.uid);
            menuPostMongo mymenu;
            bool foundMenu = DicMenu.TryGetValue(mytplmenu, out mymenu);
            if (foundMenu)
            {
                JArray textArray = JArray.Parse(mymenu.jsonarray);
                int level;
                bool foundmenulevel = dicmenulevel.TryGetValue(Channelid, out level);

                foreach (var jobj in textArray.OfType<JObject>())
                {
                    string name = jobj.GetValue("title").ToString();
                    if (jobj["items"] != null)
                    {
                        if (level == 0)
                            foreach (var address in jobj["items"])
                            {
                                var makchim = address.Value<string>("makchim");
                                listmakchim.Add(makchim);

                            }
                        else if (level == 1)
                            foreach (var address in jobj["items"])
                            {

                                if (address["items"] != null)
                                {
                                    foreach (var address1 in address["items"])
                                    {
                                        var makchim1 = address1.Value<string>("makchim"); //Level2
                                        listmakchim.Add(makchim1);

                                    }
                                }

                            }

                        else if (level == 2)
                            foreach (var address in jobj["items"])
                            {

                                if (address["items"] != null)
                                {
                                    foreach (var address1 in address["items"])
                                    {
                                      
                                        if (address1["items"] != null)
                                        {
                                            foreach (var address2 in address1["items"])
                                            {
                                                var makchim2 = address2.Value<string>("makchim"); //Level2
                                                listmakchim.Add(makchim2);

                                            }
                                           

                                        }

                                    }
                                }

                            }
                    }

                }


            }

        }
        return listmakchim;
    }


    private static async Task GetFromQueueinitial(int processid )
    {
        KeyValuePair<Tuple<string, AriClient>,contactsPostMongo> data;
        bool success = bQueueinitial.TryTake(out data);


        while (success)
        {
          
                Tuple<string, AriClient> tpl = data.Key;

                   contactsPostMongo item = data.Value;
                
                    string phone = item.phone;

                    string num = phone.Substring(1);

                     num ="+972"+ num;

              
                 var x = tpl.Item2.Channels.Originate("PJSIP/"+ num + "@TwilioOut", extension: "", context: "", priority: 1, null, app: tpl.Item1

             , appArgs: phone, callerId: "+972765996044", timeout: 10000, null, null, null, null, null);
                

        success = bQueueinitial.TryTake(out data);
        }

    }

    public static Dictionary<Tuple<string, string>, applicationContactsPostMongo>
        get_dic_applicationContacts(List<applicationContactsPostMongo> lst)
    {
        Dictionary<Tuple<string, string>, applicationContactsPostMongo> Dic = new Dictionary<Tuple<string, string>, applicationContactsPostMongo>();
        foreach (applicationContactsPostMongo item in lst)
        {
            string filename = item.fileAppli;
            string uid = item.uid;
            Tuple<string, string> tpl = new Tuple<string, string>(filename, uid);

            applicationContactsPostMongo lstrecp;
            bool foundtpl = Dic.TryGetValue(tpl, out lstrecp);
            if (foundtpl == false)
            {

                 Dic.Add(tpl, item);
            }

        }
    return (Dic);

    }


    public static Dictionary<Tuple<string, string>, List<contactsPostMongo>> get_dic_contacts(List<contactsPostMongo> lst)
    {

        Dictionary<Tuple<string, string>, List<contactsPostMongo>> Dic = new Dictionary<Tuple<string, string>, List<contactsPostMongo>>();


        foreach (contactsPostMongo item in lst)
        {
            string filename = item.filename;
            string uid = item.uid;
            Tuple<string , string> tpl = new Tuple<string, string>(filename, uid);

            List<contactsPostMongo> lstp;
            bool foundtpl = Dic.TryGetValue(tpl, out lstp);
            if (foundtpl == false)
            {   lstp = new List<contactsPostMongo>();
                Dic.Add(tpl, lstp);
            }

            lstp.Add(item);

        }
         return (Dic);
    }





    static void dequeue_thread_initial()
    {
        try
        {
            
            Task readerOne = Task.Run(() =>  GetFromQueueinitial(1));
            Task readerTwo = Task.Run( () =>  GetFromQueueinitial(2));
            Task readerThree = Task.Run( () =>  GetFromQueueinitial(3));
            Task readerFour = Task.Run( () =>  GetFromQueueinitial(4));
            Task readerFive = Task.Run( () =>  GetFromQueueinitial(5));
            Task readerSix = Task.Run( () =>  GetFromQueueinitial(6));
            Task readerSeven = Task.Run( () =>  GetFromQueueinitial(7));
            Task readerEight = Task.Run( () =>  GetFromQueueinitial(8));

            Task.WaitAll(readerOne, readerTwo, readerThree,
                readerFour, readerFive, readerSix, readerSeven, readerEight);  //





        }
        catch (Exception ex)
        {
            string msg = ex.Message;
   
        }
    }

    static void dequeue_thread_event()
    {
        try
        {

            Task readerOne = Task.Run(() => GetFromQueueevent(1));
            Task readerTwo = Task.Run(() => GetFromQueueevent(2));
            Task readerThree = Task.Run(() => GetFromQueueevent(3));
            Task readerFour = Task.Run(() => GetFromQueueevent(4));
            Task readerFive = Task.Run(() => GetFromQueueevent(5));
            Task readerSix = Task.Run(() => GetFromQueueevent(6));
            Task readerSeven = Task.Run(() => GetFromQueueevent(7));
            Task readerEight = Task.Run(() => GetFromQueueevent(8));

            Task.WaitAll(readerOne, readerTwo, readerThree,
                readerFour, readerFive, readerSix, readerSeven, readerEight);  //


            

        }
        catch (Exception ex)
        {
            string msg = ex.Message;

        }
    }


    public static async void start_senddata_thread()
    {
       

        IEnumerable<AudioPostMongo> lst_Audio = null;

        IEnumerable<menuPostMongo> lst_Menu = null;
        IEnumerable<contactsPostMongo> lst_Contacts = null;
        IEnumerable<applicationPostMongo> lst_Application = null;
        IEnumerable<applicationMenuPostMongo> lst_ApplicationMenu = null;
        IEnumerable<applicationContactsPostMongo> lst_application_contact = null;
        IEnumerable<applicationTimingMongo> lst_Application_timing = null;
        try
        {
            Task.Run(async () =>
            {
                lst_Audio = await get_Audio();
            }).Wait();

            Task.Run(async () =>
            {
                lst_Menu = await get_Menu();
            }).Wait();

            Task.Run(async () =>
            {
                lst_Contacts = await get_Contacts();
            }).Wait();


            Task.Run(async () =>
            {
                lst_Application = await get_Application();
            }).Wait();

            Task.Run(async () =>
            {
                lst_ApplicationMenu = await get_ApplicationMenu();
            }).Wait();

            Task.Run(async () =>
            {
                lst_application_contact = await get_application_contact();
            }).Wait();

            Task.Run(async () =>
            {
                lst_Application_timing = await get_Application_timing();
            }).Wait();

             Dicapplication_contact=
            get_dic_applicationContacts(lst_application_contact.ToList());

            Dictionary<Tuple<string, string>, applicationTimingMongo> Dicapplication_timing=
            get_dic_applicationTiming(lst_Application_timing.ToList());

            Dicapplication_Menu=
            get_dic_applicationMenu(lst_ApplicationMenu.ToList());

            Dictionary<Tuple<string, string>, applicationPostMongo> DicApplication=
            get_dic_application(lst_Application.ToList());

             Diccontacts =
            get_dic_contacts(lst_Contacts.ToList());

             DicMenu=
            get_dic_menu(lst_Menu.ToList());

             DicAudio=
              get_dic_audio(lst_Audio.ToList());


            




            var listAPI = new List<string>();
            foreach (KeyValuePair<Tuple<string, string>, applicationPostMongo> pair  in DicApplication)
            {
                Tuple<string, string> Appuid = pair.Key;
                applicationPostMongo myappli = pair.Value;

                if ((bool)myappli.isenabled==false)
                    continue;
                if ((bool)myappli.is2run == false)
                    continue;


                bool running= myappli.isrunning == null ? false : myappli.isrunning.Value;

                if (running== true)
                {
                    continue;
                }
                else
                {
                    var filter = Builders<BsonDocument>.Filter.Eq("application", Appuid.Item1)
                        & Builders<BsonDocument>.Filter.Eq("uid", Appuid.Item2);

                    var result1 = collectionevent.DeleteMany(filter);
                }
                    
                

                listAPI.Add(Appuid.Item1+"!!!!"+ Appuid.Item2);
            }

                    
            await Task.WhenAll(listAPI.Select(ip => ReadFromAddress(ip)));

          

           dequeue_thread_initial();



            dequeue_thread_event();


            foreach (var item in listAPI)
            {
               
                
                string[] stringSeparators = new string[] { "!!!!" };
                var result = item.Split(stringSeparators, StringSplitOptions.None);

                var Builder = Builders<applicationPostMongo>.Filter;
                var query = Builder.Where(r => r.filename == result[0]) &
                            Builder.Where(r => r.uid == result[1]);

                var update = Builders<applicationPostMongo>.Update
                    .Set(pn => pn.is2run, false)
                    .Set(pn => pn.isrunning, false);

                await appPostsMon.UpdateOneAsync(query, update);
            }
           

        }
        catch (Exception ex)
        {

            string msg = ex.Message;
        }
    }



    static async  Task ReadFromAddress(string AppName)
    {

        

        AriClient ActionClient  = new AriClient(new StasisEndpoint("127.0.0.1", 8088, "asterisk", "asterisk"), AppName);

        //ActionClient.OnStasisStartEvent += c_OnStasisStartEvent;
        //ActionClient.OnStasisEndEvent += c_OnStasisEndEvent;

        ActionClient.Connect();


        ActionClient.OnStasisStartEvent += c_OnStasisStartEvent;
        ActionClient.OnStasisEndEvent += c_OnStasisEndEvent;
        ActionClient.OnChannelDtmfReceivedEvent += ActionClientOnChannelDtmfReceivedEvent;
        ActionClient.OnChannelHangupRequestEvent += c_OnStasisHangupEvent;
     
        ActionClient.Connect();

        string[] stringSeparators = new string[] { "!!!!" };
        var result = AppName.Split(stringSeparators, StringSplitOptions.None);


        await Task.Run(() => enqueue_init(AppName, ActionClient));

        var Builder = Builders<applicationPostMongo>.Filter;
        var query = Builder.Where(r => r.filename == result[0]) &
                    Builder.Where(r => r.uid == result[1]);

        var update = Builders<applicationPostMongo>.Update
            .Set(pn => pn.isrunning, true);

        await appPostsMon.UpdateOneAsync(query, update);

        //
    }


    public static  bool enqueue_init(string AppName, AriClient myclient)
    {
        string[] stringSeparators = new string[] { "!!!!" };
        var result = AppName.Split(stringSeparators, StringSplitOptions.None);


       

        string appname = result[0] + "!!!!" + result[1];

        // set running to true;

        dicclient.TryAdd(appname, myclient);

        

        Tuple<string, AriClient> tpl = new Tuple<string, AriClient>(appname, myclient);

        Tuple<string, string> mytpl = new Tuple<string, string>(result[0], result[1]);
           applicationContactsPostMongo applicationContacts;
      bool found=   Dicapplication_contact.TryGetValue(mytpl, out applicationContacts);
        if(found==false)
            return false;

        string filecontacts = applicationContacts.fileContacts;

        Tuple<string, string> tplcontacts = new Tuple<string, string>(filecontacts, result[1]);
       
        List<contactsPostMongo> contacts;
        bool foundcontacts = Diccontacts.TryGetValue(tplcontacts , out contacts);
       

        if(foundcontacts==false)
            return false;
        foreach (contactsPostMongo item in contacts)
        {
            KeyValuePair<Tuple<string, AriClient>, contactsPostMongo> tpl1 = new KeyValuePair<Tuple<string, AriClient>, contactsPostMongo>(tpl, item);

            bQueueinitial.TryAdd(tpl1);
        }
        
        return true;
    }

    private async static void ActionClientOnChannelDtmfReceivedEvent(IAriClient sender, ChannelDtmfReceivedEvent e)
    {


        string[] stringSeparators = new string[] { "!!!!" };
        var result = e.Application.Split(stringSeparators, StringSplitOptions.None);

        string phone = "";
        bool foundchannel = dicchannel.TryGetValue(e.Channel.Id, out phone);
        if (foundchannel == false)
            return;


         List<string> digits = getdigitMenubylevel_byApp(e.Application, e.Channel.Id);

        if (digits.Contains(e.Digit) == false)
        {
            Tuple<string, string> tplkey1 = new Tuple<string, string>(e.Channel.Id, "ChannelDtmfReceivedEventWrong");
            Tuple<object, object> tplvalue1 = new Tuple<object, object>(sender, e);

            KeyValuePair<Tuple<string, string>, Tuple<object, object>> kvp1 =
                new KeyValuePair<Tuple<string, string>, Tuple<object, object>>(tplkey1, tplvalue1);

            bQueueevent.TryAdd(kvp1);
            return;
        }
           

         int level = 0;
       bool foundmenulevel = dicmenulevel.TryGetValue(e.Channel.Id, out level);
        if (foundmenulevel)
            dicmenulevel[e.Channel.Id] += 1;

        string mydate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

        var doc = new BsonDocument{
                                          { "uid", result[1] },
                                        { "application",result[0] },
                                        { "phone", phone },
                                        { "mydate", mydate },
                                        { "level", level+1 },
                                        { "ChannelId", e.Channel.Id },
                                        { "event",   "ChannelDtmfReceivedEvent" },
                                        {  "digit",e.Digit }
                                      };


        collectionevent.InsertOne(doc);
       collectioneventhistory.InsertOne(doc);

        Tuple<string, string> tplkey = new Tuple<string, string>(e.Channel.Id, "ChannelDtmfReceivedEvent");

        Tuple<object, object> tplvalue = new Tuple<object, object>(sender, e);

        KeyValuePair<Tuple<string, string>, Tuple<object, object>> kvp =
            new KeyValuePair<Tuple<string, string>, Tuple<object, object>>(tplkey, tplvalue);

        bQueueevent.TryAdd(kvp);


    }

    private async static void c_OnStasisStartEvent(IAriClient sender, StasisStartEvent e)
      {
 
         Tuple<string, string> tplkey = new Tuple<string, string>(e.Channel.Id, "StasisStartEvent");

        Tuple<object, object> tplvalue = new Tuple<object, object>(sender, e);

        KeyValuePair<Tuple<string, string>, Tuple<object, object>> kvp =
            new KeyValuePair<Tuple<string, string>, Tuple<object, object>>(tplkey, tplvalue);

        bQueueevent.TryAdd(kvp);


        dicchannel.TryAdd(e.Channel.Id, e.Args[0]);

        dicmenulevel.TryAdd(e.Channel.Id, 0);

        
        
       
        CancellationTokenSource source = new CancellationTokenSource();

        diccancelationtasks.TryAdd(e.Channel.Id, source);


        string[] stringSeparators = new string[] { "!!!!" };
        var result = e.Application.Split(stringSeparators, StringSplitOptions.None);

        string mydate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");


        var doc = new BsonDocument{
                                          { "uid", result[1] },
                                        { "application",result[0] },
                                        { "phone", e.Args[0] },
                                         { "mydate", mydate },
                                          { "ChannelId", e.Channel.Id },
                                        { "event",   "StasisStartEvent" }
                                      };


         collectionevent.InsertOne(doc);
       collectioneventhistory.InsertOne(doc);

    }
static async void c_OnStasisEndEvent(object sender, AsterNET.ARI.Models.StasisEndEvent e)
    {
        string[] stringSeparators = new string[] { "!!!!" };
        var result = e.Application.Split(stringSeparators, StringSplitOptions.None);


            string mydate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
        string phone = "";
        dicchannel.TryGetValue(e.Channel.Id, out phone);

        var doc = new BsonDocument{
                                          { "uid", result[1] },
                                        { "application",result[0] },
                                        { "phone", phone },
                                         { "mydate", mydate },
                                          { "ChannelId", e.Channel.Id },
                                        { "event",   "StasisEndEvent" }
                                      };


        collectionevent.InsertOne(doc);
        //collectioneventhistory.InsertOne(doc);

        Tuple<string, string> tplkey = new Tuple<string, string>(e.Channel.Id, "StasisEndEvent");

        Tuple<object, object> tplvalue = new Tuple<object, object>(sender, e);

        KeyValuePair<Tuple<string, string>, Tuple<object, object>> kvp =
            new KeyValuePair<Tuple<string, string>, Tuple<object, object>>(tplkey, tplvalue);

        bQueueevent.TryAdd(kvp);
     
           
    }
    
    private async static void c_OnStasisHangupEvent(IAriClient sender, ChannelHangupRequestEvent e)
    {
        string[] stringSeparators = new string[] { "!!!!" };
        var result = e.Application.Split(stringSeparators, StringSplitOptions.None);

        string phone = "";
        dicchannel.TryGetValue(e.Channel.Id, out phone);
        string mydate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

        var doc = new BsonDocument{
                                          { "uid", result[1] },
                                        { "application",result[0] },
                                        { "phone", phone },
                                          { "mydate", mydate },
                                           { "ChannelId", e.Channel.Id },
                                        { "event",   "HangupEvent" }
                                      };


        collectionevent.InsertOne(doc);
        collectioneventhistory.InsertOne(doc);

        Tuple<string, string> tplkey = new Tuple<string, string>(e.Channel.Id, "HangupEvent");

        Tuple<object, object> tplvalue = new Tuple<object, object>(sender, e);

        KeyValuePair<Tuple<string, string>, Tuple<object, object>> kvp =
            new KeyValuePair<Tuple<string, string>, Tuple<object, object>>(tplkey, tplvalue);

        bQueueevent.TryAdd(kvp);


    }

    public static Dictionary<Tuple<string, string>, applicationTimingMongo>
     get_dic_applicationTiming(List<applicationTimingMongo> lst)
    {
        Dictionary<Tuple<string, string>, applicationTimingMongo> Dic = new Dictionary<Tuple<string, string>, applicationTimingMongo>();
        foreach (applicationTimingMongo item in lst)
        {
            string filename = item.fileAppli;
            string uid = item.uid;
            Tuple<string, string> tpl = new Tuple<string, string>(filename, uid);

            applicationTimingMongo lstrp;
            bool foundtpl = Dic.TryGetValue(tpl, out lstrp);
            if (foundtpl == false)
            {

                Dic.Add(tpl, item);
            }

        }
        return (Dic);

    }

    public static Dictionary<Tuple<string, string>, AudioPostMongo>
     get_dic_audio(List<AudioPostMongo> lst)
    {
        Dictionary<Tuple<string, string>, AudioPostMongo> Dic = new Dictionary<Tuple<string, string>, AudioPostMongo>();
        foreach (AudioPostMongo item in lst)
        {
            string filename = item.filename;
            string uid = item.uid;
            Tuple<string, string> tpl = new Tuple<string, string>(filename, uid);

            AudioPostMongo lstrp;
            bool foundtpl = Dic.TryGetValue(tpl, out lstrp);
            if (foundtpl == false)
            {

                Dic.Add(tpl, item);
            }

        }
        return (Dic);

    }




    public static Dictionary<Tuple<string, string>, menuPostMongo>
     get_dic_menu(List<menuPostMongo> lst)
    {
        Dictionary<Tuple<string, string>, menuPostMongo> Dic = new Dictionary<Tuple<string, string>, menuPostMongo>();
        foreach (menuPostMongo item in lst)
        {
            string filename = item.filename;
            string uid = item.uid;
            Tuple<string, string> tpl = new Tuple<string, string>(filename, uid);

            menuPostMongo lstrp;
            bool foundtpl = Dic.TryGetValue(tpl, out lstrp);
            if (foundtpl == false)
            {

                Dic.Add(tpl, item);
            }

        }
        return (Dic);

    }



    public static Dictionary<Tuple<string, string>, applicationPostMongo>
      get_dic_application(List<applicationPostMongo> lst)
    {
        Dictionary<Tuple<string, string>, applicationPostMongo> Dic = new Dictionary<Tuple<string, string>, applicationPostMongo>();
        foreach (applicationPostMongo item in lst)
        {
            string filename = item.filename;
            string uid = item.uid;
            Tuple<string, string> tpl = new Tuple<string, string>(filename, uid);

            applicationPostMongo lstrp;
            bool foundtpl = Dic.TryGetValue(tpl, out lstrp);
            if (foundtpl == false)
            {

                Dic.Add(tpl, item);
            }

        }
        return (Dic);

    }


    public static Dictionary<Tuple<string, string>, applicationMenuPostMongo>
       get_dic_applicationMenu(List<applicationMenuPostMongo> lst)
    {
        Dictionary<Tuple<string, string>, applicationMenuPostMongo> Dic = new Dictionary<Tuple<string, string>, applicationMenuPostMongo>();
        foreach (applicationMenuPostMongo item in lst)
        {
            string filename = item.fileAppli;
            string uid = item.uid;
            Tuple<string, string> tpl = new Tuple<string, string>(filename, uid);

            applicationMenuPostMongo lstrp;
            bool foundtpl = Dic.TryGetValue(tpl, out lstrp);
            if (foundtpl == false)
            {

                Dic.Add(tpl, item);
            }

        }
        return (Dic);

    }


}
    public partial class Service1
{
   

    static void Main()
    {
        while (true)
        {


            try
            {
                DB.start_senddata_thread();

            }

            catch (Exception ex)
            {
               
            }


            Thread.Sleep(5000);
        }



    }

   

}



public class AudioPostMongo
{
    public ObjectId id { get; set; }

    public string uid { get; set; }
    public string? name { get; set; }

    public string? filename { get; set; }
}


public class applicationPostMongo
{
    public ObjectId id { get; set; }

    public string? uid { get; set; }

    public string? filename { get; set; }
    public bool? isenabled { get; set; }

    public bool? is2run { get; set; }

    public bool? isrunning { get; set; }
}

public class contactsPostMongo
{
    public ObjectId id { get; set; }

    public string? uid { get; set; }
    public string? name { get; set; }

    public string? filename { get; set; }
    public string? phone { get; set; }
}

public class menuPostMongo
{
    public ObjectId id { get; set; }

    public string? uid { get; set; }

    public string? filename { get; set; }
    public string? jsonarray { get; set; }
}


public class applicationContactsPostMongo
{
    public ObjectId id { get; set; }

    public string? uid { get; set; }

    public string? fileAppli { get; set; }

    public string? fileContacts { get; set; }

}

public class applicationMenuPostMongo
{
    public ObjectId id { get; set; }

    public string? uid { get; set; }

    public string? fileAppli { get; set; }

    public string? fileMenu { get; set; }

}

public class applicationTimingMongo
{
    public ObjectId id { get; set; }

    public string uid { get; set; }
    public string fileAppli { get; set; }
    public string date { get; set; }
}

