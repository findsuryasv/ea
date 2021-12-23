import React, { useEffect } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Button, List } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { removeItemFromCart } from '../../Store/Actions'

const CartScreen = ({navigation}) => {

    const cartItems = useSelector(state => state?.cart || []);

    const dispatch = useDispatch();
    
    useEffect(() => {
        if(!cartItems.length) {
            navigation.navigate('Home')
        }
        console.log(cartItems);
    },[cartItems])

    const deleteItemFromCart = (item) => {
        dispatch(removeItemFromCart(item))
    }

    return (
        <View style={{padding: 12}}>
            <List.Section>
                <List.Subheader>Cart Items</List.Subheader>
                {
                    cartItems.length > 0 && (
                        cartItems.map(item => (
                            <List.Item key={item.name} title={item.name} 
                            left={() => <List.Icon icon="folder" />} 
                            right={() => <TouchableOpacity onPress={() => deleteItemFromCart(item)}><Text> <List.Icon color="red" icon="delete" /></Text></TouchableOpacity>} />
                        ))
                    )
                }
                <View style={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', marginVertical: 50}}>
                <Button mode="contained" >Checkout</Button>
                    </View>
            </List.Section>
        </View>
    )
}

export default CartScreen