import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native'






const Action3 = (props) => {
  const { navigation } = props;

  let createcontactsPost1 =  {
         name:"test1",
         phone:'4444444' 
  }

  let createcontactsPost2 =  {
    name:"test2",
    phone:'4444444' 
}

   var lst = []

   lst.push(createcontactsPost1)
   lst.push(createcontactsPost2)

  const requestOptions = {
    method: 'POST',
    mode: 'cors', //no-
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lst)
    };

  useEffect(() => {
    (async () => {
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


    })();
   
  }, []);

 

  const searchContacts = () => {
    const limit = 30;
 
    
    fetchDataForPosts();

  
  };

return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>test2 screen!</Text>
  </View>
 );
};




export default Action3