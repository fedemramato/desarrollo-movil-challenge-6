import React from 'react'
import { View, ActivityIndicator, StatusBar, AsyncStorage, Text } from 'react-native'
import { isLogin } from './spotify-api-client'

export default class AuthLoading extends React.Component {
  constructor(props) {
    super(props)
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    const userToken = await isLogin()
    this.props.navigation.navigate(userToken ? 'App' : 'Auth')
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
        <Text>Login Loading</Text>
      </View>
    )
  }
}
