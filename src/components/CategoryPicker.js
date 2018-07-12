import React, { Fragment } from "react"
import { Card, Subheader, Button } from "react-native-material-ui"
import { withContext } from "../utils/AppContext"
import WithHeader from "../layouts/WithHeader"

const CategoryPicker = ({
  context,
  navigation: { navigate },
  screenProps: { mainNavigation, mainScreenProps }
}) => {
  return (
    <Fragment>
      <WithHeader navigation={mainNavigation} screenProps={mainScreenProps}>
        <Subheader lines={1} text="Choose a test category" />
        {context.state.categories.map(category => (
          <Card
            key={`${category._id}-2`}
            onPress={() => navigate("Quiz", { category: category.name })}
          >
            <Subheader text={category.name.toUpperCase()} />
          </Card>
        ))}
        <Button
          primary
          text="Go to about screen"
          onPress={() => mainNavigation.navigate("About")}
        />
      </WithHeader>
    </Fragment>
  )
}

export default withContext(CategoryPicker)
