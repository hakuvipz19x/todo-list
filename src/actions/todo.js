const addTodo = (payload) => {
    return {
        type: 'ADD_TODO',
        payload
    }
}

const removeTodo = (payload) => {
    return {
        type: 'REMOVE_TODO',
        payload
    }
}

const removeMultiTodo = (payload) => {
    return {
        type: 'REMOVE_MULTI_TODO',
        payload
    }
}

const updateTodo = (payload) => {
    return {
        type: 'UPDATE_TODO',
        payload
    }
}


export { addTodo, removeTodo, removeMultiTodo, updateTodo }