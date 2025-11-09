import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { db, auth } from '../firebase/config';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            register: false,
            error: ""
        }
    }

    onSubmit() {

        if (!this.state.email.includes("@")) {
            alert("Email mal formateado");
            return;
        }
        if (this.state.password.length < 6) {
            alert("La password debe tener una longitud mínima de 6 caracteres");
            return;
        }

        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(response => {
                return db.collection("users").add({
                    owner: auth.currentUser.email,
                    email: this.state.email,
                    username: this.state.username,
                    createdAt: new Date(),
                });
            })
            .then(response => {
                this.setState({ register: true });
                this.props.navigation.navigate("Login")
            })
            .catch(error => {
                console.log(error.message);
                const errorMessage = error.message;
                this.setState({ error: errorMessage })
                alert(errorMessage);
            })
    }

    render() {
        return (
            <View style={styles.screen}>
                <View style={styles.card}>
                    <Text style={styles.title}>Registro</Text>

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='email-address'
                        placeholder='Ingrese su email'
                        onChangeText={(text) => this.setState({ email: text })}
                        value={this.state.email}
                    />

                    <Text style={styles.label}>Nombre de usuario</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='default'
                        placeholder='Ingrese su username'
                        onChangeText={(text) => this.setState({ username: text })}
                        value={this.state.username}
                    />

                    <Text style={styles.label}>Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='default'
                        placeholder='Ingrese su contraseña'
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password}
                    />

                    <Pressable style={styles.button} onPress={() => this.onSubmit()}>
                        <Text style={styles.buttonText}>Registrarse</Text>
                    </Pressable>

                    <Pressable style={styles.linkButton} onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.linkText}>Ya tengo cuenta</Text>
                    </Pressable>
                </View>
            </View>
        );
    }
}

export default Register;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 10,
        marginTop: 20
    },
    card: {
        borderRadius: 8,
        padding: 16
    },
    title: {
        fontSize: 36,
        fontWeight: '800',
        marginBottom: 16,
        color: '#000',
        textAlign: 'center',
        marginTop: 16,
    },
    label: {
        width: '80%',
        maxWidth: 360,
        alignSelf: 'center',
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 8,
        marginBottom: 6
    },
    input: {
        height: 44,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        marginVertical: 10,
        backgroundColor: '#fff',
        width: '80%',
        maxWidth: 360,
        alignSelf: 'center'
    },
    button: {
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 20,
        width: '80%',
        maxWidth: 360,
        alignSelf: 'center',
        backgroundColor: '#6cb6ff'
    },
    buttonPrimary: {
        backgroundColor: '#6cb6ff'
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600'
    },
    linkButton: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        paddingVertical: 12
    },
    linkText: {
        color: '#333'
    }
});