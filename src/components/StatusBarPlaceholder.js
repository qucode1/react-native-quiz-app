import React from "react"
import { withTheme } from "react-native-material-ui"
import { View, StatusBar } from "react-native"

const StatusBarPlaceholder = ({ theme }) => (
  <View
    style={{
      height: StatusBar.currentHeight,
      backgroundColor: theme.palette.primaryColor
    }}
  />
)

export default withTheme(StatusBarPlaceholder)
