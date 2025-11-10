import { Component } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';

class Comentar extends Component{
    constructor(props){
        super(props);
        this.state={
            comment: ''
        }
    }
    render(){
        return(
            <View>
                <Text>hola</Text>
            </View>
        )
    }   
}

export default Comentar;