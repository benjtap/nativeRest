import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import validator from "validator"
import axiosInstance from '../helpers/axiosInstance';

const SignUpScreen = (props) => {
  const { navigation } = props;
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  //const [isFormValid, setIsFormValid] = useState(false); 
  
  const onUsernameChanged = (username) => {

       setUsername (() => username);
    };
  
  const onFullnameChanged = (fullname) => {
     setFullname(() => fullname);
  };

   const onEmailChanged = (email) => {
     setEmail(() => email);
  };

 const onPasswordChanged = (password) => {
       setPassword(() => password);
  };

  const onConfirmPasswordChanged = (confirmPassword) => {
    setConfirmPassword(() => confirmPassword);
   };



  const showMessage = (title, message) => {
    Alert.alert(
      title,
      message
    );
  };

 


  const isSignupValid = ({ username,fullname, email, password, confirmPassword }) => {
    
    console.log(username)
    if (!username) {
      showMessage('Error', 'Please input your username');
     // setIsFormValid(false);
      return false;
    }
    if ((!fullname)) {
      //setIsFormValid(false);
      showMessage('Error', 'Please input your full name');
      return false;
    }
    if ((!email) || !validator.isEmail(email)) {
      //setIsFormValid(false);
      showMessage('Error', 'Please input your email');
      return false;
    }
    if ((!password)) {
      //setIsFormValid(false);
      showMessage('Error', 'Please input your password');
      return false;
    }if ((!confirmPassword)) {
     // setIsFormValid(false);
      showMessage('Error', 'Please input your confirm password');
      return false;
    }
    
    if(confirmPassword != password){
      showMessage('Error', 'Your confirm password must be matched with your password');
      //setIsFormValid(false);
      return false;
     }

   
    //setIsFormValid(true);

   return true;
  };

  const handleSubmit = async() => { 
      
    let createregisterPost =  {
      fullname:fullname,
      email:email,
      password:password,
      username:username
    }
   
 

      axiosInstance
      .post('Auth/createregister',createregisterPost, {
        password,
        username,
      })
      .then((res) => {
        navigation.navigate('LOGIN')
      })
     
   

  }



  const loginRegister = () => {
   if (isSignupValid({ username,fullname, email, password, confirmPassword })) {
   
    setIsLoading(true);

     handleSubmit()
 
  
    }
     
        
   }


  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize='none'
        onChangeText={onUsernameChanged}
        placeholder="Username"
        placeholderTextColor="#ccc"
        style={styles.input}
      />
     <TextInput
        autoCapitalize='none'
        onChangeText={onFullnameChanged}
        placeholder="Full name"
        placeholderTextColor="#ccc"
        style={styles.input}
      />

      <TextInput
        autoCapitalize='none'
        onChangeText={onEmailChanged}
        placeholder="Email"
        placeholderTextColor="#ccc"
        style={styles.input}
      />
      <TextInput
        autoCapitalize='none'
        onChangeText={onPasswordChanged}
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        autoCapitalize='none'
        onChangeText={onConfirmPasswordChanged}
        placeholder="Confirm Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity  
      style={[styles.register]} 
         
      onPress={() => 
        loginRegister( username,fullname, email, password, confirmPassword  )}>
        <Text style={styles.registerLabel}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}
export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  input: {
    borderColor: '#ccc',
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    marginHorizontal: 24,
    marginVertical: 8,
    padding: 12,
  },
  register: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    fontSize: 16,
    marginHorizontal: 24,
    marginVertical: 8,
    padding: 16,
  },
  registerLabel: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

