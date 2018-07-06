import React, { Component, Fragment } from "react"
import { Text } from "react-native"
import { Button, Toolbar } from "react-native-material-ui"
import { withTheme } from "react-native-material-ui"

class Home extends Component {
  render() {
    const { navigate } = this.props.navigation
    return (
      <Fragment>
        {/* <Toolbar leftElement="menu" rightElement="person" /> */}
        <Text>Home Component</Text>
        <Text>{this.props.screenProps.userName}</Text>
        <Button
          primary
          text="Go to about screen"
          onPress={() => navigate("About")}
        />
      </Fragment>
    )
  }
}

export default withTheme(Home)
