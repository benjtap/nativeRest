import React, { useState, useEffect,useCallback } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Button,Switch,RefreshControl,FlatList } from 'react-native';
import {useRoute} from '@react-navigation/native';
import { COLORS, FONT, SIZES } from "../constants";
import axiosInstance from '../helpers/axiosInstance';
import { Dropdown } from 'react-native-element-dropdown';
import moment from "moment";
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { LinearGradient } from "expo-linear-gradient";
const Tasksapp = (props) => {
  const { navigation } = props;

  const route = useRoute();
  
  

//   const [keyword, setKeyword] = useState('');
//   // 0 is user, 1 is group.
  const [selectedType, setSelectedType] = useState(3);
//   // data that will be shown on the list, data could be the list of users, or the list of groups.
  const [data, setData] = useState([]);
   const [title, setTitle] = useState("");

// const [refreshing, setRefreshing] = useState(false);
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

const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

  const oparamname = route.params?.filename ? route.params.filename : {};
  const oparamname1 = route.params?.monitor ? route.params.monitor : {};

  var dicmenu=[]

useEffect(() => {
  if(!didFetch){
   
    if(oparamname1==true){
    
      setSelectedType(2)
    }
     
    if(selectedType==3){
    setTitle(oparamname);
    fetchafatsaDataForPosts();
    fetchmenuDataForPosts();
    fetchappliDataForPosts()

    setDidFetch(true)
    
    }
  
  }
   if(selectedType==2){
   
    const interval = setInterval(() => {
      fetchData();
    }, 1000)
    return () => clearInterval(interval)
   }

}, [title,selectedType]);


 

const fetchData = async () => {
  try {
   
    let url = `/Webhttp/getallApplievent`

    let getallinfoAppliPost =  {
      filename:oparamname
        }
  
    await axiosInstance.post(url,getallinfoAppliPost)
  
      .then( ({data}) => {
     
       
       setData(data )


   
        var stam = 0;;

      })

  } catch (error) {
    console.log(error)
  }
};




const renderItems = ({ item }) => {

 
  return (
    <LinearGradient colors={['#5ED2A0', '#C3CBDC']}> 
    <View style={{ flex: 1,flexDirection:"row", justifyContent: 'center',
     alignItems: 'center', }} >
     
    <View style={{ width: "14%",margin: 10 }}> 
    <Text style={styles.listItemLabel}>{item.application}</Text>
       </View>  
        
      
       {/* <View style={{ flex: 1,marginHorizontal: 10,}}>
       <TouchableOpacity style={styles.listItem} onPress={selectItem(item)}>
<Text style={styles.listItemLabel}>{item.filename}</Text>
</TouchableOpacity>
  </View> */}

 
  </View>
  </LinearGradient>
  );

}

// const onRefresh = () => {
//   setRefreshing(true);
//   fetchData();
//   setTimeout(() => {
//     setRefreshing(false);
//   }, 1000); // Refresh indicator will be visible for at least 1 second
// };

 
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
   "date":selectedDate,
   "is2run":false,
   "isrunning":false
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




const GetItemInfo = ({item}) => {

var isrunning

for( var p in item){
var pindex = item[p]

isrunning = pindex.isrunning
dicmenu= pindex.diclevelname
}

var strrunning=isrunning==true ? "רץ " : " לא רץ"

return(
<Text style={styles.title}> {strrunning}</Text>
)
}


const GetnameMenuInfo = ({item}) => {
  
  var name = dicmenu[item]
  
  return(
    name
  )
  }
  
  


  const updateSelectedType = (selectedType) => () => {
   setSelectedType(() => selectedType);
  };


  const listSeparator = () => {
    return <View style={ styles.separator } />
    }

 
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
     <View style={styles.container1}>
    <View style={styles.Viewitem}><Text style={styles.title}>{title} אפליקציה</Text>
     </View>
       <View style={styles.searchActionContainer}>
        <TouchableOpacity style={[styles.searchActionBtn, styles.searchLeftActionBtn, selectedType ===3 && styles.searchActionBtnActive]} onPress={updateSelectedType(3)}>
          <Text style={[styles.searchActionLabel, selectedType === 3 && styles.searchActionLabelActive]}>כללי</Text>
        </TouchableOpacity>
        

        <TouchableOpacity style={[styles.searchActionBtn, styles.searchRightActionBtn, selectedType === 2 && styles.searchActionBtnActive]} onPress={updateSelectedType(2)}>
          <Text style={[styles.searchActionLabel, selectedType === 2 && styles.searchActionLabelActive]}>מוניטורים</Text>
        </TouchableOpacity>
      </View>
      <View style={{  justifyContent: 'center', alignItems: 'center' }}> 
      {selectedType===2 && 
    <View style={{ marginHorizontal: 10,marginTop: 5 }}>



<View style={styles.container}>
      <View style={styles.header}>
       
        <View style={{ flex: 1,flexDirection:"row", justifyContent: 'center',
           alignItems: 'center', }}>
        <GetItemInfo
             item={data}
           /> 
        </View>
      </View>
   
 <FlatList
        data={data}
        renderItem={({ item }) => (
          <LinearGradient colors={['#5ED2A0', '#C3CBDC']}> 
          <View style={{ flex: 1,flexDirection:"row", justifyContent: 'center',
           alignItems: 'center', }} >
             <View style={{ flexDirection:"column", justifyContent: 'left',
           alignItems: 'center' }} >
             <Text style={styles.itemText}>{item.phone}</Text>

             {item.tplleveldigits.map((item, index) => (
       
       <View style={styles.item}>
       <Text style={styles.itemText}><GetnameMenuInfo   item={item.item1}  /></Text>
       <Text style={styles.itemText}>מקש  {item.item2}</Text>

       </View>
    
      ))} 
           </View>
          <View style={styles.item}>
          <Text style={styles.itemText}> התחלת הרצה {item.datebeginstasis}</Text>
          <Text style={styles.itemText}> סוף הרצה {item.dateendstasis}</Text>
          </View>

      
      

        </View>
        </LinearGradient>
          
        )}
         keyExtractor={(item) => item.ChannelId}
        //  refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      />


     
    </View>
 

        
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
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20,marginHorizontal:40 }}>
        {selectedDate.getFullYear()>10 ? selectedDate.toLocaleDateString()  + " " + selectedDate.toLocaleTimeString() : 'No date selected'}
        </Text>
        <View style={{ flexDirection:"row" }}>
        
       <View style={{ marginHorizontal: 30,marginTop: 5 }}>
        <Button title="בחר תאריך" 
        onPress={() => {
          setSelectedDate(new Date())
          showDatePicker(true)
       }} 
        
         />
        </View>
        <View style={{ marginHorizontal: 30,marginTop: 5 }}>
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
       
      
       
        <View style={{ marginHorizontal: 50,marginTop: 5 }}>
          <Button title="שמור"  onPress={() => handleSubmit()} 
          style={[styles.button1]} 
          />
   </View>
   <View style={{ marginHorizontal: 50,marginTop: 5 }}>
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
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  header: {
    height: 80,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 120,
    height: 40,
  },
  navButtons: {
    flexDirection: 'row',
  },
  item: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 16,
  },
 
  
  footer: {
    height: 80,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  footerText: {
    fontSize: 18,
  },




  container1: {
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
    alignItems: 'center'
    
     
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
    fontSize: SIZES.small,
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