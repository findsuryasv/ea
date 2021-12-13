import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'

const LoginScreen = (props) => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        isIncorrectEmail: false,
        isIncorrectPassword: false
    });

    const validateField = (name) => {
        setLoginData({
            ...loginData,
            ...name === 'email' && { isIncorrectEmail: !(!!loginData[name]) },
            ...name === 'password' && { isIncorrectPassword: !(!!loginData[name]) }
        })
    }

    const authenticate = () => {
        if (loginData.email && loginData.password) {
            props.navigation.navigate('Home');
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
            <TextInput
                placeholder={'password'}
                secureTextEntry={true}
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
        width: '80%'
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
