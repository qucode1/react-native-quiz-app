import React, { Fragment, Component } from "react"
import { Text } from "react-native"

import StatusBarPlaceHolder from "../components/StatusBarPlaceholder"

import { withTheme } from "react-native-material-ui"

const WithoutHeader = ({ theme, children }) => {
  return (
    <Fragment>
      <StatusBarPlaceHolder theme={theme} />
      {children}
    </Fragment>
  )
}

export default withTheme(WithoutHeader)
