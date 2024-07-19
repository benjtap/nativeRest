import React, { useState } from "react";
import { View, Button,Text, FlatList, TextInput, SafeAreaView ,StyleSheet} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Papa from "papaparse";
import * as FileSystem from "expo-file-system";

const Addcontactfiles = () => {
  const [fileUri, setFileUri] = useState(null);
  const [fileindex, setFileindex] = useState(0);
  const [csvData, setCsvData] = useState([]);
  const [filePicked, setFilePicked] = useState(false);
  const [selectedText, setSelectedText] = useState(null);

  const pickDocument = async () => {
    console.log("Pick document function called");
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.canceled === false) {
        setFileUri(result.assets[0].uri);

        setSelectedText(result.assets[0].name.split('.').slice(0, -1).join('.'))

        const fileData = await readFile(result.assets[0].uri);
        if (fileData) {
          const parsedData = Papa.parse(fileData);
          if (parsedData.errors.length > 0) {
            console.error("Error parsing CSV:", parsedData.errors);
          } else {
            setCsvData(parsedData.data);
            setFileindex(parsedData.data.length)
            setFilePicked(true);
          }
        } else {
          console.error("Failed to read file data");
        }
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const readFile = async (uri) => {
    console.log("Reading file");
    try {
      const response = await fetch(uri);
      const fileData = await response.text();
      return fileData;
    } catch (error) {
      return null;
    }
  };

  const handleCellChange = (text, rowIndex, cellIndex) => {
    setCsvData((prevData) => {
      const newData = [...prevData];
      if (!newData[rowIndex]) {
        newData[rowIndex] = [];
      }
      newData[rowIndex][cellIndex] = text;
      return newData;
    });
  };

  const handleDelete = (index) =>  {
    setCsvData((prevData) => {
      const newList = [...prevData];
    
     //const index = newList.indexOf(item);
      newList.splice(index, 1);
      
      let count = fileindex - 1;
      
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


  const exportCsv = async () => {
    if (fileUri) {
      try {
        const modifiedCsvContent = Papa.unparse(csvData);
        await exportCsvFile(modifiedCsvContent);
      } catch (error) {
        console.error("Error exporting modified CSV:", error);
      }
    } else {
      console.error("No file selected");
    }
  };

  const exportCsvFile = async (modifiedCsvContent) => {
    try {

      let  fileName = selectedText +".csv"
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        alert("Permissions denied");
        return;
      }

      try {
         
     
        // console.log('/storage/emulated/0/documents/')
       //  await FileSystem.deleteAsync(FileSystem.documentDirectory + 'contacts/'+ fileName, { idempotent: true });  
        
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          fileName,
          "text/csv"
        )
          .then(async (uri) => {
        
            await FileSystem.writeAsStringAsync(uri, modifiedCsvContent, {
              encoding: FileSystem.EncodingType.UTF8
            });

            alert("CSV file exported successfully");
            setFilePicked(false);
          })
          .catch((e) => {
            console.error("Error saving CSV file:", e);
          });
      } catch (e) {
        console.error("Error creating CSV file:", e);
      }
    } catch (err) {
      console.error("Error reading file:", err);
    }
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
        {!filePicked && <Button title="Pick a file" onPress={pickDocument} />}
        {filePicked && (
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
        {filePicked && 
       <View style={{ flexDirection:"row" }}>
       
           {/* <Button title="שמור" onPress={exportCsv} style={{ padding: 20, }} /> */}
           <View style={{ marginHorizontal: 10,marginTop: 5 }}>
           <TextInput style={{ margin: 5, borderWidth: 1, padding: 10, fontSize: 16,width:150 }}
             value={selectedText}
            onChangeText={text => setSelectedText(text)}
           ></TextInput></View> 
            <View style={{ marginHorizontal: 10,marginTop: 5 }}>
              <Button title="שמור" onPress={exportCsv} style={{ padding: 20, }} />
       </View>
       <View style={{ marginHorizontal: 10,marginTop: 5 }}>
              <Button title="בטל" onPress={() => setFilePicked(false)} style={{ padding: 20, }} />
       </View>
       <View style={{ marginHorizontal: 10,marginTop: 5 }}>
           <Button title="הוסף"  onPress={handleAddRow}  style={{ padding: 20, }} />
       </View>
   </View>
       
      //  <Button title="Export file" onPress={exportCsv}  style={{ padding: 20, }}/> 
        //  <Button title="Add Contact" onPress={exportCsv}  style={{ padding: 20, }}/>
        }
         
        
      </View>
      <View style={{ padding: 20, backgroundColor: 'lightgray' }}>
        {/* Content for the container at the top */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  // container: {
  // flex: 1,
  // marginHorizontal: 21,
  // },
  // listHeader: {
  // height: 55,
  // alignItems: ‘center’,
  // justifyContent: ‘center’,
  // marginBottom: 8,
  // borderBottomWidth: 1,
  // borderBottomColor: '#7B52AB',
  // },
  listHeadline: {
  color: '#333',
  fontWeight: 'bold',
  fontSize: 21,
  },
  // listHeadlineSeparator: {
  // width: 100,
  // height: 100,
  // borderBottomWidth :5,
  // borderBottomColor: '#000',
  // },
  });
export default Addcontactfiles;