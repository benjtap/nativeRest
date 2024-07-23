import React, { useState,useEffect,useCallback } from "react";
import { View, Button,Text, FlatList, TextInput, SafeAreaView ,StyleSheet} from "react-native";
// import * as DocumentPicker from "expo-document-picker";
// import Papa from "papaparse";
// import * as FileSystem from "expo-file-system";
import axiosInstance from '../helpers/axiosInstance';
import {useRoute} from '@react-navigation/native';
import { routes,screens } from '../constants/RouteItems';

const Updatecontactfiles = (props) => {
  const { navigation } = props;
  const [fileUri, setFileUri] = useState(null);
  const [fileindex, setFileindex] = useState(0);
  const [csvData, setCsvData] = useState([]);
  const [statusPicked, setStatusPicked] = useState([1,2,3]);
  const [selectedText, setSelectedText] = useState(null);
  const [duplicatenum, setDuplicatenum] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false); 
  const [errors, setErrors] = useState({}); 
  const [didFetch,setDidFetch] = useState(false)
  
  const route = useRoute();

  useEffect(() => {
    setStatusPicked(2)
   
   
    if(!didFetch){
      // routes.map((record) => (
      //       record.showInDrawer =false
      //  ))
      const oparamname = route.params?.filename ? route.params.filename : {};
      console.log(oparamname)
      setSelectedText(oparamname)
      setDidFetch(true)
      fetchafatsa(oparamname);
      }
   
    validateForm();
   

  }, [selectedText,duplicatenum,csvData]);

  //,csvData

  const fetchafatsaDataForPosts = async (oparamname) => {
     // const filename ="Test"

      let getfilecontactsPost =  {
        filename:oparamname
          }


  let url = `/Webhttp/getfilecontacts`
    await axiosInstance.post(url,getfilecontactsPost)

    .then((res) => {

      if (res.data===null)
        console.log('null')
      else{
        //let csvarr =Array.from(Object.values(res.data));

        setCsvData(function(){
          // create shallow copy of array
         
         try {
          const newPost =   [];
          
          let index = 0; 
         
           for(var pindex in res.data){
              
            
            p = res.data[pindex] 

            let newarr =[]

            newarr[0] = p.phone;
            newarr[1] =p.name;

           
            newPost[index] = newarr;
           

            index = index +1

            
            
           }
           
           setFileindex(newPost.length)

           return newPost;
         } catch (error) {
          console.log(error)
         }   
         
          })

     
      }
      

     })

  };

  const fetchafatsa = (oparamname) => {
      
    fetchafatsaDataForPosts(oparamname);
  };


  
  const exportexistCsv = async () => {
    var lst = [] 
  
    csvData.map( function(item) {
     
       var createcontactsPost =
       { 
        "name": item[1],
        "phone": item[0],
        "filename":oparamname
        }
        lst.push(createcontactsPost)
    
        return lst;
      
      
         
        });
        

        const url =`/Webhttp/bulkcontacts`;

        await axiosInstance.post(url,lst ,{
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json;charset=UTF-8",
         },
       }).then((res) => {
        
       
        navigation.navigate('Contacts')
                  
      })



  }

  const Cancel= async () => {
    navigation.navigate('Contacts')
  };
  
  const exportnewCsv = async () => {
    var lst = [] 
   
    csvData.map( function(item) {
     
      var createcontactsPost =
      { 
       "name": item[1],
       "phone": item[0],
       "filename":selectedText
       }
       lst.push(createcontactsPost)
         // return lst;
               
       });
       
     
       const url =`/Webhttp/bulkandeditcontacts`;

       await axiosInstance.post(url,lst ,{
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).then((res) => {
        
        navigation.navigate('Contacts')
                  
      })

    
  };

  
  function validateTelAndMobileNo(mobileNo) {
    const regex = /^0?(([23489]{1}[0-9]{7})|[57]{1}[0-9]{8})+$/
    const found = mobileNo.match(regex);
    if(found===null)
    return false
    else
    return true;
   }

  const validateForm = () => {
   
    if(duplicatenum.length >0) { 
      errors.duplicateNumbers = 'field number must be unique.'; 
     
      setIsFormValid(false);
        return;
    } 

    if (!selectedText)  { 
      errors.selectedText = 'FileName is required.'; 
     
      setIsFormValid(false);
        return;
    } 

    csvData.map( function(item) {
      
      if(validateTelAndMobileNo(item[0])==false || item[1]==="" )
         {
          errors.csvData = 'one field  is not correct.';
          
          setIsFormValid(false);
          return;
         } 
         else
         {
          if ((selectedText) && (duplicatenum.length ==0))  {
            setErrors(errors); 
           setIsFormValid(true); 
          }

         }
      });
  
      

  }
  function findDuplicatesOptimized(array) {
    const duplicates = [];
    const frequencyMap = {};
    
    for (let i = 0; i < array.length; i++) {
      const element = array[i][0];
      
      if (frequencyMap[element]) {
        if (!duplicates.includes(element)) {
          duplicates.push(element);
        }
      } else {
        frequencyMap[element] = true;
      }
    }
    
    return duplicates;
  }


  const handleCellChange = (text, rowIndex, cellIndex) => {
    setCsvData((prevData) => {
      const newData = [...prevData];
      if (!newData[rowIndex]) {
        newData[rowIndex] = [];
      }
      newData[rowIndex][cellIndex] = text;

     const duplicateNumbers = findDuplicatesOptimized(csvData);


    setDuplicatenum(duplicateNumbers)
      return newData;
    });
  };

  const handleDelete = (index) =>  {
    setCsvData((prevData) => {
      const newList = [...prevData];
    
  
      newList.splice(index, 1);
      
      let count = fileindex - 1;
      
     const duplicateNumbers = findDuplicatesOptimized(csvData);


     setDuplicatenum(duplicateNumbers)

      setFileindex(count)
  
      return newList
    });
  }

  const handleAddRow = () => {
    setCsvData((prevData) => {
      console.log(fileindex)
      const newData = [...prevData];
      if (!newData[fileindex]) {
        newData[fileindex ] = [];
      }
      newData[fileindex][0] = "";
      newData[fileindex][1] = "";

      let count = fileindex + 1;

    setFileindex(count)
      return newData;
    });
  };



  

  headerComponent = () => {
    return (
    <View style={{ flexDirection:"row" }}>
     <View style={{ marginHorizontal: 55,marginTop: 5 }}><Text style={ styles.listHeadline }>מספר</Text></View> 
     <View style={{ marginHorizontal: 55,marginTop: 5 }}><Text style={ styles.listHeadline }>שם</Text></View> 
       </View> 
    );
    }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 20, backgroundColor: 'lightgray' }}>
        {/* Content for the container at the top */}
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {statusPicked===1 && <Button title="בחר קובץ" onPress={pickDocument} />}
        {(statusPicked===2 || statusPicked===3)  && (
          <FlatList
            data={csvData}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={headerComponent}
            renderItem={({ item, index }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                 <View style={{ marginTop: 5 }}>
           <Button title="מחק"  onPress={() => handleDelete( index)}  style={{ padding: 20, }} />
       </View>
                {item.map((cell, cellIndex) => (
                  <TextInput
                    key={cellIndex}
                    style={{ margin: 5, borderWidth: 1, padding: 10, fontSize: 16,width:150 }}
                    value={cell}
                    onChangeText={(text) => handleCellChange(text, index, cellIndex)}
                  />
                
                ))}
              </View>
            
            )}
          />
    
        )}
        {statusPicked===2 && 
       <View style={{ flexDirection:"row" }}>
       
          
         
         <View style={{ marginHorizontal: 10,marginTop: 5 }}> 
           {/* <View style = {{flexDirection:'row',flexWrap:'wrap'}}> */}
           <Text style={{fontSize: 10, fontWeight: 'bold'}}>שם קובץ </Text><TextInput 
             style={{ margin: 5, borderWidth: 1, padding: 10, fontSize: 16,width:150 }}
                          value={selectedText}
            onChangeText={text => setSelectedText(text)}
            editable = {false}
           /></View> 
            <View style={{ marginHorizontal: 10,marginTop: 5 }}>
              <Button title="שמור"  onPress={() => exportnewCsv()} 
               style={[ {padding: 20, opacity: isFormValid ? 1 : 0.5 }]} 
               disabled={!isFormValid} 
               />
       </View>
       <View style={{ marginHorizontal: 10,marginTop: 5 }}>
              <Button title="בטל" onPress={() => Cancel()} style={{ padding: 20, }} />
       </View>
       <View style={{ marginHorizontal: 10,marginTop: 5 }}>
           <Button title="הוסף"  onPress={handleAddRow}  style={{ padding: 20, }} />
       </View>
   </View>
     }
     {statusPicked===3 && 
       <View style={{ flexDirection:"row" }}>
       
           {/* <Button title="שמור" onPress={exportCsv} style={{ padding: 20, }} /> */}
            <View style={{ marginHorizontal: 10,marginTop: 5 }}> 
           {/* <View style = {{flexDirection:'row',flexWrap:'wrap'}}> */}
           <Text style={{fontSize: 10, fontWeight: 'bold'}}>שם קובץ </Text><TextInput 
             style={{ margin: 5, borderWidth: 1, padding: 10, fontSize: 16,width:150 }}
                          value={selectedText}
            onChangeText={text => setSelectedText(text)}
           /></View> 
            <View style={{ marginHorizontal: 10,marginTop: 5 }}>
              <Button title="חדש"  onPress={() => exportexistCsv ()} 
               style={[ {padding: 20, opacity: isFormValid ? 1 : 0.5 }]} 
               disabled={!isFormValid} 
               />
       </View>
       <View style={{ marginHorizontal: 10,marginTop: 5 }}>
              <Button title="בטל" onPress={() => setFilePicked(false)} style={{ padding: 20, }} />
       </View>
       <View style={{ marginHorizontal: 10,marginTop: 5 }}>
           <Button title="הוסף"  onPress={handleAddRow}  style={{ padding: 20, }} />
       </View>
   </View>
     }
         
        
      </View>
      <View style={{ padding: 20, backgroundColor: 'lightgray' }}>
        {/* Content for the container at the top */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
 
  listHeadline: {
  color: '#333',
  fontWeight: 'bold',
  fontSize: 21,
  },
 
  });
export default Updatecontactfiles;


