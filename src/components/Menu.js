import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import NuevoPost from '../screens/NuevoPost';
import Profile from '../screens/Profile';
import Comentarios from '../screens/Comentarios';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

function Menu() {
    return (
        <Tab.Navigator>

            <Tab.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false, tabBarIcon: () => <Fontisto name="home" size={24} color="black" /> }}
            />
            <Tab.Screen
                name="NuevoPost"
                component={NuevoPost}
                options={{ headerShown: false, tabBarIcon: () => <AntDesign name="plus" size={24} color="black" /> }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false, tabBarIcon: () => <AntDesign name="user" size={24} color="black" /> }}
            />
            

        </Tab.Navigator>
    );
}

export default Menu;