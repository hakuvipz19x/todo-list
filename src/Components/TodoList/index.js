import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './TodoList.css'
import TodoItem from './TodoItem'
import { removeMultiTodo } from '../../actions/todo'
import { removeMultiCheckedTodo } from '../../actions/check'

function TodoList({ list }) {
    const checkedList = useSelector(state => {
        const list = state.check.checkList;
        const json = JSON.stringify(list)
        localStorage.setItem('check_list', json)
        return state.check.checkList;
    })
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')

    const handleMultiRemoveTodo = () => {
        const removeMultiTodoAction = removeMultiTodo(checkedList)
        dispatch(removeMultiTodoAction)

        const clearCheckedTodoAction = removeMultiCheckedTodo()
        dispatch(clearCheckedTodoAction)
    }

    return (
        <div className="todo-list">
            <div className="todo-list__header">To Do List</div>
            <input type="text" className="todo-list__search-input" placeholder="Search ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <ul className="todo-list__wrapper">
                {list.filter(item => item.title.toLowerCase().includes(search.trim().toLowerCase()))
                    .map((todo, index) => {
                        return (
                            <TodoItem
                                todo={todo}
                                checked={checkedList.includes(todo)}
                                index={index}
                                key={index}
                            />
                        )
                    })}
            </ul>
            <div className="todo-list__bulk-action" style={{ visibility: checkedList.length !== 0 ? 'visible' : 'hidden' }}>
                <span className="todo-list__bulk-action-title">Bulk Action:</span>
                <div className="todo-list__bulk-action-btn">
                    <div className="todo-list__bulk-action-done">Done</div>
                    <div className="todo-list__bulk-action-remove"
                    onClick={handleMultiRemoveTodo}
                    >Remove</div>
                </div>
            </div>
        </div>
    )
}

export default TodoList