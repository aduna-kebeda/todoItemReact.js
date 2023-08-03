import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);

  function handleSummit(e) {
    e.preventDefault();
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), title: newItem, completed: false }
    ]);
    setNewItem("");
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <div>
      <form className="item_form" onSubmit={handleSummit}>
        <div className="form_row">
          <label htmlFor="item">New item</label>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            id="item"
          />
          <button type="submit" className="btn">
            Add
          </button>
        </div>
      </form>

      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                checked={todo.completed}
              />
              {todo.title}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="btn_danger"
              >
                delete
              </button>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
