using Microsoft.AspNetCore.Http;
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

    public class deletetimingPost
    {
        public string id { get; set; }

    }
    public class deletegroup
    {
        public string id { get; set; }

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

    public class applicationPostMongo
    {
        public ObjectId id { get; set; }

        public string? uid { get; set; }

        public string? filename { get; set; }
        public bool? isenabled { get; set; }
    }

    public class contactsPostMongo
    {
        public ObjectId id { get; set; }

        public string? uid { get; set; }
        public string? name { get; set; }

        public string? filename { get; set; }
        public string? phone { get; set; }
    }

    public class groupsPostMongo
    {
        public ObjectId id { get; set; }
        public string? uid { get; set; }
        public string? name { get; set; }

       
    }

    public class registerPostMongo
    {
        public ObjectId id { get; set; }
        public string? username { get; set; }

        public string? password { get; set; }
        public string? fullname { get; set; }

        public string? email { get; set; }
    }

    public class userPost
    {
        public string id { get; set; }
        public string? username { get; set; }
      
    }

    public class AudioPostMongo
    {
        public ObjectId id { get; set; }

        public string uid { get; set; }
        public string? name { get; set; }

        public string? filename { get; set; }
    }

    //public class AudiogroupMongo
    //{
    //    public ObjectId id { get; set; }

    //    public string uid { get; set; }
    //    public string groupid { get; set; }
    //    public string audioid { get; set; }
    //}

    public class applicationTimingMongo
    {
        public ObjectId id { get; set; }

        public string uid { get; set; }
        public string fileAppli { get; set; }
        public string date { get; set; }
    }

    public class getappliTiming
    {
        public string id { get; set; }
        public string filename { get; set; }
        public string date { get; set; }
        public int height { get; set; }
        public string day { get; set; }
    }

    public class AudioPost
    {
        public string id { get; set; }

        public string? name { get; set; }

        public string? filename { get; set; }
    }

    public class AppliPost
    {
        public string id { get; set; }
        public bool? enabled { get; set; }
        public string? filename { get; set; }
    }

    //public class groupcontactsPostMongo
    //{
    //    public ObjectId id { get; set; }
    //    public string Groupid { get; set; }

    //    public string uid { get; set; }

    //    public string? name { get; set; }

    //    public string? phone { get; set; }
    //}

    //public class groupcontactsPost
    //{
    //    public string id { get; set; }
    //    public string Groupid { get; set; }

    //    public string uid { get; set; }

    //    public string? name { get; set; }

    //    public string? phone { get; set; }
    //}


    //public class groupsPost
    //{
    //    public string id { get; set; }

    //    public string? name { get; set; }
       
    //}

    public class AppliInfoPost
    {
        public string id { get; set; }

        public string? uid { get; set; }

        public string? filecontacts { get; set; }

        public string? filemenu { get; set; }

        public string? date { get; set; } = null;

        public bool? isenabled { get; set; } 
    }


    public class contactsPost
    {
        public string id { get; set; }

        public string? uid { get; set; }

        public string? name { get; set; }

        public string? phone { get; set; }
    }

    public class contactsfilesPost
    {
        public string id { get; set; }

        public string? uid { get; set; }

        public string? filename { get; set; }

       
    }

    public class menufilesPost
    {
        public string id { get; set; }

        public string? uid { get; set; }

        public string? filename { get; set; }


    }

    public class createcontactsPost
    {
       public string? name { get; set; }

        public string? filename { get; set; }

        public string? phone { get; set; }
    }

    public class createcontactsPostUid
    {

        public string? uid { get; set; }
        public string? name { get; set; }
        public string? filename { get; set; }
        public string? phone { get; set; }
    }


    public class createregisterPost
    {

        public string? username { get; set; }

        public string? password { get; set; }
        public string? fullname { get; set; }

        public string? email { get; set; }
    }

    public class AuthenticatedResponse
    {
        public string id { get; set; }
        public string? accessToken { get; set; }
        public string? refreshToken { get; set; }


    }


    public class TokenResponse
    {
        public string accessToken { get; set; }
        public string refreshToken { get; set; }
    }

    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }


    public class loginPost
    {

        public string? userName { get; set; }

        public string? password { get; set; }
       
    }

    public class createAudio
    {
        public string? name { get; set; }
        public string? uid { get; set; }
        public string? filename { get; set; }
    }

    public class createMenu
    {
        public string? jsonarr { get; set; }
        public string? uid { get; set; }
        public string? filename { get; set; }
    }

    public class createApp
    {
        public bool? isenabled { get; set; }
        public string? uid { get; set; }
        public string? filename { get; set; }

        public string? date { get; set; }
        public string? filemenu { get; set; }
        public string? filecontact { get; set; }


    }

    public class createcontactsgroupPost
    {
        public string id { get; set; }

    }

    public class getfilecontactsPost
    {
        public string? filename { get; set; }

    }


    public class getallinfoAppliPost
    {
        public string? filename { get; set; }

    }

    public class getfilemenuPost
    {
        public string? filename { get; set; }

    }
    public class getMenuPost
    {
        public string? filename { get; set; }

    }

    public class getAudiobyidReq
    {
        public string groupid { get; set; }

    }


    //public class creategrouptimingPost
    //{
    //    public string groupid { get; set; }
    //    public string date { get; set; }
    //}
    //public class createAudiogroupPost
    //{
    //    public string groupid { get; set; }
    //    public string audioid { get; set; }
    //}
    public class creategroupsPost
    {
     public string? name { get; set; }
    }

    public class createmenuPost
    {
        public string? filename { get; set; }
        public string? jsonarray { get; set; }
    }

    public class createappPost
    {
        public string? filename { get; set; }

        public string? filemenu { get; set; }

        public string? date { get; set; }
        public string? filecontact { get; set; }
        public bool? isenabled { get; set; }
    }

    public class creategroupsPostui
    {
        public string? uid { get; set; }
        public string? name { get; set; }
    }


}

