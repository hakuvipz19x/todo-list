const checkedTodo = (payload) => {
    return {
        type: 'CHECKED_TODO',
        payload
    }
}

const uncheckedTodo = (payload) => {
    // console.log(payload)
    return {
        type: 'UNCHECKED_TODO',
        payload
    }
}
const removeMultiCheckedTodo = (payload) => {
    // console.log(payload)
    return {
        type: 'REMOVE_MULTI_CHECKED_TODO',
        payload
    }
}

export { checkedTodo, uncheckedTodo, removeMultiCheckedTodo }