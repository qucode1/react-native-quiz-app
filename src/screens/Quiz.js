import React, { Component, Fragment } from "react"
import {
  Subheader,
  Card,
  BottomNavigation,
  Icon
} from "react-native-material-ui"
import { Text } from "react-native"
import { withContext } from "../utils/AppContext"

import Answers from "../components/Answers"

class Quiz extends Component {
  state = {
    category: this.props.navigation.getParam("category"),
    question: {},
    nextQuestion: {},
    active: "question"
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
        <BottomNavigation
          active={this.state.active}
          hidden={false}
          style={{
            container: {
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%"
            }
          }}
        >
          <BottomNavigation.Action
            key="question"
            icon={<Icon name="question" iconSet="SimpleLineIcons" />}
            label="Question"
            onPress={() => this.setState({ active: "question" })}
          />
          <BottomNavigation.Action
            key="answers"
            icon={<Icon name="ios-book-outline" iconSet="Ionicons" />}
            label="Answers"
            onPress={() => this.setState({ active: "answers" })}
          />
        </BottomNavigation>
      </Fragment>
    ) : (
      <Text>Loading...</Text>
    )
  }
}

export default withContext(Quiz)
