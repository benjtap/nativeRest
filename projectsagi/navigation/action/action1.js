import React,{ useState, useEffect, useContext } from 'react'
import { Platform,View, Text  } from 'react-native'
//

import * as Contacts from 'expo-contacts';

const Action1 = () => {

  const [contacts, setContacts] = useState(null);
  var lst = [] 
  

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers,Contacts.Fields.FirstName,Contacts.Fields.LastName],
        });

        if (data.length > 0) {
          //const contact = data[0].phoneNumbers[0].number;
         // const contact = data[0].name
          //console.log(contact);

         
          var contactlist = data.map( function(item) {
             if ((item.name !=undefined) && (item.phoneNumbers !=undefined)){
              var createcontactsPost =
              { 
               "name": item.name,
               "phone": item.phoneNumbers[0].number
               }
               lst.push(createcontactsPost)
           
               return lst;
              
             }
                
               });
               
               const requestOptions = {
                method: 'POST',
                mode: 'cors', //no-
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(lst)
                };
               try {
                const response = await fetch(
                   `http://192.168.1.104/Restapi/Webhttp/bulkcontacts`, requestOptions
                 )
                 .then(function(response){
                   if (response.ok){
                     
                     return response.json()
                     
                   }
               })
               .then(function(myjson){
                   
                 })
           
               } catch (err) {
               
               } finally {
             
               }

       ///////////////////////// 
        
        }
      }
    })();
  }, []);

  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>test1 screen!</Text>
  </View>
  )
}



export default Action1 

