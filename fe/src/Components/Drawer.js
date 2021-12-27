import React, { useEffect, useState } from 'react'
import { Dimensions, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import axiosInstance from '../Services';
import { displayDrawer } from '../Store/Actions';

const Sidebar = ({ navigation }) => {

    const [showDrawer, setToDisplayDrawer] = useState(false);
    const [actions, setActions] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getSidebarActions();
    }, [])

    const getSidebarActions = async () => {
        try {
            const res = await axiosInstance.get('/sidebar-actions');
            console.log(res);
            setActions(res?.data);
        } catch (error) {
            console.log(error);
        }
    }

    return <TouchableOpacity style={{
        width: Dimensions.get('window').width, height: Dimensions.get('window').height,
        backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000
    }} onPress={() => {
        console.log('drawer')
    navigation.goBack();
        }}>
        <ScrollView style={{ width: '75%', height: Dimensions.get('window').height, padding: 12, backgroundColor: '#fff' }}>
            {
                actions.length > 0 && actions.map(action => (
                    <TouchableOpacity onPress={() => navigation.navigate(action?.label)} style={{ padding: 12, display: 'flex', flexDirection: 'row' }} key={action?.label}>
                        <Text style={{ color: '#000', fontSize: 20, fontWeight: '600' }}>{action?.label}</Text>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    </TouchableOpacity>
}

export default Sidebar
