import React from "react";

import firebase from "../services/firebase";

const ListItem = props => {
  // listItem is the current item in the list
  const listItem = props.data;
  const isChecked = listItem.isChecked;
  // firebaseKey is the key that Firebase uses for this piece of data
  const firebaseKey = props.firebaseKey;

  // We can use this to toggle that the item is to be checked off
  const toggleIsChecked = () => {
    listItem.isChecked = !listItem.isChecked;
    firebase.update(`messages/${firebaseKey}`, listItem);
  };

  // We can use this to remove this item from our Firebase Database
  const removeItem = () => {
    const itemToRemove = `messages/${firebaseKey}`;
    firebase.remove(itemToRemove);
  };

  // A simple way to add extra classes to an element based on some state of the list item
  const isCheckedClasses = isChecked
    ? "list-group-item-secondary text-muted"
    : "";

  return (
    <div
      className={`${isCheckedClasses} list-group-item list-group-item d-flex justify-content-between align-items-center`}
    >
      <div onClick={toggleIsChecked} className="w-100">
        {listItem.message}
        <br />
        <small className="text-muted">{listItem.time}</small>
      </div>
      <span onClick={removeItem} className="badge badge-danger badge-pill">
        x
      </span>
    </div>
  );
};

export default ListItem;
