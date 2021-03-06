import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Dimensions } from 'react-native';
import axiosInstance from '../../Services/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = (props) => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        isIncorrectEmail: false,
        isIncorrectPassword: false
    });
    const [showPassword, setToShowPassword] = useState(false);

    const validateField = (name) => {
        setLoginData({
            ...loginData,
            ...name === 'email' && { isIncorrectEmail: !(!!loginData[name]) },
            ...name === 'password' && { isIncorrectPassword: !(!!loginData[name]) }
        })
    }

    const authenticate = async () => {
        if (loginData.email && loginData.password) {
            try {
                const res = await axiosInstance.post('/authenticate', { email: loginData.email, password: loginData.password });
                console.log(res);
                await AsyncStorage.setItem('token', res?.data?.token);
                props.navigation.navigate('Home');
            } catch (error) {
                console.log(error)
            }

        } else {
            setLoginData({
                ...loginData,
                isIncorrectEmail: !(!!loginData.email),
                isIncorrectPassword: !(!!loginData.password)
            })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.loginTextContainer}>
                <Text style={styles.loginText}>Login Screen</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder={'Email Address'}
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                    style={styles.inputMargin}
                    onChangeText={(value) => setLoginData({
                        ...loginData,
                        email: value,
                        isIncorrectEmail: false
                    })}
                    value={loginData.email}
                    editable={true}
                    returnKeyType="next"
                    onBlur={() => validateField('email')}
                />
                {
                    loginData.isIncorrectEmail && <View>
                        <Text style={styles.errorMessage}>Invalid Email address</Text>
                    </View>
                }
                <View style={{ position: 'relative' }}>

                    <TextInput
                        placeholder={'password'}
                        secureTextEntry={!showPassword}
                        autoCorrect={false}
                        textContentType="password"
                        autoCapitalize="none"
                        value={loginData.password}
                        style={styles.inputMargin}
                        editable={true}
                        onChangeText={(value) => setLoginData({
                            ...loginData,
                            password: value,
                            isIncorrectPassword: false
                        })}
                        onBlur={() => validateField('password')}
                    />
                    <Icon onPress={() => setToShowPassword(!showPassword)} style={{position: 'absolute', right: 15, top: 25, fontSize: 22}} name={showPassword ? 'eye' : 'eye-slash'} />
                </View>
                {
                    loginData.isIncorrectPassword && <View>
                        <Text style={styles.errorMessage}>Invalid password</Text>
                    </View>
                }
                <View style={styles.buttonStyle}>
                    <Button
                        title={'Login'}
                        titleStyle={styles.buttonTitleStyle}
                        style={styles.buttonWidthStyle}
                        onPress={authenticate}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
    },
    inputContainer: {
        height: '90%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'

    },
    loginTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    inputMargin: {
        marginTop: 12,
        borderWidth: 1,
        width: Dimensions.get('window').width * 0.8
    },
    buttonStyle: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonWidthStyle: {
        width: 120
    },
    buttonTitleStyle: {
        fontSize: 16,
        color: 'green'
    },
    errorMessage: {
        color: 'red',
    }
})


export default LoginScreen
