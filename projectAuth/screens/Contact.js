import  React, { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, Button } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONT, SIZES } from "../constants";

import axiosInstance from '../helpers/axiosInstance';
import { routes,screens } from '../constants/RouteItems';


String.isNullOrEmpty = function(value) {
  return !(typeof value === "string" && value.length > 0);
}

const Contact = (props) => {
  const { navigation } = props;

  
 


  const [keyword, setKeyword] = useState('');
  // 0 is user, 1 is group.
  const [selectedType, setSelectedType] = useState(0);
  // data that will be shown on the list, data could be the list of users, or the list of groups.
 const [data, setData] = useState([]);
 
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState([]);
 const showtabdrawer =['ContactStack']

 const filterdata= React.useMemo(() =>{

return data.filter(post =>  post.filename.toLowerCase().includes(keyword.toLowerCase()))

},[data,keyword])
  

let navegState = navigation.getState();
     
  // console.log('CURRENT SCREEN', navegState.routes[navegState.index].name);

  useEffect(() => {
    
    
    const unsubscribe = navigation.addListener('focus', () => {
       
    
  //     routes.map((record) => (
  //       (showtabdrawer.indexOf(record.focusedRoute) >-1)
  //  && (record.showInTab===false)  ? record.showInDrawer =true :  record.showInDrawer =false
  // ))
      searchfilescontacts();
    
    });

   
      searchfilescontacts();
    

    return unsubscribe;
   
  }, [navigation]);

 
  const handleDelete = async (item) => {
    const url =`/Webhttp/deletefilescontacts`;
    var deletefilescont =
    { 
     "filename": item.filename
     }
    
      
    await axiosInstance.post(url,deletefilescont)
  
     .then(({data}) => {
            setData(data)
            setLoading(false)
      }).catch((err) => {
        
       })

      }

  const fetchfilescontactsDataForPosts = async () => {
    
    setLoading(true)
    const url =`/Webhttp/getAllfilescontacts`;
  
      
    await axiosInstance.get(url)
  
     .then(({data}) => {
            setData(data)
            setLoading(false)
      }).catch((err) => {
        
       })
   
   }
  

  const searchfilescontacts = () => {
      
    fetchfilescontactsDataForPosts();
  };


  
  const updateSelectedType = (selectedType) => () => {
        setSelectedType(() => selectedType);
  };

  const listSeparator = () => {
    return <View style={ styles.separator } />
    }

  const selectItem = (item) => () => {
     navigation.navigate('EDITCONTACTFILES', {
        filename: item.filename
      })
    };

 
 // useCallback(
  const renderItems =  useCallback(({ item }) => {

     return (
 
    <View style={{ flexDirection:"row" }}>
       <View style={{ marginHorizontal: 10 }}> 
       <Button title="מחק"  onPress={() => handleDelete( item)}  style={{ padding: 20, }} />
        
        </View> 
          <View style={{ flex:1,marginHorizontal: 10,}}>
          <TouchableOpacity style={styles.listItem} onPress={selectItem(item)}>
   <Text style={styles.listItemLabel}>{item.filename}</Text>
  </TouchableOpacity>
     </View>
     </View>

    );

 // }
  })

  return (
    <View style={{ flex: 1 }}>
    <View style={{ padding: 20, backgroundColor: 'lightgray' }}>
      {/* Content for the container at the top */}
    </View>
  <View style={styles.container}>
    <View style={styles.inputContainer}>
      <TextInput
        autoCapitalize='none'
        onChangeText={setKeyword}
        placeholder="Search..."
        placeholderTextColor="#000"
        style={styles.input}
      />
    </View>
    <View style={styles.searchActionContainer}>
      
      <TouchableOpacity style={ [styles.searchActionBtn, styles.searchLeftActionBtn,  styles.searchActionBtnActive]} >
        <Text style={ [styles.searchActionLabel,  styles.searchActionLabelActive]}>הפצה</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.list}>
      <FlatList
      //  contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        data={filterdata}
        renderItem={renderItems}
        ItemSeparatorComponent = { listSeparator }
        // keyExtractor={(item, index) => item.id}
      />
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
    width:180
  },
  searchActionBtn: {
    backgroundColor: '#fff',
    borderColor: '#000',
    flex: 1,
     fontSize: 16,
    padding: 8,
    alignItems:'center',
  },
  searchLeftActionBtn: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginRight: 0,
    alignItems:'center',
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
    alignItems:'center',
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
    fontSize: SIZES.large,
   
  },
  list: {
    flex: 1,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    justifyContent:'center',
    alignContent:'center',
    marginHorizontal: 8,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginLeft:10,
    marginRight:10,
   

     
  },
  
  listItemLabel: {
     //fontSize: 16,
     color: COLORS.secondary,
     fontFamily:FONT.regular,
     fontSize: SIZES.medium,
     alignItems: 'center',
     marginLeft: 13,
   },
   separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CCC'
    },

});

export default Contact;