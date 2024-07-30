import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Button,Switch } from 'react-native';
import {useRoute} from '@react-navigation/native';
import { COLORS, FONT, SIZES } from "../constants";
import axiosInstance from '../helpers/axiosInstance';
import { Dropdown } from 'react-native-element-dropdown';
import moment from "moment";
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Tasksapp = (props) => {
  const { navigation } = props;

  const route = useRoute();
  
  

//   const [keyword, setKeyword] = useState('');
//   // 0 is user, 1 is group.
  const [selectedType, setSelectedType] = useState(3);
//   // data that will be shown on the list, data could be the list of users, or the list of groups.
  const [data, setData] = useState([]);
   const [title, setTitle] = useState("");
const [loading, setLoading] = useState(false)
const [error, setError] = useState("");

  const [errors, setErrors] = useState({}); 
  const [isFocusafatsa, setIsFocusafatsa] = useState(false);
  const [isFocusafmenu, setIsFocusmenu] = useState(false);
  const [valueafatsa, setValueafatsa] = useState(null);
  const [valuemenu, setValuemenu] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false); 
  const [dataddlmenu, setDataddlmenu] = useState([]);
  const [dataddlafatsa, setDataddlafatsa] = useState([]);
const [name, setName] = useState(null); 
const [selectedDate, setSelectedDate] = useState(new Date());
const [datePickerVisible, setDatePickerVisible] = useState(false);
const [isEnabled, setIsEnabled] = useState(false);
const toggleSwitch = () => setIsEnabled(previousState => !previousState);
const [didFetch,setDidFetch] = useState(false)



  

  

  // const RenderViewButton = () => {
  //   if (selectedType === 0){
  //   return(

  //     <View style={styles.Viewitem}>
  //    <View style={styles.fixToText}>
  //     <Text style={styles.title}>
  //     This action copy all the client contact to this groups.
  //   </Text>
  //   </View>
  //   <View style={styles.fixToText}>
  //     <Button   style={styles.button1}  title="הפעל"  
  //     onPress={() => handlecreatecontactgroupsDataForPosts()}
  //    />
  //   </View>
  //   </View>
  //   );
  //   } else if(selectedType === 2){
  //     return(

  //       <View style={styles.Viewitem}>
  //      <View style={styles.fixToText}>
  //       <Text style={styles.title}>
  //       This action delete all the client contact of this groups.
  //     </Text>
  //     </View>
  //     <View style={styles.fixToText}>
  //       <Button   style={styles.button1}  title="הפעל"  
  //       onPress={() => handledeleteallcontactgroupsDataForPosts ()}
  //      />
  //     </View>
  //     </View>
  //     );
  //   }
  //   else if(selectedType === 3){
  //     return(

  //       <View style={styles.Viewitem}>
  //      <View style={styles.fixToText}>
  //       <Text style={styles.title}>
  //       This action delete  this groups.
  //     </Text>
  //     </View>
  //     <View style={styles.fixToText}>
  //       <Button   style={styles.button1}  title="הפעל"  
  //       onPress={() => handledeletegroupsDataForPosts()}
  //      />
  //     </View>
  //     </View>
  //     );
  //   }
    
  // }
 


  const oparamname = route.params?.filename ? route.params.filename : {};

useEffect(() => {
  if(!didFetch){
   
    setTitle(oparamname);
    fetchafatsaDataForPosts();
    fetchmenuDataForPosts();
    fetchappliDataForPosts()

    setDidFetch(true)
    
    }

  

  //fetchgroupsDataForPosts();

}, [title]);
 

 
const fetchappliDataForPosts = async () => {
  let url = `/Webhttp/getallAppliInfo`

  let getallinfoAppliPost =  {
    filename:oparamname
      }

  await axiosInstance.post(url,getallinfoAppliPost)

    .then(({ data }) => {
   
      setValueafatsa(data.filecontacts)
      setValuemenu(data.filemenu)
      setIsEnabled(data.isenabled)
    setSelectedDate( new Date(data.date))
      // console.log()
    })
  
};



const handleSubmit = async() => { 
  
    
  var createappPost =
  { 
   "isenabled": isEnabled,
   "filename":oparamname,
   "filemenu":valuemenu,
   "filecontact" :valueafatsa,
   "date":selectedDate
   }
  const url =`/Webhttp/updateapp`;

   await axiosInstance.post(url,createappPost) .then((res) => {
    console.log(res)


   
  navigation.navigate('Application')
  })

 
}
    
  
const fetchafatsaDataForPosts = async () => {
 

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


  const onKeywordChanged = (keyword) => {
   // setKeyword(() => keyword);
  };

  const updateSelectedType = (selectedType) => () => {
   setSelectedType(() => selectedType);
  };




 
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
  
  return (
    <View style={{ flex: 1 }}>
    <View style={{ padding: 20, backgroundColor: 'lightgray' }}>
      {/* Content for the container at the top */}
    </View>
     <View style={styles.container}>
    <View style={styles.Viewitem}><Text style={styles.title}>{title} אפליקציה</Text>
     </View>
       <View style={styles.searchActionContainer}>
        <TouchableOpacity style={[styles.searchActionBtn, styles.searchLeftActionBtn, selectedType ===3 && styles.searchActionBtnActive]} onPress={updateSelectedType(3)}>
          <Text style={[styles.searchActionLabel, selectedType === 3 && styles.searchActionLabelActive]}>כללי</Text>
        </TouchableOpacity>
        

        <TouchableOpacity style={[styles.searchActionBtn, styles.searchRightActionBtn, selectedType === 0 && styles.searchActionBtnActive]} onPress={updateSelectedType(0)}>
          <Text style={[styles.searchActionLabel, selectedType === 0 && styles.searchActionLabelActive]}>מוניטורים</Text>
        </TouchableOpacity>
      </View>
      <View style={{  justifyContent: 'center', alignItems: 'center' }}> 
      {selectedType===2 && 
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>  
       
          
         
        
        </View>
     }
     {selectedType===3 && 
       <View>
       
      <View style={{ marginHorizontal: 10,marginTop: 5 }}>
      <Text style={styles.title}>
      בחר הפצה
    </Text>
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
    </Text></View><View style={{margin: 5 }}>
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
          <View
        style={{
          padding: 20,
          flex: 0.5,
          display: 'flex',
          margin:15,
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
          <Button title="שמור"  onPress={() => handleSubmit()} 
          style={[styles.button1]} 
          />
   </View>
   <View style={{ marginHorizontal: 10,marginTop: 5 }}>
          <Button title="בטל" onPress={() =>  navigation.navigate('Application')} style={{ padding: 20, }} />
   </View>
   
         </View>


      </View>
     }




        </View>
     
      
        </View>
      <View style={{ padding: 20, backgroundColor: 'lightgray' }}>
        {/* Content for the container at the top */}
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
    fontSize: SIZES.medium,

  },
  searchActionLabelActive: {
    color: '#ffa',
    fontFamily:FONT.medium,
    fontSize: SIZES.medium,
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
    color: COLORS.secondary,
    fontFamily:FONT.regular,
    fontSize: SIZES.medium,
    marginLeft: 13,
   },
   dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 3,
    width:'90%'
  },

});

export default Tasksapp;