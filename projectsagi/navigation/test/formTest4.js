import { Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import React, { useState, useEffect , forwardRef, useImperativeHandle} from 'react';
import { COLORS, FONT, SIZES } from "../constants";


   
 export  const  FormTest4 =forwardRef((props, ref) => {

    const validateForm = () => {
        if (!name) { 
                    errors.name = 'Name is required.'; 
                } 
                
            
                // Set the errors and update form validity 
                setErrors(errors); 
                setIsFormValid(Object.keys(errors).length === 0); 
        console.log("inside refreshEntireGrid");
      }
    

 
      const [errors, setErrors] = useState({}); 
      const [isFormValid, setIsFormValid] = useState(false); 
      
    const [name, setName] = useState(null); 

  useImperativeHandle(ref, () => ({
       validateForm
  }));

    // const validateForm = () => { 
    //     let errors = {}; 
    
    //     // Validate name field 
    //     if (!name) { 
    //         errors.name = 'Name is required.'; 
    //     } 
        
    
    //     // Set the errors and update form validity 
    //     setErrors(errors); 
    //     setIsFormValid(Object.keys(errors).length === 0); 
    // }; 




  return (
             <View style={styles.container}>
                  <TextInput 
                    style={styles.input} 
                    placeholder="Name"
                    value={name} 
                    onChangeText={setName} 
                /> 
     
           </View>
  );
})
 

const styles = StyleSheet.create({

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
        width: 128,
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
