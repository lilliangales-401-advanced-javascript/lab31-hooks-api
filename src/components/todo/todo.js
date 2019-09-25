import React, { useState, useReducer } from "react";
import Auth from "../auth/auth.js";
import styles from "./todo.module.scss";

const initialState = {
  toDoItems: []
};

function reducer(state, action) {
  switch (action.type) {
    case "add":
      let itemToAdd = { title: action.data, status: false };
      return { ...state, toDoItems: [...state.toDoItems, itemToAdd] };
    case "toggle":
      let toDoItems = state.toDoItems.map((item, idx) =>
        idx === action.data ? { title: item.title, status: !item.status } : item
      );
      return { ...state, toDoItems };
    default:
      throw new Error();
  }
}

export default function Todo(props) {
  const [item, setItem] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleForm(e) {
    e.preventDefault();
    e.target.reset();
    dispatch({ type: "add", data: item });
  }

  function handleChange(e) {
    setItem(e.target.value);
  }

  function toggle(e, id) {
    e.preventDefault();
    dispatch({ type: "toggle", data: id });
  }

  return (
    <section className={styles.todo}>
      <Auth capability="read">
        {state.toDoItems.map((item, idx) => (
          <div key={idx} onClick={e => toggle(e, idx)}>
            <span className={styles[`complete-${item.status}`]}>
              {" "}
              {item.title}{" "}
            </span>
          </div>
        ))}
      </Auth>

      <Auth capability="create">
        <form onSubmit={handleForm}>
          <input
            onChange={handleChange}
            name="item"
            placeholder="Add To Do List Item Here"
          />
        </form>
      </Auth>
    </section>
  );
}
