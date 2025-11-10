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
        db.collection('posts').orderBy("createdAt", "desc").onSnapshot(
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
            <View style={styles.contenedor}>
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
    contenedor: {
        flex: 1,
        justifyContent: 'center'
    }
});


