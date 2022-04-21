// import logo from './logo.svg';
// import { useState } from 'react'

import './App.css';
import './grid.css'
import AddTodo from './Components/AddTodo'
import TodoList from './Components/TodoList'
import { useSelector } from 'react-redux'
function App() {
  const todoList = useSelector(state => {
    const list = state.todo.todoList;
    const json = (JSON.stringify(list))
    localStorage.setItem('todo_list', json)
    return list;
  })
  
  return (
    <div className="App">
      <div className="grid wide">
        <div className="row">
          <div className="col l-6 m-12 s-12">
            <AddTodo />
          </div>
          <div className="col l-6 m-12 s-12">
            <TodoList
              list={todoList}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
