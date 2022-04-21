const initState = {
    checkList: JSON.parse(localStorage.getItem('check_list')) || []
}

const checkListReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CHECKED_TODO': {
            // console.log('checklist before checked:')
            // console.log(state.checkList)
            // console.log('checklist after checked:')
            // console.log([...state.checkList, action.payload])
            return {   
                ...state,
                checkList: [...state.checkList, action.payload]
            };
        }

        case 'UNCHECKED_TODO': {
            // console.log('checklist before unchecked:')
            // console.log(state.checkList)
            const checkList = [...state.checkList].filter(todo => todo !== action.payload)
            // console.log('checklist after unchecked:')
            // console.log(checkList)

            // console.log(checkList);
            return {
                ...state,
                checkList
            };
        }

        case 'REMOVE_MULTI_CHECKED_TODO': {
            return {
                ...state,
                checkList: []
            }
        }
        
        default: 
            return state
    }
}

export default checkListReducer