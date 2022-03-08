import React, {useEffect, useRef, useState} from 'react';
import InputMask from "react-input-mask";
import {useHistory} from "react-router-dom";

import eye from '../../../img/eye.png'

import {useDispatch, useSelector} from "react-redux";
import {findCitiesThunk, sendPassportThunk} from "../../../server/thunks/thunks";
import {newFormReducer} from "../../../store/reducers/newform-reducer";
import {PassportApi} from "../../../server/agent";
import {getDictionariesThunk} from "../../../server/thunks/thunks";
import {NewFormActionCreators} from "../../../store/action-creators";
import {CustomSelect} from "../../../ui/CustomSelect";
import handlePhone, {beforeMaskedValueChangeHandler, formatChars} from "../../../helpers/handle-phone";

const PassportDataForm = () => {

    const [passportDataVisible, setPassportDataVisible] = useState(false);

    const [passData, setPassData] = useState([]);
    const [showPass, setShowPass] = useState(false);
    const [phone, setPhone] = useState('')
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
    const [phoneWrongSecondSignErrorMessage, setPhoneWrongSecondSignErrorMessage] = useState(false);
    const [passNumber, setPassNumber] = useState('');
    const [isPassNumberValid, setIsPassNumberValid] = useState(true);
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
    const [gender, setGender] = useState('');
    const [code, setCode] = useState('');
    const [isCodeValid, setIsCodeValid] = useState(true);
    const [snils, setSnils] = useState('');
    const [isSnilsValid, setIsSnilsValid] = useState(true)


    const agreeTextRef = useRef(null);

    const newFormData = useSelector(state => state.newFormReducer);


    const dispatch = useDispatch();
    const history = useHistory();
    const dictionaries = useSelector(state => state.newFormReducer?.dictionaries);

    useEffect(() => {
        dispatch(getDictionariesThunk())
    }, [])

    const getData = async () => {
        PassportApi.getPassportData()
            .then(response => {
                const data = response.data;

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
                    setGender(data.gender.name);
                }
                //setCode(data.codeword);
                //agreeTextRef.current.innerHTML = (data.agreeText);
                let formatted = data.additionalContactPersonPhone;
                formatted = formatted.replaceAll(/[_\s()-]/g, '');
                setPhone(formatted)
                setPassData(data);
                if (data.applicationId) {
                    dispatch(NewFormActionCreators.setApplicationId(data?.applicationId))
                }
            })
     }

     useEffect(() => {
         getData();
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
            setIsSnilsValid(false)
        } else {
            setIsSnilsValid(true)
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

        setPassportDataVisible(false)
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
        <>
            <label className="label">Паспортные данные</label>
            <div className={`reapplication-item ${passportDataVisible ? 'active' : ''}`}>
                <div className="reapplication-item-value">
                    {
                        `${passSeries} ${passNumber} ${passIssuedBy}`
                    }
                </div>
                <a className="reapplication-item-icon" onClick={() => setPassportDataVisible(!passportDataVisible)}></a>
                <form action="" className="reapplication-item-desc">
                    <ul className="form-list">
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
                                        {!isPassSeriesValid &&
                                        <div className="error-text">Неверное количество знаков</div>}
                                    </label>
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
                                        {!isPassNumberValid &&
                                        <div className="error-text">Неверное количество знаков</div>}
                                    </label>
                                </li>
                                <li className="item ">
                                    <label className="form-group has-float-label">
                                        <label htmlFor="datepicker" className="d-none">Дата выдачи</label>
                                        <input
                                            type="date"
                                            id="datepicker"
                                            translate="no"
                                            onChange={e => setDateOfIssue(e.currentTarget.value)}
                                            className={`datepicker-ru form-control`}
                                            value={dateOfIssue}
                                        />
                                        <span>Дата выдачи</span>
                                        {!isDateOfIssueValid ?
                                          <div className="error-text">Неверная дата</div> : null}
                                    </label>
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
                                        {!isDepartmentCodeValid &&
                                        <div className="error-text">Неверное количество знаков</div>}
                                    </label>
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
                                <span>
                                    СНИЛС
                                </span>
                                {!isSnilsValid && <div className="error-text">Неверное количество знаков</div>}
                            </label>
                        </li>
                        <li className="item ">
                            {issuedBySuggestions.length === 0 && (
                                <label className="form-group has-float-label">
                                    <label htmlFor="passport-issued-by" className="d-none">
                                        Кем выдан паспорт
                                    </label>
                                    <input type="text"
                                           onChange={e => setPassIssuedBy(String(e.currentTarget.value))}
                                           placeholder=" "
                                           className="form-control"
                                           value={passIssuedBy}

                                           id="passport-issued-by"
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
                                           className="form-control"
                                           disabled

                                    />
                                    <span>Кем паспорт</span>
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
                                               className="form-control"
                                               placeholder={issuedBySuggestions[0].value}
                                               />
                                        <span>Кем выдан паспорт</span>
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
                                    </label>
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
                                       value={birthPlace}
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
                                <InputMask
                                    className={`form-control`}
                                    value={phone}
                                    placeholder="+7 (999) 999-99-99"
                                    onChange={e => {
                                        handlePhone(e, phone, setPhone, setIsPhoneValid, setPhoneErrorMessage, setPhoneWrongSecondSignErrorMessage)
                                    }}
                                    mask="*9 (999) 999 99 99"
                                    maskChar={null}
                                    formatChars={formatChars}
                                    beforeMaskedValueChange={beforeMaskedValueChangeHandler}
                                />
                                <span>Номер контактного лица</span>
                                {!isPhoneValid && <div className="error-text">{phoneErrorMessage}</div>}
                                {phoneWrongSecondSignErrorMessage && <div className="error-text">Вторая цифра номера отлична от 9</div>}
                            </label>
                        </li>
                        {/*<li className="item">*/}
                        {/*    <label className="form-group has-float-label">*/}
                        {/*        <label htmlFor="gender" className="d-none">*/}
                        {/*            Пол*/}
                        {/*        </label>*/}
                        {/*        <input type="text"*/}
                        {/*               className="form-control"*/}
                        {/*               placeholder=" "*/}
                        {/*               value={gender}*/}

                        {/*               id="gender"*/}
                        {/*        />*/}
                        {/*        <span>Пол</span>*/}
                        {/*    </label>*/}
                        {/*</li>*/}
                        <li className="item">
                            <label htmlFor="" className="label" style={{zIndex: 1, top: -5}}>
                                Пол</label>
                            <div className="select">
                                <CustomSelect
                                    options={getGenderOptions()}
                                    value={gender}
                                    onChange={setNewGender}
                                    placeholder="Мужской"
                                />
                            </div>
                        </li>
                        <li className="item codeword">
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
                            </ul>
                        </li>
                        <li className="item">
                            <ul className="d-flex" style={{marginBottom: 0}}>
                                <li>
                                    <button
                                        className={`btn btn_blue`}
                                        type="submit"
                                    >
                                        Редактировать данные
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`btn btn_border_blue`}
                                        type="button"
                                    >
                                        Выйти без изменений
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
            </form>
            </div>
        </>
    )
}

export default PassportDataForm
