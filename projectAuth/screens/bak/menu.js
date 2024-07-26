import React, { useState, useEffect } from 'react';
//import { I18nManager } from 'react-native'
// import all the components we are going to use
import {Button,View, Text,StyleSheet,TouchableOpacity,TextInput,ScrollView,Modal,FlatList, Alert,} from 'react-native';
import { COLORS, FONT, SIZES } from "../constants";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import axiosInstance from '../helpers/axiosInstance';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const Menu = () => {
  const [selectedText, setSelectedText] = useState(null);

  const [isFocus, setIsFocus] = useState(false);

  const makachim = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
    {label: '9', value: '9'},
  ];

  const [dataddl, setDataddl] = useState([]);

 
  const [fileindex, setFileindex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // const [data, setData] = useState([
 
  //   {
  //     title: 'Software',
  //     items: [
  //       {
  //         title: 'JS',
         
  //       },
  //       {
  //         title: 'React JS',
  //         items: [
  //           {
  //             title: 'Components',
              
  //           },
  //           {
  //             title: 'Hooks',
              
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ]);

  const [data, setData] = useState([])

  const handleConfirm = (date) => {
    setSelectedDate(date);
   
  };
  const [selected, setSelected] = useState(null);
  const [arrtitle, setTitle] = useState([]);   

 
  
  const [step1Data, setStep1Data] = useState({ menuname: '' });

  const [step2Data, setStep2Data] = useState({ audioname: ''});

  const [csvData, setCsvData] = useState([]);
  const [step3Data, setStep3Data] = useState(csvData);
  
  const [duplicatemakach, setDuplicatemakach] = useState(0);
  const [nullmakach, setNullmakach] = useState(0);
  //const [value, setValue] = useState(null);

  const [isFormValid, setIsFormValid] = useState(false); 
  const [errormessages, setErrormessages] = useState({}); 
  const [errors, setErrors] = useState(false); 

  const [isToogleOssef, setIsToogleOssef] = useState(true); 

  const [isLevel, setIsLevel] = useState(0);
  const [isIndex, setIsIndex] = useState(0);
  const [isItem, setisItem] = useState([]);

  const buttonTextStyle = {
    color: '#393939'
};
  const [didFetch,setDidFetch] = useState(false)

  useEffect(() => {
    if(!didFetch){
     
      
      fetchAudioDataForPosts();
      setDidFetch(true)
      }

      
   
  }, []);



 
  
 


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

  const handleTitle= (index) => {

         if (arrtitle[index]=="") 
          return ""
        else
        return "מקש " + arrtitle[index] ;
  }

    const addChild = (index,level,it =null) => {
 

    setData(function(){
      // create shallow copy of array
      const newPost = [...data];
      
       for(var pindex in newPost){
          
        
        p = newPost[pindex] 

           if (level==0 )
            p.items.splice(index, 0, { title: "billy" });
          else{
            if( it.items===undefined)
            {
                 it.items = [] 
          it.items.splice(index, 0, { title: "billy" });
            }else
            {
              it.items.splice(index, 0, { title: "billy" });

            }

          }
          return newPost;
         }
     })
   
    }
 
 
 
    const [isModalVisible, setModalVisible] = useState(false);
    const [active, setActive] = useState(0);
 
    const onSubmit1 = function() {
     
     let isValid =false
   
     let nullmakach =null;
         nullmakach = arrtitle.filter((user) => {
          return (user==='' || user===null);
      });
      
     
    let duplicatemakach =findDuplicatesOptimized(arrtitle)

    
      if(duplicatemakach.length >0) { 
        errormessages.duplicatemakach = 'touch must be unique.'; 
        alert('touch must be unique.')
        isValid =false

        } 
  
  
      
      else if(nullmakach.length>0 || arrtitle.length ===0) { 
        errormessages.duplicatemakach = 'touch must be not null.'; 
        alert(' touch must be not null.')
        isValid =false
         
      } 
      else if (nullmakach.length===0 && arrtitle.length >0 && duplicatemakach.length ===0) {
        console.log('isFormValid')
        setErrors(errors); 
        isValid =true
      }
      
    
       if(!isValid){
       
        setErrors(true)
        return;
        }
      else
      {
   
        setErrors(false)
        if (isLevel >0){
          console.log('ttt' +isLevel)
          addtochildTree(isIndex,isLevel,isItem)
        }
       
      else{
       
        addtochild()
      }
       
      
      setModalVisible(false);
        setIsToogleOssef(false)
        return;
      }
     }
    
    const onNextStep = () => {
     
      if(step1Data.menuname ==""){
        alert('menu name must  not be empty.')
        errors.menuname = 'menu name must  not be empty.';
        setErrors(true)
      
        
      }
      else
      {
      
       
        setErrors(false)
        return;
      }
     
  };

 

  const addtochildTree  = (isIndex,isLevel,isItem) =>{
    setData(function(){
      // create shallow copy of array
      const newPost = [...data];
      console.log(data)
      
       
        isItem.title= step1Data.menuname
        isItem.audioname=  step2Data.audioname
        isItem.items = [] 

        
        
        let i=0;
    
        for(var pindex in arrtitle){
          var qval = arrtitle[pindex]
    
          var qrdata ={}
          isItem.items.splice(isIndex, 0, qrdata);
          qrdata.title=qval
            
          i=i+1;
         }
    

       
    return newPost;

      })
  }

  const addtochild  = () =>{
  
    var pdata = [];


    var rdata ={}
    rdata.title= step1Data.menuname
    rdata.audioname=  step2Data.audioname
      
    pdata.splice(0, 0, rdata);

    rdata.items = []
   
    let i=0;
    
    for(var pindex in arrtitle){
      var qval = arrtitle[pindex]

      var qrdata ={}
      rdata.items.splice(i, 0, qrdata);
      qrdata.makchim=qval
        
      i=i+1;
     }

    setData(pdata)

    }

  const onNextStep1= () => {
      
    if(step2Data.audioname ==""){
      alert('audio name must  not be empty.')
      errormessages.audioname = 'audio name must  not be empty.';
      
      setErrors(true)
      
      
    }
    else
    {
    
     
      setErrors(false)
      return;
    }
   
};



    const handleOnChange = function(item,index) {
     
      setTitle((prevArray) => {
        const newarrData = [...prevArray];
        newarrData[index] = item.label;

       

        return newarrData;

      })
     }

    const handleAddRow = () => {

      setTitle(prevArray => [...prevArray, ""])
     
      setCsvData((prevData) => {
        const newData = [...prevData];
        if (!newData[fileindex]) {
          newData[fileindex] = [];
        }
       newData[fileindex][0] = makachim;
    
       let count = fileindex + 1;
  
         setFileindex(count)
         
        return newData;
      });
      
    };

    const handleDelete = (index) =>  {
      
      setTitle((prevArray) => {
        const newarrData = [...prevArray];
        
        newarrData.splice(index, 1);
        return newarrData;

      })
      
      setCsvData((prevData) => {
        const newList = [...prevData];
      
      
        newList.splice(index, 1);
        
        let count = fileindex - 1;
       
        setFileindex(count)
    
        return newList
      });
    }
    const toggleModal = () => {
   
      setModalVisible(!isModalVisible);
   
    };
   
   
    const fetchAudioDataForPosts = async () => {
      const limit = 30;
  
      
  
      let url = `/Webhttp/getaudios`
  
      await axiosInstance.get(url)
  
        .then(({ data }) => {
       

          // Array to store partial objects
          let ddldata = [];
  
          // Using forEach() to create partial objects
          data.forEach(obj => {
            const partialObj = {};
            partialObj.label = obj.name;
            partialObj.value = obj.filename;
            // You can include other properties as needed
            ddldata.push(partialObj);
          });
  
      
          setDataddl(ddldata)
  
  
        })
  
    };
   
    const handleExit = () => {
         
      setModalVisible(false);
   
    };

    const ClearModal = () => {
         
      setStep1Data({ menuname: '' }) 
      setStep2Data({ audioname: '' })
      setTitle([])
    };

    const AddModallevel = (index,level,it) => {
     setIsLevel(level)
     setIsIndex(index);

     setisItem(it);

      ClearModal()
      setModalVisible(true)
    }

    const listenAudiorecord = async(filename) => {
      const limit = 30;
      console.log(filename)
      
       const playbackObject = new Audio.Sound();
          await playbackObject.loadAsync({ uri: FileSystem.documentDirectory + 'recordings/' + `${filename}` });
          await playbackObject.playAsync();
  
       
      };
    
    
   
  return (
    <View style={{ flex: 1 }}>
    <View style={{ padding: 20, backgroundColor: 'lightgray' }}>
  
    </View>
    {/* <View style={styles.container}> */}
    <ScrollView style={styles.scrollView}>    
    {data.map((item, index) => (
        <View key={index} style={{borderBottomColor: 'black', borderBottomWidth: .5,marginTop:25}}>
          
          
   
           <View style = {{flex:1,flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
             
             <Text style={{fontSize:24, fontWeight: 'bold'}}> {item.title}   
             {item.items.length>0 && 
          <View style={{ flexDirection:"row" }}>
             <View style={{ marginHorizontal: 10,marginTop: 5 }}>
              <Button   style={styles.button1}  title="ערוך"  
             onPress={() => setModalVisible(true)} /> 
             </View> 
             <View style={{ marginHorizontal: 10,marginTop: 5 }}>
             <Button   style={styles.button1}  title="נגן"  
             onPress={() => listenAudiorecord(item.audioname)} /> 
             </View> 
          </View>
            }
           
           {item.items.length==0 &&  <Button   style={styles.button1}  title="הוסף"  
             onPress={() => addChild(index,0,item)} /> }
              </Text>
              
              </View>
          
            {item.items && <>
            {item.items.map((item, index) => (
                <View key={index} style={{ borderBottomColor: 'black', borderBottomWidth: .5}}>
                    
                    <View style = {{flexDirection:'row',justifyContent:'center'}}>
                      <Text style={{fontSize: 20, marginRight: 50, color: 'blue03'}}>
                        {item.makchim} <Button style={styles.button1}  title="הוסף" onPress={() => AddModallevel(index,1,item)  } 
                      /></Text>    
                      
                       
              </View>  
                   
                 


                     {item.items && <>
                     {item.items.map((item, index) => (
                       <View key={index}  style={{ borderBottomColor: 'black', borderBottomWidth: .5}}>
                           <View style = {{flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
                           <Text style={{fontSize: 18, marginRight:62,color: 'green'}}>{item.title} <Button   style={styles.button1}  title="הוסף"  
             onPress={() => addChild( index,2,item)} />   
             
                   </Text></View>

                   {item.items && <>
                     {item.items.map((item, index) => (
                       <View key={index}  style={{ borderBottomColor: 'black', borderBottomWidth: .5}}>
                           <View style = {{flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
                           <Text style={{fontSize: 16, marginRight:82,color: 'purple'}}>{item.title} <Button   style={styles.button1}  title="הוסף"  
             onPress={() => addChild( index,3,item)} />   
           
                   </Text></View>
                   
 
                       </View>
                    ))}
                   </>}
                   </View>
                    ))}
                   </>}
                   

               </View>
            ))}
           </>}
        </View>
     ))}</ScrollView>
     {/* </View> */}
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
            <Button title="שמור" 
            //  onPress={() => exportnewCsv()} 
             style={[ {padding: 20, opacity: isFormValid ? 1 : 0.5 }]} 
             disabled={!isFormValid} 
             />
     </View>
     <View style={{ marginHorizontal: 10,marginTop: 5 }}>
            <Button title="בטל" onPress={() => Cancel()} style={{ padding: 20, }} />
     </View>
     <View style={{ marginHorizontal: 10,marginTop: 5 }}>
         <Button title="הוסף" 
         style={[ {padding: 20, opacity: isToogleOssef ? 1 : 0.5 }]} 
         disabled={!isToogleOssef} 
         onPress={() => {
          setModalVisible(true)
         
        }}   />
     </View>
 </View>
<View style={{ padding: 20, backgroundColor: 'lightgray' }}>
       
       </View>
       <View style={{ marginTop: 22 }}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={isModalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
           <View style={styles.modalView}>
            <View style={{ flex: 0.1, justifyContent: "flex-start",backgroundColor:'gray'  }} >
                <TouchableOpacity style={styles.listItem}
                onPress={() => {
                 setModalVisible(!isModalVisible);
                }}>
                <Text>סגור</Text>
              </TouchableOpacity>
            </View>
      
            <View style={styles.container}>
      <ProgressSteps>
        <ProgressStep label="שם תפריט" nextBtnText="הבא"
         nextBtnTextStyle={buttonTextStyle} 
         onNext={onNextStep}
         errors={errors}
         >
          <View style={styles.stepContent}>
          
            <TextInput
              style={styles.input}
              placeholder="שם תפריט"
              value={step1Data.menuname}
              onChangeText={text => setStep1Data({ ...step1Data, menuname: text })}
            />
            
            
          </View>
        </ProgressStep>
        <ProgressStep label="הקלטה" nextBtnText="הבא" nextBtnTextStyle={buttonTextStyle}
        previousBtnText="הקודם" previousBtnTextStyle={buttonTextStyle}
        onNext={onNextStep1}
         errors={errors}
        >
          <View style={styles.stepContent}>
        
            
            <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
           inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={dataddl}
          
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'בחר הקלטה' : '...'}
           value={step2Data.audioname}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setStep2Data({ ...step2Data, audioname: item.value })
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
          </View>
        </ProgressStep>
        <ProgressStep label="בחירת מקשים" 
        finishBtnText="הפעל" finishBtnTextStyle={buttonTextStyle}
        previousBtnText="הקודם" previousBtnTextStyle={buttonTextStyle}
        onSubmit={onSubmit1}
        >
          <View style={styles.stepContent}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <FlatList
            data={csvData}
            keyExtractor={(item, index) => index.toString()}
            
            renderItem={({ item, index }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                 <View style={{ marginTop: 5 }}>
           <Button title="מחק"  onPress={() => handleDelete( index)}  style={{ padding: 20, }} />
       </View>

       <View style={{ marginTop: 5 }}>
                   <Dropdown key={index}
                  
                   data={makachim}
                 
                   onChange={(item) => handleOnChange(item,index)}
                    style={[styles.dropdown1]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                     inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'בחר מקש' : '...'}
                   onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                 
                  renderLeftIcon={() => (
                    <AntDesign
                      style={styles.icon}
                      color={isFocus ? 'blue' : 'black'}
                      name="Safety"
                      size={20}
                    />
                  )}
                />
                </View>
     <View style={{ marginTop: 5 }}>
                <Text  style={styles.title}> {handleTitle( index)}    </Text>
                   
                 
                   
                   </View>
           
              </View>
            
            )}
          />

<View style={{ flexDirection:"row" }}>
<View style={{ marginHorizontal: 10,marginTop: 5 }}>
           <Button title="הוסף"  onPress={handleAddRow}  style={{ padding: 20, }} />
       </View>
  </View>
            </View>

          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
         
         
          </View>
        </Modal>
        </View>
     
       
 






     </View>
    

  );
};



export default Menu;


const styles = StyleSheet.create({
  
  centerElement: {justifyContent: 'center', alignItems: 'center'},

  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 3,
    width:'70%'
  },
  dropdown1: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 3,
    width:'80%',
    margin: 5,
     borderWidth: 1,
      padding: 10,
       fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
 
  scrollView:{
    backgroundColor: "#AAA",
    marginHorizontal: 20,
    shadowOpacity: 0.36,
         shadowRadius: 6.68,
         elevation: 8,

  },
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
    alignContent:'center',
    marginHorizontal: 8,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginLeft:10,
    marginRight:10,
   

     
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
     marginLeft: 13,
   },
   separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CCC'
    },
    centeredView: {
      flex:1,
     
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      justifyContent:'space-around', 
       alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
     flex:1
        // width: 450,
        // height: 480
    },
 
    headerText: {
      textAlign: "center",
      fontSize: 24,
    },
    regularText: {
      textAlign: "center",
      fontSize: 14,
      marginTop: 16,
    },
    button: {
      backgroundColor: "#007ffe",
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 8,
      marginTop: 16,
      flex: 1,
      marginHorizontal: 5,
    },
    buttonCancel: {
      backgroundColor: "red",
    },
    buttonText: {
      color: "#FFF",
      fontSize: 14,
      textAlign: "center",
    },
    title: {
      fontFamily:FONT.regular,
      fontSize: SIZES.medium,
      color: COLORS.secondary
      
    },
      button1: { 
    backgroundColor: '#aaa', 
    borderRadius: 8, 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    alignItems: 'center', 
    marginTop: 26, 
    marginBottom: 12,
   
    width: 88,
    height: 58
  }
});

// const styles = StyleSheet.create({
  
//   fixToText: {
//     flex: 1,
    
//     justifyContent: 'space-around',
//     justifyContent: 'space-between',
//     marginLeft:10,
//     marginRight:10
//   },
//   Viewitem: {
//       flexDirection: 'row',
//     justifyContent: 'space-around',
//     margin:10,
//     padding:10,
//     borderBottomWidth: 1,
     
//   },
//   button1: { 
//     backgroundColor: '#aaa', 
//     borderRadius: 8, 
//     paddingVertical: 10, 
//     paddingHorizontal: 20, 
//     alignItems: 'center', 
//     marginTop: 26, 
//     marginBottom: 12,
//     width: 68,
//     height: 48
//   }

// });


// const styles = StyleSheet.create({
//   row: {
//       borderColor: 'rgb(84, 85, 86)',
//       backgroundColor: 'rgb(10, 157, 40)',
//       borderWidth: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: 30,
//   },
  
// })