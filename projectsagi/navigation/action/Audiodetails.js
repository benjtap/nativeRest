import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, Button } from 'react-native';
import {useRoute} from '@react-navigation/native';
import { COLORS, FONT, SIZES } from "../constants";
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { api }  from "../client"; 

String.isNullOrEmpty = function(value) {
  return !(typeof value === "string" && value.length > 0);
}

const Audiodetails = (props) => {
  const { navigation } = props;

  const route = useRoute();
  
  

//   const [keyword, setKeyword] = useState('');
//   // 0 is user, 1 is group.
  const [selectedType, setSelectedType] = useState(0);
//   // data that will be shown on the list, data could be the list of users, or the list of groups.
  const [data, setData] = useState([]);
   const [title, setTitle] = useState("");
const [loading, setLoading] = useState(false)
const [error, setError] = useState("");





  const oparamname = route.params?.name ? route.params.name : {};

  


  function handlelistenAudiorecord() {
    listenAudiorecord();
  }

  function handledeleteAudiorecord() {
    deleteAudiorecord();
  }


  const RenderViewButton = () => {
    if (selectedType === 0){
    return(

      <View style={styles.Viewitem}>
    
    <View style={styles.fixToTextCenter}>
      <Button   style={styles.button1}  title="שמע הקלטה"  
      onPress={() => handlelistenAudiorecord()}
     />
    </View>
    </View>
    );
    } else if(selectedType === 1){
      return(

        <View style={styles.Viewitem}>
       <View style={styles.fixToText}>
        <Text style={styles.title}>
        This action delete  the audio record .
      </Text>
      </View>
      <View style={styles.fixToText}>
        <Button   style={styles.button1}  title="מחוק"  
        onPress={() => handledeleteAudiorecord()}
       />
      </View>
      </View>
      );
    }
    
  }
 
useEffect(() => {
  
  const oparamname = route.params?.name ? route.params.name : {};
  setTitle(oparamname);

}, [title]);
 

 

   const listenAudiorecord = async() => {
    const limit = 30;
    
     const filename = route.params?.filename ? route.params.filename : {};
     const playbackObject = new Audio.Sound();
        await playbackObject.loadAsync({ uri: FileSystem.documentDirectory + 'recordings/' + `${filename}` });
        await playbackObject.playAsync();

     
    };
  
    const deleteAudiorecord= async () => {
      const oparamid = route.params?.id ? route.params.id : {};

      console.log(oparamid)
  
      let deleteAudiorecordPost =  {
        id:oparamid
          }
      const requestOptions=  {
        method: 'POST',
        mode: 'cors', //no-
        headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(deleteAudiorecordPost)
     };
      try {
       
       const response = await fetch(
        api.BASE_URL+`/Webhttp/deleteAudiorecord`, requestOptions
        )
        .then(function(response){
          if (response.ok){
            
            navigation.navigate('Audio')
            
          }
      })
     
  
      } catch (err) {
        setError(err);
        console.log(err)
        setData(null);
      } finally {
        setLoading(false);
      }
    };
  



  const createcontactgroupsDataForPosts = async () => {
    const oparamid = route.params?.id ? route.params.id : {};

    let creategroupcontactsPost =  {
      id:oparamid
        }
    const requestOptions=  {
      method: 'POST',
      mode: 'cors', //no-
      headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(creategroupcontactsPost)
   };
    try {
     
     const response = await fetch(
        `http://192.168.1.104/Restapi/Webhttp/bulkgroupcontacts`, requestOptions
      )
      .then(function(response){
        if (response.ok){
          
          //fetchgroupsDataForPosts();
          
        }
    })
   

    } catch (err) {
      setError(err.message);
      console.log(err.messages)
      setData(null);
    } finally {
      setLoading(false);
    }
  };


  const onKeywordChanged = (keyword) => {
   // setKeyword(() => keyword);
  };

  const updateSelectedType = (selectedType) => () => {
   setSelectedType(() => selectedType);
  };

 


 
  
 

  return (
    // <View style={styles.container}>
  <View style={styles.container}>
    <View style={styles.Viewitem}><Text style={styles.title}>{title}</Text>
 </View>
 
      <View style={styles.searchActionContainer}>
        <TouchableOpacity style={[styles.searchActionBtn, styles.searchLeftActionBtn, selectedType === 0 && styles.searchActionBtnActive]} onPress={updateSelectedType(0)}>
          <Text style={[styles.searchActionLabel, selectedType === 0 && styles.searchActionLabelActive]}>שמע הקלטה</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.searchActionBtn, styles.searchRightActionBtn, selectedType === 1 && styles.searchActionBtnActive]} onPress={updateSelectedType(1)}>
          <Text style={[styles.searchActionLabel, selectedType === 1 && styles.searchActionLabelActive]}>מחוק</Text>
        </TouchableOpacity>
        
      </View>
     
      <RenderViewButton />
     
     
      
    </View>
   
 
     
   
  );
};

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
    flex: 1,
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

export default Audiodetails;