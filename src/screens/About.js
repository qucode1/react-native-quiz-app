import React, { Component, Fragment } from "react"
import { Text } from "react-native"
import { Button, withTheme } from "react-native-material-ui"

import WithHeader from "../layouts/WithHeader"

class About extends Component {
  render() {
    const { navigate } = this.props.navigation
    return (
      <WithHeader
        navigation={this.props.navigation}
        screenProps={this.props.screenProps}
      >
        <Text>About Component</Text>
        <Button
          primary
          text="Go to home screen"
          onPress={() => navigate("Home")}
        />
      </WithHeader>
    )
  }
}

export default withTheme(About)
