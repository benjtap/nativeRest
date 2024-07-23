import React, { useState, useEffect } from 'react';
//import { I18nManager } from 'react-native'
// import all the components we are going to use
import {Button,View, Text,StyleSheet,TouchableOpacity,TextInput,ScrollView,Modal,FlatList,} from 'react-native';
import { COLORS, FONT, SIZES } from "../constants";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import axiosInstance from '../helpers/axiosInstance';


const Menu = () => {
  const [selectedText, setSelectedText] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false); 
 
  const [isFocus, setIsFocus] = useState(false);

  
  const [dataddl, setDataddl] = useState([]);

  const [csvData, setCsvData] = useState([]);
  const [fileindex, setFileindex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState([
 
    {
      title: 'Software',
      items: [
        {
          title: 'JS',
         
        },
        {
          title: 'React JS',
          items: [
            {
              title: 'Components',
              
            },
            {
              title: 'Hooks',
              
            },
          ],
        },
      ],
    },
  ]);
  const handleConfirm = (date) => {
    setSelectedDate(date);
   
  };
  const [selected, setSelected] = useState(null);  


  
  const [step1Data, setStep1Data] = useState({ menuname: '' });

  const [step2Data, setStep2Data] = useState({ audioname: ''});


  const [step3Data, setStep3Data] = useState({ password: '', retypePassword: '' });
  
  const [value, setValue] = useState(null);

  const [didFetch,setDidFetch] = useState(false)

  useEffect(() => {
    if(!didFetch){
     
      
      fetchAudioDataForPosts();
      setDidFetch(true)
      }
   
  }, []);



    const addChild = (index,level,it) => {
 

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
 
 

    headerComponent = () => {
      return (
      <View style={{ flexDirection:"row" }}>
       <View style={{ marginHorizontal: 55,marginTop: 5 }}><Text style={ styles.listHeadline }>מספר</Text></View> 
       <View style={{ marginHorizontal: 55,marginTop: 5 }}><Text style={ styles.listHeadline }>שם</Text></View> 
         </View> 
      );
      }
 
    const toggleModal = () => {
   
      setModalVisible(!isModalVisible);
   
    };
   
   
    const fetchAudioDataForPosts = async () => {
      const limit = 30;
  
      
  
      let url = `/Webhttp/getaudios`
  
      await axiosInstance.get(url)
  
        .then(({ data }) => {
          console.log(data)

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
  
          console.log(ddldata)
          setDataddl(ddldata)
  
  
        })
  
    };
   
    const handleExit = () => {
   
      // Handle the exit action here
   
      // For now, let's just log a message
   
      console.log('Exiting the app');
   
      setModalVisible(false);
   
    };
   

    const handleAddRow = () => {
      setCsvData((prevData) => {
        const newData = [...prevData];
        if (!newData[fileindex]) {
          newData[fileindex] = [];
        }
        newData[fileindex][0] = "";
        
  
        let count = fileindex + 1;
  
      setFileindex(count)
        return newData;
      });
    };

  return (
    <View style={{ flex: 1 }}>
    <View style={{ padding: 20, backgroundColor: 'lightgray' }}>
  
    </View>
    <View style={styles.container}>
    <ScrollView style={styles.scrollView}>    
    {data.map((item, index) => (
        <View key={index} style={{borderBottomColor: 'black', borderBottomWidth: .5,marginTop:25}}>
           <View style = {{flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
           <Text style={{fontSize:22, fontWeight: 'bold'}}>{item.title} <Button   style={styles.button1}  title="הוסף"  
             onPress={() => addChild(index,0,item)} /> 
                {/* <Button   style={styles.button1}  title="מחוק"  
             onPress={() => handledeleteAudiorecord()} />  */}
              </Text></View>
          
            {item.items && <>
            {item.items.map((item, index) => (
                <View key={index} style={{ borderBottomColor: 'black', borderBottomWidth: .5}}>
                    
                    <View style = {{flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
                      <Text style={{fontSize: 20, marginRight: 40, color: 'blue'}}>{item.title} <Button   style={styles.button1}  title="הוסף"  
             onPress={() => addChild( index,1,item)} />   
           
                   </Text></View>


                     {item.items && <>
                     {item.items.map((item, index) => (
                       <View key={index}  style={{ borderBottomColor: 'black', borderBottomWidth: .5}}>
                           <View style = {{flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
                           <Text style={{fontSize: 18, marginRight:60,color: 'green'}}>{item.title} <Button   style={styles.button1}  title="הוסף"  
             onPress={() => addChild( index,2,item)} />   
             
                   </Text></View>

                   {item.items && <>
                     {item.items.map((item, index) => (
                       <View key={index}  style={{ borderBottomColor: 'black', borderBottomWidth: .5}}>
                           <View style = {{flexDirection:'row',flexWrap:'wrap'}}>
                           <Text style={{fontSize: 16, marginLeft: 70,color: 'purple'}}>{item.title} <Button   style={styles.button1}  title="הוסף"  
             onPress={() => addChild( index,3,item)} />   
              {/* <Button   style={styles.button1}  title="מחוק"  
             onPress={() => handledeleteAudiorecord()} />  */}
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
     ))}</ScrollView></View>
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
         <Button title="הוסף"  onPress={() => {
          setModalVisible(true)
         
        }}  style={{ padding: 20, }} />
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
        <ProgressStep label="שם תפריט">
          <View style={styles.stepContent}>
          
            <TextInput
              style={styles.input}
              placeholder="שם תפריט"
              value={step1Data.menuname}
              onChangeText={text => setStep1Data({ ...step1Data, menuname: text })}
            />
            
            
          </View>
        </ProgressStep>
        <ProgressStep label="הקלטה">
          <View style={styles.stepContent}>
        
            {/* <TextInput
              style={styles.input}
              placeholder="Email"
              value={step2Data.email}
              onChangeText={text => setStep2Data({ ...step2Data, email: text })}
            /> */}
            
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
        <ProgressStep label="בחירת מקשים">
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
                {item.map((cell, cellIndex) => (
                  // <TextInput
                  //   key={cellIndex}
                  //   style={{ margin: 5, borderWidth: 1, padding: 10, fontSize: 16,width:150 }}
                  //   value={cell}
                  //   onChangeText={(text) => handleCellChange(text, index, cellIndex)}
                  // />
                  <Dropdown
                  style={[styles.dropdown1]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                   inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={dataddl}
                  
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'בחר מקש' : '...'}
                  value={step2Data.audioname}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setStep2Data({ ...step3Data, makachname: item.value })
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
                
                ))}
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
       {/* 
       

       <Modal
          animationType={'slide'}
          transparent={false}
          visible={isModalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
           <View style={styles.modalView}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                 setModalVisible(!isModalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

       //////////////////////////////////////////
       <View style={styles.centeredView}> 
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
         <View style={styles.modalView}>
          <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
           inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={datasel}
          
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
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
        
      </Modal>
 </View>
       
       */}

{/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 
      <TouchableOpacity onPress={toggleModal}>
 
        <Text>Show Exit Modal</Text>
 
      </TouchableOpacity>
 
 
 
 
      <Modal isVisible={isModalVisible}>
 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 
          <Text>Do you want to exit?</Text>
 
 
 
 
          <TouchableOpacity onPress={handleExit}>
 
            <Text>Exit</Text>
 
          </TouchableOpacity>
 
 
 
 
          <TouchableOpacity onPress={toggleModal}>
 
            <Text>No</Text>
 
          </TouchableOpacity>
 
        </View>
 
      </Modal>
 
    </View> */}
 
 {/* <Animated.View pointerEvents="box-none" style={[styles.background]}>
        <Animated.View style={[styles.background]}>
          <View style={styles.wrap}>
            <View style={styles.modalHeader}></View>
            <Text style={styles.headerText}>Hello!</Text>
            <Text style={styles.regularText}>
              This modal is wonderful ain't it!
            </Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <TouchableOpacity style={[styles.button, styles.buttonCancel]}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Animated.View> */}



 {/* <Animated.View
        pointerEvents="box-none"
        style={[
          styles.background,
          {
            backgroundColor: background,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.background,
            {
              transform: [
                {
                  scale: display,
                },
                {
                  translateY: success,
                },
              ],
            },
          ]}
        >
          <View style={styles.wrap}>
            <View style={styles.modalHeader}></View>
            <Text style={styles.headerText}>Hello!</Text>
            <Text style={styles.regularText}>This modal is wonderful ain't it!</Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  Animated.spring(animation, {
                    toValue: 0,
                  }).start();
                }}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  Animated.spring(animation, {
                    toValue: 2,
                  }).start(() => {
                    animation.setValue(0);
                  });
                }}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Animated.View> */}


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
    width:'60%',
    margin: 5,
     borderWidth: 1,
      padding: 10,
       fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
 
  scrollView:{
    backgroundColor: "#CCA",
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