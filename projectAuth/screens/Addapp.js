import { Text, TouchableOpacity, View, StyleSheet, TextInput,Button,Switch } from 'react-native';
import React, { useState, useEffect ,useCallback } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, FONT, SIZES } from "../constants";

import axiosInstance from '../helpers/axiosInstance';
import mime from "mime";
import { Dropdown } from 'react-native-element-dropdown';
import moment from "moment";
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


export default  function  Addaudio(props) {
  const { navigation } = props;
  const [errors, setErrors] = useState({}); 
  const [isFocusafatsa, setIsFocusafatsa] = useState(false);
  const [isFocusafmenu, setIsFocusmenu] = useState(false);
  const [valueafatsa, setValueafatsa] = useState(null);
  const [valuemenu, setValuemenu] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false); 
  const [dataddlmenu, setDataddlmenu] = useState([]);
  const [dataddlafatsa, setDataddlafatsa] = useState([]);
const [name, setName] = useState(null); 
const [selectedDate, setSelectedDate] = useState(new Date("0000-1-1"));
const [datePickerVisible, setDatePickerVisible] = useState(false);
const [isEnabled, setIsEnabled] = useState(false);
const toggleSwitch = () => setIsEnabled(previousState => !previousState);
const [didFetch,setDidFetch] = useState(false)


const onSubmit = async() => {
  if(value==null){
    Alert.alert(
      "התראה",
      "נא הכנס קבוצה"
    );
  }
}

  const fetchafatsaDataForPosts = async () => {
    const limit = 30;



    let url = `/Webhttp/getAllfilescontacts`

    await axiosInstance.get(url)

      .then(({ data }) => {
       
        // Array to store partial objects
        let ddldata = [];

     
        data.forEach(obj => {
          const partialObj = {};
          partialObj.label = obj.filename;
          partialObj.value = obj.filename;
       
          ddldata.push(partialObj);
        });

        
        setDataddlafatsa(ddldata)


      })

  };
  
  
  const fetchmenuDataForPosts = async () => {
    const limit = 30;



    let url = `/Webhttp/getAllfilesMenu`

    await axiosInstance.get(url)

      .then(({ data }) => {
       
        // Array to store partial objects
        let ddldata = [];

        // Using forEach() to create partial objects
        data.forEach(obj => {
          const partialObj = {};
          partialObj.label = obj.filename;
          partialObj.value = obj.filename;
    
          ddldata.push(partialObj);
        });

        
        setDataddlmenu(ddldata)


      })

  };
  



useEffect(() => {
       
  validateForm();   

  if(!didFetch){
   console.log(selectedDate.getFullYear())
   fetchafatsaDataForPosts();
   fetchmenuDataForPosts();
   setDidFetch(true)
   
   }


}, [name,valueafatsa,valuemenu]);

  
const handleConfirm = (date) => {
  setSelectedDate(date);
  hideDatePicker();
};

const hideDatePicker = () => {
  setDatePickerVisible(false);
};

const showDatePicker = () => {
  setDatePickerVisible(true);
};



const validateForm = () => {
          if (!name)  { 
            
            errors.name = 'Name is required.'; 
              setIsFormValid(false);
              return;
          } 
          else if ((valueafatsa==null) ||   (valuemenu==null)){
            errors.valueafatsa = 'afatsa or menu is required .'; 
              setIsFormValid(false);
              return;
          }
          else
          {
           console.log(valueafatsa)
            setErrors(errors); 
            setIsFormValid(true); 
              

          }
         
}

const handleSubmit = async() => { 
  
    
  var createappPost =
  { 
   "isenabled": isEnabled,
   "filename":name,
   "filemenu":valuemenu,
   "filecontact" :valueafatsa,
   "date":selectedDate,
   "is2run":false,
   "isrunning":false
   }
  const url =`/Webhttp/createapp`;

   await axiosInstance.post(url,createappPost) .then((res) => {
    console.log(res)

  if(res.data=="message"){
    alert('File name must be unique')
    return;
  }
   
  navigation.navigate('Application')
  })

 
}


   



return (
  <View style={{ flex: 1 }}>
    <View style={{ padding: 20, backgroundColor: 'lightgray' }}>
     
    </View>
   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>  
   

      <View style={{ flexDirection:"column" }}>
      <View style={{ marginHorizontal: 10,marginTop: 5 }}>
      <Text style={styles.title}>
      בחר הפצה
    </Text>
    </View>
    <View style={{ marginTop:5 }}>
        <Dropdown
          style={[styles.dropdown, isFocusafatsa && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
           inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={dataddlafatsa}
           maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusafatsa ? 'בחר' : '...'}
        
          value={valueafatsa}
          onFocus={() => setIsFocusafatsa(true)}
          onBlur={() => setIsFocusafatsa(false)}
          onChange={item => {
           
            setValueafatsa(item.label);
            setIsFocusafatsa(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocusafatsa ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        /></View>
         <View style={{ marginTop: 5 }}>
          <Text style={styles.title}>
      בחר תפריט
    </Text></View>
    <View style={{margin: 5 }}>
        <Dropdown
          style={[styles.dropdown, isFocusafmenu && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
           inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={dataddlmenu}
          
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusafmenu ? 'בחר' : '...'}
        
          value={valuemenu}
          onFocus={() => setIsFocusmenu(true)}
          onBlur={() => setIsFocusmenu(false)}
          onChange={item => {
            setValuemenu(item.label);
            setIsFocusmenu(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={setIsFocusmenu ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
        </View>
  

      </View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
          {selectedDate.getFullYear()>10 ? selectedDate.toLocaleDateString()  + " " + selectedDate.toLocaleTimeString() : 'No date selected'}
        </Text>
        <View style={{ flexDirection:"row" }}>
        
       <View style={{ marginHorizontal: 10,marginTop: 5 }}>
        <Button title="בחר תאריך" 
        onPress={() => {
          setSelectedDate(new Date())
          showDatePicker(true)
       }} 
        />
        </View>
        <View style={{ marginHorizontal: 10,marginTop: 5 }}>
        <Button title="בטל תאריך"
        onPress={() =>  setSelectedDate(new Date("0000-1-1"))}
     />
        </View>
        </View>
        
        <DateTimePickerModal
          date={selectedDate}
          isVisible={datePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      <View
        style={{
          padding: 20,
          flex: 0.5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >

          
  <Text style={styles.title}>
      פעיל / לא פעיל
    </Text>
     <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

    
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
          <Button title="בטל" onPress={() =>  navigation.navigate('Application')} style={{ padding: 20, }} />
   </View>
   
</View>
      <View style={{ padding: 20, backgroundColor: 'lightgray' }}>
        {/* Content for the container at the top */}
      </View>
    </View>)



}

const styles = StyleSheet.create({


  title: {
    fontFamily:FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary
    
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 3,
    width:'90%'
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

