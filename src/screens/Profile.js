import { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import {db, auth} from '../firebase/config';
import Post from '../components/Post';



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
        db.collection('users').where('email', '==', auth.currentUser.email).onSnapshot(
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

    salir(){
        console.log('salir');
        auth.signOut()
    }

    // mostrarPosts(){
    //     return this.state.posts.map(post=><Post data={post.data} key={post.id} navigation={navigation}/>)
    // }
    

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headInfo}>
                    <Text style={styles.info}>{this.state.username}</Text>
                    <Text style={styles.label}>{this.state.email}</Text>
                    <Text style={styles.info}>Ultimos Posteos:</Text>
                </View>
                
                
                <View style={styles.lista}>
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <Post data={item.data} id={item.id} navigation={this.props.navigation} boton='eliminar'/>}
                    />
                </View>
                <Pressable style={styles.delete} onPress={() => this.salir()}>
                    <Text style={styles.buttonText} >Cerrar Sesión</Text>
                </Pressable>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    lista:{
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        backgroundColor: '#bbb',
        borderRadius: 10,
    },
    headInfo:{
        marginBottom: 5
    },
    label:{
        marginLeft: 10,
        fontStyle: 'italic',
        marginBottom: 15,
    },
    info:{
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 30,

    },
    delete:{
        backgroundColor: '#FF474c',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,

    },
    buttonText:{
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
        padding: 10,
        fontSize: 20
    }
})

export default Profile;

