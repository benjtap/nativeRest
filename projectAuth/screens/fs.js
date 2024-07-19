import React,{ useState, useEffect } from 'react'
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Asset } from "expo-asset";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';




const Fs = async (props) => {
    const { navigation } = props;
   
  


    useEffect(() => {
       
    //     const fetchData = async () => {
    //         const { localUri } = await Asset.fromModule(require('/src/data/your-dict.txt')).downloadAsync();

            
    // const dictString = await readAsStringAsync(localUri);
    // console.log("My Dictionary:", dictString);  

    //       }
        
          // call the function
          //fetchData()
       
       
//         const fileUri = FileSystem.documentDirectory + 'data.txt';
    

// FileSystem.writeAsStringAsync(fileUri, 'here goes your data from JSON. You can stringify it :)', {
//   encoding: FileSystem.EncodingType.UTF8,
// });

// const UTI = 'public.text';

// Sharing.shareAsync(fileUri, {UTI}).catch((error) => {
//   console.log(error);
// });

    }, []);


    // const uploadFileOnPressHandler = async () => {
    //   try {
       

    //       let result = await DocumentPicker.getDocumentAsync({});
          
    //       alert(result.uri);
          
    //       console.log(result);
          
          
        
    //     // await RNFS.readFile(pickedFile.uri, 'base64').then(data => {
    //     //   console.log('base64',data);
    //     // });
    //   } catch (err) {
       
    //   }
    // };

    // style={{ flex: 1 }}


    return (

  //     <View style={styles.fixToText}>
      
   
  //  <Button title="מחוק"    style={styles.button1}  onPress={async () => {
  //               uploadFileOnPressHandler();
  //           }} />
  //   </View>
      
  <View style={styles.container}>
  <View style={styles.Viewitem}><Text style={styles.title}>{title}</Text>
</View>

   
   
   
    
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
   
  });



export default Fs 