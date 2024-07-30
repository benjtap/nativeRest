import React, { useState,useEffect } from "react";
import { View, Button,Text, FlatList, TextInput, SafeAreaView ,StyleSheet} from "react-native";
import { routes,screens } from '../constants/RouteItems';
import axiosInstance from '../helpers/axiosInstance';

const Addcontactfiles = (props) => {
  const { navigation } = props;
  const [fileUri, setFileUri] = useState(null);
  const [fileindex, setFileindex] = useState(0);
  const [csvData, setCsvData] = useState([]);
  const [statusPicked, setStatusPicked] = useState([1,2,3]);
  const [selectedText, setSelectedText] = useState(null);
  const [duplicatenum, setDuplicatenum] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false); 
  const [errors, setErrors] = useState({}); 


  useEffect(() => {

    validateForm();
    setStatusPicked(3)

  }, [selectedText,csvData,duplicatenum]);


  const pickDocument = async () => {


  };

  const Cancel= async () => {
    navigation.navigate('Contacts')
  };
  
  const exportexistCsv = async () => {

    var contactlist = csvData.map( function(item) {
     
       var createcontactsPost =
       { 
        "name": item[1],
        "phone": item[0],
        "filename":selectedText
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

  
  const exportnewCsv = async () => {
    var lst = [] 
   
    csvData.map( function(item) {
      console.log(7)
      var createcontactsPost =
      { 
       "name": item[1],
       "phone": item[0],
       "filename":selectedText
       }
       lst.push(createcontactsPost)
         // return lst;
               
       });
       
      
       const url =`/Webhttp/bulkcontacts`;

       await axiosInstance.post(url,lst ,{
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      }) .then((res) => {

        if(res.data=="message"){
          alert('File name must be unique')
          return;
        }
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
          errors.csvData = 'one field  is required.'; 
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
    
     //const index = newList.indexOf(item);
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
      const newData = [...prevData];
      if (!newData[fileindex]) {
        newData[fileindex] = [];
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
       
           {/* <Button title="שמור" onPress={exportCsv} style={{ padding: 20, }} /> */}
           <View style={{ marginHorizontal: 10,marginTop: 5 }}>
           <TextInput style={{ margin: 5, borderWidth: 1, padding: 10, fontSize: 16,width:150 }}
             value={selectedText}
            onChangeText={text => setSelectedText(text)}
           ></TextInput></View> 
            <View style={{ marginHorizontal: 10,marginTop: 5 }}>
              <Button title="שמור" onPress={exportexistCsv} 
              style={[styles.button1, { opacity: isFormValid ? 1 : 0.5 }]}
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
              <Button title="חדש"  onPress={() => exportnewCsv()} 
               style={[ {padding: 20, opacity: isFormValid ? 1 : 0.5 }]} 
               disabled={!isFormValid} 
               />
       </View>
       <View style={{ marginHorizontal: 10,marginTop: 5 }}>
              <Button title="בטל" onPress={() => Cancel(false)} style={{ padding: 20, }} />
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
export default Addcontactfiles;




  // const pickDocument = async () => {
  //   console.log("Pick document function called");
  //   try {
  //     const result = await DocumentPicker.getDocumentAsync({});
  //     if (result.canceled === false) {
  //       setFileUri(result.assets[0].uri);

  //       setSelectedText(result.assets[0].name.split('.').slice(0, -1).join('.'))

  //       const fileData = await readFile(result.assets[0].uri);
  //       if (fileData) {
  //         const parsedData = Papa.parse(fileData);
  //         if (parsedData.errors.length > 0) {
  //           console.error("Error parsing CSV:", parsedData.errors);
  //         } else {
  //           setCsvData(parsedData.data);
  //           setFileindex(parsedData.data.length)
  //           setFilePicked(true);
  //         }
  //       } else {
  //         console.error("Failed to read file data");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error picking document:", error);
  //   }
  // };

  // const readFile = async (uri) => {
  //   console.log("Reading file");
  //   try {
  //     const response = await fetch(uri);
  //     const fileData = await response.text();
  //     return fileData;
  //   } catch (error) {
  //     return null;
  //   }
  // };

  // const exportCsv = async () => {
  //   if (fileUri) {
  //     try {
  //       const modifiedCsvContent = Papa.unparse(csvData);
  //       await exportCsvFile(modifiedCsvContent);
  //     } catch (error) {
  //       console.error("Error exporting modified CSV:", error);
  //     }
  //   } else {
  //     console.error("No file selected");
  //   }
  // };

  // const exportCsvFile = async (modifiedCsvContent) => {
  //   try {

  //     let  fileName = selectedText +".csv"
  //     const permissions =
  //       await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
  //     if (!permissions.granted) {
  //       alert("Permissions denied");
  //       return;
  //     }

  //     try {
         
     
  //       // console.log('/storage/emulated/0/documents/')
  //      //  await FileSystem.deleteAsync(FileSystem.documentDirectory + 'contacts/'+ fileName, { idempotent: true });  
        
  //       await FileSystem.StorageAccessFramework.createFileAsync(
  //         permissions.directoryUri,
  //         fileName,
  //         "text/csv"
  //       )
  //         .then(async (uri) => {
        
  //           await FileSystem.writeAsStringAsync(uri, modifiedCsvContent, {
  //             encoding: FileSystem.EncodingType.UTF8
  //           });

  //           alert("CSV file exported successfully");
  //           setFilePicked(false);
  //         })
  //         .catch((e) => {
  //           console.error("Error saving CSV file:", e);
  //         });
  //     } catch (e) {
  //       console.error("Error creating CSV file:", e);
  //     }
  //   } catch (err) {
  //     console.error("Error reading file:", err);
  //   }
  // };