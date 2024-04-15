import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, Image } from 'react-native';
import {useRoute} from '@react-navigation/native';
import { COLORS, FONT, SIZES } from "../constants";

String.isNullOrEmpty = function(value) {
  return !(typeof value === "string" && value.length > 0);
}

const GroupMembers = (props) => {
  const { navigation } = props;

  const route = useRoute();
  
  

//   const [keyword, setKeyword] = useState('');
//   // 0 is user, 1 is group.
  const [selectedType, setSelectedType] = useState(0);
//   // data that will be shown on the list, data could be the list of users, or the list of groups.
//  const [data, setData] = useState([]);
//  const [title, setTitle] = useState("");
//  const [loading, setLoading] = useState(false)
//  const [error, setError] = useState([]);

 const oparam = route.params?.id ? route.params.id : {};

 

  //setTitle(oparam)
 
//  async function runQuerycontact() {
//   // Set the loading true.
//   setLoading(true)
  
//   setLoading(false)
//   setData(rescontact.data.contacts)
// }

// async function runQuerygroup() {
//   // Set the loading true.
//   setLoading(true)
  
//  console.log(resgroup.data.groups)

//   // Reset the loading state.
//   setLoading(false)
//   setData(resgroup.data.groups)
// }




 

  const searchContacts = () => {
    const limit = 30;
       //fetchcontactsDataForPosts();
   };

  const requestOptions=  {
    method: 'GET',
    mode: 'cors', //no-
    headers: { 'Content-Type': 'application/json' },
 
};

  const fetchcontactsDataForPosts = async () => {
    try {
      
      const response = await fetch(
        `http://192.168.1.104/Restapi/Webhttp/getcontacts`, requestOptions
      )
      .then(function(response){
        if (response.ok){
          
          return response.json()
          
        }
    })
    .then(function(myjson){
           
      
          //setData(myjson)
      })

    } catch (err) {
      //setError(err.message);
      //setData(null);
    } finally {
      //setLoading(false);
    }
  };



  const fetchgroupsDataForPosts = async () => {
    try {
      
      const response = await fetch(
        `http://192.168.1.104/Restapi/Webhttp/getgroups`, requestOptions
      )
      .then(function(response){
        if (response.ok){
          
          return response.json()
          
        }
    })
    .then(function(myjson){
           
      
          setData(myjson)
      })

    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };


  const searchGroups = () => {
    const limit = 30;
    
    //fetchgroupsDataForPosts();
  };

  const onKeywordChanged = (keyword) => {
   // setKeyword(() => keyword);
  };

  const updateSelectedType = (selectedType) => () => {
   // setSelectedType(() => selectedType);
  };

 

  const selectItem = (item) => () => {
   
    // if (selectedType != 0)
    // navigation.navigate('', {
    //   id: item.id
    // })
  };

 

 
  
 

  return (
    // <View style={styles.container}>
  <View style={styles.container}>
    <View><Text style={styles.title}>rrrr</Text>
 </View>
 <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize='none'
          onChangeText={onKeywordChanged}
          placeholder="Search..."
          placeholderTextColor="#000"
          style={styles.input}
        />
      </View>
      <View style={styles.searchActionContainer}>
        <TouchableOpacity style={[styles.searchActionBtn, styles.searchLeftActionBtn, selectedType === 0 && styles.searchActionBtnActive]} onPress={updateSelectedType(0)}>
          <Text style={[styles.searchActionLabel, selectedType === 0 && styles.searchActionLabelActive]}>Import My Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.searchActionBtn, styles.searchRightActionBtn, selectedType === 1 && styles.searchActionBtnActive]} onPress={updateSelectedType(1)}>
          <Text style={[styles.searchActionLabel, selectedType === 1 && styles.searchActionLabelActive]}>Import from file</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.searchActionBtn, styles.searchRightActionBtn, selectedType === 1 && styles.searchActionBtnActive]} onPress={updateSelectedType(1)}>
          <Text style={[styles.searchActionLabel, selectedType === 2 && styles.searchActionLabelActive]}>Delete All Members</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.searchActionBtn, styles.searchRightActionBtn, selectedType === 1 && styles.searchActionBtnActive]} onPress={updateSelectedType(1)}>
          <Text style={[styles.searchActionLabel, selectedType === 3 && styles.searchActionLabelActive]}>Delete</Text>
        </TouchableOpacity>
      </View>
      <View>
      <Text style={styles.title}>Hi</Text>
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
  title: {
    fontFamily:FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
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
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  searchActionLabelActive: {
    color: '#fff',
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

export default GroupMembers;