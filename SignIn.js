import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { authorize } from './spotify-api-client'

export default class SignIn extends React.Component {
  render() {
    return (
      <View>
        <Button title="Iniciar sesión con Spotify" onPress={this._asyncSignIn} />
      </View>
    )
  }

  _asyncSignIn = async () => {
    await authorize()
    this.props.navigation.navigate('App')
  }
}
