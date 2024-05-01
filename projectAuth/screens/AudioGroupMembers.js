import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, Button } from 'react-native';
import {useRoute} from '@react-navigation/native';
import { COLORS, FONT, SIZES } from "../constants";
import axiosInstance from '../helpers/axiosInstance';

const AudioGroupMembers = (props) => {
  const { navigation } = props;

  const route = useRoute();
  
  


  const [selectedType, setSelectedType] = useState(0);
 
  const [data, setData] = useState([]);
   const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");





  const oparamname = route.params?.name ? route.params.name : {};

  
  var dict = {}

  function handlecreatecontactgroupsDataForPosts() {
    createcontactgroupsDataForPosts();
  }

  function handledeleteallcontactgroupsDataForPosts() {
    deleteallcontactgroupsDataForPosts();
  }


  const RenderViewButton = () => {
    if (selectedType === 0){
    return(

      <View style={styles.Viewitem}>
     <View style={styles.fixToText}>
      <Text style={styles.title}>
      Push the Audio record to  select and connect it to this groups.
    </Text>
    </View>
 
    </View>
    );
    } else if(selectedType === 1){
      return(

        <View style={styles.Viewitem}>
       <View style={styles.fixToText}>
        <Text style={styles.title}>
        This action will delete this groups.
      </Text>
      </View>
      <View style={styles.fixToText}>
        <Button   style={styles.button1}  title="הפעל"  
        onPress={() => handledeleteallcontactgroupsDataForPosts()}
       />
      </View>
      </View>
      );
    }
    
  }
 



  const [selected, setSelected] = React.useState("");
  const [selectedId, setSelectedId] = useState(0);

  const [selectedName, setSelectedName] = useState("");
  
//const oparamname = route.params?.name ? route.params.name : {};
useEffect(() => {
  

  setTitle(oparamname);

  // get all audio
  fetchData();

  //fetchAudiogroupDataForPosts()

}, [title]);
 

async function fetchData() {
  try {
    
    let url = `/Webhttp/getaudios`
  
    // Initial Axios request
    const response1 = await axiosInstance.get(url);
    
    if (response1.status !== 200) {
      return Promise.reject(response1);
    }

    const data1 = response1.data;
    setData(data1)
    dict = Object.assign({}, ...data1.map((x) => ({[x.id]: x})));
  
    const oparamid = route.params?.id ? route.params.id : {};    
    // Second Axios request
    let getAudiobyidReq =  {
      groupid:oparamid
        }
    let url1 = `/Webhttp/getaudiogroup`


    const response2 = await axiosInstance.post(url1,getAudiobyidReq);
    const data2 = response2.data;
    //console.log(data2);
    let myaudio = dict[data2.audioid]
    if (myaudio !=null)
    setSelectedName(myaudio.name)
    setSelectedId(data2.audioid)

    // Continue with more operations if needed...

  } catch (error) {
    // Handle errors that occurred in the try block
    console.error(error);
  }
}



  const createAudiogroupsPosts = async (selectedId) => {
    const oparamid = route.params?.id ? route.params.id : {};

    let creategroupcontactsPost =  {
      groupid:oparamid,
      audioid:selectedId
        }


        let url = `/Webhttp/createAudiogroups`
        await axiosInstance.post(url,creategroupcontactsPost)
   
  };



  const updateSelectedType = (selectedType) => () => {
   setSelectedType(() => selectedType);
  };

 

 
 
  const selectItem = (item) => () => {
       
        setSelectedId(item.id)
        setSelectedName(item.name)
        createAudiogroupsPosts(item.id);
  };

  const renderItems = ({ item }) => {

    
    return (
      <TouchableOpacity 
      style={item.id === selectedId ? styles.listItemselected : styles.listItem}
      onPress={selectItem(item)}>
               <Text style={styles.listItemLabel}>{item.name}</Text>
              
                <Text style={styles.listItemLabel}>{item.filename}</Text> 
      </TouchableOpacity>
    );
  }
 

  return (
  <View style={styles.container}>
  
    <View style={styles.Viewitem}><Text style={styles.title}>{title} קבוצה </Text>
    </View>

      <View style={styles.searchActionContainer}>
        <TouchableOpacity style={[styles.searchActionBtn, styles.searchLeftActionBtn, selectedType === 0 && styles.searchActionBtnActive]} onPress={updateSelectedType(0)}>
          <Text style={[styles.searchActionLabel, selectedType === 0 && styles.searchActionLabelActive]}>שייך הקלטה</Text>
        </TouchableOpacity>
       
        {/* <TouchableOpacity style={[styles.searchActionBtn, styles.searchRightActionBtn, selectedType === 1&& styles.searchActionBtnActive]} onPress={updateSelectedType(1)}>
          <Text style={[styles.searchActionLabel, selectedType === 3 && styles.searchActionLabelActive]}>מחוק</Text>
        </TouchableOpacity> */}
      </View>
     
      <RenderViewButton />
     
      <View style={styles.container}>
    <View style={styles.Viewitem}><Text style={styles.title}>{selectedName} הקלטה</Text>
        </View>
      <View style={styles.list}>
      
      <FlatList
          data={data}
          renderItem={renderItems}
          keyExtractor={(item, index) => item.id}
        />
  
      </View>
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
  
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
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
  listItemselected: {
    flex: 1,
    backgroundColor: '#cca',
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
  listItem: {
    flex: 1,
    color: '#ffa',
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

export default AudioGroupMembers;