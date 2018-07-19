import React, { Component, Fragment } from "react"
import { View } from "react-native"
import { withTheme, Card } from "react-native-material-ui"
import {
  IndicatorViewPager,
  PagerDotIndicator,
  PagerTabIndicator
} from "rn-viewpager"
import SyntaxHighlighter from "react-native-syntax-highlighter"
import monokaiSublime from "react-syntax-highlighter/styles/hljs/monokai-sublime"

class Answers extends Component {
  componentDidMount() {
    console.log("answers did mount")
    if (this.props.displayAnswer && this.viewPager) {
      console.log("display correct answer")
      this.viewPager.setPage(this.props.question.answer)
    }
  }
  componentDidUpdate() {
    console.log("answers did update")
    this.setState(state => state)
    // if (this.props.displayAnswer && this.viewPager) {
    //   console.log("display correct answer")
    //   this.viewPager.setPage(this.props.question.answer)
    // }
  }
  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={this.props.question.options.length} />
  }
  _renderTabIndicator() {
    let tabs = this.props.question.options.map((option, index) => ({
      text: this.props.getLetter(index)
    }))
    return (
      <PagerTabIndicator
        tabs={tabs}
        itemStyle={{
          padding: 8
        }}
        selectedItemStyle={{
          padding: 8
        }}
        textStyle={{
          fontSize: 15
        }}
        selectedTextStyle={{
          color: this.props.theme.palette.accentColor,
          fontSize: 15,
          fontWeight: "bold"
        }}
        style={{
          padding: 0,
          paddingBottom: 0,
          paddingTop: 0
        }}
      />
    )
  }
  render() {
    return (
      <Fragment>
        <Card style={{ container: { flex: 1 } }}>
          <View style={{ height: "100%", width: "100%" }}>
            <IndicatorViewPager
              style={{ flex: 1 }}
              indicator={this._renderTabIndicator()}
              initialPage={0}
              onPageSelected={({ position }) =>
                this.props.handleAnswerChange(position)
              }
              ref={viewPager => {
                this.viewPager = viewPager
              }}
            >
              {this.props.question.options.map((option, index) => (
                <View key={`${option}-${index}`}>
                  <SyntaxHighlighter
                    language="html"
                    style={monokaiSublime}
                    highlighter={"hljs"}
                    customStyle={{ width: "100%" }}
                    wrapLines={true}
                  >
                    {`${option}`}
                  </SyntaxHighlighter>
                </View>
              ))}
            </IndicatorViewPager>
          </View>
        </Card>
      </Fragment>
    )
  }
}

// const styles = {
//   scrollView: {},
//   pageStyle: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     height: 50,
//     paddingHorizontal: 10,
//     borderRightColor: "rgba(0,0,0,0.2)",
//     borderRightWidth: 1
//   }
// }

export default withTheme(Answers)
