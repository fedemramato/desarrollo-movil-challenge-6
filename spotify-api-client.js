import { AuthSession } from 'expo'

const SPOTIFY_CLIENT_ID = '8c8eeffb635f4b62af4c3aacfbbcfd10'
const SECURE_STORE_ACCESS_TOKEN_KEY = 'spotifyAccessToken'

let token

Expo.SecureStore.getItemAsync(SECURE_STORE_ACCESS_TOKEN_KEY).then(accessToken => {
  token = accessToken
})

export const isLogin = () => {
  return false
  //return token !== null && token !== undefined
}

export const authorize = () => {
  const redirectUrl = AuthSession.getRedirectUrl()

  return AuthSession.startAsync({
    authUrl:
      `https://accounts.spotify.com/authorize?response_type=token` +
      `&client_id=${SPOTIFY_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
      `&scope=user-follow-read`,
  }).then(result => this.handleAuthResult(result))
}

handleAuthResult = ({ type, params }) => {
  if (type !== 'success') {
    console.warn('Algo salió mal', result)
    return false
  }

  const accessToken = params.access_token

  Expo.SecureStore.setItemAsync(SECURE_STORE_ACCESS_TOKEN_KEY, accessToken).then(() => {
    token = accessToken
  })

  return true
}

export const getUserArtistsPromise = () => {
  return fetch('https://api.spotify.com/v1/me/following?type=artist', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then(result => {
      if (result.error && [401, 403].includes(result.error.status)) {
        throw new Error('Authorization error')
      }

      const artistas = result.artists.items.map(({ name: nombre, images, followers: { total: seguidores } }) => {
        return {
          nombre,
          seguidores,
          imagen: images[0].url,
        }
      })

      return artistas
    })
}

export const getUserArtistsAsync = async accessToken => {
  const response = await fetch('https://api.spotify.com/v1/me/following?type=artist', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const result = await response.json()

  if (result.error && [401, 403].includes(result.error.status)) {
    throw new Error('Authorization error')
  }

  const artistas = result.artists.items.map(({ name, images, followers: { total } }) => ({
    nombre: name,
    seguidores: total,
    imagen: images[0].url,
  }))

  return artistas
}

export const getUserPlaylists = async () => {
  const response = await fetch('https://api.spotify.com/v1/me/playlists', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const result = await response.json()

  if (result.error && [401, 403].includes(result.error.status)) {
    throw new Error('Authorization error')
  }

  const playlists = result.items.map(item => {
    const payload = {
      name: item.name,
      image: item.images[0].url,
      tracks: item.tracks.total,
    }
    return payload
  })

  return playlists
}
