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
                })
                this.setState({
                    username: user[0].data.username,
                    email: user[0].data.email,
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
                })
                this.setState({
                    posts: posts
                })

            }
        )
    }

    salir(){
        console.log('salir');
        auth.signOut()
    }
    

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headInfo}>
                    <Text style={styles.info}>{this.state.username}</Text>
                    <Text style={styles.label}>{this.state.email}</Text>
                    <Text style={styles.infoUP}>Ultimos Posteos:</Text>
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
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    headInfo: {
        marginBottom: 20,
    },
    info: {
        fontSize: 22,
        fontWeight: '600',
        color: '#222',
        marginBottom: 4,
    },
    infoUP: {
        fontSize: 20,
        fontWeight: '600',
        color: '#222',
        marginBottom: 4,
    },
    label: {
        fontSize: 15,
        color: '#666',
        fontStyle: 'italic',
        marginBottom: 16,
    },
    lista: {
        flex: 1,
    },
    delete: {
        backgroundColor: '#FFD6D6',
        paddingVertical: 14,
        borderRadius: 12,
        marginVertical: 18,
        borderWidth: 1,
        borderColor: '#c54b4bff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    buttonText: {
        fontSize: 17,
        color: '#000',
        fontWeight: '500',
    },
});


export default Profile;

