import React, { useState, useEffect, useContext } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, TextInput,Platform,Button } from 'react-native';

import { COLORS, FONT, SIZES } from "../constants";

import axiosInstance from '../helpers/axiosInstance';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Asset } from "expo-asset";

import * as DocumentPicker from 'expo-document-picker';

const Action3 = (props) => {
  const { navigation } = props;

  const [fileUri, setfileUri] = useState(""); 
  const [name, setName] = useState(""); 
  const [selectedText, setSelectedText] = useState(null);
  

  const handleChangeText=  () => {

  }
  
  const SaveOnPressHandler = async () => {
    try {
      console.log(fileUri);

        
FileSystem.writeAsStringAsync(fileUri, selectedText, {
  encoding: FileSystem.EncodingType.UTF8,
});

// const UTI = 'public.text';

// Sharing.shareAsync(fileUri, {UTI}).catch((error) => {
//   console.log(error);
// });
      
  
    } catch (err) {
     console.log(err)
    }
  };


  const openFileOnPressHandler = async () => {
      try {
       

        const docRes = await DocumentPicker.getDocumentAsync({
          type: ['application/csv','text/plain','application/json'],
          copyToCacheDirectory: true

        });
        
        



        const assets = docRes.assets;
        if (!assets) return;


      
        const file = assets[0];
      
     
        setfileUri(file.uri)

        const content =await FileSystem.readAsStringAsync(file.uri, {
          encoding: 'utf8',
          position: 1,
          length: 1,
        });
      

   

        const normalizedFile = { ...file, uri: content };
        setName(normalizedFile.name)
        setSelectedText(content);
    
      } catch (err) {
       console.log(err)
      }
    };



  
  useEffect(() => {
       
   

}, []);



  

 

  return (
    <View style={styles.container}>

<View style={styles.Viewitem}><Text style={styles.title}> קובץ אנשי קשר</Text></View>
<View style={styles.fixToText}>

  <TouchableOpacity 
                    style={[styles.button1, { opacity: 1  }]} 
                   
                    onPress={async () => {
                      openFileOnPressHandler();
                 }}
                > 
                <Text style={styles.buttonText}>טען קובץ</Text> 
            </TouchableOpacity> 

      </View>

<View style={styles.container}>
<Text style={styles.listItemLabel}>{name}</Text>
                 <TextInput multiline
                    style={styles.input} 
                    value={selectedText}
                   numberOfLines={10}
                  textAlignVertical='top'
                  onChangeText={text => setSelectedText(text)}
                />

           </View>
      
           <View style={styles.fixToText}>

<TouchableOpacity 
                  style={[styles.button1, { opacity: 1  }]} 
                 
                  onPress={async () => {
                    SaveOnPressHandler();
               }}
              > 
              <Text style={styles.buttonText}>שמור</Text> 
          </TouchableOpacity> 

    </View>

      
    </View>
  );
}

const styles = StyleSheet.create({


  listItemLabel: {
    color: COLORS.secondary,
     fontFamily:FONT.regular,
     fontSize: SIZES.medium,
     marginLeft: 13,
 

  },
  fixToText: {
   
    flexDirection: 'row',
    justifyContent: 'space-around',
    justifyContent: 'space-between',
    marginLeft:10,
    marginRight:10
  },
  Viewitem: {
   
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent:'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginBottom:18
     
  },
  title: {
    fontFamily:FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary
    
  },


  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'red',
  },
  recordingStatusText: {
    marginTop: 16,
  },
   input: { 
        width: 258,
        height: 360, 
        borderColor: '#ccc', 
        borderWidth: 1, 
        marginBottom: 12, 
        paddingHorizontal: 10, 
        borderRadius: 8, 
        fontSize: 16, 
    }, 
   
    buttonText: { 
        color: '#fff', 
        fontWeight: 'bold', 
        fontSize: 16, 
    }, 
    error: { 
        color: 'red', 
        fontSize: 20, 
        marginBottom: 12, 
    }
});




export default Action3