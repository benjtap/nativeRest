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

const SignInScreen = ({ navigation }) => {
    const [emailAddress, setemailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [SignUpErrors, setSignUpErrors] = useState({});

    const { signIn, signUp } = useContext(AuthContext);

    const handleSignIn = () => {
        // https://indicative.adonisjs.com
        const rules = {
            email: 'required|email',
            password: 'required|string|min:6|max:40'
        };

        const data = {
            email: emailAddress,
            password: password
        };

        // const messages = {
        //     required: field => `${field} is required`,
        //     'username.alpha': 'Username contains unallowed characters',
        //     'email.email': 'Please enter a valid email address',
        //     'password.min': 'Wrong Password?'
        // };

        const messages = yup.object().shape({
            username: yup
            .string()
            .required('username is required')
            .username('Username contains unallowed characters'),
            email: yup
              .string()
              .required('Email is required')
              .email('Invalid email'),
            password: yup
              .string()
              .required('Password is required')
              .min(8, 'Password must contain at least 8 characters'),
          });

          const {
            control,
            handleSubmit,
            formState: {SignUpErrors},
          } = useForm({
            resolver: yupResolver(schema),
            defaultValues: {
              username:'',
              email: '',
              password: '',
            },
          });

    };

    return (
        <View>
            <Card>
                <Input
                    label={'Email'}
                    placeholder="Email"
                    value={emailAddress}
                    onChangeText={setemailAddress}
                    errorStyle={{ color: 'red' }}
                    errorMessage={SignUpErrors  ? SignUpErrors .email : null}
                />
                <Input
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    errorStyle={{ color: 'red' }}
                    errorMessage={SignUpErrors  ? SignUpErrors .password : null}
                />
                <Button
                    buttonStyle={{ margin: 10, marginTop: 50 }}
                    title="Sign in"
                    onPress={() => handleSignIn()}
                />
                <Text style={{ marginLeft: 100 }} onPress={() => signUp()}>
                    No Acount? Sign Up
                </Text>
            </Card>
        </View>
    );
};

export default SignInScreen;
