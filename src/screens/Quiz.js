import React, { Component, Fragment } from "react"
import { Subheader, Card } from "react-native-material-ui"
import { Text } from "react-native"
import { withContext } from "../utils/AppContext"

import Answers from "../components/Answers"

class Quiz extends Component {
  state = {
    category: this.props.navigation.getParam("category"),
    question: {},
    nextQuestion: {}
  }
  componentDidMount() {
    this.setInitialQuestions()
  }
  setInitialQuestions = () => {
    if (this.state.question.title) {
      this.setState(prevState => ({
        question: prevState.nextQuestion,
        nextQuestion: this.getRandomQuestion()
      }))
    } else if (this.props.context.state[`${this.state.category}Questions`]) {
      this.setState({
        question: this.getRandomQuestion(),
        nextQuestion: this.getRandomQuestion()
      })
    } else setTimeout(this.setInitialQuestions, 200)
  }
  getRandomQuestion = () => {
    const allQuestions = this.props.context.state[
      `${this.state.category}Questions`
    ]
    return allQuestions[this.getRandomInteger(0, allQuestions.length - 1)]
  }
  getRandomInteger = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min
  render() {
    return this.state.question.title ? (
      <Fragment>
        <Subheader text={this.state.question.title} />
        <Card>
          <Answers
            question={this.state.question}
            nextQuestion={this.state.nextQuestion}
          />
        </Card>
      </Fragment>
    ) : (
      <Text>Loading...</Text>
    )
  }
}

export default withContext(Quiz)
