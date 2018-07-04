import React, { Component, Fragment } from "react"
import { Text } from "react-native"
import { Button } from "react-native-material-ui"
import { withTheme } from "react-native-material-ui"

class Home extends Component {
  render() {
    const { navigate } = this.props.navigation
    return (
      <Fragment>
        <Text>Home Component</Text>
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
