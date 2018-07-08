import { createStackNavigator, createDrawerNavigator } from "react-navigation"
import React, { Component, Fragment } from "react"
import { withTheme, Button, Card, IconToggle } from "react-native-material-ui"
import { AsyncStorage, View, Text } from "react-native"

import { signInWithGoogleAsync, signOut } from "./utils/google-signin"
import StatusBarPlaceholder from "./components/StatusBarPlaceholder"

import HomeScreen from "./screens/Home"
import AboutScreen from "./screens/About"

const RightHeaderElement = ({ theme, logout }) => (
  <IconToggle
    name="exit-to-app"
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

const LeftHeaderElement = ({ theme }) => (
  <IconToggle
    name="menu"
    style={{
      container: {
        backgroundColor: theme.palette.primaryColor
      },
      icon: {
        color: "white"
      }
    }}
    onPress={() => console.log("menu pressed")}
  />
)

const Router = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ screenProps: { theme, logout } }) => ({
        title: "Home"
        // headerLeft: <LeftHeaderElement theme={theme} />,
        // headerRight: <RightHeaderElement theme={theme} logout={logout} />,
        // headerTintColor: theme.palette.alternateTextColor,
        // headerStyle: {
        //   backgroundColor: theme.palette.primaryColor
        // }
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
    loading: false,
    userName: ""
  }
  async componentDidMount() {
    const userName = await AsyncStorage.getItem("userName")
    userName && this.setState({ userName, isLoggedIn: true })
  }
  googleSignIn = async () => {
    this.setState({ loading: true })
    const { userName } = await signInWithGoogleAsync()
    if (userName) {
      this.setState({ userName, isLoggedIn: true })
    }
    this.setState({ loading: false })
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

export default withTheme(RouterWithTheme)
