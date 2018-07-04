import React from "react"
import { StyleSheet, Text, View } from "react-native"
import {
  COLOR,
  ThemeContext,
  Button,
  ActionButton,
  getTheme,
  withTheme
} from "react-native-material-ui"
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
        {/* <View style={styles.container}> */}
        {/* <Text>App.js</Text> */}
        <Router />
        {/* <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Change 1</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <Text>{this.props.theme.palette.primaryColor}</Text>
          <Button primary text="primary" icon="done" />
          <Button accent text="accent" icon="close" />
          <ActionButton
            style={{
              container: {
                backgroundColor: uiTheme.palette.accentColor
              }
            }}
          /> */}
        {/* </View> */}
      </ThemeContext.Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})

export default withTheme(App)
