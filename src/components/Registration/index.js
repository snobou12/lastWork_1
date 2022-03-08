import React, {useState, useEffect} from 'react';
import servisesIcon from '../../img/servises-icon.png'
import checkGrey from '../../img/svg/check-grey.svg'
import InputMask from "react-input-mask";
import {useDispatch, useSelector} from "react-redux";
import {LoanActionCreators, RegistrationActionCreators} from "../../store/action-creators";
import {
    createTempContactThunk,
    findFirstNameThunk,
    findLastNameThunk,
    findMiddleNameThunk,
    getDictionariesThunk,
} from "../../server/thunks/thunks";
import {useHistory} from "react-router-dom";

export const Registration = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const amounts = useSelector(state => state.loanReducer);
    let errors = useSelector((state) => state.registrationReducer.errors ? state.registrationReducer.errors : null);
    const dictionaries = useSelector(state => state.newFormReducer?.dictionaries);

    const [loan, setLoan] = useState(0);
    const [date, setDate] = useState(0);

    // form
    const [surname, setSurName] = useState('');
    const [name, setName] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [registerDate, setRegisterDate] = useState('');
    const [phone, setPhone] = useState('')
    const [mail, setMail] = useState("");

    //validations
    const [isValidSurname, setIsValidSurname] = useState(false);
    const [isValidName, setIsValidName] = useState(false);
    const [isValidMiddlename, setIsValidMiddlename] = useState(false);
    const [isValidPhone, setIsValidPhone] = useState(false);
    const [isValidMail, setIsValidMail] = useState(false);


    const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
    const [wrongSecondSignErrorMessage, setWrongSecondSignErrorMessage] = useState(false);
    const [noMiddlename, setNoMiddlename] = useState(false);
    const [isOpenedList, setIsOpenedList] = useState(false);
    const [success, setSuccess] = useState(false)
    const [genderId, setGenderId] = useState('')


    // dadata
    let firstNameCompletions = useSelector((state) => state.newFormReducer.completions.firstNameReg ? state.newFormReducer.completions.firstNameReg : null);
    let lastNameCompletions = useSelector((state) => state.newFormReducer.completions.lastNameReg ? state.newFormReducer.completions.lastNameReg : null);
    let middleNameCompletions = useSelector((state) => state.newFormReducer.completions.middleNameReg ? state.newFormReducer.completions.middleNameReg : null);

    const [completionsVisible, setCompletionsVisible] = useState({
        firstNameReg: false,
        lastNameReg: false,
        middleNameReg: false,
    });

    const phoneErrorMessageTemplate = {
        wronglength: 'Неверное количество знаков',
        wrongNumber: 'введите корректный номер'
    }

    const formatChars = {
        '9': '[0-9]',
        'a': '[A-Za-z]',
        '*': '[+]'
    }

    useEffect(() => {
        dispatch(getDictionariesThunk())
    }, [])


    const handleSurnameChange = (event) => {
        setSurName(event.target.value);
        checkValid('surname', event.target.value);
        if (event.target.value.length > 2) {
            setCompletionsVisible({
                ...completionsVisible,
                lastNameReg: true
            })
            dispatch(findLastNameThunk('lastNameReg', {name: event.target.value, genderId, countRows: 5}));
        }

    }

    const handleNameChange = (event) => {
        setName(event.target.value);
        checkValid('name', event.target.value);
        if (event.target.value.length > 2) {
            setCompletionsVisible({
                ...completionsVisible,
                firstNameReg: true
            })
            dispatch(findFirstNameThunk('firstNameReg', {name: event.target.value, genderId, countRows: 5}));
        }

    }

    const handleNoMiddlenameChange = (event) => {
        setNoMiddlename(event.target.checked);

        if (!noMiddlename) {
            setMiddlename('');
            setIsValidMiddlename(true)
        } else {
            setIsValidMiddlename(false)
        }
    }
    const handleMiddlenameChange = (event) => {
        setMiddlename(event.target.value);
        checkValid('middlename', event.target.value);
        if (event.target.value.length > 2) {
            setCompletionsVisible({
                ...completionsVisible,
                middleNameReg: true
            })
            dispatch(findMiddleNameThunk('middleNameReg', {name: event.target.value, genderId, countRows: 5}));
        }

    }

    const handleRegisterDateChange = (event) => {
        setRegisterDate(event.target.value);
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

    const handlePhoneChange = (e) => {
        if (phone.length === 0 && e.target.value !== '+') {
            setPhone('+7')
        } else if (phone.length === 1 && (e.nativeEvent.data !== '7')) {
            if (e.nativeEvent.data !== null) {
                setPhone('+7')
            } else {
                setPhone('')
            }
        } else {
            setPhone(e.target.value)
        }
        checkValid('phone', e.target.value)
    }


    const handleMailChange = (event) => {
        setMail(event.target.value);
        checkValid('mail', event.target.value)
    }


    const checkFormFields = () => {
        const formFields = {
            registerDate
        }

        const fieldsValidations = {
            isValidName,
            isValidSurname,
            isValidMiddlename,
            isValidMail,
            isValidPhone
        }

        const emptyFields = Object.keys(formFields).some(p => formFields[p] === '');
        const fieldsWithErrors = Object.keys(fieldsValidations).some(p => fieldsValidations[p] === false);

        return emptyFields || fieldsWithErrors
    }

    const handleGender = (item) => {
        const gender = item.data.gender
        if (gender === 'FEMALE') {
            setGenderId(dictionaries.gender.find(item => item.name === 'Женский').id)
        } else if (gender === 'MALE') {
            setGenderId(dictionaries.gender.find(item => item.name === 'Мужской').id)
        } else if (gender === 'UNKNOWN') {
            setGenderId(dictionaries.gender.find(item => item.name === 'Мужской').id)
        } else {
            setGenderId(dictionaries.gender.find(item => item.name === 'Мужской').id)
        }
    }

    useEffect(() => {
        const responseFromBack = 0.02;
        if (date <= 30) {
            dispatch(LoanActionCreators.setRefundAmount(loan + ((loan * responseFromBack) / 0.01) * loan))
            dispatch(LoanActionCreators.setOverpaymentAmount(amounts.refundAmount - loan))
        }

    }, [loan, date])

    const checkValid = (type, value) => {
        const regexp = /[А-Яа-я]+/;
        // const phoneRegexp = /^(()+([0-9]){10})$/;
        const mailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

        switch (type) {
            case "name":
                if (value !== "") {
                    if (regexp.test(value)) {
                        setIsValidName(true)
                    } else {
                        setIsValidName(false)
                    }
                } else {
                    setIsValidName(false)
                }
                break;
            case "surname":
                if (value !== "") {
                    if (regexp.test(value)) {
                        setIsValidSurname(true)
                    } else {
                        setIsValidSurname(false)
                    }
                } else {
                    setIsValidSurname(false)
                }
                break;
            case "middlename":
                if (value !== "") {
                    if (regexp.test(value)) {
                        setIsValidMiddlename(true)
                    } else {
                        setIsValidMiddlename(false)
                    }
                } else {
                    setIsValidMiddlename(false)
                }
                break;
            case "phone":
                if (value.length >= 4 && value[4] !== '9') {
                    setWrongSecondSignErrorMessage(true)
                } else {
                    setWrongSecondSignErrorMessage(false)
                }

                if (value.length < 18) {
                    setPhoneErrorMessage(phoneErrorMessageTemplate.wronglength)
                    setIsValidPhone(false)
                } else {
                    setIsValidPhone(true)

                    let set = new Set(value.split(''))
                    if (set.size < 8) {
                        setPhoneErrorMessage(phoneErrorMessageTemplate.wrongNumber)
                        setIsValidPhone(false)
                    }
                }
                // if (phoneRegexp.test(value)) {
                //     setIsValidPhone(true)
                // } else {
                //     setIsValidPhone(false)
                // }
                break;
            case "mail":
                if (mailRegexp.test(value)) {
                    setIsValidMail(true)
                } else {
                    setIsValidMail(false)
                }
                break;
            default:
                break
        }

    }

    const redirect = () => {
        if (errors.errorCode === 107) {
            history.push('/registration-existing-account-notification')
        } else {
            history.push('/registration-refusal')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const date = new Date(registerDate).toISOString()

        dispatch(RegistrationActionCreators.setUserData({
            firstName: name,
            lastName: surname,
            middleName: middlename,
            birthDate: date,
            email: mail,
            phone: phone
        }))

        dispatch(createTempContactThunk({
            refSources: '',
            firstName: name,
            lastName: surname,
            middleName: middlename,
            birthDate: date,
            email: mail,
            phone: phone
        })).then(res => {
            if (res.data.result) {
                dispatch(RegistrationActionCreators.setRegistrationCodes({
                    tempUserId: res.data.tempUserId,
                    codeId: res.data.codeId,
                    genderId
                }))
                history.push('/registration-number-confirmation')
            } else {
                redirect()
            }
        })
    }

    return (
        <main className="page-registration">
            <form className="form" onSubmit={handleSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 registration-col">
                            <div className="h1 md-hide">Заполнение заявки займет 5 минут</div>
                            <div className="h3 md-hide">Быстрая регистрация через:</div>
                            <div className="login">
                                <a href="#" className="img">
                                    <img src={servisesIcon} alt="servisesIcon"/>
                                    <span className="md-hide">Войти</span>
                                    <span className="md-visible">Регистрация через Госулуги</span>
                                </a>
                                <ul className="login-list md-hide">
                                    <li>- Автоматическое заполнение анкеты</li>
                                    <li>- Увеличенный шанс одобрения на 30%</li>
                                    <li>- Получите на 5000 рублей больше</li>
                                </ul>
                            </div>
                            <ul className="form-list">
                                <li className={isValidSurname ? "item success auto-complete" : "item auto-complete"}>
                                    <label className="form-group has-float-label">
                                        <label htmlFor="item-input-surname" className="d-none">Фамилия</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={surname}
                                            id="item-input-surname"
                                            onChange={handleSurnameChange}
                                            placeholder="Фамилия"
                                            autoComplete="off"
                                            onBlur={() => {
                                                setCompletionsVisible({...completionsVisible, lastNameReg: false})
                                            }}
                                        />
                                        <span>Фамилия</span>
                                        <ul className={`completions ${completionsVisible.lastNameReg ? '' : 'inactive'}`}>
                                            {lastNameCompletions ? lastNameCompletions.map((item, idx) => (
                                                <li key={item.value + idx} onClick={() => {
                                                    setSurName(item.value)
                                                }}>{item.value}</li>
                                            )) : null}
                                        </ul>
                                    </label>
                                    {(surname !== "" && !isValidSurname) &&
                                    <div className="error-text">Только символы русского алфавита</div>}
                                </li>
                                <li className={isValidName ? "item success auto-complete" : "item auto-complete"}>
                                    <label className="form-group has-float-label">
                                        <label htmlFor="item-input-name" className="d-none">Имя</label>
                                        <input
                                            className="form-control"
                                            onChange={handleNameChange}
                                            type="text"
                                            value={name}
                                            id="item-input-name"
                                            placeholder="Имя"
                                            autoComplete="off"
                                            onBlur={() => {
                                                setCompletionsVisible({...completionsVisible, firstNameReg: false})
                                            }}
                                        />
                                        <span>Имя</span>
                                        <ul className={`completions ${completionsVisible.firstNameReg ? '' : 'inactive'}`}>
                                            {firstNameCompletions ? firstNameCompletions.map((item, idx) => (
                                                <li key={item.value + idx} onClick={() => {
                                                    setName(item.value)
                                                    handleGender(item)
                                                }}>{item.value}</li>
                                            )) : null}
                                        </ul>
                                    </label>
                                    {(name !== "" && !isValidName) &&
                                    <div className="error-text">Только символы русского алфавита</div>}
                                </li>
                                <li className={isValidMiddlename ? "item success  auto-complete" : "item  auto-complete"}>
                                    <label className="form-group has-float-label">
                                    <label htmlFor="item-input-middlename" className="d-none">Отчество</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={middlename}
                                        id="item-input-middlename"
                                        placeholder="Отчество"
                                        onChange={handleMiddlenameChange}
                                        disabled={noMiddlename}
                                        autoComplete="off"
                                        onBlur={() => {
                                            setCompletionsVisible({...completionsVisible, middleNameReg: false})
                                        }}
                                    />
                                        <span>Отчество</span>
                                    <ul className={`completions ${completionsVisible.middleNameReg ? '' : 'inactive'}`}>
                                        {middleNameCompletions ? middleNameCompletions.map((item, idx) => (
                                            <li key={item.value + idx} onClick={() => {
                                                setMiddlename(item.value)
                                            }}>{item.value}</li>
                                        )) : null}
                                    </ul>
                                    </label>
                                    {(middlename !== "" && !isValidMiddlename) &&
                                    <div className="error-text">Только символы русского алфавита</div>}
                                </li>
                                <li className="item ">
                                    <input
                                        type="checkbox"
                                        checked={noMiddlename}
                                        onChange={handleNoMiddlenameChange}
                                        id="item-input-checkbox"
                                        className="checkbox"
                                    />
                                    <label htmlFor="item-input-checkbox">Нет отчества</label>
                                </li>
                                <li className="item ">
                                    <label className="form-group has-float-label">
                                        <label htmlFor="datepicker" translate="no" className="d-none">Дата
                                            рождения</label>
                                        <input type="date" id="datepicker"
                                               onChange={handleRegisterDateChange}
                                               className="datepicker-ru form-control"
                                               placeholder=" "
                                               value={registerDate}/>
                                        <span>Дата рождения</span>
                                    </label>
                                </li>
                                <li
                                    className={`item ${isValidPhone ? "success" : ""} ${wrongSecondSignErrorMessage ? "wrong-second" : ""}`}
                                >
                                    <label className="form-group has-float-label ">
                                        <label htmlFor="item-input-phone" className="d-none">Телефон</label>
                                        <InputMask id="item-input-phone"
                                                   onChange={handlePhoneChange}
                                                   value={phone}
                                                   className="form-control phone"
                                                   placeholder="+7 (999) 999-99-99"
                                                   mask="*9 (999) 999 99 99"
                                                   maskChar={null}
                                                   formatChars={formatChars}
                                                   beforeMaskedValueChange={beforeMaskedValueChangeHandler}
                                        />
                                        <span>Телефон</span>
                                    </label>
                                    {!isValidPhone && <div className="error-text">{phoneErrorMessage}</div>}
                                    {wrongSecondSignErrorMessage &&
                                    <div className="error-text">Вторая цифра номера отлична от 9</div>}
                                </li>

                                <li className={isValidMail ? "item success" : "item"}>
                                    <label className="form-group has-float-label">
                                        <label htmlFor="item-input-email" className="d-none">Почта</label>
                                        <input type="text" id="item-input-email" value={mail}
                                               onChange={handleMailChange}
                                               className="form-control"
                                               placeholder="Example@gmail.com"/>
                                        <span>Почта</span>
                                    </label>
                                    {(mail !== "" && !isValidMail) &&
                                    <div className="error-text">Неправильный формат почты</div>}
                                </li>

                                <li className="item">
                                    <button
                                        className={`btn btn_blue ${checkFormFields() ? 'disabled' : ''}`}
                                        type="submit"
                                    >
                                        Далее
                                    </button>
                                </li>

                                <li className="item item-checkbox">
                                    <input type="checkbox" id="item-input-checkbox-2" className="checkbox"/>
                                    <label htmlFor="item-input-checkbox-2">
                                        Я присоединяюсь к Соглашению об использовании аналога собственноручной
                                        подписи и подтверждаю, что ознакомился и согласен с документами
                                    </label>
                                    {
                                        isOpenedList ?
                                            <button
                                                className="check-grey"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    setIsOpenedList(false)
                                                }}>
                                                <img src={checkGrey} alt="checkGrey"/>
                                            </button>
                                            :
                                            <button
                                                className="check-grey active"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    setIsOpenedList(true)
                                                }}>
                                                <img className="check-grey-rotated" src={checkGrey} alt="checkGrey"/>
                                            </button>
                                    }
                                </li>
                                <li className={isOpenedList ? "item-checkbox active" : "item-checkbox hide"}>
                                    <ul className="item-checkbox-list">
                                        <li className="item ">
                                            <input type="checkbox" id="item-input-checkbox-2-1" className="checkbox"
                                            />
                                            <label htmlFor="item-input-checkbox-2-1">
                                                Правилами обработки персональных данных <br/>и иной информации
                                            </label>
                                        </li>
                                        <li className="item ">
                                            <input type="checkbox" id="item-input-checkbox-2-2" className="checkbox"
                                            />
                                            <label htmlFor="item-input-checkbox-2-2">
                                                Согласие субъекта на обработку персональных данных
                                            </label>
                                        </li>
                                        <li className="item ">
                                            <input type="checkbox" id="item-input-checkbox-2-3" className="checkbox"
                                            />
                                            <label htmlFor="item-input-checkbox-2-3">
                                                Правилами предоставления займов
                                            </label>
                                        </li>
                                        <li className="item ">
                                            <input type="checkbox" id="item-input-checkbox-2-4" className="checkbox"
                                            />
                                            <label htmlFor="item-input-checkbox-2-4">
                                                Общими условиями договора потребительского займа
                                            </label>
                                        </li>
                                        <li className="item ">
                                            <input type="checkbox" id="item-input-checkbox-2-5" className="checkbox"
                                            />
                                            <label htmlFor="item-input-checkbox-2-5">
                                                Правилами комплексного обслуживания
                                            </label>
                                        </li>
                                        <li className="item ">
                                            <input type="checkbox" id="item-input-checkbox-2-6" className="checkbox"
                                            />
                                            <label htmlFor="item-input-checkbox-2-6">
                                                Информацией об условиях предоставления, <br/>использования и возврата
                                                потребительского микрозайма
                                            </label>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>


                        <div className="col-md-4 sidebar-col md-hide">
                            <div className="h2">
                                <ul className="calc-btn">
                                    <li className="pluse">+</li>
                                    <li className="minuse">-</li>
                                    <li className="multiply">*</li>
                                    <li className="exactly">=</li>
                                </ul>
                                <span>Онлайн калькулятор заявки</span>
                            </div>
                            <ul className="form-list">
                                <li className="item">
                                    <label htmlFor="item-input-loan-amount" className="label">Сумма займа</label>
                                    <input type="text" value={loan} id="item-input-loan-amount"/>
                                    <div className="rub">₽</div>
                                </li>
                                <li className="item progressbar">
                                    <input defaultValue={0} type="range"
                                           onChange={e => {
                                               setLoan(e.currentTarget.value * 150)
                                               dispatch(LoanActionCreators.setLoanAmount(e.currentTarget.value * 150))
                                           }}/>
                                </li>
                                <li className="item">
                                    <ul className="item_list">
                                        <li>1 000</li>
                                        <li>5 000</li>
                                        <li>10 000</li>
                                        <li>15 000</li>
                                    </ul>
                                </li>
                                <li className="item item-data">
                                    <label htmlFor="item-input-loan-term" className="label">Срок</label>
                                    <input type="text" value={`${date} дней`} id="item-input-loan-term"/>
                                </li>
                                <li className="item progressbar">
                                    <input defaultValue={0} type="range"
                                           onChange={e => {
                                               setDate(Math.floor(e.currentTarget.value * 1.68))
                                               dispatch(LoanActionCreators.setTermAmount(Math.floor(e.currentTarget.value * 1.68)))
                                           }}/>
                                </li>
                                <li className="item">
                                    <ul className="item_list">
                                        <li>7 дней</li>
                                        <li>16 нед.</li>
                                        <li>24 нед.</li>
                                    </ul>
                                </li>

                                <li className="item item_sum">
                                    <ul className="item_list">
                                        <li>
                                            <span>Сумма к возврату:</span>
                                            <div className="green">{amounts.refundAmount} Р</div>
                                        </li>
                                        <li>
                                            <span>Сумма переплаты:</span>
                                            <div className="green">{amounts.overpaymentAmount} Р</div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    );
};
