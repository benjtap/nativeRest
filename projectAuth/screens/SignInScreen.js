import {useRoute} from '@react-navigation/native';
import React, {useState,useContext} from 'react';

import { StyleSheet, View, TextInput, TouchableOpacity, Text,Alert } from 'react-native';

import loginUser from '../context/actions/loginUser';
import {GlobalContext} from '../context/Provider';





const SignInScreen = ({navigation}) => {
  const timerRef = React.useRef(null);

  const [isHide, setIsHide] = useState(true)
  const [justSignedUp, setJustSignedUp] = useState(false);

  const {
    authDispatch,
    authState: {error, loading},
  } = useContext(GlobalContext);

  
  const [isLoading, setIsLoading] = useState(false);
  const register = () => {
    navigation.navigate('Register');
  };


  
  React.useEffect(() => {
    RenderError()
    if(!error)
      setNodisplay(true);
    else
    setNodisplay(false);
     
    timerRef.current = setTimeout(() => {
      setIsHide(false);
  }, 5000);
  }, [error,isHide]);


  const [nodisplay, setNodisplay] = useState(false);

    const [userName, setuserName] = useState("");

    const [password, setpassword] = useState("");

   
    const handleSubmit = async(userName, password) => { 
     
    const form = {
      password:password,
      userName:userName
    };

      loginUser(form)(authDispatch);
      
      
      };
   
     
  
    

    const loginHandle = (userName, password) => {
     
         if(timerRef.current)
          clearTimeout(timerRef.current)

          setIsHide(true);
          
          handleSubmit(userName, password)

          

    }

    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      );
    }
    
 
    const RenderError= () => {
    
  
    if(error && !error.error && isHide )
        return (
      <View style={styles.errorview}>
         <Text style={styles.errorLabel}>{error.message}</Text>
            </View>
   );

   if(nodisplay) return (null);
   
      
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

     <RenderError /> 
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
  errorview: {
    fontSize: 16,
    marginHorizontal: 24,
    marginVertical: 8,
    padding: 16,
  },
  errorLabel: {
    color: '#eea',
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


