import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-vector-icons/FontAwesome';
import axiosInstance from '../Services';

const Sidebar = ({ navigation }) => {

    const [showDrawer, setToDisplayDrawer] = useState(false);
    const [actions, setActions] = useState([]);

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

    return <View>
        {
            showDrawer ? (<View>
            </View>) : (
                <View>
                    <TouchableOpacity onPress={() => setToDisplayDrawer(!showDrawer)}>
                        <Icon name='bars' />
                    </TouchableOpacity>
                </View>)
        }
    </View>
}

export default Sidebar
