import 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CartScreen from './src/Screens/CartScreen/CartScreen';
import HomeScreen from './src/Screens/HomeScreen/HomeScreen';
import LoginScreen from './src/Screens/LoginScreen/LoginScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import Store from './src/Store';

const Stack = createStackNavigator();

const App = () => {
    return (
        <View style={{ flex: 1 }}>
            <Provider store={Store}>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="Home">
                            <Stack.Screen name="Login" component={LoginScreen} />
                            <Stack.Screen name="Home" component={HomeScreen} />
                            <Stack.Screen name="Cart" component={CartScreen} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </SafeAreaProvider>
            </Provider>
        </View>
    )
}

export default App;
