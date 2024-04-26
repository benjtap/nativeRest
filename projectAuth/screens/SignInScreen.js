import {useRoute} from '@react-navigation/native';
import React, {useState,useContext} from 'react';

import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, Image } from 'react-native';
//import { axiosPublic } from "../app/services/axiosPublic";
import loginUser from '../context/actions/loginUser';
import {GlobalContext} from '../context/Provider';







const SignInScreen = ({navigation}) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const register = () => {
    navigation.navigate('SignUpScreen');
  };

    

    const [userName, setuserName] = useState("");

    const [password, setpassword] = useState("");

    const {
      authDispatch,
      authState: {error, loading},
    } = useContext(GlobalContext);

    const handleSubmit = async(userName, password) => { 
     
    const form = {
      password:password,
      userName:userName
    };

      loginUser(form)(authDispatch);
    

      };
   
     
  
    

    const loginHandle = (userName, password) => {
           handleSubmit(userName, password)
         
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
        onChangeText={(text) => setuserName(text)}
        placeholder="userName"
        placeholderTextColor="#ccc"
        style={styles.input}
      />
      <TextInput
        autoCapitalize='none'
        onChangeText={(text) => setpassword(text)}
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.login} onPress={() => loginHandle( userName, password )}>
        <Text style={styles.loginLabel}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.register}  onPress={register}> 
      {/*   */}
        <Text style={styles.registerLabel}>Register</Text>
      </TouchableOpacity>
    </View>
  );

};

export default SignInScreen;

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
  login: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    fontSize: 16,
    marginHorizontal: 24,
    marginVertical: 8,
    padding: 16,
  },
  loginLabel: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  register: {
    backgroundColor: '#fff',
    fontSize: 16,
    marginHorizontal: 24,
    marginVertical: 8,
    padding: 16,
  },
  registerLabel: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase'
  }
});


