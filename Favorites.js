import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import ArtistaFavoritoScreen from './ArtistaFavorito'
import { getUserArtistsAsync } from './spotify-api-client'

export default class Favorites extends React.Component {
  state = {
    artistas: [],
  }
  componentDidMount() {
    this._getFavoriteArtists()
  }

  async _getFavoriteArtists() {
    const artistas = await getUserArtistsAsync()
    this.setState({ artistas })
  }

  render() {
    const { artistas } = this.state
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {artistas && artistas.map(artist => <ArtistaFavoritoScreen artista={artist} key={artist.nombre} />)}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    minHeight: 45,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000000C0',
  },

  scrollView: {
    flex: 1,
    width: '100%',
  },

  scrollViewContent: {
    alignItems: 'center',
    paddingTop: 20,
  },
})
