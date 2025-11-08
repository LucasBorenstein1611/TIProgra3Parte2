import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import Post from '../components/Post';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        db.collection('posts').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({ posts });
                })
               
            })
    }

    render() {
        return (
            <View style={styles.contador}>
                <Text>Home</Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Post data={item.data} id={item.id} />}
                />
            </View>
        );
    }
}

export default Home;

const styles = StyleSheet.create({
    contador: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


