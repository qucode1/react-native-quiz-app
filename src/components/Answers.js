import React, { Fragment, Component } from "react"
import { ScrollView, Text, View } from "react-native"
import { IndicatorViewPager, PagerDotIndicator } from "rn-viewpager"

class Answers extends Component {
  render() {
    return (
      <View>
        {/* <ScrollView pagingEnabled horizontal style={styles.scrollView}>
          <View style={styles.pageStyle} key="1">
            <Text>First Page</Text>
          </View>
          <View style={styles.pageStyle} key="2">
            <Text>Second Page</Text>
          </View>
          <View style={styles.pageStyle} key="3">
            <Text>Third Page</Text>
          </View>
          <View style={styles.pageStyle} key="4">
            <Text>Fourth Page</Text>
          </View>
          <View style={styles.pageStyle} key="5">
            <Text>Fifth Page</Text>
          </View>
          <View style={styles.pageStyle} key="6">
            <Text>Sixth Page</Text>
          </View>
          <View style={styles.pageStyle} key="7">
            <Text>Seventh Page</Text>
          </View>
        </ScrollView> */}
        <IndicatorViewPager
          style={{ height: 200 }}
          indicator={this._renderDotIndicator()}
        >
          <View style={{ backgroundColor: "cadetblue" }}>
            <Text>page one</Text>
          </View>
          <View style={{ backgroundColor: "cornflowerblue" }}>
            <Text>page two</Text>
          </View>
          <View style={{ backgroundColor: "#1AA094" }}>
            <Text>page three</Text>
          </View>
        </IndicatorViewPager>
      </View>
    )
  }
  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={3} />
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
