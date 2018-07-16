import React, { Fragment } from "react"
import { Toolbar, Button } from "react-native-material-ui"

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
      {/* <StatusBar backgroundColor="lime"/> not working! Why?*/}
      <Toolbar
        leftElement="menu"
        onLeftElementPress={toggleDrawer}
        centerElement="Web Dev Quiz"
        onPress={() => navigate("Home")}
        style={{
          container: {
            paddingHorizontal: 10
          }
        }}
        rightElement={
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
        onRightElementPress={() => (console.log("logout"), logout)}
      />
      {children}
    </Fragment>
  )
}

export default withTheme(WithHeader)
