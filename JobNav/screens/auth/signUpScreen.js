import React, { useEffect, useState, useContext } from 'react';
//import { validateAll } from 'indicative/validator';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { View, Text } from 'react-native';
import {
    Input,
    Card,
    FormValidationMessage,
    Button
} from 'react-native-elements';

import { AuthContext } from '../../utils/authContext';



const SignUpScreen = ({ navigation }) => {
    const [emailAddress, setemailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [SignUpErrors, setSignUpErrors] = useState({});

    const { signUp, signIn } = useContext(AuthContext); // should be signUp


    const schema = yup.object().shape({
        email: yup.string().required('Email is required').email('Invalid email'),
        password: yup
          .string()
          .required('Password is required')
          .min(8, 'Password must contain at least 8 characters'),
      });
      
      const FormComponent = () => {
        const {
          control,
          handleSubmit,
          formState: { SignUpErrors },
        } = useForm({
          resolver: yupResolver(schema),
          defaultValues: {
            email: '',
            password: '',
          },
        });
      }


    const handleSignUp = () => {
        // https://indicative.adonisjs.com
        const rules = {
            email: 'required|email',
            password: 'required|string|min:6|max:40|confirmed'
        };

        const data = {
            email: emailAddress,
            password: password,
            password_confirmation: passwordConfirm
        };

    }

      

    useEffect(() => {}, [errors]);

    return (
        <View style={{ paddingVertical: 20 }}>
            <Card>
                <Input
                    label={'Email'}
                    placeholder="Email address..."
                    value={emailAddress}
                    onChangeText={setemailAddress}
                    errorStyle={{ color: 'red' }}
                    errorMessage={SignUpErrors ? SignUpErrors.email : null}
                />
                <Input
                    label={'Password'}
                    placeholder="Password.."
                    value={password}
                    onChangeText={setPassword}
                    
                />
                <Input
                    label={'Password Confirm'}
                    placeholder="Enter password again"
                    value={passwordConfirm}
                    onChangeText={setPasswordConfirm}
                    
                />
                <Text style={{ color: 'red', marginLeft: 10, fontSize: 10 }}>
                    {SignUpErrors ? SignUpErrors.password : null}
                </Text>

                <Button
                    buttonStyle={{ margin: 10, marginTop: 50 }}
                    backgroundColor="#03A9F4"
                    title="SIGN UP"
                    onPress={() => handleSignUp()}
                />
                <Text style={{ marginLeft: 80 }} onPress={() => signIn()}>
                    Already Signed Up? Sign In
                </Text>
            </Card>
        </View>
    );
};

export default SignUpScreen;
