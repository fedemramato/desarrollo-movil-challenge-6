import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

export default class Playlist extends React.Component {
  render() {
    const {
      playlist: { name, image, tracks },
    } = this.props

    return (
      <View style={[styles.container, styles.conSombra]}>
        <Image source={{ uri: image }} style={styles.imagen} />
        <View style={styles.dataContainer}>
          <Text style={styles.nombre}>{name}</Text>
          <Text style={styles.seguidores}>Temas {tracks}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: 350,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    marginVertical: 7,
    flexDirection: 'row',
  },

  nombre: {
    marginVertical: 5,
    marginHorizontal: 10,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },

  seguidores: {
    marginVertical: 5,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
  },

  imagen: {
    height: 150,
    width: 150,
  },

  conSombra: {
    shadowColor: 'black',
    shadowOffset: {
      height: 2,
      width: 1,
    },
    shadowRadius: 1.5,
    shadowOpacity: 0.4,
    elevation: 2,
  },

  dataContainer: {
    flex: 1,
  },
})
