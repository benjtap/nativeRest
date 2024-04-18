using MongoDB.Bson;

namespace Webhttp.Models
{

    public class FormDataAudio
    {
        public string? Audioname { get; set; }
        public IFormFile fileAudioname { get; set; }
     }

    public class deleteAudioPost
    {
        public string id { get; set; }

    }

    public class contactsPostMongo
    {
        public ObjectId id { get; set; }

        public string? name { get; set; }

        public string? phone { get; set; }
    }

    public class groupsPostMongo
    {
        public ObjectId id { get; set; }

        public string? name { get; set; }

       
    }

    public class AudioPostMongo
    {
        public ObjectId id { get; set; }
       
        public string? name { get; set; }

        public string? filename { get; set; }
    }

    public class AudiogroupMongo
    {
        public ObjectId id { get; set; }

        public string groupid { get; set; }
        public string audioid { get; set; }
    }
    public class AudioPost
    {
        public string id { get; set; }

        public string? name { get; set; }

        public string? filename { get; set; }
    }



    public class groupcontactsPostMongo
    {
        public ObjectId id { get; set; }
        public string Groupid { get; set; }

        public string ContactId { get; set; }

        public string? name { get; set; }

        public string? phone { get; set; }
    }

    public class groupcontactsPost
    {
        public string id { get; set; }
        public string Groupid { get; set; }

        public string ContactId { get; set; }

        public string? name { get; set; }

        public string? phone { get; set; }
    }


    public class groupsPost
    {
        public string id { get; set; }

        public string? name { get; set; }
       
    }

    public class contactsPost
    {
        public string id { get; set; }

        public string? name { get; set; }

        public string? phone { get; set; }
    }

    public class createcontactsPost
    {
       public string? name { get; set; }

        public string? phone { get; set; }
    }

    public class createAudio
    {
        public string? name { get; set; }

        public string? filename { get; set; }
    }

    public class createcontactsgroupPost
    {
        public string id { get; set; }

    }

    public class getAudiobyidReq
    {
        public string groupid { get; set; }

    }


    public class createAudiogroupPost
    {
        public string groupid { get; set; }
        public string audioid { get; set; }
    }

    public class creategroupsPost
    {
        public string? name { get; set; }

      
    }

    

}

