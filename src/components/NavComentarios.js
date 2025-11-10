import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Comentar from '../screens/Comentar';


const Stack = createNativeStackNavigator();

function NavComentarios() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}  options={{headerShown: false}}/>
            <Stack.Screen name="Comentar" component={Comentar} options={{headerShown: false}}/>
        </Stack.Navigator>
        
    );
}

export default NavComentarios;