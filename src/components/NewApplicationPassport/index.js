import React, {useEffect, useRef, useState} from 'react';
import InputMask from "react-input-mask";
import {useHistory} from "react-router-dom";

import eye from '../../img/eye.png'

import {useDispatch, useSelector} from "react-redux";
import {findCitiesThunk, sendPassportThunk} from "../../server/thunks/thunks";
import {newFormReducer} from "../../store/reducers/newform-reducer";
import NavLink from "react-router-dom/es/NavLink";
import {OfferApi, PassportApi} from "../../server/agent";
import {getDictionariesThunk} from "../../server/thunks/thunks";
import {NewFormActionCreators, ProgressBarCreators} from "../../store/action-creators";
import {CustomSelect} from "../../ui/CustomSelect";
import CustomTooltip from "../../ui/CustomTooltip";
import questions from "../../img/svg/questions.svg";


export const NewApplicationPassport = () => {
    const [passData, setPassData] = useState([]);
    const [showPass, setShowPass] = useState(false);
    const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
    const [wrongSecondSignErrorMessage, setWrongSecondSignErrorMessage] = useState(false);
    const [phone, setPhone] = useState('')
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [passNumber, setPassNumber] = useState('');
    const [isPassNumberValid, setIsPassNumberValid] = useState(true);
    const [passportIssueErrorMessage, setPassportIssueErrorMessage] = useState('Неверная дата');
    const [passSeries, setPassSeries] = useState('');
    const [isPassSeriesValid, setIsPassSeriesValid] = useState(true);
    const [dateOfIssue, setDateOfIssue] = useState('2010-02-12');
    const [isDateOfIssueValid, setIsDateOfIssueValid] = useState(true);
    const [departmentCode, setDepartmentCode] = useState('');
    const [isDepartmentCodeValid, setIsDepartmentCodeValid] = useState(true);
    const [passIssuedBy, setPassIssuedBy] = useState('');
    const [issuedBySuggestions, setIssuedBySuggestions] = useState([]);
    const [isIssuedBySuggestionsVisible, setIsIssuedBySuggestionsVisible] = useState(false);
    const [birthPlace, setBirthPlace] = useState('');
    const [isAssignment, setIsAssignment] = useState('');
    const [agreeText, setAgreeText] = useState('');
    const [gender, setGender] = useState('');
    const [code, setCode] = useState('');
    const [isCodeValid, setIsCodeValid] = useState(true);
    const [snils, setSnils] = useState('');
    const [isSnilsValid, setIsSnilsValid] = useState(true)
    const [snilsErrorMessage, setSnilsErrorMessage] = useState('Неверное количество знаков')

    const phoneErrorMessageTemplate = {
        wrongLength: 'Неверное количество знаков',
        wrongNumber: 'введите корректный номер'
    }

    const newFormData = useSelector(state => state.newFormReducer);

    const dispatch = useDispatch();
    const history = useHistory();
    const dictionaries = useSelector(state => state.newFormReducer?.dictionaries);

    useEffect(() => {
        dispatch(ProgressBarCreators.setPercent({
            percent: 10,
            greenStripe: 10,
            lightGreenStripe: 50
        }))
    }, [])

    useEffect(() => {
        dispatch(getDictionariesThunk())
    }, [])

    useEffect(() => {
            const fetchData = async () => {
                const result = await PassportApi.getPassportData();
                const data = result.data;

                setPassSeries(data.series);
                setPassNumber(data.number);
                setSnils(data.snils);
                if (data.issuedDate) {
                    setDateOfIssue(data.issuedDate.slice(0, 10))
                }
                setDepartmentCode(data.divisionCode);
                setPassIssuedBy(data.issuedBy);
                setBirthPlace(data.birthPlace);

                if (data.gender) {
                    setGender(data.gender.id);
                }
                setCode(data.codeword);
                setAgreeText(data.agreeText);
                let formatted = data.additionalContactPersonPhone;
                formatted = formatted.replaceAll(/[_\s()-]/g, '');
                setPhone(formatted)
                setPassData(data);
                if (data.applicationId) {
                    dispatch(NewFormActionCreators.setApplicationId(data?.applicationId))
                }
            };

            fetchData();
    }, [])

    const handleBirthPlaceChange = (event) => {
        setBirthPlace(event.target.value);


        // dispatch(findCitiesThunk('birthPlace', event.target.value));
    }

    const completions = useSelector((state) => state.newFormReducer.completions.birthPlace ? state.newFormReducer.completions.birthPlace : null);
    const [completionsVisible, setCompletionsVisible] = useState(false);

    const setAssignment = val => {
        setIsAssignment(val)
    }

    const setNewGender = event => {
        setGender(event.value)
    }

    const getGenderOptions = () => {
        const dict = dictionaries?.gender?.map(i => {
            return {label: i.name, value: i.id}
        })
        return dict
    }


    const handleSetPassSeries = (value) => {
        setPassSeries(value)
        if (value.length < 4) {
            setIsPassSeriesValid(false)
        } else {
            setIsPassSeriesValid(true)
        }
    }

    const handlePassportDate = (e) => {
        let date = new Date(e.target.value)
        if (date < new Date() || e.target.value === '') {
            setDateOfIssue(String(e.currentTarget.value))
        }
        // setIsDateOfIssueValid(date < new Date() && date > new Date(1995, 0, 1));

        PassportApi.checkPassportDate(date.toISOString()).then(res => {
            if (res.result === false) {
                setPassportIssueErrorMessage(res.errorMessage)
                setIsDateOfIssueValid(false)
            } else {
                setPassportIssueErrorMessage('Неверная дата')
                setIsDateOfIssueValid(true)
            }
        })
    }

    const handlePassNumber = (value) => {
        setPassNumber(value)
        if (value.length < 6) {
            setIsPassNumberValid(false)
        } else {
            setIsPassNumberValid(true)
        }
    }

    const handleDepartmentCode = (code) => {
        setDepartmentCode(code)
        if (code.length < 3) {
            setIsDepartmentCodeValid(false)
        } else if (code.length === 7) {
            PassportApi.findFms({inputString: code})
                .then(res => {
                    setIssuedBySuggestions(res?.daDataResult?.suggestions)
                    setIsIssuedBySuggestionsVisible(true)
                })
            setIsDepartmentCodeValid(true)
        } else if (code.length >= 3) {
            PassportApi.findFms({inputString: code})
                .then(res => {
                setIssuedBySuggestions(res?.daDataResult?.suggestions)
                setIsIssuedBySuggestionsVisible(true)
            })
        }
    }

    const handleSnils = (snils) => {
        setSnils(snils)
        if (snils.length < 14) {
            setSnilsErrorMessage('Неверное количество знаков')
            setIsSnilsValid(false)
        } else {
            PassportApi.checkSnils(snils).then(res => {
                if (res.result === true) {
                    setIsSnilsValid(true)
                } else {
                    setSnilsErrorMessage('введите корректный СНИЛС')
                    setIsSnilsValid(false)
                }
            })
        }
    }

    const handlePhone = (e) => {
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

        if (e.target.value.length >= 4 && e.target.value[4] !== '9') {
            setWrongSecondSignErrorMessage(true)
        }

        if (e.target.value.length < 18) {
            setPhoneErrorMessage(phoneErrorMessageTemplate.wrongLength)
            setIsPhoneValid(false)
        } else {
            setIsPhoneValid(true)

            let set = new Set(e.target.value.split(''))
            if (set.size < 8) {
                setPhoneErrorMessage(phoneErrorMessageTemplate.wrongNumber)
                setIsPhoneValid(false)
            }
        }
    }

    const handleCode = (value) => {
        setCode(value)
        const regexCode = /^[-а-яА-ЯёЁ0-9-()]+(\s+[-а-яА-ЯёЁ0-9-()]+)*$/ // регулярка проверяет пробелы вначале и в конце строки, а также кириллицу и цифры

        if (value.length > 5 && value.length < 50 && regexCode.test(value)){
            setIsCodeValid(true)
        } else {
            setIsCodeValid(false)
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

    const handleLinkClick = () => {
        history.push("/new_application-additional-questions")
    }
    const applicationId = useSelector(state => state.newFormReducer.applicationId);
    const sendPassport = (e) => {
        e.preventDefault();

        dispatch(sendPassportThunk({
            applicationId,
            series: passSeries,
            number: passNumber,
            issuedBy: passIssuedBy,
            issuedDate: dateOfIssue,
            snils,
            birthPlace,
            divisionCode: departmentCode,
            genderId: gender,
            codeword: code,
            additionalContactPersonPhone: phone
        }))
        history.push("/new_application-address");
    }

    const checkFormFields = () => {
        const formFields = {
            passSeries,
            passNumber,
            passIssuedBy,
            dateOfIssue,
            snils,
            birthPlace,
            departmentCode,
            gender,
            phone,
            code
        }
        const fieldsValidations = {
            isPhoneValid,
            isPassNumberValid,
            isPassSeriesValid,
            isDateOfIssueValid,
            isDepartmentCodeValid,
            isSnilsValid,
            isCodeValid
        }

        const emptyFields = Object.keys(formFields).some(p => formFields[p] === '');
        const fieldsWithErrors = Object.keys(fieldsValidations).some(p => fieldsValidations[p] === false);

        return emptyFields || fieldsWithErrors || !isAssignment
    }

    return (
        <main className="page-registration">
            <form action="" className="form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 registration-col">
                            <div className="h1 md-hide">Укажите паспортные данные</div>
                            <ul className="form-list form-list--passport">
                                <li className=" ">
                                    <ul className="pessword_data">
                                        <li className="item ">
                                            <label className="form-group has-float-label">
                                                <label htmlFor="passport-1" className="d-none">Серия паспорта</label>
                                                <InputMask className="phone form-control"
                                                           onChange={e => handleSetPassSeries(e.currentTarget.value)}
                                                           placeholder="0000" value={passSeries} id="passport-1"
                                                           mask="9999"
                                                           maskChar={null}
                                                />
                                                <span>Серия паспорта</span>
                                            </label>
                                            {!isPassSeriesValid &&
                                            <div className="error-text">Неверное количество знаков</div>}
                                        </li>
                                        <li className="item ">
                                            <label className="form-group has-float-label">
                                                <label htmlFor="passport-2" className="d-none">Номер паспорта</label>
                                                <InputMask className="phone form-control" placeholder="000000" value={passNumber}
                                                           onChange={e => handlePassNumber(e.currentTarget.value)}
                                                           id="passport-2"
                                                           mask="999999"
                                                           maskChar={null}
                                                />
                                                <span>Номер паспорта</span>
                                            </label>
                                            {!isPassNumberValid &&
                                            <div className="error-text">Неверное количество знаков</div>}
                                        </li>
                                        <li className="item ">
                                            <label className="form-group has-float-label">
                                                <label htmlFor="datepicker" className="d-none">Дата выдачи</label>
                                                <input type="date" id="datepicker" className="datepicker-ru form-control"
                                                       placeholder="12.02.2010" value={dateOfIssue}
                                                       onChange={handlePassportDate}
                                                />
                                                <span>Дата выдачи</span>
                                            </label>
                                            {!isDateOfIssueValid ?
                                                <div className="error-text">{passportIssueErrorMessage}</div> : null}
                                        </li>
                                        <li className="item ">
                                            <label className="form-group has-float-label">
                                                <label htmlFor="passport-4" className="d-none">Код подразделения</label>
                                                <InputMask className="phone form-control"
                                                           onChange={e => handleDepartmentCode(e.currentTarget.value)}
                                                           placeholder="322-233"
                                                           id="passport-4"
                                                           value={departmentCode}
                                                           maskChar={null}
                                                           mask="999-999"
                                                />
                                                <span>Код подразделения</span>
                                            </label>
                                            {!isDepartmentCodeValid &&
                                            <div className="error-text">Неверное количество знаков</div>}
                                        </li>
                                    </ul>
                                </li>
                                <li className="item ">
                                    <label className="form-group has-float-label">
                                        <label htmlFor="passport3" className="d-none">СНИЛС</label>
                                        <InputMask className="phone form-control" id="passport-3"
                                                   placeholder="XXX-XXX-XXX YY" value={snils}
                                                   onChange={e => handleSnils(e.currentTarget.value)}
                                                   mask="999-999-999 99"
                                                   maskChar={null}
                                        />
                                        <span>СНИЛС</span>
                                    </label>
                                    {!isSnilsValid && <div className="error-text">{snilsErrorMessage}</div>}
                                </li>
                                <li className="item ">
                                    {issuedBySuggestions.length === 0 && (
                                        <label className="form-group has-float-label">
                                            <label htmlFor="passport-issued-by" className="d-none">
                                                Кем выдан паспорт
                                            </label>
                                            <input type="text"
                                                   onChange={e => setPassIssuedBy(String(e.currentTarget.value))}
                                                   placeholder="Подразделение"
                                                   value={passIssuedBy}
                                                   id="passport-issued-by"
                                                   className="form-control"
                                            />
                                            <span>Кем выдан паспорт</span>
                                        </label>
                                    )}
                                    {issuedBySuggestions.length === 1 && (
                                        <label className="form-group has-float-label">
                                            <label htmlFor="passport-issued-by" className="d-none">
                                                Кем выдан паспорт
                                            </label>
                                            <input type="text"
                                              //onChange={e => setPassIssuedBy(String(e.currentTarget.value))}
                                                   placeholder={issuedBySuggestions[0].value}
                                                   value={issuedBySuggestions[0].value}
                                                   id="passport-issued-by"
                                                   disabled
                                                   className="form-control"
                                            />
                                            <span>Кем выдан паспорт</span>
                                        </label>
                                    )}
                                    {issuedBySuggestions.length > 1 && (
                                        <li className="item auto-complete">
                                            <label className="form-group has-float-label">
                                                <label htmlFor="place-birth" className="d-none">Кем выдан паспорт</label>
                                                <input type="text" id="place-birth" autoComplete="off" value={passIssuedBy}
                                                       onChange={(e) => setPassIssuedBy(e.target.value)}
                                                       onFocus={() => setIsIssuedBySuggestionsVisible(true)}
                                                       onBlur={() => setIsIssuedBySuggestionsVisible(false)}
                                                       placeholder={issuedBySuggestions[0].value}/>
                                                <span>Кем выдан паспорт</span>
                                            </label>
                                            <ul className={`completions ${isIssuedBySuggestionsVisible ? '' : 'inactive'}`}>
                                                {issuedBySuggestions.map((item, index) => (
                                                    <li key={index}
                                                        onClick={() => {
                                                            setPassIssuedBy(item.value)
                                                            setIsIssuedBySuggestionsVisible(false)
                                                        }}>
                                                        {item.value}
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    )}
                                </li>
                                <li className="item auto-complete">
                                    <label className="form-group has-float-label">
                                        <label htmlFor="place-birth" className="d-none">Место рождения</label>
                                        <input type="text"
                                               id="place-birth"
                                               onChange={handleBirthPlaceChange}
                                               placeholder="Москва"
                                               className="form-control"
                                          // autoComplete="off"
                                          // value={birthPlace}
                                          // onFocus={() => setCompletionsVisible(true)}
                                          // onBlur={() => setCompletionsVisible(false)}
                                        />
                                        <span>Место рождения</span>
                                        {/*<ul className={`completions ${completionsVisible ? '' : 'inactive'}`}>*/}
                                        {/*    {completions?.map(item => (*/}
                                        {/*      <li key={item.value} onClick={() => setBirthPlace(item.value)}>{item.value}</li>*/}
                                        {/*    ))}*/}
                                        {/*</ul>*/}
                                    </label>
                                </li>
                                <li className="item">
                                    <label className="form-group has-float-label">
                                        <label htmlFor="item-input-phone" className="d-none">Номер контактного лица</label>
                                        <InputMask className="phone form-control"
                                                   id="item-input-phone"
                                                   placeholder="+7 (999) 999-99-99"
                                                   value={phone}
                                                   onChange={e => {
                                                       handlePhone(e)
                                                   }}
                                                   mask="*9 (999) 999 99 99"
                                                   maskChar={null}
                                                   formatChars={formatChars}
                                                   beforeMaskedValueChange={beforeMaskedValueChangeHandler}
                                        />
                                        <span>Номер контактного лица</span>
                                    </label>
                                    {!isPhoneValid && <div className="error-text">{phoneErrorMessage}</div>}
                                    {wrongSecondSignErrorMessage && <div className="error-text">Вторая цифра номера отлична от 9</div>}
                                </li>
                                <li className="item " style={{marginTop: "25px"}}>
                                    <label htmlFor="" className="label" style={{zIndex: 1, top: -5}}>Выберите
                                        пол</label>
                                    <div className="select" style={{marginTop: "10px"}}>
                                        <CustomSelect
                                            options={getGenderOptions()}
                                            value={gender}
                                            onChange={setNewGender}
                                            placeholder="Мужской"
                                        />
                                    </div>
                                </li>

                                <li className="codeword">
                                    <ul className="codeword-in">
                                        <li className="item">
                                            <label htmlFor="password" className="label">Кодовое слово</label>
                                            <input type={showPass ? 'text' : 'password'} id="password"
                                                   className="password"
                                                   onChange={e => handleCode(e.currentTarget.value)}
                                                   value={code}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPass(!showPass)}
                                                className="password-icon"
                                            >
                                                <img src={eye} alt="eye"/>
                                            </button>
                                            {!isCodeValid && code.length > 0 &&  <div className="error-text">Только буквы русского алфавита и цифры</div>}
                                            {!isCodeValid && code.length === 0 && <div className="error-text">Необходимо указать значение</div>}
                                        </li>
                                        <li className="item">
                                            <p>Придумайте кодовое слово для защиты от злоумышленников и дальней безопасности аккаунта</p>
                                        </li>
                                        <li className="item">
                                            <p>Согласен на уступку прав требований по договору</p>
                                            <ul className="radio-list" style={{display: "flex", paddingTop: "10px"}}>
                                                <li
                                                    data-tooltip-md="Согласие на уступку прав требования может повысить вероятность одобрения займа">
                                                    <input
                                                           onChange={() => setAssignment(true)}
                                                           type="radio"
                                                           className="radio"
                                                           id="yes"
                                                           name="yes"
                                                           checked={isAssignment===true}
                                                    />
                                                    <label htmlFor="yes">Да</label>
                                                </li>
                                                <li
                                                    style={{marginLeft: "10px", position: "relative"}}>
                                                    <input
                                                        onChange={() => setAssignment(false)}
                                                        type="radio" className="radio"
                                                        id="no"
                                                        name="no"
                                                        checked={isAssignment===false}
                                                    />
                                                    <label htmlFor="no" data-tip data-for="agreementTooltip">Нет</label>
                                                    <div className="agreement-tooltip">Согласие на уступку прав требования<br /> может&nbsp;повысить вероятность одобрения займа</div>
                                                </li>
                                            </ul>
                                        </li>

                                        <li className="item item--centered">
                                            {
                                                !newFormData.isPassport ?
                                                    <button
                                                        disabled={checkFormFields()}
                                                        className={`btn btn_blue ${checkFormFields() ? 'disabled' : ''}`}
                                                        onClick={e => sendPassport(e)}
                                                        type="submit"
                                                    >
                                                        Далее
                                                    </button>
                                                    : <NavLink
                                                        to={'/new_application-address'}
                                                        onClick={e => sendPassport(e)}
                                                        className={`btn btn_blue ${checkFormFields() ? 'disabled' : ''}`}
                                                    >
                                                        Далее
                                                    </NavLink>
                                            }
                                        </li>
                                        {
                                            !isAssignment &&
                                            <li><p className='passport-error'>Для продолжения - необходимо согласиться с
                                                условиями предоставленния займов</p></li>
                                        }
                                        <li className="item" dangerouslySetInnerHTML={{ __html: agreeText}}>
                                        </li>
                                        {/*<li className="item">*/}
                                        {/*    Нажимая на кнопку «Далее», я подтверждаю указанную дополнительную информацию о себе,*/}
                                        {/*    а также направляю указанные мною сведения о себе для подтверждения их достоверности с использованием единой системы*/}
                                        {/*    межведомственного электронного взаимодействия*/}
                                        {/*</li>*/}
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
