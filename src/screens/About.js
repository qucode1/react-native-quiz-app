import React, { Component, Fragment } from "react"
import { Text } from "react-native"
import { Button } from "react-native-material-ui"

class Home extends Component {
  render() {
    const { navigate } = this.props.navigation
    return (
      <Fragment>
        <Text>About Component</Text>
        <Button
          primary
          text="Go to home screen"
          onPress={() => navigate("Home")}
        />
      </Fragment>
    )
  }
}

export default Home
