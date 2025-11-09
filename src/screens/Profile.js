import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {db, auth} from '../firebase/config';



class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            posts: []
        };
    }

    componentDidMount(){
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs=>{
                let user=[];
                docs.forEach(doc=>{
                    user.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        username: user[0].data.username,
                        email: user[0].data.email,
                    })
                })
            }
        )
        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs=>{ 
                let posts=[];
                docs.forEach(doc=>{
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posts: posts
                    }, ()=>console.log(this.state.posts))
                    
                })

            }
        )
    }

    mostrarPosts(){
        return this.state.posts.map(post=><SinglePost key={post.id} postOne={post}/>)
    }
    

    render() {
        return (
            <View>
                <Text style={styles.label}>username:</Text>
                <Text style={styles.info}>{this.state.username}</Text>
                <Text style={styles.label}>email:</Text>
                <Text style={styles.info}>{this.state.email}</Text>
                <Text style={styles.label}>posts:</Text>
                <View>
                    {this.mostrarPosts()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
    },
    label:{
        marginLeft: 10,
        fontStyle: 'italic',
    },
    info:{
        marginLeft: 10,
        fontWeight: 'bold',
        marginBottom: 15,
        fontSize: 25,

    }
})

export default Profile;

