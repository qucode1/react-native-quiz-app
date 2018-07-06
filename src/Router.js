import { createStackNavigator } from "react-navigation"
import React, { Component, Fragment } from "react"
import { withTheme, Button, Card, IconToggle } from "react-native-material-ui"
import { AsyncStorage, View, StatusBar } from "react-native"

import { signInWithGoogleAsync, signOut } from "./utils/google-signin"

import HomeScreen from "./screens/Home"
import AboutScreen from "./screens/About"

const RightHeaderElement = ({ theme, logout }) => (
  <IconToggle
    name="person"
    style={{
      container: {
        backgroundColor: theme.palette.primaryColor
      },
      icon: {
        color: "white"
      }
    }}
    onPress={logout}
  />
)

const Router = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ screenProps: { theme, logout } }) => ({
        title: "Home",
        headerRight: <RightHeaderElement theme={theme} logout={logout} />,
        headerTintColor: theme.palette.alternateTextColor,
        headerStyle: {
          backgroundColor: theme.palette.primaryColor
        }
      })
    },
    About: {
      screen: AboutScreen,
      navigationOptions: ({ screenProps: { theme } }) => ({
        title: "About",
        headerTintColor: theme.palette.alternateTextColor,
        headerStyle: {
          backgroundColor: theme.palette.accentColor
        }
      })
    }
  },
  {
    // headerMode: "float",
    // headerTransitionPreset: "uikit"
  }
)

class RouterWithTheme extends Component {
  state = {
    isLoggedIn: false,
    userName: ""
  }
  async componentDidMount() {
    const userName = await AsyncStorage.getItem("userName")
    userName && this.setState({ userName, isLoggedIn: true })
  }
  googleSignIn = async () => {
    const { userName } = await signInWithGoogleAsync()
    console.log("userName after signin", userName)
    if (userName) {
      this.setState({ userName, isLoggedIn: true })
    }
  }
  logout = async () => {
    await signOut()
    this.setState({ userName: "", isLoggedIn: false })
  }
  render() {
    return (
      <Fragment>
        {this.state.isLoggedIn ? (
          <Router
            screenProps={{
              theme: this.props.theme,
              userName: this.state.userName,
              logout: this.logout
            }}
          />
        ) : (
          <Fragment>
            <StatusBar
              backgroundColor={this.props.theme.palette.primaryColor}
              barStyle="light-content"
            />
            <View
              style={{
                height: StatusBar.currentHeight,
                backgroundColor: this.props.theme.palette.primaryColor
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button
                raised
                primary
                text="Goolge Login"
                onPress={this.googleSignIn}
              />
            </View>
          </Fragment>
        )}
      </Fragment>
    )
  }
}

export default withTheme(RouterWithTheme)
