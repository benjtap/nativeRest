import React, { useState, useEffect, useMemo } from 'react';

//import {useFocusEffect} from  '@react-navigation/native-stack'
 
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, Image } from 'react-native';

import { COLORS, FONT, SIZES } from "../constants";

import axiosInstance from '../helpers/axiosInstance';



String.isNullOrEmpty = function(value) {
  return !(typeof value === "string" && value.length > 0);
}

const Audio = (props) => {
  const { navigation } = props;

  
  //const { cometChat, setSelectedConversation } = useContext(Context);

  const [keyword, setKeyword] = useState('');
  // 0 is user, 1 is group.
  const [selectedType, setSelectedType] = useState(0);
  // data that will be shown on the list, data could be the list of users, or the list of groups.
 const [data, setData] = useState([]);
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState([]);
 
 async function runQuerycontact() {
  // Set the loading true.
  setLoading(true)
  
  setLoading(false)
  setData(rescontact.data.contacts)
}

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
      if (selectedType === 0) {
        searchAudios();
      } else {
        searchGroups();
      }
    });
 

    if (selectedType === 0) {
      searchAudios();
    } else {
      searchGroups();
    }
    return unsubscribe;
  
  }, [selectedType,navigation]);

 

  const searchAudios = () => {
    const limit = 30;
    fetchAudiosDataForPosts();
   };

//   const requestOptions=  {
//     method: 'GET',
//     mode: 'cors', //no-
//     headers: { 'Content-Type': 'application/json' },
 
// };

  const fetchAudiosDataForPosts = async () => {

    let url = `/Webhttp/getaudios`
    await axiosInstance.get(url)

    .then(({data}) => {
       setData(data)
    
     }).catch((err) => {
        
     })

    };


  const fetchgroupsDataForPosts = async () => {
   
    let url = `/Webhttp/getgroups`
    await axiosInstance.get(url)

    .then(({data}) => {
      setData(data)
    }).catch((err) => {
        
    })
   

  };


  const searchGroups = () => {
    const limit = 30;
    
    fetchgroupsDataForPosts();
  };

  const onKeywordChanged = (keyword) => {
    setKeyword(() => keyword);
  };

  const updateSelectedType = (selectedType) => () => {
    setSelectedType(() => selectedType);
  };

 

  const selectItem = (item) => () => {
   
    if (selectedType === 1){
      
      navigation.navigate('AudioGroupMembers', {
        id: item.id ,name: item.name
      })
    }
    else  if (selectedType ===0){
    
      navigation.navigate('Audiodetails', {
        id: item.id ,name: item.name,filename: item.filename
      })
    }
    
  };

 

  const renderItems = ({ item }) => {

    if (selectedType === 0) {
    return (
      <TouchableOpacity style={styles.listItem} onPress={selectItem(item)}>
               <Text style={styles.listItemLabel}>{item.name}</Text>
               {/* <Text style={styles.listItemLabel}>-----</Text> */}
                <Text style={styles.listItemLabel}>{item.filename}</Text> 
      </TouchableOpacity>
    );
  }
  else
  {
    return (
    <TouchableOpacity style={styles.listItem} onPress={selectItem(item)}>
    <Text style={styles.listItemLabel}>{item.name}</Text>
    </TouchableOpacity>
    );

  }
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize='none'
          onChangeText={onKeywordChanged}
          placeholder="Search..."
          placeholderTextColor="#000"
          style={styles.input}
        />
      </View> */}
      <View style={styles.searchActionContainer}>
        <TouchableOpacity ref={(touchable) => this._touchable = touchable}
        style={[styles.searchActionBtn, styles.searchLeftActionBtn, selectedType === 0 && styles.searchActionBtnActive]} onPress={updateSelectedType(0)}>
          <Text style={[styles.searchActionLabel, selectedType === 0 && styles.searchActionLabelActive]}>הקלטה</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.searchActionBtn, styles.searchRightActionBtn, selectedType === 1 && styles.searchActionBtnActive]} onPress={updateSelectedType(1)}>
          <Text style={[styles.searchActionLabel, selectedType === 1 && styles.searchActionLabelActive]}>קבוצה</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <FlatList
          data={data}
          renderItem={renderItems}
          keyExtractor={(item, index) => item.id}
        />
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
    fontFamily:FONT.regular,
    fontSize: SIZES.large
  },
  searchActionLabelActive: {
    color: '#fff',
    fontFamily:FONT.regular,
    fontSize: SIZES.large
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

export default Audio;