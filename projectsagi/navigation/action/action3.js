import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native'






const Test3 = (props) => {
  const { navigation } = props;



  let CreategroupsPost =  {
    name:"הפצה3",
  }

   var lst = []

  // lst.push(createcontactsPost1)
   //lst.push(createcontactsPost2)

  const requestOptions = {
    method: 'POST',
    mode: 'cors', //no-
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(CreategroupsPost)
    };

  useEffect(() => {
    (async () => {
      try {
       const response = await fetch(
          `http://192.168.1.104/Restapi/Webhttp/creategroups`, requestOptions
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
 
    
   // fetchDataForPosts();

  
  };

return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>test2 screen!</Text>
  </View>
 );
};




export default Test3