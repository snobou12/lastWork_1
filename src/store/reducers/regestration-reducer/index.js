const initialState = {
    isLoading: false,
    refSources: '',
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
    email: '',
    phone: '',
    tempUserId: '',
    codeId: '',
    genderId: '',
    errors: {
        isError: false,
        errorCode: null,
        errorMessage: "",
    },
}

export const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_IS_LOADING":
            return {...state, isLoading: action.payload}
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.payload
            }
        case "SET_CODES":
            return {
                ...state,
                ...action.payload
            }
        case "SET_REGISTRATION_ERRORS":
            return {...state, errors: action.payload}
        default: return state
    }
}
