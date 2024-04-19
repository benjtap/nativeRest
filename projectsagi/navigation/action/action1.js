import React,{ useState, useEffect } from 'react'


import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, Button } from 'react-native';

import { COLORS, FONT, SIZES } from "../constants";

import * as Contacts from 'expo-contacts';

const Action1 = () => {
  const [selectedType, setSelectedType] = useState(0);
  // const [contacts, setContacts] = useState(null);
  var lst = [] 
  

  // useEffect(() => {
    
  // }, []);

  // const updateSelectedType = (selectedType) => () => {
  //   setSelectedType(() => selectedType);
  //  };
 
   const RenderViewButton = () => {
   
    return(

      <View style={styles.Viewitem}>
    
    <View style={styles.fixToTextCenter}>
      <Button   style={styles.button1}  title="ייצוא רשימת אנשי קשר"  
      onPress={() => handlecreatelistecontact()}
     />
    </View>
    </View>
    )}


    async function handlecreatelistecontact() {
      (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers,Contacts.Fields.FirstName,Contacts.Fields.LastName],
          });
  
          if (data.length > 0) {
                     
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
    }


  return (
    <View style={styles.container}>
    <View style={styles.Viewitem}><Text style={styles.title}> ייצוא אנשי קשר</Text>
    </View>
    <View style={styles.fixToText}>
        <Text style={styles.title}>
        This action copy the mobile phone contact list to the list contact .
      </Text>
      </View>
 
      {/* <View style={styles.searchActionContainer}>
        <TouchableOpacity style={[styles.searchActionBtn, styles.searchLeftActionBtn, selectedType === 0 && styles.searchActionBtnActive]} onPress={updateSelectedType(0)}>
          <Text style={[styles.searchActionLabel, selectedType === 0 && styles.searchActionLabelActive]}>שמע הקלטה</Text>
        </TouchableOpacity>
        
        
      </View> */}
     
      <RenderViewButton />
     
     
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
  },
  inputContainer: {
    marginTop: 8,
  },

  button1: { 
    backgroundColor: '#aaa', 
    borderRadius: 8, 
    paddingVertical: 10, 
    alignItems: 'center', 
    marginTop: 16, 
    marginBottom: 12,
    width: 68,
    height: 48, 
},
  fixToText: {
   
    flexDirection: 'row',
    justifyContent: 'space-around',
    justifyContent: 'space-between',
    marginLeft:10,
    marginRight:10
  },
  fixToTextCenter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    justifyContent: 'space-between',
    alignItems:'center',
    justifyContent:'center'
    

  },
  Viewitem: {
   
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent:'center',
    alignItems: 'center',
    borderBottomWidth: 1,
     
  },
  title: {
    fontFamily:FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary
    
  },
  input: {
    borderColor: '#000',
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    marginHorizontal: 8,
    padding: 12,
  },
  searchActionContainer: {
    borderRadius: 8,
    flexDirection: 'row',
    margin: 8,
  },
  searchActionBtn: {
    backgroundColor: '#fff',
    borderColor: '#000',
    flex: 1,
    fontSize: 16,
    padding: 8
  },
  searchLeftActionBtn: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginRight: 0,
  },
  searchRightActionBtn: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginLeft: 0,
  },
  searchActionBtnActive: {
    backgroundColor: '#60A5FA',
    borderColor: '#60A5FA',
    borderRadius: 8,
  },
  searchActionLabel: {
    color: '#ccf',
    fontSize: 16,
    textAlign: 'center',
    fontFamily:FONT.medium,
    fontSize: SIZES.small,

  },
  searchActionLabelActive: {
    color: '#ffa',
    fontFamily:FONT.medium,
    fontSize: SIZES.small,
  },
  list: {
    flex: 1,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent:'center',
    marginHorizontal: 8,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginLeft:10,
    marginRight:10
     
  },
 
  listItemImage: {
    width: 32,
    height: 32,
    marginRight: 8
  },
  listItemLabel: {
    fontSize: 16,
 

  }
});



export default Action1 

