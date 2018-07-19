import React, { Component, Fragment } from "react"
import {
  Subheader,
  Card,
  BottomNavigation,
  Icon,
  Button,
  withTheme
} from "react-native-material-ui"
import { Text, View } from "react-native"
import { withContext } from "../utils/AppContext"

import Answers from "../components/Answers"
import Result from "../components/Result"

class Quiz extends Component {
  state = {
    category: this.props.navigation.getParam("category"),
    question: {},
    nextQuestion: {},
    selectedAnswer: 0,
    active: "question",
    answerSubmitted: false,
    displayAnswer: false
  }
  componentDidMount() {
    this.setQuestions()
  }
  handleAnswerChange = index => this.setState({ selectedAnswer: index })
  submitAnswer = () => {
    this.setState({ answerSubmitted: true })
  }
  setQuestions = () => {
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
    } else setTimeout(this.setQuestions, 200)
  }
  nextQuestion = () => {
    this.setQuestions()
    this.setState({
      answerSubmitted: false,
      selectedAnswer: 0,
      displayAnswer: false
    })
  }
  displayCorrectAnswer = () => {
    this.setState({
      displayAnswer: true
    })
  }
  getRandomQuestion = () => {
    const allQuestions = this.props.context.state[
      `${this.state.category}Questions`
    ]
    return allQuestions[this.getRandomInteger(0, allQuestions.length - 1)]
  }
  getLetter = num => {
    const table = {
      0: "A",
      1: "B",
      2: "C",
      3: "D"
    }
    return table[num]
  }
  getRandomInteger = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min
  render() {
    if (this.state.question.title) {
      if (this.state.answerSubmitted && !this.state.displayAnswer) {
        return (
          <Result
            question={this.state.question}
            selectedAnswer={this.state.selectedAnswer}
            nextQuestion={this.nextQuestion}
            displayCorrectAnswer={this.displayCorrectAnswer}
          />
        )
      } else {
        return (
          <Fragment>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <View
                style={{
                  flex: 1
                }}
              >
                <Subheader text={this.state.question.title} />
                {this.state.active === "question" &&
                this.state.question.content ? (
                  <Card>
                    <Text>Question Details</Text>
                  </Card>
                ) : (
                  <Fragment>
                    <View
                      style={{
                        flex: 3,
                        width: "100%"
                      }}
                    >
                      <Answers
                        question={this.state.question}
                        nextQuestion={this.state.nextQuestion}
                        handleAnswerChange={this.handleAnswerChange}
                        getLetter={this.getLetter}
                        displayAnswer={this.state.displayAnswer}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Button
                        raised
                        text={`Submit ${this.getLetter(
                          this.state.selectedAnswer
                        )}`}
                        onPress={this.submitAnswer}
                        style={{
                          container: {
                            margin: 10,
                            backgroundColor: this.props.theme.palette.secondary
                              .main
                          },
                          text: {
                            color: this.props.theme.palette.secondary
                              .contrastText
                          }
                        }}
                      />
                    </View>
                  </Fragment>
                )}
              </View>

              {this.state.question.content && (
                <BottomNavigation active={this.state.active} hidden={false}>
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
              )}
            </View>
          </Fragment>
        )
      }
    } else return <Text>Loading...</Text>
  }
}

export default withContext(withTheme(Quiz))
