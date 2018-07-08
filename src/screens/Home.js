import React, { Component, Fragment } from "react"
import { Text } from "react-native"

import { Button, Toolbar } from "react-native-material-ui"
import { withTheme } from "react-native-material-ui"

import WithHeader from "../layouts/WithHeader"

class Home extends Component {
  render() {
    const { navigate } = this.props.navigation
    const { logout, userName } = this.props.screenProps
    return (
      <WithHeader navigation={this.props.navigation} logout={logout}>
        <Text>Home Component</Text>
        <Text>{userName}</Text>
        <Button
          primary
          text="Go to about screen"
          onPress={() => navigate("About")}
        />
      </WithHeader>
    )
  }
}

export default withTheme(Home)
