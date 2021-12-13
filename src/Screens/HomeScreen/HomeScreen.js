import React from 'react'
import { Image, Text, View, FlatList } from 'react-native'
import { Card, Button, Title } from 'react-native-paper';
import { Products } from '../../mock/Products';

const HomeScreen = () => {
    const renderProduct = ({ item }) => {
        return (
            <Card style={{ margin: 10 }}>
                <Card.Title
                    title={item.name}
                    subtitle={item.category}
                />
                <Card.Content>
                    <Image source={{uri: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'}} />
                    <Title>${item.price}</Title>
                </Card.Content>
                <Card.Actions style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Button style={{}}>Add to Cart</Button>
                </Card.Actions>
            </Card>
        )
    }
    return (
        <View>
            <FlatList
                data={Products}
                renderItem={renderProduct}
                keyExtractor={item => item.name}
            />
        </View>
    )
}

export default HomeScreen
