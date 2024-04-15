import React, { useState } from "react";
import { TextInput, Button,View, StyleSheet, Text, secureTextEntry } from "react-native";



import { AuthContext } from '../components/context';

import Users from '../model/users';




const SignInScreen = ({navigation}) => {


    const { signIn } = React.useContext(AuthContext);

    const [userName, setuserName] = useState("");

    const [password, setpassword] = useState("");

    const loginHandle = (userName, password) => {
     
        const foundUser = Users.filter( item => {
            return userName == item.username && password == item.password;
        } );

       
        signIn(foundUser);
    }

    return (

        <View style={styles.container}>
        <Text style={styles.inputext}>Sample Login Form</Text>
          <TextInput
            onChangeText={(text) => setuserName(text)}
            value={userName}
             label='Username'
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={(text) => setpassword(text)}
            secureTextEntry={true}
            style={styles.input}
          />
          
          <Button
            title={'Login'}
            style={styles.input}
            onPress={() => loginHandle( userName, password )}
          />
        </View>


        
    );

    





    
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00FFFF',
      },
      input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
      },
      inputext: {
        width: 200,
        height: 44,
        padding: 10,
        textAlign:'center',
        fontWeight:'bold',
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
      },
   
  });
