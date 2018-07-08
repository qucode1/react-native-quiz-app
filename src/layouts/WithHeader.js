import React, { Fragment, Component } from "react"
import { Text } from "react-native"
import { Toolbar } from "react-native-material-ui"

import StatusBarPlaceHolder from "../components/StatusBarPlaceholder"

import { withTheme } from "react-native-material-ui"

const WithHeader = ({
  theme,
  children,
  navigation: { toggleDrawer },
  logout
}) => {
  return (
    <Fragment>
      <StatusBarPlaceHolder theme={theme} />
      <Toolbar
        leftElement="menu"
        onLeftElementPress={toggleDrawer}
        rightElement="exit-to-app"
        onRightElementPress={logout}
      />
      {children}
    </Fragment>
  )
}

export default withTheme(WithHeader)
