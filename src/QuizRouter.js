import React, { Component, Fragment } from "react"
import { createStackNavigator } from "react-navigation"
import { withTheme } from "react-native-material-ui"

import CategoryPicker from "./components/CategoryPicker"
import QuizScreen from "./screens/Quiz"

const QuizRouter = createStackNavigator({
  Home: {
    screen: CategoryPicker,
    navigationOptions: () => ({
      header: null
    })
  },
  Quiz: {
    screen: QuizScreen,
    navigationOptions: ({
      navigation: {
        state: { params }
      },
      screenProps: { theme }
    }) => ({
      title: params.category,
      headerStyle: {
        backgroundColor: theme.palette.accentColor
      },
      headerTintColor: "white"
    })
  }
})

export default QuizRouter
