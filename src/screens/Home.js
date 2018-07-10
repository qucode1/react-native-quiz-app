import React, { Component, Fragment } from "react"
import { Text, AsyncStorage } from "react-native"

import { Button, Toolbar, Card, Subheader } from "react-native-material-ui"
import { withTheme } from "react-native-material-ui"

import WithHeader from "../layouts/WithHeader"

class Home extends Component {
  state = {
    categories: []
  }
  async componentDidMount() {
    try {
      const cachedCategories = await AsyncStorage.getItem("categories")
      if (cachedCategories && cachedCategories.length > 0) {
        this.setState({
          categories: JSON.parse(cachedCategories)
        })
      }
      const categories = await fetch(
        "https://dev-quiz.now.sh/categories/"
      ).then(res => res.json())
      const stringifiedCategories = await JSON.stringify(categories)
      AsyncStorage.setItem("categories", stringifiedCategories)
      this.setState((prevState, props) => {
        return JSON.stringify(prevState.categories) !== stringifiedCategories
          ? { categories }
          : null
      })
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <WithHeader
        navigation={this.props.navigation}
        screenProps={this.props.screenProps}
      >
        <Subheader lines={1} text="Choose a test category" />
        {this.state.categories.map(category => (
          <Card key={category._id}>
            <Subheader text={category.name.toUpperCase()} />
          </Card>
        ))}
        <Button
          primary
          text="Go to about screen"
          onPress={() => navigate("About")}
        />
      </WithHeader>
    )
  }
}

export default withTheme(Home)
