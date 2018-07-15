import React, { Fragment, Component } from "react"
import { ScrollView, Text, View } from "react-native"
import { IndicatorViewPager, PagerDotIndicator } from "rn-viewpager"

class Answers extends Component {
  render() {
    return (
      <View>
        <IndicatorViewPager
          style={{ height: 200 }}
          indicator={this._renderDotIndicator()}
        >
          {this.props.question.options.map((option, index) => (
            <View key={`option-${index}`}>
              <Text>{option}</Text>
            </View>
          ))}
          {/* <View style={{ backgroundColor: "cadetblue" }}>
            <Text>page one</Text>
          </View>
          <View style={{ backgroundColor: "cornflowerblue" }}>
            <Text>page two</Text>
          </View>
          <View style={{ backgroundColor: "#1AA094" }}>
            <Text>page three</Text>
          </View> */}
        </IndicatorViewPager>
      </View>
    )
  }
  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={this.props.question.options.length} />
  }
}

const styles = {
  scrollView: {},
  pageStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    paddingHorizontal: 10,
    borderRightColor: "rgba(0,0,0,0.2)",
    borderRightWidth: 1
  }
}

export default Answers
