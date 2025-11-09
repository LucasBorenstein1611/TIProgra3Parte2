import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import NuevoPost from '../screens/NuevoPost';
import Profile from '../screens/Profile';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

function Menu() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>

            <Tab.Screen
                name="Home"
                component={Home}
                options={{ tabBarIcon: () => <Fontisto name="home" size={24} color="black" /> }}
            />
            <Tab.Screen
                name="NuevoPost"
                component={NuevoPost}
                options={{ tabBarIcon: () => <AntDesign name="plus" size={24} color="black" /> }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{ tabBarIcon: () => <AntDesign name="user" size={24} color="black" /> }}
            />
            

        </Tab.Navigator>
    );
}

export default Menu;