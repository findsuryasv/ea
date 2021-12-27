import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
    baseURL: 'http://192.168.0.2:80'
});

axiosInstance.interceptors.request.use(async (req) => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    if(token) {
        req.headers = {
            'Authorization': token
        }
    }
    return req;
})

axiosInstance.interceptors.response.use((res) => res);

export default axiosInstance;