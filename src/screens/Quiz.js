import React, { Component, Fragment } from "react"
import { Subheader, Card } from "react-native-material-ui"
import { Text } from "react-native"

import Answers from "../components/Answers"

class Quiz extends Component {
  render() {
    return (
      <Fragment>
        <Subheader text={this.props.navigation.getParam("category")} />
        <Card>
          <Answers />
        </Card>
      </Fragment>
    )
  }
}

export default Quiz
