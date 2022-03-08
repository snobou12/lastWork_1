const phoneErrorMessageTemplate = {
    wrongLength: 'Неверное количество знаков',
    wrongNumber: 'введите корректный номер'
}

const handlePhone = (e, phoneType, phoneHandler, phoneChecker, errorMessageHandler, wrongSecondSignHandler) => {

    if (phoneType.length === 0 && e.target.value !== '+') {
        phoneHandler('+7')
    } else if (phoneType.length === 1 && (e.nativeEvent.data !== '7')) {
        if (e.nativeEvent.data !== null) {
            phoneHandler('+7')
        } else {
            phoneHandler('')
        }
    } else {
        phoneHandler(e.target.value)
    }

    if (phoneChecker) {
        if (e.target.value.length >= 4 && e.target.value[4] !== '9') {
            wrongSecondSignHandler(true)
        } else {
            wrongSecondSignHandler(false)
        }

        if (e.target.value.length < 18) {
            errorMessageHandler(phoneErrorMessageTemplate.wrongLength)
            phoneChecker(false)
        } else {
            phoneChecker(true)

            let set = new Set(e.target.value.split(''))
            if (set.size < 8) {
                errorMessageHandler(phoneErrorMessageTemplate.wrongNumber)
                phoneChecker(false)
            }
        }
    }
}

const formatChars = {
    '9': '[0-9]',
    'a': '[A-Za-z]',
    '*': '[+]'
}

const beforeMaskedValueChangeHandler = (newState, oldState, userInput) => {
    let {value} = newState;
    let selection = newState.selection;

    if (!value && userInput) {
        selection = {start: 5, end: 5}
    }

    return {
        value,
        selection
    }
}
export {formatChars, beforeMaskedValueChangeHandler}
export default handlePhone
