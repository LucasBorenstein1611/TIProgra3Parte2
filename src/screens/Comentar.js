import { Component } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, FlatList } from 'react-native';
import { db, auth } from '../firebase/config';

class Comentar extends Component{
    constructor(props){
        super(props);
        this.state={
            creatdAt: this.props.route.params.createdAt,
            texto: '',
            email: '',
            likes: '',
            comentarios: [],
            comment: ''
        }
    }

    componentDidMount(){
        console.log(this.state.creatdAt);
        db.collection('posts').where('createdAt', '==', this.state.creatdAt).onSnapshot(
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
        db.collection('comments').where('postCreatedAt', '==', this.state.creatdAt).onSnapshot(
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
            postCreatedAt: this.state.creatdAt
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
                <View style={styles.post}>
                
                    <Text style={styles.title}>{this.state.email}:</Text>
                    <Text style={styles.text}>"{this.state.texto}"</Text>
                    <Text style={styles.title}>Comentarios:</Text>
                    <FlatList
                        data={this.state.comentarios}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.comment}>
                                <Text style={styles.persona}>{item.usuario}:</Text>
                                <Text style={styles.palabras}>{item.comment}</Text>
                            </View>
                        )}/>
                    <Text style={styles.title}>Crear nuevo comentario:</Text>
                    <TextInput style={styles.input}
                        keyboardType='default'
                        placeholder='Ingresa tu comentario'
                        onChangeText={(text) => this.setState({ comment: text })}
                        value={this.state.comment} />
                    <Pressable onPress={()=>this.onSubmit()} style={styles.button}>
                        <Text style={styles.buttonText}>Enviar</Text>
                    </Pressable>
                
                </View>
                
                
            </View>
        )
    }   
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding:20
    },
    post:{
        flex: 1,
        borderWidth: 5,
        borderColor: '#6cb6ff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
    },
    title:{
        fontSize: 25,
        fontWeight: 'bold',
        margin: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#6cb6ff',
        marginLeft: 0,
    },
    text:{
        fontSize: 35,
        margin: 20,
        alignSelf: 'center',
    },
    comment:{
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginVertical: 10,
    },
    persona:{
        fontStyle: 'italic',
        fontSize: 22,
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        marginVertical:10,
    },
    palabras:{
        fontSize:25,
    },
    input: {
        width: '100%',
        height: 70,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        backgroundColor: '#fff',
        alignSelf: 'center',
        fontSize: 20,
    },
    button: {
        padding: 12,
        paddingHorizontal: 45,
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 8,
        backgroundColor: '#6cb6ff',
    },
    buttonText:{
        fontSize: 20,
        color: '#fff',
    }
    
})

export default Comentar;