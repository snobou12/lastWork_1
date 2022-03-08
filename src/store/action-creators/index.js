

export const LoanActionCreators = {
    setLoanAmount: (amount) => ({type: "CHANGE_LOAN_AMOUNT", payload: amount}),
    setRefundAmount: (amount) => ({type: "CHANGE_REFUND_AMOUNT", payload: amount}),
    setOverpaymentAmount: (amount) => ({type: "CHANGE_OVERPAYMENT_AMOUNT", payload: amount}),
    setTermAmount: (term) => ({type: "CHANGE_TERM_AMOUNT", payload: term}),
    setPeriodType: (period) => ({type: "CHANGE_PERIOD_TYPE", payload: period}),
}

export const RegistrationActionCreators = {
    setIsLoading: (isLoading) => ({type: "SET_IS_LOADING", payload: isLoading}),
    setUserData: (data) => ({type: "SET_USER_DATA", payload: data}),
    setRegistrationCodes: (data) => ({type: "SET_CODES", payload: data}),
    setRegistrationErrors: (errors) => ({type: "SET_REGISTRATION_ERRORS", payload: errors}),
}


export const NewFormActionCreators = {
    setErrors: (errors) => ({type: "SET_ERRORS", payload: errors}),
    setResult: (result) => ({type: "SET_RESULT", payload: result}),
    setIsPassport: (isPassport) => ({type: "SET_IS_PASSPORT", payload: isPassport}),
    setIsAddress: (isAddress) => ({type: "SET_IS_ADDRESS", payload: isAddress}),
    setIsWork: (isWork) => ({type: "SET_IS_WORK", payload: isWork}),
    setAvailablePayment: (result) => ({type: "SET_AVAILABLE_PAYMENT", payload: result}),
    setAvailableTypes: (types) => ({type: "SET_AVAILABLE_TYPES", payload: types}),
    setCalculatorSettings: (result) => ({type: "SET_CALCULATOR_SETTINGS", payload: result}),
    addBankAccountSuccess: (result) => ({type: "ADD_BANK_ACCOUNT_SUCCESS", payload: result}),
    addWalletSuccess: (result) => ({type: "ADD_WALLET_SUCCESS", payload: result}),
    setCompletions: (key, completions) => ({type: "SET_COMPLETIONS", payload: {key, completions}}),
    setApplicationId: (id) => ({type: "SET_APPLICATION_ID", payload: id}),
    setDictionaries: (result) => ({type: "SET_DICTIONARIES", payload: result}),
    setAdditionalQuestionsDictionary: (dictionary) => ({type: "SET_ADDITIONAL_QUESTIONS_DICTIONARY", payload: dictionary}),
    // setAddressCityGuid: (guid) => ({type: "SET_ADDRESS_CITY_GUID", payload: guid}),
    // setAddressStreetGuid: (guid) => ({type: "SET_ADDRESS_STREET_GUID", payload: guid}),
}

export const ProgressBarCreators = {
    setPercent: (options) => ({type: "SET_PERCENT", payload: options}),
}


