import { Text, TouchableOpacity, View, StyleSheet, TextInput,Button } from 'react-native';
import React, { useState, useEffect ,useCallback } from 'react';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import {
  AndroidAudioEncoder,
  AndroidOutputFormat,
  IOSAudioQuality,
  IOSOutputFormat,
  Recording,
} from 'expo-av/build/Audio'
import * as FileSystem from 'expo-file-system';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, FONT, SIZES } from "../constants";

import axiosInstance from '../helpers/axiosInstance';
import mime from "mime";



export default  function  Addaudio(props) {
  const { navigation } = props;
  const [errors, setErrors] = useState({}); 
  //const [selectedText, setSelectedText] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false); 
  //const [ doc, setDoc ] = useState();
const [name, setName] = useState(null); 
const [fileName, setFileName] = useState(null); 

const [uri, setUri] = useState(null); 
  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState('idle');


  const [permissionResponse, requestPermission] = Audio.usePermissions();

 




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
        // await Audio.setAudioModeAsync({
        //   allowsRecordingIOS: true,
        //   playsInSilentModeIOS: true
        // })

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          playThroughEarpieceAndroid: false,
          staysActiveInBackground: true,
        });
      }

      

      //const newRecording = new Audio.Recording();
      const { recording } = await Audio.Recording.createAsync({
        isMeteringEnabled: true,
        android: {
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY.android,
          extension: '.m4a',
          outputFormat: AndroidOutputFormat.DEFAULT,
          audioEncoder: AndroidAudioEncoder.DEFAULT,
        },
        ios: {
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY.ios,
          extension: '.m4a',
          outputFormat: IOSOutputFormat.LINEARPCM,
        },
        web: {
          mimeType: 'audio/wav',
          bitsPerSecond: 128000,
        },
      });
      setRecording(recording);
      console.log('Starting Recording')
      // await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      // await newRecording.startAsync();
     
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
        const fileName = `recording-${Date.now()}.m4a`;
       
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
}).then((res) => {


  if(res.data=="message"){
    alert('File name must be unique')
    return;
  }
  navigation.navigate('Audio')
})


   

}; 

return (
  <View style={{ flex: 1 }}>
    <View style={{ padding: 20, backgroundColor: 'lightgray' }}>
     
    </View>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <TouchableOpacity style={styles.button} onPress={handleRecordButtonPress}>
        <FontAwesome name={recording ? 'stop-circle' : 'circle'} size={64} color="white" />
      </TouchableOpacity>
   
  
    </View>
        
    <View style={{ flexDirection:"row" }}>
       
      
       <View style={{ marginHorizontal: 10,marginTop: 5 }}>
       <Text style={{fontSize: 10, fontWeight: 'bold'}}>שם קובץ </Text>
       <TextInput style={{ margin: 5, borderWidth: 1, padding: 10, fontSize: 16,width:150 }}
       value={name} 
       onChangeText={setName} 
       ></TextInput></View> 
        <View style={{ marginHorizontal: 10,marginTop: 5 }}>
          <Button title="שמור"  onPress={() => handleSubmit()} 
          style={[styles.button1, { opacity: isFormValid ? 1 : 0.5 }]} 
          disabled={!isFormValid} />
   </View>
   <View style={{ marginHorizontal: 10,marginTop: 5 }}>
          <Button title="בטל" onPress={() =>  navigation.navigate('Audio')} style={{ padding: 20, }} />
   </View>
   
</View>
      <View style={{ padding: 20, backgroundColor: 'lightgray' }}>
        {/* Content for the container at the top */}
      </View>
    </View>)



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

