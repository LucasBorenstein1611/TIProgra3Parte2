import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import {FontAwesome} from '@expo/vector-icons';
import Comentar from '../screens/Comentar';

class Post extends Component {
  
  likear() {
    let { id, data } = this.props;
    let actualizar = db.collection("posts").doc(id);
    let email = auth.currentUser.email;
    let likesTotal = data.likesTotal || [];
    let likeInvididual = likesTotal.includes(email);

    if (likeInvididual) {
      actualizar.update({
        likesTotal: firebase.firestore.FieldValue.arrayRemove(email)
      })
    } else {
      actualizar.update({
        likesTotal: firebase.firestore.FieldValue.arrayUnion(email)
      })
    }
  };

  boton() {
    if (this.props.boton === 'comentar'){
      return(
        <Pressable style={styles.commentButton} onPress={()=> this.props.navigation.navigate('Comentar', {createdAt: this.props.data.createdAt})}>
          <Text style={styles.commentButtonText}>Comentar</Text>
        </Pressable>
        )
    }
  }

  render() {

    let { data } = this.props;
    let email = auth.currentUser.email;
    let likesTotal = data.likesTotal || [];
    let likeInvididual = likesTotal.includes(email);
    console.log(this.props.data.createdAt)

    return (
        <View style={styles.screen}>
            <View style={styles.card}>
                <Text style={styles.owner}>{data.owner}</Text>
                <Text style={styles.comentario}>{data.comentario}</Text>
                <View style={styles.row}>  
                    <Pressable style={styles.likesBox} onPress={() => this.likear()}>
                        <FontAwesome name="heart" size={24} style={[styles.heartIcon, likeInvididual && styles.heartIconLiked]}/>
                        <Text style={styles.likesText}>
                            {likesTotal.length} {likesTotal.length === 1 ? 'like' : 'likes'}
                        </Text>
                    </Pressable>
                    {this.boton()}
                    
                </View>
            </View>
        </View>
    );
  }
}

export default Post;

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    paddingHorizontal:15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  owner: {
    fontSize: 12,
    color: '#444',
    marginBottom: 6,
  },
  comentario: {
    fontSize: 20,
    marginBottom: 10,
    color: '#111',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  likesBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    color: '#bbb',
    marginRight: 6,
  },
  heartIconLiked: {
    color: 'red'
  },
  likesText: {
    fontSize: 16,
    color: '#333',
  },
  commentButton: {
    backgroundColor: '#A7D8FF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
  },
  commentButtonText: {
    fontSize: 15,
    color: '#000'
  }
});
