import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import moment from 'moment';

import './UpdateTodo.css'
import { FaCaretDown } from "react-icons/fa";
import { updateTodo } from '../../../../actions/todo'
import { uncheckedTodo } from '../../../../actions/check'

function UpdateTodo({ todo, index }) {
    const dispatch = useDispatch()

    const [title, setTitle] = useState(todo.title)
    const [description, setDescription] = useState(todo.description)
    const [date, setDate] = useState(moment(todo.date).format("DD MMM YYYY"))
    const [piority, setPiority] = useState(todo.piority)

    const piorityWrapperRef = useRef()
    const piorityListRef = useRef()

    const piorityList = ['low', 'normal', 'high']

    const showPiorityList = () => {

        if (piorityListRef.current.style.display !== 'block') {
            piorityListRef.current.style.display = 'block';
            window.addEventListener('click', hidePiorityList)
        }
        else {
            piorityListRef.current.style.display = 'none';
            window.removeEventListener('click', hidePiorityList)
        }
    }

    const hidePiorityList = (e) => {

        if (!piorityWrapperRef.current.contains(e.target)) {
            piorityListRef.current.style.display = 'none'
            window.removeEventListener('click', hidePiorityList)
        }
    }

    const handleSubmit = () => {
        const newTodo = {
            title,
            description,
            date,
            piority
        }

        const titleIsEmpty = title.length === 0;
        const dateIsValid = new Date(date) >= new Date().setHours(0, 0, 0, 0)

        if (!titleIsEmpty && dateIsValid) {
            const updateTodoAction = updateTodo({
                todo: newTodo,
                index: index
            })
            dispatch(updateTodoAction)

            const removeCheckedTodoAction = uncheckedTodo(todo)
            dispatch(removeCheckedTodoAction)
        }


    }
    return (
        <div className="update-todo">
            <div>
                <input type="text" className="update-todo__title-input" placeholder="Update new task ..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="update-todo__title-error" style={{ visibility: title.length === 0 ? 'visible' : 'hidden' }}>
                    * Title is not empty
                </div>
            </div>
            <div className="update-todo__description">
                <div className="update-todo__description-title">Description</div>
                <textarea className="update-todo__description-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <div className="row update-todo__option">
                <div className="col l-6 m-6 s-12">
                    <div className="update-todo__date-title">Due Date</div>
                    <div className="update-todo__date-wrapper"
                    >
                        <div className="update-todo__date-value">{date}</div>
                        <input type="date" className="update-todo__date-input"
                            onChange={(e) => setDate(moment(e.target.value).format("DD MMM YYYY"))}
                        />
                    </div>
                    <div className="update-todo__date-error" style={{ visibility: new Date(date) < new Date().setHours(0, 0, 0, 0) ? 'visible' : 'hidden' }}>
                        * Date is not in the past
                    </div>
                </div>
                <div className="col l-6 m-6 s-12">
                    <div className="update-todo__piority-title">Piority</div>
                    <div className="update-todo__piority-wrapper"
                        ref={piorityWrapperRef}
                        onClick={showPiorityList}
                    >
                        <div className="update-todo__piority-value">{piority}</div>
                        <FaCaretDown className="update-todo__piority-icon"></FaCaretDown>

                        <ul className="update-todo__piority-list"
                            ref={piorityListRef}
                        >
                            {piorityList.map((item, index) => (
                                <li className="update-todo__piority-item" key={index}
                                    onClick={() => setPiority(item)}
                                >{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="update-todo__btn"
                onClick={handleSubmit}
            >Update</div>
        </div>
    )
}

export default UpdateTodo