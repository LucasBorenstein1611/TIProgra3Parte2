import { Component } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { db, auth } from '../firebase/config';


class FormPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comentario: ""
        }
    }

    onSubmit = () => {

        if (!auth.currentUser) {
            alert('Debes estar logueado para crear un post');
            return;
        }
        if(this.state.comentario==""){
            alert('No se puede crear un post vacio')
        }else{

        db.collection('posts').add({
            owner: auth.currentUser.email,
            comentario: this.state.comentario,
            createdAt: Date.now(),
            likesTotal: []
        })
            .then(() => {
                alert('Post creado exitosamente');
                this.setState({ comentario: "" });
            })
            .catch(error => {
                console.log("Error al crear post:", error);
                alert("Error al crear el post");
            });
        }
    }

    render() {
        return (
            <View style={styles.screen}>
                <View style={styles.card}>

                    <TextInput style={styles.input}
                        keyboardType='default'
                        placeholder='Ingrese su comentario'
                        onChangeText={(text) => this.setState({ comentario: text })}
                        value={this.state.comentario} />

                    <Pressable style={[styles.button, styles.buttonPrimary]} onPress={() => this.onSubmit()}>
                        <Text style={styles.buttonText}>Publicar post</Text>
                    </Pressable>

                </View>
            </View>
        );
    }
}

export default FormPost;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingTop: 24,
        alignItems: 'center'
    },
    card: {
        width: '100%',
        alignItems: 'center'
    },
    input: {
        width: '75%',
        maxWidth: 420,
        height: 120,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        backgroundColor: '#fff',
        marginVertical: 12
    },
    button: {
        width: '70%',
        maxWidth: 336,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 8
    },
    buttonPrimary: {
        backgroundColor: '#6cb6ff'
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600'
    },
});