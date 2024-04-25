import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ChatSpecificScreen from '../screens/ChatSpecificScreen';
import AddNewChatScreen from '../screens/AddNewChatScreen';
import MediaEditScreen from '../screens/MediaEditScreen';
import VideoFullScreen from '../screens/VideoFullScreen';
import CameraScreen from '../screens/CameraScreen';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { updateAppTheme } from '../redux/ChatRosterSlice';
import { useSelector } from 'react-redux';
import { useColorScheme } from 'react-native';

const Stack = createStackNavigator();

const MainAppNavigation = () => {

    const themeData = useSelector((state) => state.chatRoster.themeData)
    const dispatch = useAppDispatch()
    const deviceTheme = useColorScheme()

    useEffect(() => {
        if (themeData?.mode === 'device' && themeData?.value !== deviceTheme) {
            dispatch(updateAppTheme({
                mode: 'device',
                value: deviceTheme,
            }))
        }
    }, [deviceTheme])

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, animation: 'slide_from_right', detachPreviousScreen: false,
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ChatSpecificScreen" component={ChatSpecificScreen} />
            <Stack.Screen name="AddNewChatScreen" component={AddNewChatScreen} />
            <Stack.Screen name="MediaEditScreen" component={MediaEditScreen} />
            <Stack.Screen name="VideoFullScreen" component={VideoFullScreen} options={{ animation: 'fade' }} />
            <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ animation: 'fade' }} />
        </Stack.Navigator>
    )
}

export default MainAppNavigation