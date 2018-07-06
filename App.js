import React from "react"
import { COLOR, ThemeContext, getTheme } from "react-native-material-ui"
import { Font } from "expo"

import Router from "./src/Router"

const uiTheme = {
  palette: {
    primaryColor: COLOR.blueA400,
    accentColor: COLOR.deepPurpleA200
  },
  actionButton: {
    container: {
      backgroundColor: COLOR.green400
    }
  }
}

class App extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
      "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
      "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf")
    })
  }
  render() {
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <Router />
      </ThemeContext.Provider>
    )
  }
}

export default App
