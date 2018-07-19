import React, { Fragment } from "react"
import { View } from "react-native"
import { Button, Subheader, withTheme } from "react-native-material-ui"
import SyntaxHighlighter from "react-native-syntax-highlighter"
import monokaiSublime from "react-syntax-highlighter/styles/hljs/monokai-sublime"

const Result = props => (
  <Fragment>
    {props.question.answer === props.selectedAnswer ? (
      <View style={{ flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Subheader
            text="Correct Answer!"
            style={{
              text: {
                color: props.theme.palette.success,
                fontSize: props.theme.typography.headline
              },
              container: {
                paddingLeft: 0
              }
            }}
          />
        </View>
        <View
          style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
        >
          <Button
            raised
            text="Next Question"
            onPress={props.nextQuestion}
            style={{
              container: {
                margin: 10,
                backgroundColor: props.theme.palette.secondary.main
              },
              text: {
                color: props.theme.palette.secondary.contrastText
              }
            }}
          />
        </View>
      </View>
    ) : (
      <View style={{ flex: 1, padding: 10 }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Subheader
            text="Wrong! The correct answer is:"
            style={{
              text: {
                color: props.theme.palette.failure,
                fontSize: props.theme.typography.headline
              },
              container: {
                paddingLeft: 0
              }
            }}
          />
        </View>
        <View
          style={{ flex: 3, justifyContent: "center", alignItems: "center" }}
        >
          <SyntaxHighlighter
            language="html"
            style={monokaiSublime}
            highlighter={"hljs"}
            customStyle={{ width: "100%" }}
            wrapLines={true}
          >
            {`${props.question.options[props.question.answer]}`}
          </SyntaxHighlighter>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Button
            raised
            text="Next Question"
            onPress={props.nextQuestion}
            style={{
              container: {
                margin: 10,
                backgroundColor: props.theme.palette.secondary.main
              },
              text: { color: props.theme.palette.secondary.contrastText }
            }}
          />
        </View>
      </View>
    )}
  </Fragment>
)

export default withTheme(Result)
