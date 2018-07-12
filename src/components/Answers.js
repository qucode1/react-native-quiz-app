import React, { Fragment } from "react"
import { ScrollView, Text, View } from "react-native"

const Answers = () => {
  return (
    <ScrollView pagingEnabled horizontal style={styled.scrollView}>
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
    </ScrollView>
  )
}

const styles = {
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
