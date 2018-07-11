import Expo from "expo"
import { AsyncStorage } from "react-native"

import { googleAndroidClientId, privateRSAKey } from "../../secrets.json"

export async function signInWithGoogleAsync() {
  try {
    const { type, user, accessToken } = await Expo.Google.logInAsync({
      androidClientId: googleAndroidClientId,
      scopes: ["profile", "email"]
    })
    console.log("user", user)
    console.log("accessToken", accessToken)
    if (type === "success") {
      await Promise.all([
        AsyncStorage.setItem("userId", `${user.id}`),
        AsyncStorage.setItem("userEmail", `${user.email}`),
        AsyncStorage.setItem("userName", `${user.name}`),
        AsyncStorage.setItem("accessToken", `${accessToken}`)
      ])
      return { ...user, accessToken }
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
    AsyncStorage.removeItem("accessToken"),
    AsyncStorage.removeItem("correctQuestions"),
    AsyncStorage.removeItem("wrongQuestions")
  ])
  return true
}
