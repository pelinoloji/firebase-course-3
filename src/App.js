import React, { Component } from "react";
import LoggedIn from "./auth/LoggedIn";
import LoggedOut from "./auth/LoggedOut";
import TodoList from "./components/TodoList";
import firebase from "./services/firebase";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: firebase.isLoggedIn() };
  }

  componentDidMount() {
    firebase.onLoginChange(user => {
      // If the user object has a value, we are logged in!
      if (user) {
        this.setState({ isLoggedIn: true });
      } else {
        this.setState({ isLoggedIn: false });
      }
    });
  }

  render() {
    // if (this.state.isLoggedIn) {
    //   return <LoggedIn />
    // }

    // return <LoggedOut/>
    return (
      <>
        <div className="container">
          <h1>Firebase Todo List</h1>
          {this.state.isLoggedIn ? <LoggedIn /> : <LoggedOut />}
        </div>
      </>
    );
  }
}
export default App;
