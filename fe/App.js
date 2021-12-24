import 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CartScreen from './src/Screens/CartScreen/CartScreen';
import HomeScreen from './src/Screens/HomeScreen/HomeScreen';
import LoginScreen from './src/Screens/LoginScreen/LoginScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { Badge, IconButton } from 'react-native-paper';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const App = () => {
    const getCartCount = useSelector((state) => (state?.cart || []).length)
    return (
        <View style={{ flex: 1 }}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home" screenOptions={(props) => ({
                        headerRight: () => (
                            <View style={{ position: 'relative', marginRight: 12 }}>
                                <IconButton icon="cart" size={20} onPress={() => props.navigation.navigate('Cart')} />
                                <Badge style={{ position: 'absolute', right: 0, zIndex: 12 }}>{getCartCount}</Badge>
                            </View>)
                    })}>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Cart" component={CartScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </View>
    )
}

export default App;
