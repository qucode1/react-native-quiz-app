import React, { Component } from "react"
import { Text } from "react-native"
import { Button, withTheme, Card } from "react-native-material-ui"

import WithHeader from "../layouts/WithHeader"

class About extends Component {
  render() {
    const { navigate } = this.props.navigation
    return (
      <WithHeader
        navigation={this.props.navigation}
        screenProps={this.props.screenProps}
      >
        <Card>
          <Text>
            Welcome to the Web Developer Quiz App. Test your knowledge in
            various areas of HTML, CSS, JS, React, Node and more
          </Text>
        </Card>
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
