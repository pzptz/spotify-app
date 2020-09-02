import React, { Component } from "react";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import Profile from "./components/Profile/Profile";
import "./App.css";
import { token } from "./spotify";

class App extends Component {
  state = {
    token: "",
  };

  componentDidMount() {
    this.setState({ token });
  }

  render() {
    const { token } = this.state;
    return <div className="App">{token ? <Profile /> : <LoginScreen />}</div>;
  }
}

export default App;
