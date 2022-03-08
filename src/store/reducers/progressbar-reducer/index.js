const initialState = {
    options: {
        percent: 0,
        greenStripe: 0,
        lightGreenStripe: 0
    }
}

export const progressbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PERCENT":
            return {...state, options: action.payload}
        default: return state
    }
}