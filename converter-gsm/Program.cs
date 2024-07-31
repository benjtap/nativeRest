using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Core.Configuration;
using System.Collections.Concurrent;
using Docker.DotNet;
using Docker.DotNet.Models;
using System.Collections.Generic;
using System;
using System.Diagnostics;




public static class DB
{
    static string ConnectionString = @"mongodb://userdb:100171@localhost:27017/?authMechanism=SCRAM-SHA-256";
    static string DatabaseName = "contact_group";

    static IMongoDatabase database = new MongoClient(ConnectionString).GetDatabase(DatabaseName);

    static IMongoCollection<BsonDocument> collectionaudioconvert= database.GetCollection<BsonDocument>("audio_convert");

    public static BlockingCollection<Dictionary<string,string>> bQueueinitial = new BlockingCollection<Dictionary<string, string>>();
    public enum type_step
    {
        initial = 1,
        send_sms = 3,
        shortner = 2
    }


   

    public static async Task<bool> enqueue_initial(Dictionary<string, string> DicRecipientInitial)
    {
        var result = await Task.Run(() => enqueue_init( DicRecipientInitial));
        return result;
    }


    public static dynamic ListToCollection(type_step step)
    {

        dynamic result = null;

        if (step == type_step.initial)
            result = collectionaudioconvert.Find(new BsonDocument()).ToList();

       

        return result;

    }

    public static async Task<dynamic> data_mongo_initial(type_step step)
    {
        var result = await Task.Run(() => ListToCollection(step));
        return result;
    }

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

            public static bool enqueue_init(Dictionary<string, string> DicRecipientInitial)
               {
               bQueueinitial.TryAdd(DicRecipientInitial);
                return true;
               }


   


    private static async Task GetFromQueueinitial(int processid )
    {
        Dictionary<string, string> data;
        bool success = bQueueinitial.TryTake(out data);
        KeyValuePair<string, string> kv = data.FirstOrDefault();


        while (success && data.Count >0)
        {
            Process myProcess;
            TaskCompletionSource<bool> eventHandled;
            try
            {
                //Write code Here!!!!

                eventHandled = new TaskCompletionSource<bool>();

                using (myProcess = new Process())
                {
                    try
                    {

                      

                        String[] s2 = new String[5];
                        s2[0] = "docker";
                        s2[1] = "cp";
                        s2[2] = "C:\\Upload\\"+ kv.Value ;
                        s2[3] = "cd3c04a08256045ca097201221d22f343c74e9e285a4bdaaee2efc3a583b61da:/var/lib/asterisk/sounds/en/wav/"+ kv.Value;


                     

                        myProcess.StartInfo.FileName = "cmd.exe"; ;
                        //  myProcess.StartInfo.Verb = "Print";
                        myProcess.StartInfo.CreateNoWindow = true;
                        myProcess.EnableRaisingEvents = true;
                        myProcess.StartInfo.Arguments = @"/c " + s2[0] + " " + s2[1] + " " + s2[2] + " " + s2[3];
                        
                      
                        myProcess.Start();

                        await Task.WhenAny(eventHandled.Task, Task.Delay(3000));

                       // myProcess.Kill();

                      //  myProcess.WaitForExit();
                    }



                    catch (Exception ex)
                    {
                        ;
                        return;
                    }

                   
                 
                }
                DockerClient client = new DockerClientConfiguration()
                  .CreateClient();


                var created = await client.Exec
                    .ExecCreateContainerAsync("cd3c04a08256045ca097201221d22f343c74e9e285a4bdaaee2efc3a583b61da"
                    , new ContainerExecCreateParameters()
                    {
                        AttachStdin = true,
                        AttachStdout = true,
                        Cmd = new List<string>()
                        {
                            "ffmpeg",
                            "-i",
                             "/var/lib/asterisk/sounds/en/wav/"+ kv.Value ,
                            "/var/lib/asterisk/sounds/en/wav/"+ kv.Key +".wav"

                        },
                        Tty = true,
                        AttachStderr = true,

                    });
                    await client.Exec.StartContainerExecAsync(created.ID);

                await Task.Delay(2000);

                var created2 = await client.Exec
    .ExecCreateContainerAsync("cd3c04a08256045ca097201221d22f343c74e9e285a4bdaaee2efc3a583b61da"
    , new ContainerExecCreateParameters()
    {
        AttachStdin = true,
        AttachStdout = true,
        Cmd = new List<string>()
        {
            "sox",
           "/var/lib/asterisk/sounds/en/wav/"+ kv.Key +".wav",
           "-r",
           "8000",
           "-c1",
           "/var/lib/asterisk/sounds/en/"+ kv.Key +".gsm",

        },
        Tty = true,
        AttachStderr = true,

    });
                await client.Exec.StartContainerExecAsync(created2.ID);

                var filter = Builders<BsonDocument>.Filter.Eq("id", kv.Key) &
                      Builders<BsonDocument>.Filter.Eq("filename", kv.Value);

               

                await DB.collectionaudioconvert.DeleteOneAsync(filter);
            }
            catch (Exception ex)
            {

                

            }


            success = bQueueinitial.TryTake(out data);



        }

    }

   

    static void dequeue_thread_initial(Dictionary<string, string> DicRecipientInitial)
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

    public static async void start_senddata_thread()
    {

        try
        {
            List<BsonDocument> lst_mongoinitial = null;
            Task.Run(async () =>
            {
               lst_mongoinitial = await data_mongo_initial(type_step.initial);
            }).Wait();





            Dictionary<string,string> DicRecipientInitial = get_dic_file(lst_mongoinitial);

            Task.Run(async () =>
            {
                await enqueue_initial(DicRecipientInitial);
            }).Wait();



            dequeue_thread_initial(DicRecipientInitial);

        }
        catch (Exception ex)
        {

            string msg = ex.Message;
        }
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




