const initialState = {
    errors: {
        isError: false,
        errorCode: null,
        errorMessage: "",
    },
    isPassport: false,
    isAddress: false,
    isWork: false,
    result: false,
    availablePayment: null,
    availableTypes: [],
    calculatorSettings: {},
    addBankAccountSuccess: false,
    addWalletSuccess: false,
    completions: {},
    applicationId: null,
    dictionaries: [],
    additionalQuestionsDictionary: null,
}

export const newFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ERRORS":
            return {...state, errors: action.payload}
        case "SET_RESULT":
            return {...state, result: action.payload}
        case "SET_IS_PASSPORT":
            return {...state, isPassport: action.payload}
        case "SET_IS_ADDRESS":
            return {...state, isAddress: action.payload}
        case "SET_IS_WORK":
            return {...state, isWork: action.payload}
        case "SET_AVAILABLE_PAYMENT":
            return {...state, availablePayment: action.payload}
        case "ADD_BANK_ACCOUNT_SUCCESS":
            return {...state, addBankAccountSuccess: action.payload}
        case "ADD_WALLET_SUCCESS":
            return {...state, addWalletSuccess: action.payload}
        case "SET_COMPLETIONS":
            return {
                ...state,
                completions: {
                    ...state.completions,
                    [action.payload.key]: action.payload.completions,
                },
            }
        case "SET_APPLICATION_ID":
            return {
                ...state,
                applicationId: action.payload,
            }
        case "SET_DICTIONARIES":
            return {
                ...state,
                dictionaries: action.payload,
            }
        case "SET_ADDITIONAL_QUESTIONS_DICTIONARY":
            return {
                ...state,
                additionalQuestionsDictionary: action.payload,
            }
        case "SET_CALCULATOR_SETTINGS":
            return {
                ...state,
                calculatorSettings: action.payload,
            }
        case "SET_AVAILABLE_TYPES":
            return {
                ...state,
                availableTypes: action.payload,
            }
        // case "SET_REGISTRATION_ADDRESS_CITY_GUID":
        //     return {
        //         ...state,
        //         completions: {
        //             ...state.completions,
        //             addressRegistrationCityGuid: action.payload,
        //         }
        //     }
        // case "SET_RESIDENCE_ADDRESS_CITY_GUID":
        //     return {
        //         ...state,
        //         completions: {
        //             ...state.completions,
        //             addressResidenceCityGuid: action.payload,
        //         }
        //     }
        // case "SET_REGISTRATION_ADDRESS_STREET_GUID":
        //     return {
        //         ...state,
        //         completions: {
        //             ...state.completions,
        //             addressRegistrationStreetGuid: action.payload,
        //         }
        //     }
        // case "SET_RESIDENCE_ADDRESS_STREET_GUID":
        default: return state
    }
}
