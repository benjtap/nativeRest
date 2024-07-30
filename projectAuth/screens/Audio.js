import React, { useState, useEffect, useCallback } from 'react';

//import {useFocusEffect} from  '@react-navigation/native-stack'
 
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, Button,Alert } from 'react-native';

import { COLORS, FONT, SIZES } from "../constants";

import axiosInstance from '../helpers/axiosInstance';

import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from "expo-linear-gradient";

String.isNullOrEmpty = function(value) {
  return !(typeof value === "string" && value.length > 0);
}

const myAudio = (props) => {
  const { navigation } = props;

  
  //const { cometChat, setSelectedConversation } = useContext(Context);

  const [keyword, setKeyword] = useState('');
  // 0 is user, 1 is group.
  const [selectedType, setSelectedType] = useState(0);
  // data that will be shown on the list, data could be the list of users, or the list of groups.
 const [data, setData] = useState([]);
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState([]);
 
 const filterdata= React.useMemo(() =>{

  return data.filter(post =>  post.name.toLowerCase().includes(keyword.toLowerCase()))
  
  },[data,keyword])

async function runQuerygroup() {
  // Set the loading true.
  setLoading(true)
  
 //console.log(resgroup.data.groups)

  // Reset the loading state.
  setLoading(false)
  setData(resgroup.data.groups)
}



  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
    
        searchAudios();
     
    });
 

   
      searchAudios();
    
    return unsubscribe;
  
  }, [selectedType,navigation]);

 

  const deleteAudiorecord= async (item) => {
    const oparamid = item.id ;

    

    let deleteAudiorecordPost =  {
      id:oparamid
        }


let url = `/Webhttp/deleteAudiorecord`
  await axiosInstance.post(url,deleteAudiorecordPost)

  .then(({data}) => {

    if(data=="message"){
      alert('File exist in Menu, you must remove him before')
      return;
    }
    setData(data)
   })

  };
        

  const searchAudios = () => {
    const limit = 30;
    fetchAudiosDataForPosts();
   };

  const fetchAudiosDataForPosts = async () => {

    let url = `/Webhttp/getaudios`
    await axiosInstance.get(url)

    .then(({data}) => {
       setData(data)
    
     }).catch((err) => {
        
     })

    };


    const listenAudiorecord = async(item) => {
      const limit = 30;
      
       const filename = item.filename ;
       console.log(filename)
       const playbackObject = new Audio.Sound();
          await playbackObject.loadAsync({ uri: FileSystem.documentDirectory + 'recordings/' + `${filename}` });
          await playbackObject.playAsync();
  
       
      };
      const handleconfirmDelete= (item) => {
        Alert.alert(
          'confirmation',
          'Are you sure to delete', // <- this part is optional, you can pass an empty string
          [
            {text: 'כן', onPress: () => handleDelete(item)},
            {text: 'לא', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: true},
        );
    
      }

  const updateSelectedType = (selectedType) => () => {
    setSelectedType(() => selectedType);
  };

 

  const selectItem = (item) => () => {
   
  
    
      navigation.navigate('Audiodetails', {
        id: item.id ,name: item.name,filename: item.filename
      })
   }
    
  const handleDelete= (item) => {
    Alert.alert(
      'confirmation',
      'Are you sure to delete', // <- this part is optional, you can pass an empty string
      [
        {text: 'כן', onPress: () => deleteAudiorecord(item)},
        {text: 'לא', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: true},
    );

  }

 

 
const renderItems =  useCallback(({ item }) => {
  return (
    <LinearGradient colors={['#5ED2A0', '#C3CBDC']}> 
    <View style={{ flex: 1,flexDirection:"row", justifyContent: 'center',
     alignItems: 'center', }} >
     
    <View style={{ width: "14%",margin: 10 }}> 
    <Button title="מחק"  onPress={() => handleconfirmDelete( item)}   style={styles.button}  />
       </View>  
        
       <View style={{ width: "14%",margin: 10 }}> 
    <Button title="נגן"  onPress={() => listenAudiorecord( item)}   style={styles.button}  />
       </View>  
        
       <View style={{ flex: 1,marginHorizontal: 10,}}>
       <TouchableOpacity style={styles.listItem} >
<Text style={styles.listItemLabel}>{item.name}</Text>
</TouchableOpacity>
  </View>

 
  </View>
  </LinearGradient>
  );

})


  return (
    <View style={{ flex: 1 }}>
    <View style={{ padding: 20, backgroundColor: 'lightgray' }}>
  
    </View>
    <View style={styles.container}>
    <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize='none'
          onChangeText={setKeyword}
          placeholder="Search..."
          placeholderTextColor="#000"
          style={styles.input}
        />
      </View>
       <View style={styles.searchActionContainer}>
        <TouchableOpacity ref={(touchable) => this._touchable = touchable}
        style={[styles.searchActionBtn, styles.searchLeftActionBtn, selectedType === 0 && styles.searchActionBtnActive]} onPress={updateSelectedType(0)}>
          <Text style={[styles.searchActionLabel, selectedType === 0 && styles.searchActionLabelActive]}>הקלטה</Text>
        </TouchableOpacity>
       
      </View>
      <View style={styles.list}>
        <FlatList
          // data={data}
          data={filterdata}
          renderItem={renderItems}
          keyExtractor={(item, index) => item.id}
        />
       </View>
    <View style={{ padding: 20, backgroundColor: 'lightgray' }}>
       
      </View>
    </View>
    </View>
  );
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
      width:180
    },
    searchActionBtn: {
      backgroundColor: '#fff',
      borderColor: '#000',
      flex: 1,
       fontSize: 16,
      padding: 8,
      alignItems:'center',
    },
    searchLeftActionBtn: {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      marginRight: 0,
      alignItems:'center',
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
      alignItems:'center',
    },
    searchActionLabel: {
      color: '#000',
      fontSize: 16,
      textAlign: 'center',
      fontFamily:FONT.regular,
      fontSize: SIZES.large
     
    },
    searchActionLabelActive: {
      color: '#fff',
      fontFamily:FONT.regular,
      fontSize: SIZES.large,
     
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
      marginRight:10,
     
  
       
    },
    
    listItemLabel: {
       //fontSize: 16,
       color: COLORS.secondary,
       fontFamily:FONT.regular,
       fontSize: SIZES.medium,
       marginLeft: 13,
     },
     separator: {
      height: 1,
      width: '100%',
      backgroundColor: '#CCC'
      },
  
  });
  

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     flex: 1,
//     flexDirection: 'column',
//   },
//   inputContainer: {
//     marginTop: 8,
//   },
//   input: {
//     borderColor: '#000',
//     borderRadius: 8,
//     borderWidth: 1,
//     fontSize: 16,
//     marginHorizontal: 8,
//     padding: 12,
//   },
//   searchActionContainer: {
//     borderRadius: 8,
//     flexDirection: 'row',
//     margin: 8,
//   },
//   searchActionBtn: {
//     backgroundColor: '#fff',
//     borderColor: '#000',
//     flex: 1,
//     fontSize: 16,
//     padding: 8
//   },
//   searchLeftActionBtn: {
//     borderTopLeftRadius: 8,
//     borderBottomLeftRadius: 8,
//     marginRight: 0,
//   },
//   searchRightActionBtn: {
//     borderTopRightRadius: 8,
//     borderBottomRightRadius: 8,
//     marginLeft: 0,
//   },
//   searchActionBtnActive: {
//     backgroundColor: '#60A5FA',
//     borderColor: '#60A5FA',
//     borderRadius: 8,
//   },
//   searchActionLabel: {
//     color: '#000',
//     fontSize: 16,
//     textAlign: 'center',
//     fontFamily:FONT.regular,
//     fontSize: SIZES.large
//   },
//   searchActionLabelActive: {
//     color: '#fff',
//     fontFamily:FONT.regular,
//     fontSize: SIZES.large
//   },
//   list: {
//     flex: 1,
//   },
//   listItem: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignContent:'center',
//     marginHorizontal: 8,
//     paddingVertical: 12,
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     marginLeft:10,
//     marginRight:10
     
//   },
//   listItemImage: {
//     width: 32,
//     height: 32,
//     marginRight: 8
//   },
//   listItemLabel: {
//     color: COLORS.secondary,
//      fontFamily:FONT.regular,
//      fontSize: SIZES.medium,
//      marginLeft: 13,
 

//   }
// });

export default myAudio;