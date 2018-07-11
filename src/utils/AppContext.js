import React, { Component, createContext } from "react"
import { AsyncStorage } from "react-native"

const defaultContext = {
  userAccessToken: "",
  userId: "",
  userEmail: "",
  userName: "",
  userCorrectQuestions: [],
  categories: []
}

const AppContext = createContext(defaultContext)

const getSavedContext = async () => {
  try {
    const savedPairs = await AsyncStorage.multiGet([
      "userAccessToken",
      "userId",
      "userEmail",
      "userName",
      "userCorrectQuestions",
      "categories"
    ])
    const parsedPairs = await Promise.all(
      savedPairs.map(([key, value]) => {
        const parsed = JSON.parse(value)
        return [key, parsed]
      })
    )
    return parsedPairs.reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {})
  } catch (err) {
    console.error(err)
  }
}

export const withContext = Component => props => (
  <AppContext.Consumer>
    {ctx => <Component {...props} context={ctx} />}
  </AppContext.Consumer>
)

export class AppContextProvider extends Component {
  state = { ...defaultContext }
  setContext = async (name, obj) => {
    this.setState({
      [name]: obj
    })
    const string = await JSON.stringify(obj)
    AsyncStorage.setItem(name, string)
    return obj
  }
  resetContext = () => {
    this.setState(defaultContext)
  }
  async componentDidMount() {
    const savedContext = await getSavedContext()
    this.setState(prevState => ({
      userAccessToken:
        savedContext.userAccessToken || prevState.userAccessToken,
      userId: savedContext.userId || prevState.userId,
      userEmail: savedContext.userEmail || prevState.userEmail,
      userName: savedContext.userName || prevState.userName,
      userCorrectQuestions:
        savedContext.userCorrectQuestions || prevState.userCorrectQuestions,
      categories: savedContext.categories || prevState.categories
    }))
  }
  render() {
    const { children } = this.props
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          setContext: this.setContext,
          resetContext: this.resetContext
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }
}
