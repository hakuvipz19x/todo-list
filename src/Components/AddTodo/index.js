import { useState, useRef, memo } from 'react'
import moment from 'moment';

import './AddTodo.css'
import { FaCaretDown } from "react-icons/fa";
import { addTodo } from '../../actions/todo'
import { useDispatch } from 'react-redux';

function AddTodo() {
    const dispatch = useDispatch()
    // console.log('re-render')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState(moment().format("DD MMM YYYY"))
    const [piority, setPiority] = useState('Normal')

    const piorityWrapperRef = useRef()
    const piorityListRef = useRef()

    const piorityList = ['low', 'normal', 'high']

    const showPiorityList = () => {
        // console.log('show event')

        if (piorityListRef.current.style.display !== 'block') {
            piorityListRef.current.style.display = 'block';
            window.addEventListener('click', hidePiorityList)
        }
        else {
            piorityListRef.current.style.display = 'none';
            window.removeEventListener('click', hidePiorityList)
        }
        // console.log(calendarRef.current.style)
    }

    const hidePiorityList = (e) => {
        // console.log('hide event')

        if (!piorityWrapperRef.current.contains(e.target)) {
            piorityListRef.current.style.display = 'none'
            window.removeEventListener('click', hidePiorityList)
        }
    }

    const handleSubmit = () => {
        const todo = {
            title,
            description,
            date,
            piority
        }

        const titleIsEmpty = title.length === 0;
        const dateIsValid = new Date(date) >= new Date().setHours(0, 0, 0, 0)

        // console.log(dateIsValid)
        // console.log(titleIsEmpty)
        if (!titleIsEmpty && dateIsValid) {
            const action = addTodo(todo);

            dispatch(action)

            // Reset form
            setTitle('')
            setDescription('')
            setDate(moment().format("DD MMM YYYY"))
            setPiority('Normal')
        }


    }

    return (
        <div className="add-todo">
            <div className="add-todo__header">New Task</div>
            <div>
                <input type="text" className="add-todo__title-input" placeholder="Add new task ..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="add-todo__title-error" style={{visibility: title.length === 0 ? 'visible' : 'hidden'}}>
                    * Title is not empty
                </div>
            </div>
            <div className="add-todo__description">
                <div className="add-todo__description-title">Description</div>
                <textarea className="add-todo__description-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <div className="row add-todo__option">
                <div className="col l-6 m-6 s-12">
                    <div className="add-todo__date-title">Due Date</div>
                    <div className="add-todo__date-wrapper"
                    >
                        <div className="add-todo__date-value">{date}</div>
                        <input type="date" className="add-todo__date-input"
                            onChange={(e) => setDate(moment(e.target.value).format("DD MMM YYYY"))}
                        />
                    </div>
                    <div className="update-todo__date-error" style={{ visibility: new Date(date) < new Date().setHours(0, 0, 0, 0) ? 'visible' : 'hidden' }}>
                        * Date is not in the past
                    </div>
                </div>
                <div className="col l-6 m-6 s-12">
                    <div className="add-todo__piority-title">Piority</div>
                    <div className="add-todo__piority-wrapper"
                        ref={piorityWrapperRef}
                        onClick={showPiorityList}
                    >
                        <div className="add-todo__piority-value">{piority}</div>
                        <FaCaretDown className="add-todo__piority-icon"></FaCaretDown>

                        <ul className="add-todo__piority-list"
                            ref={piorityListRef}
                        >
                            {piorityList.map((item, index) => (
                                <li className="add-todo__piority-item" key={index}
                                    onClick={() => setPiority(item)}
                                >{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="add-todo__btn"
                onClick={handleSubmit}
            >Add</div>
        </div>
    )
}

export default memo(AddTodo)