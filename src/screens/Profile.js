import React, { Component } from "react"
import { AsyncStorage } from "react-native"
import { Subheader, Button, Card, ListItem } from "react-native-material-ui"
import WithHeader from "../layouts/WithHeader"

class Profile extends Component {
  state = {
    userName: "",
    userEmail: "",
    categories: []
  }
  async componentDidMount() {
    try {
      const [userName, userEmail, categories] = await Promise.all([
        AsyncStorage.getItem("userName"),
        AsyncStorage.getItem("userEmail"),
        AsyncStorage.getItem("categories").then(res => JSON.parse(res))
      ])
      this.setState({
        userName,
        userEmail,
        categories
      })
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    const { screenProps, navigation } = this.props

    return (
      <WithHeader screenProps={screenProps} navigation={navigation}>
        <Subheader text="Profile" lines={4} />
        <Card>
          <ListItem
            centerElement={{
              primaryText: `Username: ${this.state.userName}`
            }}
          />
          <ListItem
            centerElement={{
              primaryText: `Email: ${this.state.userEmail}`
            }}
          />
        </Card>
        <Card>
          {this.state.categories.map(cat => (
            <ListItem
              key={cat._id}
              divider
              centerElement={{
                primaryText: `${cat.name.toUpperCase()}`,
                secondaryText: "0 / 50"
              }}
            />
          ))}
        </Card>
        <Button
          icon="exit-to-app"
          text="Logout"
          onPress={screenProps.logout}
          style={{
            container: {
              borderColor: "tomato"
            },
            text: {
              color: "tomato"
            }
          }}
        />
      </WithHeader>
    )
  }
}

export default Profile
