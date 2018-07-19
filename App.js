import React from "react"
import { COLOR, ThemeContext, getTheme } from "react-native-material-ui"
import { Font } from "expo"

import { AppContextProvider } from "./src/utils/AppContext"
import Router from "./src/Router"

const uiTheme = {
  palette: {
    primary: {
      light: "#4fb3bf",
      main: "#00838f",
      dark: "#005662",
      contrastText: "#fff"
    },
    secondary: {
      light: "#fffd61",
      main: "#ffca28",
      dark: "#c79a00",
      contrastText: "#000"
    },
    success: "#00C853",
    failure: "#DD2C00",
    primaryColor: COLOR.cyan800,
    accentColor: COLOR.amber300
  },
  button: {
    container: {
      margin: 15,
      paddingVertical: 5
    }
  },
  actionButton: {
    container: {
      backgroundColor: COLOR.green400
    }
  },
  typography: {
    title: 18,
    headline: 20,
    display1: 22,
    display2: 24,
    display3: 26
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
        <AppContextProvider>
          <Router />
        </AppContextProvider>
      </ThemeContext.Provider>
    )
  }
}

export default App
