import React, {useState, useEffect} from 'react';
import InputMask from "react-input-mask";
import {useSelector, useDispatch} from "react-redux";
import {findCitiesThunk, sendWorkDataThunk} from '../../server/thunks/thunks';
import {AccountApi, DictionariesApi, documentRulesApi, OfferApi, PassportApi} from "../../server/agent";
import {getDictionariesThunk} from "../../server/thunks/thunks";
import {useHistory} from "react-router-dom";
import {CustomSelect} from "../../ui/CustomSelect";
import {ProgressBarCreators} from "../../store/action-creators";

export const NewApplicationPlaceWork = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const dictionaries = useSelector(state => state.newFormReducer?.dictionaries);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isRetiredOrSelfEmployed, setIsRetiredOrSelfEmployed] = useState(false);
    const [contactCompanyName, setContactCompanyName] = useState("");
    const [partySuggestions, setPartySuggestions] = useState(null);
    const [companyCompletionsVisible, setCompanyCompletionsVisible] = useState(false);
    const [jobTitle, setJobTitle] = useState('');
    const [workAddress, setWorkAddress] = useState('');
    const [busynessId, setBusynessId] = useState("543073ab-0484-48d1-91f7-36e521c0142b");
    const [workPhone, setWorkPhone] = useState('')
    const [wrongSecondSignErrorMessage, setWrongSecondSignErrorMessage] = useState(false);
    const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
    const [stagePeriodId, setStagePeriodId] = useState("e91a7c15-dfdb-4764-a910-97f16915c133");
    const [sumAverageMonthEarning, setSumAverageMonthEarning] = useState('');
    const [profitSourceId, setProfitSourceId] = useState('fd0212ce-6b7d-4371-a1ee-72bf9edbe5a8');

    const phoneErrorMessageTemplate = {
        wronglength: 'Неверное количество знаков',
        wrongNumber: 'введите корректный номер'
    }


    let workAddressCompletions = useSelector((state) => state.newFormReducer.completions.workAddress ? state.newFormReducer.completions.workAddress : null);
    const[workAddressVisible, setWorkAddressVisisble] = useState(false)
    const [businessOptions, setBusinessOptions] = useState([])


    useEffect(() => {
        dispatch(ProgressBarCreators.setPercent({
            percent: 40,
            greenStripe: 45,
            lightGreenStripe: 70
        }))
    }, [])

    // useEffect(()=> {
    //     const fetchData = async () => {
    //         const fetchedOptions = await PassportApi.getBusinessOptions();
    //         setBusinessOptions(fetchedOptions.data.busynessTypes)
    //         setLoading(false)
    //     };
    //     fetchData();
    // }, [])

    useEffect(() => {
        if (dictionaries.length === 0) {
            dispatch(getDictionariesThunk())
        }
    }, [dictionaries])

    /*useEffect(()=> {
        PassportApi.getWorkData()
            .then(res => setData(res.data))
    }, [])*/

    useEffect(() => {
        if (data) {
            setIsRetiredOrSelfEmployed(data?.isRetiredOrSelfEmployed)
            setContactCompanyName(data?.contactCompanyName);
            setJobTitle(data?.jobTitle);
            setWorkAddress(data?.workAddress);
            setBusynessId(data?.busyness?.id);
            setWorkPhone(data?.workPhone);
            setStagePeriodId(data?.stagePeriod?.id);
            setSumAverageMonthEarning(data?.sumAverageMonthEarning);
            setProfitSourceId(data?.incomeSource?.id)
        }
    }, [data])


    const [isValidPhone, setIsValidPhone] = useState(true);
    const [isValidIncome, setIsValidIncome] = useState(true);

    const getBusynessOptions = () => {
        // PassportApi.getBusinessOptions().then(res => setBusinessOptions(res.data.busynessTypes))
        const dict = dictionaries?.busyness?.map(i => {
            return {label: i.name, value: i.id}
        })
        return dict
    }

    const getProfitOptions = () => {
        const dict = dictionaries?.incomeSource?.map(i => {
            return {label: i.name, value: i.id}
        })
        return dict
    }


    const getStagePeriodOptions = () => {
        const dict = dictionaries?.stagePeriod?.map(i => {
            return {label: i.name, value: i.id}
        })
        return dict
    }

    const newFormData = useSelector(state => state.newFormReducer);

    const checkValid = (type, value) => {
        const phoneRegexp = /^(()+([0-9]){10})$/;

        switch (type) {
            case "phone":
                if (phoneRegexp.test(workPhone)) {
                    setIsValidPhone(true)
                } else {
                    setIsValidPhone(false)
                }
                break;

            default:
                break
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


    const handlePhone = (e) => {
        if (workPhone.length === 0 && e.target.value !== '+') {
            setWorkPhone('+7')
        } else if (workPhone.length === 1 && (e.nativeEvent.data !== '7')) {
            if (e.nativeEvent.data !== null) {
                setWorkPhone('+7')
            } else {
                setWorkPhone('')
            }
        } else {
            setWorkPhone(e.target.value)
        }


        if (e.target.value.length >= 4 && e.target.value[4] !== '9') {
            setWrongSecondSignErrorMessage(true)
        } else {
            setWrongSecondSignErrorMessage(false)
        }

        if (e.target.value.length < 18) {
            setPhoneErrorMessage(phoneErrorMessageTemplate.wronglength)
            setIsValidPhone(false)
        } else {
            setIsValidPhone(true)

            let set = new Set(e.target.value.split(''))
            if (set.size < 8) {
                setPhoneErrorMessage(phoneErrorMessageTemplate.wrongNumber)
                setIsValidPhone(false)
            }
        }
    }


    const handleIncomeChange = async (value) => {
        // const incomeRegexp = /^\d{3,6}([\.\,]\d{1,2})?$/;
        // if(incomeRegexp.test(value)) {
        //     setIsValidIncome(true)
        // } else {
        //     setIsValidIncome(false)
        // }

        setSumAverageMonthEarning(value);

        if (value.length < 5 || value.length > 7) {
            setIsValidIncome(false)
        } else {
            setIsValidIncome(true)
        }
    }

    const handleContactCompanyName = (name, dataObj = null) => {
        setContactCompanyName(name);
        if (name.length > 2) {
            PassportApi.getParty(name).then(res => {
                setPartySuggestions(res?.daDataResult?.suggestions)
            })
        }
        if (dataObj) {
            setWorkAddress(dataObj.address?.value)
        }
    }

    const handleBusinessId = event => {
        setBusynessId(event.value);
        const incomeOptions = getProfitOptions();
        const label = event.label;
        if (label === 'Пенсионер') {
            const option = incomeOptions.find(opt => opt.label === 'Пенсия');
            setProfitSourceId(option.value)
        } else if (label === 'Студент') {
            const option = incomeOptions.find(opt => opt.label === 'Стипендия');
            setProfitSourceId(option.value)
        } else if (label === 'Прочее'|| label === 'Безработный' || label === 'Иждивенец') {
            setProfitSourceId('')
        } else {
            const option = incomeOptions.find(opt => opt.label === 'Заработная плата');
            setProfitSourceId(option.value)
        }
    }

    const handleProfiteSourceId = event => {
        setProfitSourceId(event.value)
    }

    const handleStagePeriodId = event => {
        setStagePeriodId(event.value)
    }

    const handleWorkAddress = (item) => {
        setWorkAddress(item.value)
    }

    const convertNumber = (number) => {
        let r = /([0-9])+/g, arr = number.match(r), res, str = arr.join('');
        if (number.substr(0, 1) === '+') {
            res = "" + str;
        } else if (str.substr(0, 1) === '8') {
            res = "7" + str.substr(1);
        } else {
            res = str;
        }
        return res;
    }

    const sendPlaceWorkData = (e) => {
        e.preventDefault()
        dispatch(sendWorkDataThunk({
            applicationId: "20C60AA1-55AB-4AEF-9DBE-BC8D5020544D",
            isRetiredOrSelfEmployed,
            contactCompanyName,
            jobTitle,
            workAddress,
            busynessId,
            workPhone: convertNumber(workPhone),
            stagePeriodId,
            sumAverageMonthEarning,
            profitSourceId
        }))
        history.push("/new_application-number-confirmation");
    }

    const checkFormFields = () => {
        const formFields = {
            contactCompanyName,
            jobTitle,
            workAddress,
            workPhone,
            sumAverageMonthEarning
        }

        const fieldsValidations = {
            isValidIncome,
            isValidPhone
        }

        const emptyFields = Object.keys(formFields).some(p => formFields[p] === '');
        const fieldsWithErrors = Object.keys(fieldsValidations).some(p => fieldsValidations[p] === false);


        return isRetiredOrSelfEmployed
            ? sumAverageMonthEarning === '' || isValidIncome === false
            : emptyFields || fieldsWithErrors
    }

    checkFormFields()

    return (
        <main className="page-registration">
            <form action="" className="form" onSubmit={sendPlaceWorkData}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 registration-col">
                            <div className="h1 md-hide">Укажите место работы и доход</div>
                            <ul className="form-list form-list--place-work">
                                <li className="item ">
                                    <input onChange={e => setIsRetiredOrSelfEmployed(e.currentTarget.checked)}
                                           type="checkbox"
                                           id="address-income" className="checkbox" checked={isRetiredOrSelfEmployed}
                                    />
                                    <label htmlFor="address-income">Пенсионер или самозанятый</label>
                                </li>
                                {!isRetiredOrSelfEmployed ?
                                    <>
                                        <li className="item auto-complete">
                                            <label className="form-group has-float-label">
                                                <label htmlFor="name-organization" className="d-none">Название
                                                    организации</label>
                                                <input type="text"
                                                       id="name-organization"
                                                       className="form-control"
                                                       autoComplete="off" value={contactCompanyName}
                                                       onChange={(e) => handleContactCompanyName(e.target.value)}
                                                       onFocus={() => setCompanyCompletionsVisible(true)}
                                                       onBlur={() => setCompanyCompletionsVisible(false)}
                                                       // placeholder="ООО “Алкис”"
                                                        placeholder=" "
                                                />
                                                <span>Название организации</span>
                                                <ul className={`completions ${companyCompletionsVisible ? '' : 'inactive'}`}>
                                                    {partySuggestions?.map(item => (
                                                      <li key={item.value?.data?.inn}
                                                          onClick={() => handleContactCompanyName(item.value, item.data)}>{item.value}</li>
                                                    ))}
                                                </ul>
                                            </label>
                                        </li>

                                        <li className="item ">
                                            <label className="form-group has-float-label">
                                                <label htmlFor="trainer" className="d-none">Должность</label>
                                                <input onChange={e => setJobTitle(e.currentTarget.value)} type="text"
                                                       // placeholder="Тренер"
                                                       placeholder=" "
                                                       className="form-control"
                                                       id="trainer"
                                                       value={jobTitle}/>
                                                <span>Должность</span>
                                            </label>
                                        </li>
                                        <li className="item auto-complete">
                                            <label className="form-group has-float-label">
                                                <label htmlFor="street" className="d-none">Адрес работы</label>
                                                <input
                                                  onChange={e => {
                                                      setWorkAddress(e.currentTarget.value);
                                                      dispatch(findCitiesThunk('workAddress', e.target.value));
                                                  }}
                                                  type="text"
                                                  // placeholder="Красная площадь"
                                                  placeholder=" "
                                                  className="form-control"
                                                  id="street"
                                                  value={workAddress}
                                                  autoComplete="off"
                                                  onFocus={() => setWorkAddressVisisble(true)}
                                                  onBlur={() => setWorkAddressVisisble(false)}
                                                />
                                                <span>Адрес работы</span>
                                                <ul className={`completions ${workAddressVisible ? '' : 'inactive'}`}>
                                                    {workAddressCompletions ? workAddressCompletions.map(item => (
                                                      <li key={item.value} onClick={() => {
                                                          handleWorkAddress(item)

                                                      }}>{item.value}</li>
                                                    )) : null}
                                                </ul>
                                            </label>
                                        </li>
                                    </>
                                    : null
                                }
                                <li className="item " style={{marginTop: "25px"}}>
                                        <label htmlFor="" className="label" style={{zIndex: 1, top: -5}}>
                                        Занятость
                                    </label>
                                    <div className="select" style={{marginTop: "10px"}}>
                                        {/*{ loading ?*/}
                                        {/*    <span>loading...</span>*/}
                                        {/*    // <CustomSelect*/}
                                        {/*    //     options={[]}*/}
                                        {/*    //     value={busynessId}*/}
                                        {/*    //     onChange={handleBusinessId}*/}
                                        {/*    //     placeholder="Полная"*/}
                                        {/*    // />*/}
                                        {/*    :*/}
                                        {/*    <CustomSelect*/}
                                        {/*        options={businessOptions}*/}
                                        {/*        value={busynessId}*/}
                                        {/*        onChange={handleBusinessId}*/}
                                        {/*        placeholder="Полная"*/}
                                        {/*    />*/}
                                        {/*}*/}
                                        <CustomSelect
                                            options={getBusynessOptions()}
                                            value={busynessId}
                                            onChange={handleBusinessId}
                                            placeholder="Полная"
                                        />
                                    </div>
                                </li>
                                {!isRetiredOrSelfEmployed ?
                                    <>
                                        <li className="item">
                                            <label className="form-group has-float-label">
                                                <label htmlFor="item-input-phone" className="d-none">Телефон</label>
                                                <InputMask className="phone form-control"
                                                           id="item-input-phone"
                                                           // placeholder="+7 (999) 999-99-99"
                                                           placeholder=" "
                                                           value={workPhone}
                                                           onChange={e => {
                                                               handlePhone(e)
                                                           }}
                                                           mask="*9 (999) 999 99 99"
                                                           maskChar={null}
                                                           formatChars={formatChars}
                                                           beforeMaskedValueChange={beforeMaskedValueChangeHandler}
                                                />
                                                <span>Телефон</span>
                                            </label>
                                            {!isValidPhone &&
                                            <div className="error-text">{phoneErrorMessage}</div>}
                                            {wrongSecondSignErrorMessage && <div className="error-text">Вторая цифра номера отлична от 9</div>}
                                        </li>
                                        <li className="item " style={{marginTop: "25px"}}>
                                            <label htmlFor="" className="label" style={{zIndex: 1, top: -5}}>
                                                Стаж на последнем месте (мес.)
                                            </label>
                                            <div className="select" style={{marginTop: "10px"}}>
                                                <CustomSelect
                                                    options={getStagePeriodOptions()}
                                                    value={stagePeriodId}
                                                    onChange={handleStagePeriodId}
                                                    placeholder="1-2 месяца"
                                                />
                                            </div>
                                        </li>
                                    </>
                                    : null
                                }

                                <li className="item ">
                                    <label className="form-group has-float-label">
                                        <label htmlFor="income" className="d-none">Среднемесячный доход</label>
                                        <InputMask
                                          className="phone form-control"
                                          id="income"
                                          // placeholder='10000'
                                          placeholder=' '
                                          mask="999999"
                                          maskChar={null}
                                          onChange={e => handleIncomeChange(e.currentTarget.value)}
                                          value={sumAverageMonthEarning}/>
                                        <span>Среднемесячный доход</span>
                                    </label>
                                    {(Boolean(sumAverageMonthEarning) && !isValidIncome) &&
                                    <div className="error-text">Введите сумму от 1000 до 999999 в формате 999999</div>}
                                </li>

                                <li className="item " style={{marginTop: "25px"}}>
                                    <label htmlFor="" className="label" style={{zIndex: 1, top: -5}}>
                                        Источники дохода
                                    </label>
                                    <div className="select" style={{marginTop: "10px"}}>
                                        <CustomSelect
                                            options={getProfitOptions()}
                                            value={profitSourceId}
                                            onChange={handleProfiteSourceId}
                                            placeholder="аренда"
                                        />
                                    </div>
                                </li>
                                <li className="item item--centered">
                                    <button
                                        disabled={checkFormFields()}
                                        type="submit"
                                        className={`btn btn_blue ${checkFormFields() ? 'disabled' : ''}`}
                                    >
                                        Далее
                                    </button>

                                </li>


                            </ul>
                        </div>


                    </div>
                </div>
            </form>
        </main>
    );
};
