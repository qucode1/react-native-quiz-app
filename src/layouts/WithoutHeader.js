import React, { Fragment } from "react"

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
