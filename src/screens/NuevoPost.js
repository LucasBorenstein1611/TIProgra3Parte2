import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormPost from '../components/FormPost';

function NuevoPost() {

    return (
        <View style={styles.contador}>
            <Text style={styles.title}>Crear nuevo post</Text>
            <FormPost />
        </View>
    );
}

export default NuevoPost;

const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#f2f2f2',
            paddingTop: 24,
            alignItems: 'center'
        },
    title: {
        fontSize: 36,
        fontWeight: '800',
        color: '#000',
        textAlign: 'center',
        marginTop: 16,
    }
});