import React, { Component } from "react"

import { withTheme } from "react-native-material-ui"

import QuizRouter from "../QuizRouter"
import { withContext } from "../utils/AppContext"

import { serverURL } from "../../secrets.json"

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      correctQuestions: [],
      loading: true
    }
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
    const { navigation, theme, screenProps } = this.props
    return (
      <QuizRouter
        screenProps={{
          theme,
          mainNavigation: navigation,
          mainScreenProps: screenProps
        }}
      />
    )
  }
}

export default withTheme(withContext(Home))
