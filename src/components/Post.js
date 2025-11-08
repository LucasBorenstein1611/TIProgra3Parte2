import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

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

  render() {

    let { data } = this.props;
    let email = auth.currentUser.email;
    let likesTotal = data.likesTotal || [];
    let likeInvididual = likesTotal.includes(email);

    return (
      <View style={styles.screen}>
        <View style={styles.card}>

          <Text style={styles.owner}>{data.owner}</Text>
          <Text style={styles.comentario}>{data.comentario}</Text>

          <Pressable style={styles.button} onPress={() => this.likear()}>
            <Text style={styles.buttonText}>{likeInvididual ? 'Dislike' : 'Like'}</Text>
          </Pressable>

          <Text style={styles.likesCount}>
            {likesTotal.length} {likesTotal.length === 1 ? 'like' : 'likes'}
          </Text>

        </View>
      </View>
    );
  }
}

export default Post;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5'
  },
  owner: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4
  },
  comentario: {
    fontSize: 16,
    color: '#111',
    marginBottom: 6
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 6
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center'
  },
  likesCount: {
    marginTop: 6,
    color: '#333'
  }
});