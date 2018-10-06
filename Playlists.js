import React from 'react'
import { View, ScrollView, StyleSheet, Text } from 'react-native'
import { getUserPlaylists } from './spotify-api-client'
import PlaylistScreen from './Playlist'

export default class Playslists extends React.Component {
  state = {
    playlists: [],
  }

  componentDidMount() {
    this._getUserPlaylists()
  }

  async _getUserPlaylists() {
    const playlists = await getUserPlaylists()
    this.setState({ playlists })
  }

  render() {
    const { playlists } = this.state

    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {playlists && playlists.map(playlist => <PlaylistScreen playlist={playlist} key={playlist.name} />)}
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
