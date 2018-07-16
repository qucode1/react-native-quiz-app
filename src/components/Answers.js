import React, { Component } from "react"
import { View } from "react-native"
import { withTheme } from "react-native-material-ui"
import {
  IndicatorViewPager,
  PagerDotIndicator,
  PagerTabIndicator
} from "rn-viewpager"
import SyntaxHighlighter from "react-native-syntax-highlighter"
import monokaiSublime from "react-syntax-highlighter/styles/hljs/monokai-sublime"

class Answers extends Component {
  render() {
    return (
      <View style={{ width: "100%", height: 200 }}>
        <IndicatorViewPager
          style={{ height: "100%" }}
          indicator={this._renderTabIndicator()}
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
                {`${option} - ${index}asdads`}
              </SyntaxHighlighter>
            </View>
          ))}
        </IndicatorViewPager>
      </View>
    )
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
  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={this.props.question.options.length} />
  }
  _renderTabIndicator() {
    let tabs = this.props.question.options.map((option, index) => ({
      text: this.getLetter(index)
    }))
    return (
      <PagerTabIndicator
        tabs={tabs}
        itemStyle={{
          padding: 8
        }}
        selectedItemStyle={{
          backgroundColor: this.props.theme.palette.accentColor,
          padding: 8,
          margin: 2
        }}
        textStyle={{ color: this.props.theme.palette.accentColor }}
        selectedTextStyle={{ color: "white" }}
        style={{
          padding: 0,
          paddingBottom: 0,
          paddingTop: 0
        }}
      />
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
