import { Text, TouchableOpacity, View, StyleSheet, TextInput,Platform } from 'react-native';
import React, { useState, useEffect ,useCallback } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, FONT, SIZES } from "../constants";

import axiosInstance from '../helpers/axiosInstance';
import mime from "mime";



export default  function  Action4(props) {
  const { navigation } = props;
  const [errors, setErrors] = useState({}); 
 
  const [isFormValid, setIsFormValid] = useState(false); 
  //const [ doc, setDoc ] = useState();
const [name, setName] = useState(null); 
const [fileName, setFileName] = useState(null); 

const [uri, setUri] = useState(null); 
  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState('idle');
  //const [audioPermission, setAudioPermission] = useState(null);

  const [permissionResponse, requestPermission] = Audio.usePermissions();

 

// const getPermission = useCallback(async() =>
// {
//   // async function () {
//     await Audio.requestPermissionsAsync().then((permission) => {
//       console.log('Permission Granted: ' + permission.granted);
//       setAudioPermission(permission.granted)
//     }).catch(error => {
//       console.log(error);
//     });

//     getPermission()
//     // Cleanup upon first render
//     return () => {
//       if (recording) {
//         stopRecording();
//       }
//     };
//   //}
// },[audioPermission]);



const validateForm = () => {
          if (!name)  { 
            
            errors.name = 'Name is required.'; 
              setIsFormValid(false);
              return;
          } 
          else if (recordingStatus!='stopped'){
            errors.name = 'Name is required.'; 
              setIsFormValid(false);
              return;
          }
          else
          {
           
            setErrors(errors); 
            setIsFormValid(true); 
              

          }
         
}



  useEffect(() => {
       
       validateForm();     // Call function to get permission
 
  }, [name,recordingStatus]);
 


  async function startRecording() {
    try {
     
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }

      // if (audioPermission) {

      if (permissionResponse.status !== 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        })
      }

      const newRecording = new Audio.Recording();
      console.log('Starting Recording')
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus('recording');

    } catch (error) {
      console.error('Failed to start recording', error);
    }
  }

  async function stopRecording() {
    try {

      if (recordingStatus === 'recording') {
        console.log('Stopping Recording')
        await recording.stopAndUnloadAsync();
        const recordingUri = recording.getURI();

        // Create a file name for the recording
        const fileName = `recording-${Date.now()}.caf`;
       
        setFileName(fileName)

        // Move the recording to the new directory with the new file name
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'recordings/', { intermediates: true });
        await FileSystem.moveAsync({
          from: recordingUri,
          to: FileSystem.documentDirectory + 'recordings/' + `${fileName}`
        });

        setUri(FileSystem.documentDirectory + 'recordings/' );

        // This is for simply playing the sound back
        const playbackObject = new Audio.Sound();
        await playbackObject.loadAsync({ uri: FileSystem.documentDirectory + 'recordings/' + `${fileName}` });
        await playbackObject.playAsync();

        // resert our states to record again
        setRecording(null);
        setRecordingStatus('stopped');
      }

    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  }

  async function handleRecordButtonPress() {
    if (recording) {
      const audioUri = await stopRecording(recording);
      if (audioUri) {
        console.log('Saved audio file to', savedUri);
      }
    } else {
      await startRecording();
    }
  }

 

const handleSubmit = async() => { 
  
  

  const ImageUri=uri+'/'+fileName;

const newImageUri =  "file:///" + ImageUri.split("file:/").join("");



const formData = new FormData();
formData.append('fileAudioname', {
 uri : newImageUri,
 type: mime.getType(newImageUri),
 name: newImageUri.split("/").pop()
})


formData.append('Audioname',name)


 let url ='/Webhttp/uploadAudio';

 axiosInstance.post(url, formData,{
 headers: {
  Accept: 'application/json',
  'Content-Type': 'multipart/form-data',
 }
}).then(({data}) => {
 
  navigation.navigate('Audio')
})


   

}; 


  return (
    <View style={styles.container}>

<View style={styles.Viewitem}><Text style={styles.title}>הקלטה חדשה</Text></View>
<View style={styles.fixToText}>
        <Text style={styles.title}>
        This action will create audio record with name.
      </Text>
      </View>

<View style={styles.container}>
                  <TextInput 
                    style={styles.input} 
                    placeholder="Name"
                    value={name} 
                    onChangeText={setName} 
                /> 
     
           </View>
      <TouchableOpacity style={styles.button} onPress={handleRecordButtonPress}>
        <FontAwesome name={recording ? 'stop-circle' : 'circle'} size={64} color="white" />
      </TouchableOpacity>
      <Text style={styles.recordingStatusText}>{`Recording status: ${recordingStatus}`}</Text>
   
               <TouchableOpacity 
                    style={[styles.button1, { opacity: isFormValid ? 1 : 0.5 }]} 
                    disabled={!isFormValid} 
                    onPress={handleSubmit} 
                > 
                <Text style={styles.buttonText}>Submit</Text> 
            </TouchableOpacity> 
   
    </View>
  );
}

const styles = StyleSheet.create({

  fixToText: {
    flex: 1,
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
        width: 158,
        height: 60, 
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

//   const options = {
//     method: 'POST',
//     body: formData,
//     mode: 'cors', //
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'multipart/form-data',
//     },
// };
  
// try {
//   const response = await fetch(
//     api.BASE_URL+`/Webhttp/uploadAudio`, options
//      ).catch((error) => console.log(error))
// } catch (error) {
//   console.log(error)
// }
  