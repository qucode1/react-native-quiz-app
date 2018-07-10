import React, { Fragment, Component } from "react"
import { Text } from "react-native"
import { Toolbar, Avatar, Icon, Button } from "react-native-material-ui"

import StatusBarPlaceHolder from "../components/StatusBarPlaceholder"

import { withTheme } from "react-native-material-ui"

const WithHeader = ({
  theme,
  children,
  navigation: { toggleDrawer, navigate },
  screenProps: { logout, userName }
}) => {
  return (
    <Fragment>
      <StatusBarPlaceHolder theme={theme} />
      <Toolbar
        leftElement="menu"
        onLeftElementPress={toggleDrawer}
        centerElement="Web Dev Quiz"
        onPress={() => navigate("Home")}
        rightElement={
          // <Avatar
          //   text={userName
          //     .split(" ")
          //     .map(name => name[0])
          //     .join("")
          //     .toUpperCase()}
          //   style={{
          //     container: {
          //       backgroundColor: "white",
          //       padding: 0,
          //       margin: 0
          //     },
          //     content: {
          //       color: "black"
          //     }
          //   }}
          //   size={35}
          //   onPress
          // />
          <Button
            text={userName
              .split(" ")
              .map(name => name[0])
              .join("")
              .toUpperCase()}
            style={{
              container: {
                borderRadius: 50,
                backgroundColor: "white",
                paddingHorizontal: 0,
                width: 35,
                height: 35
              },
              text: {
                color: "rgb(20,20,20)"
              }
            }}
            onPress={() => navigate("Profile")}
          />
        }
        style={{
          container: {
            paddingHorizontal: 10
          }
          // rightElementContainer: {
          //   width: 35
          // }
        }}
        onRightElementPress={() => console.log("logout")}
      />
      {children}
    </Fragment>
  )
}

export default withTheme(WithHeader)
