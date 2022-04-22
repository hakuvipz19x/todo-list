import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './TodoItem.css'
import { removeTodo } from '../../../actions/todo'
import { checkedTodo, uncheckedTodo } from '../../../actions/check'
import UpdateTodo from './UpdateTodo'

function TodoItem({ todo, checked, index }) {
    const checkedList = useSelector(state => state.check.checkList)
    const dispatch = useDispatch()
    const [showDetail, setShowDetail] = useState(false)

    const handleChecked = () => {
        if (checkedList.includes(todo)) {
            const action = uncheckedTodo(todo)

            dispatch(action)
        }
        else {
            const action = checkedTodo(todo)

            dispatch(action)
        }
    }

    const handleRemoveTodo = (todo) => {
        const removeTodoAction = removeTodo(todo)
        dispatch(removeTodoAction)

        setShowDetail(false)

        const uncheckedTodoAction = uncheckedTodo(todo)
        dispatch(uncheckedTodoAction)
    }

    return (
        <>
            <li className="todo-list__item">
                <div className="todo-list__item-wrapper">
                    <div className="todo-list__item-title">
                        <input type="checkbox" className="todo-list__item-checkbox"
                            checked={checked}
                            onChange={handleChecked}
                        />
                        <span>{todo.title}</span>
                    </div>
                    <div className="todo-list__item-btn">
                        <div className="todo-list__item-detail"
                            onClick={() => setShowDetail(!showDetail)}>Detail</div>
                        <div className="todo-list__item-remove"
                            onClick={() => handleRemoveTodo(todo)}
                        >Remove</div>
                    </div>
                </div>
                {showDetail &&
                    <UpdateTodo
                        todo={todo}
                        index={index}
                        setShowDetail={setShowDetail}
                        key={todo}
                    />
                }
            </li>
        </>
    )
}

export default TodoItem