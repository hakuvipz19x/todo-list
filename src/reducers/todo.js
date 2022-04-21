const initState = {
    todoList: JSON.parse(localStorage.getItem('todo_list')) || []
}

const todoReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todoList: [...state.todoList, action.payload]
            }

        case 'REMOVE_TODO': {
            const todoList = state.todoList.filter(item => item !== action.payload)
            return {
                ...state,
                todoList: todoList
            }
        }

        case 'REMOVE_MULTI_TODO': {
            const todoList = state.todoList.filter(item => !action.payload.includes(item))
            return {
                ...state,
                todoList: todoList
            } 
        }

        case 'UPDATE_TODO': {
            state.todoList[action.payload.index] = {
                ...action.payload.todo
            }

            const todoList = [...state.todoList]
            return {
                ...state,
                todoList: todoList
            } 
        }
        default:
            return state
    }
}

export default todoReducer