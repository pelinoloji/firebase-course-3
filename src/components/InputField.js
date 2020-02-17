import React from "react";

import firebase from "../services/firebase";

/**
 * There are a few different ways of tackling forms in React. In this example,
 * we save each change made into this.state. We do this because it can make it
 * easier to empty the field once we submit some data
 */
class InputField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };
  }

  onSubmit = event => {
    /**
     * As we have a form, normally this would submit data and cause a page
     * refresh, but we don't want that!
     *
     * The "onSubmit" function will return to us an Event object which is the
     * event that would be fired when a user normally clicks a button. Using
     * JavaScript, we can prevent the default action of this button, and we can
     * then take control of what happens next
     */
    event.preventDefault();

    // Scaffold out our data
    const todoListItem = {
      time: new Date().toLocaleString("en-gb"),
      message: this.state.value,
      isChecked: false
    };

    // Write our data
    firebase.writeTo(`messages/${firebase.getCurrentUser().uid}`, todoListItem);

    // Reset our input field to not have a value
    this.setState({ value: "" });
  };

  /**
   * When the field changes, we need to synchronise this data back into our
   * state
   */
  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="d-flex flex-row form-group">
        <input
          value={this.state.value}
          onChange={this.handleChange}
          className="form-control w-100"
          type="text"
        />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default InputField;
