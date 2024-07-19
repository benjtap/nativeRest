import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Alert, Button } from 'react-native';

import { COLORS, FONT, SIZES } from "../constants";
import axiosInstance from '../helpers/axiosInstance';
import { Dropdown } from 'react-native-element-dropdown';
import moment from "moment";
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
export default function Planning(props) {  
//const Planning = (props) => {
  const { navigation } = props;


  const showDatePicker = () => {
    setDatePickerVisible(true);
  };


  const onSubmit = async() => {
      if(value==null){
        Alert.alert(
          "התראה",
          "נא הכנס קבוצה"
        );
      }

    let creategrouptimingPost =  {
      groupid:value,
      date:selectedDate
        }
        let url =`/Webhttp/creategrouptiming`

     await axiosInstance.post(url,creategrouptimingPost)
  
     .then(({data}) => {
           
      navigation.navigate('Calendar')
      })
  };
  
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);


// const [state, setState] = React.useState({ dateString: moment(new Date()).format('YYYY-MM-DD'),
// date:  new Date(),
// show: false });
 
const [value, setValue] = useState(null);
const [isFocus, setIsFocus] = useState(false);

const handleConfirm = (date) => {
  setSelectedDate(date);
  hideDatePicker();
};

const Seperator = () => {
  return <View style={styles.seperator} />;
};


    const RenderViewButton = () => {
  
    return(

      <View style={styles.Viewitem}>
     <View style={styles.fixToText}>
      <Text style={styles.title}>
     הוספת תזמון לקבוצה
    </Text>
    </View>
   
    </View>
   );
    }
    


useEffect(() => {
  
  fetchgroupsDataForPosts();

}, []);




  const fetchgroupsDataForPosts = async () => {
    const limit = 30;



    let url = `/Webhttp/getgroups`

    await axiosInstance.get(url)

      .then(({ data }) => {
       
        // Array to store partial objects
        let ddldata = [];

        // Using forEach() to create partial objects
        data.forEach(obj => {
          const partialObj = {};
          partialObj.label = obj.name;
          partialObj.value = obj.id;
          // You can include other properties as needed
          ddldata.push(partialObj);
        });

        console.log(ddldata)
        setData(ddldata)


      })

  };
  
     const  onChange = function (event, selectedDate) {
     // console.log(selectedDate);
     //setState({ dateString: moment(selectedDate).format('YYYY-MM-DD'), date: selectedDate });
  };
  
  
  return (
  
 <View style={styles.container}>
  

      <View style={styles.searchActionContainer}>
        <TouchableOpacity style={[styles.searchActionBtnActive]} >
          <Text style={[styles.searchActionLabelActive]}>הוספת תזמון</Text>
        </TouchableOpacity>

      </View>
      <View style={{
          padding: 20,
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
     {/* <View style={styles.fixToText}> */}
      <Text style={styles.title}>
      Select group.
    </Text>
    {/* <View style={styles.Viewitem}> */}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
           inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
        
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
   
   <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 20,
          flex: 0.5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
          {selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
        </Text>
        <Button title="Select a date" onPress={showDatePicker} />
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

<TouchableOpacity 
                    style={[styles.button1, { opacity:  0.5 }]} 
                   
                    onPress={onSubmit} 
                > 
                <Text style={styles.buttonText}>Submit</Text> 
            </TouchableOpacity>
       {/* <Button style={styles.button1} title="הפעל" onPress={onSubmit} /> */}
        </View>

    </SafeAreaView>

      {/* </View> */}
      {/* </View> */}
      </View>
     {/* <View style={styles.title}>
     
     </View>   */}

      {/* <RenderViewButton /> */}

    
      


    </View>
   
 
     
   
  );
};



const styles = StyleSheet.create({
  
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width:'50%'
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
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
    width: '50%',
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
    fontSize: SIZES.medium,
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
    flex: 1,
    fontSize: 16,
    padding: 8
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
    textAlign: 'center',
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
  seperator: {
    height: 4,
    backgroundColor: "transparent",
    marginVertical: 10,
  },
});

//sexport default Planning;