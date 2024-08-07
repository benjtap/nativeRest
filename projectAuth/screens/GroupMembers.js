import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, Button } from 'react-native';
import {useRoute} from '@react-navigation/native';
import { COLORS, FONT, SIZES } from "../constants";
import axiosInstance from '../helpers/axiosInstance';


const GroupMembers = (props) => {
  const { navigation } = props;

  const route = useRoute();
  
  

//   const [keyword, setKeyword] = useState('');
//   // 0 is user, 1 is group.
  const [selectedType, setSelectedType] = useState(0);
//   // data that will be shown on the list, data could be the list of users, or the list of groups.
  const [data, setData] = useState([]);
   const [title, setTitle] = useState("");
const [loading, setLoading] = useState(false)
const [error, setError] = useState("");





  const oparamname = route.params?.name ? route.params.name : {};

  


  function handlecreatecontactgroupsDataForPosts() {
    createcontactgroupsDataForPosts();
  }

  function handledeleteallcontactgroupsDataForPosts() {
    deleteallcontactgroupsDataForPosts();
  }
  function handledeletegroupsDataForPosts() {
    deletegroupsDataForPosts();
  }

  const RenderViewButton = () => {
    if (selectedType === 0){
    return(

      <View style={styles.Viewitem}>
     <View style={styles.fixToText}>
      <Text style={styles.title}>
      This action copy all the client contact to this groups.
    </Text>
    </View>
    <View style={styles.fixToText}>
      <Button   style={styles.button1}  title="הפעל"  
      onPress={() => handlecreatecontactgroupsDataForPosts()}
     />
    </View>
    </View>
    );
    } else if(selectedType === 2){
      return(

        <View style={styles.Viewitem}>
       <View style={styles.fixToText}>
        <Text style={styles.title}>
        This action delete all the client contact of this groups.
      </Text>
      </View>
      <View style={styles.fixToText}>
        <Button   style={styles.button1}  title="הפעל"  
        onPress={() => handledeleteallcontactgroupsDataForPosts ()}
       />
      </View>
      </View>
      );
    }
    else if(selectedType === 3){
      return(

        <View style={styles.Viewitem}>
       <View style={styles.fixToText}>
        <Text style={styles.title}>
        This action delete  this groups.
      </Text>
      </View>
      <View style={styles.fixToText}>
        <Button   style={styles.button1}  title="הפעל"  
        onPress={() => handledeletegroupsDataForPosts()}
       />
      </View>
      </View>
      );
    }
    
  }
 

  const renderItems = ({ item }) => {
    return (
      <TouchableOpacity style={styles.listItem} >
               <Text style={styles.listItemLabel}>{item.name}</Text>
               {/* <Text style={styles.listItemLabel}>-----</Text> */}
                <Text style={styles.listItemLabel}>{item.phone}</Text> 
      </TouchableOpacity>
    );
  
  }


useEffect(() => {
  

  const oparamname = route.params?.name ? route.params.name : {};
  setTitle(oparamname);

  fetchgroupsDataForPosts();

}, [title]);
 

 

   const fetchgroupsDataForPosts = async() => {
    const limit = 30;
    
     const oparamid = route.params?.id ? route.params.id : {};
  
      let creategroupcontactsPost =  {
        id:oparamid
          }


     let url =`/Webhttp/getgroupcontacts`

     await axiosInstance.post(url,creategroupcontactsPost)
  
     .then(({data}) => {
           
            setData(data)
      })
      
     };
  
    const deleteallcontactgroupsDataForPosts= async () => {
      const oparamid = route.params?.id ? route.params.id : {};
  
      let creategroupcontactsPost =  {
        id:oparamid
          }

          let url =`/Webhttp/bulkdeletegroupcontacts`

          await axiosInstance.post(url,creategroupcontactsPost)
       
          .then(({data}) => {
              fetchgroupsDataForPosts();
           })
    

    };
  
    const deletegroupsDataForPosts= async () => {
      const oparamid = route.params?.id ? route.params.id : {};
  
      let creategroupcontactsPost =  {
        id:oparamid
          }

          let url =`/Webhttp/deletegroup`

          await axiosInstance.post(url,creategroupcontactsPost)
       
          .then(({data}) => {
            navigation.navigate('Contacts')
           })
    

    };
    

  const createcontactgroupsDataForPosts = async () => {
    const oparamid = route.params?.id ? route.params.id : {};

    let creategroupcontactsPost =  {
      id:oparamid
        }

        let url =`/Webhttp/bulkgroupcontacts`

        await axiosInstance.post(url,creategroupcontactsPost)
     
        .then(({data}) => {
            fetchgroupsDataForPosts();
         })
      
       

  };


  const onKeywordChanged = (keyword) => {
   // setKeyword(() => keyword);
  };

  const updateSelectedType = (selectedType) => () => {
   setSelectedType(() => selectedType);
  };

  const RenderFlat= () => {
    if(selectedType != 3){

      return (
        <View style={styles.list}>
        <FlatList
          data={data}
          renderItem={renderItems}
          keyExtractor={(item, index) => item.id}
        />
      </View>
        
    )
  }
      }


  const RenderInputsearch= () => {
    if(selectedType === 10){
     
    return (
      
    <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize='none'
          onChangeText={onKeywordChanged}
          placeholder="Search..."
          placeholderTextColor="#000"
          style={styles.input}
        />
      </View>
     
    )
  }
      }
 
  
  return (
  
  <View style={styles.container}>
    <View style={styles.Viewitem}><Text style={styles.title}>{title} קבוצה</Text>
 </View>
       
     <RenderInputsearch />

      <View style={styles.searchActionContainer}>
        <TouchableOpacity style={[styles.searchActionBtn, styles.searchLeftActionBtn, selectedType === 0 && styles.searchActionBtnActive]} onPress={updateSelectedType(0)}>
          <Text style={[styles.searchActionLabel, selectedType === 0 && styles.searchActionLabelActive]}>ייבא אנשי קשר</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.searchActionBtn, styles.searchRightActionBtn, selectedType === 2 && styles.searchActionBtnActive]} onPress={updateSelectedType(2)}>
          <Text style={[styles.searchActionLabel, selectedType === 2 && styles.searchActionLabelActive]}>מחק כל אנשי קשר</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.searchActionBtn, styles.searchRightActionBtn, selectedType === 3&& styles.searchActionBtnActive]} onPress={updateSelectedType(3)}>
          <Text style={[styles.searchActionLabel, selectedType === 3 && styles.searchActionLabelActive]}>קבוצה  מחוק</Text>
        </TouchableOpacity>
      </View>
     
      <RenderViewButton />
     
      <RenderFlat />
      


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
 

  }
});

export default GroupMembers;