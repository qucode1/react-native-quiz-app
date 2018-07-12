import { createStackNavigator, createDrawerNavigator } from "react-navigation"
import React, { Component, Fragment } from "react"
import { withTheme, Button, Card, IconToggle } from "react-native-material-ui"
import { AsyncStorage, View, Text } from "react-native"

import { signInWithGoogleAsync, signOut } from "./utils/google-signin"
import StatusBarPlaceholder from "./components/StatusBarPlaceholder"
import { withContext } from "./utils/AppContext"

import HomeScreen from "./screens/Home"
import AboutScreen from "./screens/About"
import ProfileScreen from "./screens/Profile"

const Router = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    About: {
      screen: AboutScreen
    },
    Profile: {
      screen: ProfileScreen
    }
  },
  {
    // headerMode: "float",
    // headerTransitionPreset: "uikit"
  }
)

class RouterWithTheme extends Component {
  state = {
    loading: false
  }
  googleSignIn = async () => {
    this.setState({ loading: true })
    const {
      id: userId,
      name: userName,
      email: userEmail,
      profileToken: userProfileToken
    } = await signInWithGoogleAsync()
    if (userName) {
      this.props.context.setContext("userName", userName)
      this.props.context.setContext("userId", userId)
      this.props.context.setContext("userEmail", userEmail)
      this.props.context.setContext("userProfileToken", userProfileToken)
    }
    this.setState({ loading: false })
  }
  logout = async () => {
    await signOut()
    this.props.context.resetContext()
  }
  render() {
    return (
      <Fragment>
        {this.props.context.state.userName ? (
          <Router
            screenProps={{
              theme: this.props.theme,
              userName: this.props.context.state.userName,
              logout: this.logout
            }}
          />
        ) : (
          <Fragment>
            <StatusBarPlaceholder theme={this.props.theme} />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {this.state.loading ? (
                <Text>Loading...</Text>
              ) : (
                <Button
                  raised
                  primary
                  text="Goolge Login"
                  onPress={this.googleSignIn}
                />
              )}
            </View>
          </Fragment>
        )}
      </Fragment>
    )
  }
}

export default withTheme(withContext(RouterWithTheme))
