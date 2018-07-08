import React from "react"
import { View, StatusBar } from "react-native"

const StatusBarPlaceholder = ({ theme }) => (
  <View
    style={{
      height: StatusBar.currentHeight,
      backgroundColor: theme.palette.primaryColor
    }}
  />
)

export default StatusBarPlaceholder
