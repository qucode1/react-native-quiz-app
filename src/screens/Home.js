import React, { Component, Fragment } from "react"
import { Text, AsyncStorage } from "react-native"

import { Button, Toolbar, Card, Subheader } from "react-native-material-ui"
import { withTheme } from "react-native-material-ui"

import WithHeader from "../layouts/WithHeader"
import CategoryPicker from "../components/CategoryPicker"
import QuizRouter from "../QuizRouter"
import {
  AppContext,
  withContext,
  AppContextProvider
} from "../utils/AppContext"

import { serverURL } from "../../secrets.json"

class Home extends Component {
  state = {
    categories: [],
    correctQuestions: [],
    loading: true
  }
  async componentDidMount() {
    try {
      if (this.props.context.state.categories.length) {
        this.setState({ loading: false })
      }
      const categories = await fetch(`${serverURL}/categories/`).then(res =>
        res.json()
      )
      await this.props.context.setContext("categories", categories)
      this.state.loading && this.setState({ loading: false })

      const categoriesWithQuestions = await Promise.all(
        categories.map(cat =>
          fetch(`${serverURL}/categories/${cat.name}?populate=true`).then(res =>
            res.json()
          )
        )
      )
      await Promise.all(
        categoriesWithQuestions.map(({ category: { name, questions } }) =>
          this.props.context.setContext(`${name}Questions`, questions)
        )
      )
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
      // <WithHeader
      //   navigation={this.props.navigation}
      //   screenProps={this.props.screenProps}
      // >
      <QuizRouter
        screenProps={{
          theme: this.props.theme,
          mainNavigation: this.props.navigation,
          mainScreenProps: this.props.screenProps
        }}
      />
      // </WithHeader>
    )
  }
}

export default withTheme(withContext(Home))
