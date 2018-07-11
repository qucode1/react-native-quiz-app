import React, { Component, Fragment } from "react"
import { Text, AsyncStorage } from "react-native"

import { Button, Toolbar, Card, Subheader } from "react-native-material-ui"
import { withTheme } from "react-native-material-ui"

import WithHeader from "../layouts/WithHeader"
import {
  AppContext,
  withContext,
  AppContextProvider
} from "../utils/AppContext"

class Home extends Component {
  state = {
    categories: [],
    correctQuestions: [],
    loading: true
  }
  async componentDidMount() {
    try {
      // const [cachedCategories, cachedCorrectQuestions] = await Promise.all([
      //   AsyncStorage.getItem("categories").then(res => JSON.parse(res)),
      //   AsyncStorage.getItem("correctQuestions").then(res => JSON.parse(res))
      // ])
      // const newState = {}
      // if (cachedCategories && cachedCategories.length > 0) {
      //   newState.categories = cachedCategories
      // }
      // if (cachedCorrectQuestions && cachedCorrectQuestions.length > 0) {
      //   newState.correctQuestions = parsed
      // }
      // this.setState({
      //   ...newState,
      //   loading: false
      // })
      if (this.props.context.state.categories.length) {
        this.setState({ loading: false })
      }
      const categories = await fetch(
        "https://dev-quiz.now.sh/categories/"
      ).then(res => res.json())
      const stringifiedCategories = await JSON.stringify(categories)
      await this.props.context.setContext("categories", categories)
      this.setState({ loading: false })
      // AsyncStorage.setItem("categories", stringifiedCategories)
      // this.setState((prevState, props) => {
      //   return JSON.stringify(prevState.categories) !== stringifiedCategories
      //     ? { categories }
      //     : null
      // })
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    if (this.state.loading) {
      return null
    }
    const { navigate } = this.props.navigation
    return (
      <WithHeader
        navigation={this.props.navigation}
        screenProps={this.props.screenProps}
      >
        <Subheader lines={1} text="Choose a test category" />
        {this.props.context.state.categories.map(category => (
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

export default withTheme(withContext(Home))
