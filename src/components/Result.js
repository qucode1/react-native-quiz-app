import React, { Fragment } from "react"
import { View } from "react-native"
import { Button, Subheader } from "react-native-material-ui"
import SyntaxHighlighter from "react-native-syntax-highlighter"
import monokaiSublime from "react-syntax-highlighter/styles/hljs/monokai-sublime"

const Result = props => (
  <Fragment>
    {props.question.answer === props.selectedAnswer ? (
      <View style={{ flex: 1 }}>
        <Subheader
          text="Correct Answer!"
          style={{ text: { color: "green" } }}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Button
            primary
            raised
            text="Next Question"
            onPress={props.nextQuestion}
            style={{ container: { margin: 10 } }}
          />
        </View>
      </View>
    ) : (
      <View style={{ flex: 1, padding: 10 }}>
        <Subheader
          text="Wrong! The correct answer is:"
          style={{ text: { color: "tomato" } }}
        />
        <SyntaxHighlighter
          language="html"
          style={monokaiSublime}
          highlighter={"hljs"}
          customStyle={{ width: "100%" }}
          wrapLines={true}
        >
          {`${props.question.options[props.question.answer]}`}
        </SyntaxHighlighter>
        {/* <Button
          primary
          text="Show Correct Answer"
          onPress={props.displayCorrectAnswer}
        /> */}
        <Button
          primary
          raised
          text="Next Question"
          onPress={props.nextQuestion}
          style={{ container: { margin: 10 } }}
        />
      </View>
    )}
  </Fragment>
)

export default Result
