import Expo from "expo"
import { AsyncStorage } from "react-native"

import { googleAndroidClientId, serverURL } from "../../secrets.json"

export async function signInWithGoogleAsync() {
  try {
    const { type, user, idToken } = await Expo.Google.logInAsync({
      androidClientId: googleAndroidClientId,
      scopes: ["profile", "email", "openid"]
    })
    if (type === "success") {
      const { profileToken } = await fetch(
        `${serverURL}/users/${user.id}/token`,
        {
          headers: {
            google_id: user.id,
            id_token: idToken
          }
        }
      ).then(res => res.json())
      return { ...user, profileToken }
    } else {
      return { cancelled: true }
    }
  } catch (e) {
    return { error: true }
  }
}

export async function signOut() {
  await Promise.all([
    AsyncStorage.removeItem("userId"),
    AsyncStorage.removeItem("userEmail"),
    AsyncStorage.removeItem("userName"),
    AsyncStorage.removeItem("userProfileToken"),
    AsyncStorage.removeItem("correctQuestions"),
    AsyncStorage.removeItem("wrongQuestions")
  ])
  return true
}
