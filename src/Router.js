import { createStackNavigator } from "react-navigation"
import React, { Component, Fragment } from "react"
import { withTheme } from "react-native-material-ui"

import HomeScreen from "./screens/Home"
import AboutScreen from "./screens/About"

const Router = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ screenProps: { theme } }) => ({
        title: "Home",
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

const RouterWithTheme = props => <Router screenProps={{ theme: props.theme }} />
export default withTheme(RouterWithTheme)
