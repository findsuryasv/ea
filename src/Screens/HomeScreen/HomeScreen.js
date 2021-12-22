import React, { useEffect, useState } from 'react'
import { Image, Text, View, FlatList } from 'react-native'
import { Card, Button, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Products } from '../../mock/Products';
import { addItemToCart, removeItemFromCart, updateItemQuantityInCart } from '../../Store/Actions';

const HomeScreen = () => {
    const [data, setData] = useState(Products);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state?.cart || []);

    useEffect(() => {
        setData(data.map((product) => ({ ...product, isAddedToCart: cartItems.some((q) => q.name === product.name) })));
    }, [cartItems])


    const renderProduct = ({ item }) => {
        return (
            <Card style={{ margin: 10 }}>
                <Card.Title
                    title={item.name}
                    subtitle={item.category}
                />
                <Card.Content>
                    <Image source={{ uri: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' }} />
                    <Title>${item.price}</Title>
                </Card.Content>
                <Card.Actions style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    {
                        item?.quantity > 1 ? (
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Button onClick={() =>
                                    dispatch(updateItemQuantityInCart({ ...item, quantity: item.quantity + 1 }))}>+</Button>
                                <Text>{item?.quantity}</Text>
                                <Button onClick={() => {
                                    if (item.quantity === 1) {
                                        dispatch(removeItemFromCart(item))
                                    } else {
                                        dispatch(updateItemQuantityInCart({ ...item, quantity: item.quantity - 1 }))
                                    }
                                }
                                } >-</Button>
                            </View>
                        ) : (
                            <Button onPress={() => {
                                if (item.isAddedToCart) {
                                    dispatch(removeItemFromCart(item))
                                } else {
                                    dispatch(addItemToCart(item));
                                }
                            }}>{'Add to Cart'}</Button>
                        )
                    }
                </Card.Actions>
            </Card>
        )
    }
    return (
        <View>
            <FlatList
                data={data}
                renderItem={renderProduct}
                keyExtractor={item => item.name}
            />
        </View>
    )
}

export default HomeScreen
