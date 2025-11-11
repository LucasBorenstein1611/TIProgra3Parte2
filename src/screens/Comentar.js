import { Component } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, FlatList } from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';


class Comentar extends Component{
    constructor(props){
        super(props);
        this.state={
            createdAt: this.props.route.params.createdAt,
            texto: '',
            email: '',
            likes: '',
            comentarios: [],
            comment: ''
        }
    }


    componentDidMount(){
        db.collection('posts').where('createdAt', '==', this.state.createdAt).onSnapshot(
            docs => {
                let post = [];
                docs.forEach(doc => {  
                    post.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    console.log(post[0].id)
                    this.setState({
                        email: post[0].data.owner,
                        texto: post[0].data.comentario,
                        likes: post[0].data.likesTotal,
                    })
                })
            }
        )
        db.collection('comments').where('postCreatedAt', '==', this.state.createdAt).onSnapshot(
            docs => {
                let comentarios = [];
                docs.forEach(doc => {
                    comentarios.push({
                        id: doc.id,
                        usuario: doc.data().owner,
                        comment: doc.data().comentario
                    })
                    this.setState({ comentarios: comentarios });
                })
            }
        )
       
    }


   


    onSubmit(){
        if(this.state.comment==""){
            alert('El comentario está vacío')
        }else{
        db.collection('comments').add({
            owner: auth.currentUser.email,
            comentario: this.state.comment,
            createdAt: Date.now(),
            postCreatedAt: this.state.createdAt
        })
            .then(() => {
                alert('Comentario enviado');
                this.setState({ comment: "" });
            })
            .catch(error => {
                console.log("Error", error);
                alert("Error");
            });
        }
    }


    render(){
        return(
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.owner}>{this.state.email}:</Text>
                    <Text style={styles.postText}>{this.state.texto}</Text>

                    <FlatList
                        style={{ maxHeight: 325 }}
                        data={this.state.comentarios}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.commentBox}>
                                <Text style={styles.commentUser}>{item.usuario}</Text>
                                <Text style={styles.commentText}>{item.comment}</Text>
                            </View>
                        )}
                    />

                    <Text style={styles.sectionTitle}>Nuevo comentario:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='default'
                        placeholder='Escribí tu comentario...'
                        onChangeText={(text) => this.setState({ comment: text })}
                        value={this.state.comment}
                    />
                    <Pressable onPress={()=>this.onSubmit()} style={styles.commentButton}>
                        <Text style={styles.commentButtonText}>Publicar</Text>
                    </Pressable>
                </View>
            </View>
        )
    }  
}

export default Comentar;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f2f2f2',
        padding: 15,
    },
    card:{
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 14,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#000',
    },
    owner:{
        fontSize: 14,
        color: '#444',
        marginBottom: 6,
    },
    postText:{
        fontSize: 25,
        marginBottom: 10,
        color: '#111',
    },
    sectionTitle:{
        fontSize: 17,
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 6,
        color: '#111',
    },
    commentBox:{
        backgroundColor: '#f7f7f7',
        borderRadius: 10,
        padding: 10,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    commentUser:{
        fontWeight: '600',
        fontSize: 15,
        color: '#333',
    },
    commentText:{
        fontSize: 15,
        color: '#444',
        marginTop: 2,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#fafafa',
        height: 60,
        paddingHorizontal: 12,
        fontSize: 16,
        marginTop: 10,
    },
    commentButton: {
        backgroundColor: '#A7D8FF',
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        marginTop: 12,
    },
    commentButtonText: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
    },
});
