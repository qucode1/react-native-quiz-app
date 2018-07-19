import { createDrawerNavigator } from "react-navigation"
import React, { Component, Fragment } from "react"
import { withTheme, Button } from "react-native-material-ui"
import { View, Text } from "react-native"

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
  async componentDidMount() {}
  googleSignIn = async () => {
    this.setState({ loading: true })
    const [
      {
        id: userId,
        name: userName,
        email: userEmail,
        profileToken: userProfileToken
      }
    ] = await Promise.all([
      await signInWithGoogleAsync(),
      this.props.context.resetContext()
    ])
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
            <StatusBarPlaceholder />
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
                  text="Goolge Login"
                  onPress={this.googleSignIn}
                  style={{
                    container: {
                      margin: 10,
                      backgroundColor: this.props.theme.palette.primary.main
                    },
                    text: {
                      color: this.props.theme.palette.primary.contrastText
                    }
                  }}
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
