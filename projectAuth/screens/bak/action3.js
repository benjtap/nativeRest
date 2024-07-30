import React, { useState, useEffect, useContext } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, TextInput,Platform } from 'react-native';

import { COLORS, FONT, SIZES } from "../constants";

import axiosInstance from '../helpers/axiosInstance';


const Action3 = (props) => {
  const { navigation } = props;

  const [name, setName] = useState(""); 
  const [errors, setErrors] = useState({}); 
 
  const [isFormValid, setIsFormValid] = useState(false); 
  
  
  



  const handleSubmit = async() => { 
     
    let url =`/Webhttp/creategroups`
      
      let CreategroupsPost =  {
        name:name
      }
          
  await axiosInstance.post(url,CreategroupsPost)

   .then(({data}) => {
            navigation.navigate('Contacts')
    })
 
    }
  
  useEffect(() => {
       
    validateForm();     // Call function to get permission

}, [name]);


  const validateForm = () => {
    if (!name)  { 
      
      errors.name = 'Name is required.'; 
        setIsFormValid(false);
        return;
    } 
    
    else
    {
     
      setErrors(errors); 
      setIsFormValid(true); 
        

    }
   
}

  

 

  return (
    <View style={styles.container}>

<View style={styles.Viewitem}><Text style={styles.title}> קבוצה חדשה</Text></View>
<View style={styles.fixToText}>
        <Text style={styles.title}>
        This action will create a new group with name.
      </Text>
      </View>

<View style={styles.container}>
                  <TextInput 
                    style={styles.input} 
                    placeholder="Name"
                    value={name} 
                    onChangeText={setName} 
                /> 
     
           </View>
      
               <TouchableOpacity 
                    style={[styles.button1, { opacity: isFormValid ? 1 : 0.5 }]} 
                    disabled={!isFormValid} 
                    onPress={handleSubmit} 
                > 
                <Text style={styles.buttonText}>Submit</Text> 
            </TouchableOpacity> 
   
    </View>
  );
}

const styles = StyleSheet.create({

  fixToText: {
   
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
    marginBottom:18
     
  },
  title: {
    fontFamily:FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary
    
  },


  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'red',
  },
  recordingStatusText: {
    marginTop: 16,
  },
   input: { 
        width: 158,
        height: 60, 
        borderColor: '#ccc', 
        borderWidth: 1, 
        marginBottom: 12, 
        paddingHorizontal: 10, 
        borderRadius: 8, 
        fontSize: 16, 
    }, 
   
    buttonText: { 
        color: '#fff', 
        fontWeight: 'bold', 
        fontSize: 16, 
    }, 
    error: { 
        color: 'red', 
        fontSize: 20, 
        marginBottom: 12, 
    }
});




export default Action3