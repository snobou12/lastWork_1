const initialState = {
    loanAmount: 0,
    refundAmount: 0,
    overpaymentAmount: 0,
    term: 0,
    periodTypeId: '40250ae9-0770-4ca9-939d-fdb3a3c867bd' // дни
}

export const loanReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE_LOAN_AMOUNT":
            return {...state, loanAmount: action.payload}
        case "CHANGE_REFUND_AMOUNT":
            return {...state, refundAmount: action.payload}
        case "CHANGE_OVERPAYMENT_AMOUNT":
            return {...state, overpaymentAmount: action.payload}
        case "CHANGE_TERM_AMOUNT":
            return {...state, term: action.payload}
        case "CHANGE_PERIOD_TYPE":
            return {...state, periodTypeId: action.payload}
        default: return state
    }
}