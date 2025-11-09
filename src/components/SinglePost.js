import { Component } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { db } from '../firebase/config';

class SinglePost extends Component {
    constructor(props){
        super(props);
        this.state = {
            texto: this.props.postOne.data.comentario,
            comments: [],
            username: this.props.postOne.data.owner
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.devider}>
                    <Text style={styles.label}>{this.state.username}</Text>
                </View>
                <View style={styles.devider}>
                    <Text style={styles.info}>{this.state.texto}</Text>
                </View>
                <Text style={styles.enlace}>ver comentarios</Text>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 3,
        borderColor: '#6cb6ff',
        borderRadius: 8,
        padding: 10,
        margin: 10,
    },
    label:{
        fontStyle: 'italic',
        alignSelf: 'flex-end',
    },
    info:{
        fontWeight: 'bold',
        fontSize: 15,
        marginVertical: 15
    },
    devider:{
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
        
    },
    enlace:{
        color: '#6cb6ff',
        textDecorationLine: 'underline',
    }
});

export default SinglePost;