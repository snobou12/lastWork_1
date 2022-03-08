import React, {useEffect, useState} from "react";
import question from "../../img/svg/question.svg";
import {useDispatch, useSelector} from "react-redux";
import {getAdditionalQuestionsDictionary, sendAdditionalQuestions} from "../../server/thunks/thunks";
import {useHistory} from "react-router-dom";
import CustomTooltip from "../../ui/CustomTooltip";
import {CustomSelect} from "../../ui/CustomSelect";
import InputMask from "react-input-mask";
import {PassportApi} from "../../server/agent";
import {ProgressBarCreators} from "../../store/action-creators";

export const NewApplicationAdditionalQuestions = () => {
    const citizenship = "Российская Федерация";

    const [purpOfFinance, setPurpOfFinance] = useState('');
    const [purpOfFinanceAdditional, setPurpOfFinanceAdditional] = useState('');
    const [bankrupcy, setBankrupcy] = useState('no')
    const [claimAim, setClaimAim] = useState('');
    const [claimAimAdditional, setClaimAimAdditional] = useState('');
    const [representativeInformation, setRepresentativeInformation] = useState(
        true
    );
    const [beneficiaries, setBeneficiaries] = useState(true);
    const [beneficialOwners, setBeneficialOwners] = useState(true);
    const [pep, setPep] = useState(true);
    const [pepRelationshipDegree, setPepRelationshipDegree] = useState(true);
    const [aims, setAims] = useState("personal");
    const [
        financialAndEconomicActivities,
        setFinancialAndEconomicActivities,
    ] = useState("no");
    const [financialStatus, setFinancialStatus] = useState("undefined");
    const [reputation, setReputation] = useState("undefined");

    // поля для представителя при выбранном чекбоксе

    const [type, setType] = useState('70450d24-e469-4019-8ed6-a33d9685a0c4')
    const [text, setText] = useState('');
    const [fio, setFio] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [birthPlace, setBirthPlace] = useState('');
    const [passportSeries, setPassportSeries] = useState('');
    const [passportNumber, setPassportNumber] = useState('');
    const [dateOfIssue, setDateOfIssue] = useState('');
    const [departmentCode, setDepartmentCode] = useState('');
    const [passIssuedBy, setPassIssuedBy] = useState('');
    const [migrationNumber, setMigrationNumber] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const [address, setAddress] = useState('');
    const [inn, setInn] = useState('');
    const [snils, setSnils] = useState('');
    const [proxy, setProxy] = useState('');
    const [ogrnip, setOgrnip] = useState('');
    const [addressIP, setAddressIP] = useState('');
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState('');

    // валидации полей

    const [isValidPhone, setIsValidPhone] = useState(false);
    const [isPassSeriesValid, setIsPassSeriesValid] = useState(false);
    const [isPassNumberValid, setIsPassNumberValid,] = useState(false);
    const [isDepartCodeValid, setIsDepartCodeValid] = useState(false);
    const [isSnilsValid, setIsSnilsValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);


    const checkValid = (type) => {
        const regexp = /^[a-z\s]+$/i;
        const phoneRegexp = /^(()+([0-9]){10})$/;
        const mailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

        switch (type) {
            case "phone":
                if (phoneRegexp.test(phone)) {
                    setIsValidPhone(true)
                } else {
                    setIsValidPhone(false)
                }
                break;
            default:
                break
        }

    }


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ProgressBarCreators.setPercent({
            percent: 15,
            greenStripe: 15,
            lightGreenStripe: 50
        }))
    }, [])
    useEffect(() => {
        dispatch(getAdditionalQuestionsDictionary());
    }, []);

    const dictionary = useSelector(state => state.newFormReducer.additionalQuestionsDictionary);

    const history = useHistory();

    const handlePurpOfFinance = (value) => {
        setPurpOfFinance(value);
        if (value === "d7e3f5f9-96dc-4006-9650-d05e788b0a77") {
            setPurpOfFinanceAdditional(" ")
        } else {
            setPurpOfFinanceAdditional(null)
        }
    }

    const handleClaimAim = (value) => {
        setClaimAim(value);
        if (value === "1797b91b-34d6-475a-abbe-30fb6ed8c32f") {
            setClaimAimAdditional(" ")
        } else {
            setClaimAimAdditional(null)
        }
    }

    const handleSetPassSeries = (value) => {
        setPassportSeries(value)
        // if (value.length < 4) {
        //     setIsPassSeriesValid(false)
        // } else {
        //     setIsPassSeriesValid(true)
        // }
    }

    const handlePassNumber = (value) => {
        setPassportNumber(value)
        // if (value.length < 6) {
        //     setIsPassNumberValid(false)
        // } else {
        //     setIsPassNumberValid(true)
        // }
    }

    const handleDepartmentCode = (code) => {
        setDepartmentCode(code)
        // if (code.length < 3) {
        //     setIsDepartmentCodeValid(false)
        // } else if (code.length === 7) {
        //     PassportApi.findFms({inputString: code}).then(res => setIssuedBySuggestions(res?.daDataResult?.suggestions))
        //     setIsDepartmentCodeValid(true)
        // } else if (code.length >= 3) {
        //     PassportApi.findFms({inputString: code}).then(res => setIssuedBySuggestions(res?.daDataResult?.suggestions))
        // }
    }

    const handleSnils = (snils) => {
        setSnils(snils)
        // if (snils.length < 14) {
        //     setIsSnilsValid(false)
        // } else {
        //     setIsSnilsValid(true)
        // }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            sendAdditionalQuestions({
                okbPurpOfFinance: purpOfFinance,
                relationToInsolvent: bankrupcy,
                claimAimType: claimAim,
                financialAim: financialAndEconomicActivities,
                financialPositionTypes: financialStatus,
                reputationRatingTypes: reputation,
                citizenship,
                // beneficiaries,
                // beneficialOwners,
                // pep,
                // pepRelationshipDegree,
                // aims,

                // financialStatus,
                //reputation,
            })
        );
        history.push("/new_application-passport")
    };

    const checkFormFields = () => {
        const formFields = {
           text,
           fio,
           birthDate,
           birthPlace,
           passportSeries,
           passportNumber,
           dateOfIssue,
           departmentCode,
           passIssuedBy,
           migrationNumber,
           startDate,
           finishDate,
           address,
           inn,
           snils,
           proxy,
           ogrnip,
           addressIP,
           phone,
           email
        }


        const emptyFields = Object.keys(formFields).some(p => formFields[p] === '');

        return representativeInformation
            ? purpOfFinanceAdditional === ' ' || claimAimAdditional === ' ' || purpOfFinance === ''
            : emptyFields
    }

    const getClientTypesOptions = () => {
        const dict = dictionary?.clientTypes?.map(i => {
            return {label: i.name, value: i.id}
        })
        return dict
    }

    const setNewType = event => {
        setType(event.value)
    }

    const tooltipPlace = document.documentElement.clientWidth >= 768 ? 'right' : 'left';
    return (
        <main className="page-registration">
            <form className="form" onSubmit={handleSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 registration-col">
                            <div className="h1 md-hide">Дополнительные вопросы</div>
                            <ul className="form-list">
                                <li className="item ">
                                    <label htmlFor="country" className="label">
                                        Гражданство
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Российская Федерация"
                                        id="country"
                                        value={citizenship}
                                        disabled
                                    />
                                </li>
                                <li className="item " style={{marginTop: "25px"}}>
                                    <label htmlFor="" className="label" style={{zIndex: 1, top: -5}}>Выберите цель</label>
                                    <div className="select" style={{marginTop: "10px"}}>
                                        <CustomSelect
                                            options={dictionary?.okbPurpOfFinance.map(aim => ({
                                                value: aim.id,
                                                label: aim.name
                                            }))}
                                            onChange={({value}) => handlePurpOfFinance(value)}
                                            value={purpOfFinance}
                                            placeholder="выберите цель"
                                        />
                                    </div>
                                </li>
                                {purpOfFinanceAdditional && (
                                    <li className="item ">
                                        <label htmlFor="purpOfFinanceAdditional" className="label">
                                            Введите цель
                                        </label>
                                        <input
                                            onChange={e => setPurpOfFinanceAdditional(e.currentTarget.value)}
                                            type="text"
                                            placeholder='цель' id="purpOfFinanceAdditional"
                                            value={purpOfFinanceAdditional}
                                        />
                                    </li>

                                )}
                                <li className="item item--bankrupcy" style={{marginTop: "25px"}}>
                                    <label htmlFor="" className="label" style={{zIndex: 1, top: -5}}>Информация о банкротстве</label>
                                    <div className="select" style={{marginTop: "10px"}}>
                                        <CustomSelect
                                            options={dictionary?.relationToInsolvent.map(aim => ({
                                                value: aim.id,
                                                label: aim.name
                                            }))}
                                            onChange={({value}) => setBankrupcy(value)}
                                            value={bankrupcy}
                                            placeholder={dictionary?.relationToInsolvent[0].name}
                                        />
                                    </div>
                                </li>
                                <li className="list-checkbox">
                                    <ul className="list-checkbox-in">
                                        <li>
                                            <div className="h3">Сведения о представителях</div>
                                        </li>
                                        <li>
                                            <div className="d-flex align-items-center">
                                                <input
                                                    type="checkbox"
                                                    id="additional-questions-1"
                                                    className="checkbox"
                                                    checked={representativeInformation}
                                                    onChange={(e) =>
                                                        setRepresentativeInformation(e.target.checked)
                                                    }
                                                />
                                                <label htmlFor="additional-questions-1">
                                                    Представители отсутсвуют
                                                </label>
                                                <img src={question} className="tooltip-show" alt="question" data-tip
                                                     data-for="representativesTooltip"/>
                                                <CustomTooltip id="representativesTooltip" place={tooltipPlace}>
                                                    Родители, усыновители, опекуны, попечители и т.п
                                                </CustomTooltip>
                                            </div>
                                        </li>
                                        {   !representativeInformation
                                                ? <>
                                                    <li>
                                                        <ul className="expanded-check">
                                                            <li className="item " style={{marginTop: "25px"}}>
                                                                <label htmlFor="" className="label" style={{zIndex: 1, top: -5}}>Тип лица</label>
                                                                <div className="select" style={{marginTop: "10px"}}>
                                                                    <CustomSelect
                                                                        options={getClientTypesOptions()}
                                                                        value={type}
                                                                        onChange={setNewType}
                                                                        placeholder="Физ. Лицо или ИП"
                                                                    />
                                                                </div>
                                                            </li>
                                                            <li className="item ">
                                                                <label htmlFor="additional-information" className="label">Дополнительная
                                                                    информация</label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Текст"
                                                                    id="additional-information"
                                                                    value={text}
                                                                    onChange={e => setText(e.currentTarget.value)}
                                                                />
                                                            </li>
                                                            <li className="item ">
                                                                <label htmlFor="fio" className="label">ФИО</label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Иванов Иван Иванович"
                                                                    id="fio"
                                                                    value={fio}
                                                                    onChange={e => setFio(e.currentTarget.value)}
                                                                />
                                                            </li>
                                                            <li className="item ">
                                                                <label htmlFor="datepicker" translate="no"
                                                                       className="label">Дата рождения</label>
                                                                <input
                                                                    type="date"
                                                                    id="datepicker"
                                                                    translate="no"
                                                                    onChange={e => setBirthDate(e.currentTarget.value)}
                                                                    className="datepicker-ru"
                                                                    defaultValue='03.02.2021'
                                                                    value={birthDate}
                                                                />
                                                            </li>
                                                            <li className="item">
                                                                <label htmlFor="place-birth" className="label">
                                                                    Место рождения
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="place-birth"
                                                                    placeholder="Москва"
                                                                    value={birthPlace}
                                                                    onChange={e => setBirthPlace(e.currentTarget.value)}
                                                                />
                                                            </li>
                                                            <li className=" ">
                                                                <ul className="pessword_data">
                                                                    <li className="item ">
                                                                        <label htmlFor="passport-1" className="label">
                                                                            Серия документа
                                                                        </label>
                                                                        <InputMask
                                                                            type="text"
                                                                            placeholder="0000"
                                                                            id="passport-1"
                                                                            value={passportSeries}
                                                                            onChange={e => handleSetPassSeries(e.currentTarget.value)}
                                                                            mask="9999"
                                                                            maskChar={null}
                                                                        />
                                                                    </li>
                                                                    <li className="item ">
                                                                        <label htmlFor="passport-2" className="label">
                                                                            Номер документа
                                                                        </label>
                                                                        <InputMask
                                                                            type="text"
                                                                            placeholder="000000"
                                                                            id="passport-2"
                                                                            value={passportNumber}
                                                                            onChange={e => handlePassNumber(e.currentTarget.value)}
                                                                            mask="999999"
                                                                            maskChar={null}
                                                                        />
                                                                    </li>
                                                                    <li className="item ">
                                                                        <label htmlFor="datepicker2" className="label">
                                                                            Дата выдачи
                                                                        </label>
                                                                        <input
                                                                            placeholder="12.02.2010"
                                                                            type="date"
                                                                            id="datepicker2"
                                                                            translate="no"
                                                                            className="datepicker-ru"
                                                                            onChange={e => setDateOfIssue(String(e.currentTarget.value))}
                                                                            value={dateOfIssue}
                                                                        />
                                                                    </li>
                                                                    <li className="item ">
                                                                        <label htmlFor="passport-4" className="label">
                                                                            Код подразделения
                                                                        </label>
                                                                        <InputMask
                                                                            type="text"
                                                                            placeholder="322-233"
                                                                            id="passport-4"
                                                                            value={departmentCode}
                                                                            onChange={e => handleDepartmentCode(e.currentTarget.value)}
                                                                            maskChar={null}
                                                                            mask="999-999"
                                                                        />
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                            <li className="item">
                                                                <label htmlFor="name-organ" className="label">
                                                                    Наименование органа, выдавшего документ
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="name-organ"
                                                                    placeholder="Подразделение"
                                                                    value={passIssuedBy}
                                                                    onChange={e => setPassIssuedBy(e.currentTarget.value)}
                                                                />
                                                            </li>
                                                            <li className="item">
                                                                <label htmlFor="number-cards" className="label">
                                                                    Номер миграционной карты
                                                                </label>
                                                                <InputMask
                                                                    type="text"
                                                                    id="number-cards"
                                                                    placeholder="0000-0000"
                                                                    value={migrationNumber}
                                                                    onChange={e => setMigrationNumber(e.currentTarget.value)}
                                                                    maskChar={null}
                                                                    mask="9999-9999"
                                                                />
                                                            </li>
                                                            <li className="item ">
                                                                <label htmlFor="datepicker3" className="label">
                                                                    Дата начала срока пребывания
                                                                </label>
                                                                <input
                                                                    type="date"
                                                                    id="datepicker3"
                                                                    translate="no"
                                                                    onChange={e => setStartDate(e.currentTarget.value)}
                                                                    className="datepicker-ru"
                                                                    value={startDate}
                                                                />
                                                            </li>
                                                            <li className="item ">
                                                                <label htmlFor="datepicker4" className="label">
                                                                    Дата окончания срока пребывания
                                                                </label>
                                                                <input
                                                                    type="date"
                                                                    id="datepicker4"
                                                                    translate="no"
                                                                    onChange={e => setFinishDate(e.currentTarget.value)}
                                                                    className="datepicker-ru"
                                                                    value={finishDate}
                                                                />
                                                            </li>
                                                            <li className="item">
                                                                <label htmlFor="city" className="label">
                                                                    Адрес места жительства или пребывания
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="city"
                                                                    placeholder="Москва"
                                                                    value={address}
                                                                    onChange={e => setAddress(e.currentTarget.value)}
                                                                />
                                                            </li>
                                                            <li className="item">
                                                                <label htmlFor="inn" className="label">ИНН</label>
                                                                <InputMask
                                                                    type="text"
                                                                    id="inn"
                                                                    placeholder="0000000000"
                                                                    value={inn}
                                                                    onChange={e => setInn(e.currentTarget.value)}
                                                                    maskChar={null}
                                                                    mask="9999999999"
                                                                />
                                                            </li>
                                                            <li className="item">
                                                                <label htmlFor="cnilc" className="label">СНИЛС</label>
                                                                <InputMask
                                                                    type="text"
                                                                    id="cnilc"
                                                                    placeholder="ХХХ-ХХХ-ХХХ YY"
                                                                    value={snils}
                                                                    onChange={e => handleSnils(e.currentTarget.value)}
                                                                    mask="999-999-999 99"
                                                                    maskChar={null}
                                                                />
                                                            </li>
                                                            <li className="item">
                                                                <label htmlFor="attorney"
                                                                       className="label">Доверенность</label>
                                                                <InputMask
                                                                    type="text"
                                                                    id="attorney"
                                                                    placeholder="0000000000"
                                                                    value={proxy}
                                                                    onChange={e => setProxy(e.currentTarget.value)}
                                                                    mask="9999999999"
                                                                    maskChar={null}
                                                                />
                                                            </li>
                                                            <li className="item">
                                                                <label htmlFor="ogr" className="label">ОГРНИП</label>
                                                                <InputMask
                                                                    type="text"
                                                                    id="ogr"
                                                                    placeholder="0000000000"
                                                                    value={ogrnip}
                                                                    onChange={e => setOgrnip(e.currentTarget.value)}
                                                                    mask="9999999999"
                                                                    maskChar={null}
                                                                />
                                                            </li>
                                                            <li className="item">
                                                                <label htmlFor="plase-ip" className="label">Место
                                                                    регистрации
                                                                    ИП</label>
                                                                <input
                                                                    type="text"
                                                                    id="plase-ip"
                                                                    placeholder="Москва"
                                                                    value={addressIP}
                                                                    onChange={e => setAddressIP(e.currentTarget.value)}
                                                                />
                                                            </li>
                                                            <li className="item">
                                                                <label htmlFor="item-input-phone" className="label">
                                                                    Номер телефона
                                                                </label>
                                                                <InputMask
                                                                    className="phone"
                                                                    id="item-input-phone"
                                                                    placeholder="+7"
                                                                    onChange={e => {
                                                                        setPhone(e.currentTarget.value)
                                                                    }}
                                                                    mask="+7\ 999 999 99 99"
                                                                    maskChar=" "
                                                                    value={phone}
                                                                />
                                                            </li>
                                                            <li className="item ">
                                                                <label htmlFor="item-input-email" className="label">
                                                                    Электронная почта
                                                                </label>
                                                                <input
                                                                    type="email"
                                                                    id="item-input-email"
                                                                    placeholder="example@gmail.com"
                                                                    value={email}
                                                                    onChange={e => setEmail(e.currentTarget.value)}
                                                                />
                                                            </li>
                                                        </ul>
                                                    </li>

                                                </>
                                                : null

                                        }
                                        <li>
                                            <div className="h3">Сведения о выгодоприобретателях</div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <input
                                                    type="checkbox"
                                                    id="additional-questions-2"
                                                    className="checkbox"
                                                    checked={beneficiaries}
                                                    onChange={(e) => setBeneficiaries(e.target.checked)}
                                                />
                                                <label htmlFor="additional-questions-2">
                                                    Выгодоприобретатели отсутствуют
                                                </label>
                                                <img src={question} className="tooltip-show" alt="question" data-tip
                                                     data-for="beneficiarsTooltip"/>
                                                <CustomTooltip id="beneficiarsTooltip" place={tooltipPlace}>Физическое
                                                    или юридическое лицо, ИП,<br/> которому предназначены денежные
                                                    средства</CustomTooltip>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="h3">
                                                Сведения о бенефициарных владельцах клиента
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <input
                                                    type="checkbox"
                                                    id="additional-questions-3"
                                                    className="checkbox"
                                                    checked={beneficialOwners}
                                                    onChange={(e) =>
                                                        setBeneficialOwners(e.target.checked)
                                                    }
                                                />
                                                <label htmlFor="additional-questions-3">
                                                    Бенефициарные владельцы отсутствуют
                                                </label>
                                                <img src={question} className="tooltip-show" alt="question" data-tip
                                                     data-for="beneficiarOwnersTooltip"/>
                                                <CustomTooltip id="beneficiarOwnersTooltip" place={tooltipPlace}>Лицо
                                                    или несколько лиц, которые прямо или косвенно <br/> оказывают
                                                    существенное <br/> влияние на принятие Вами решений</CustomTooltip>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="h3">Сведения о принадлежности к ПДЛ</div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <input
                                                    type="checkbox"
                                                    id="additional-questions-4"
                                                    className="checkbox"
                                                    checked={pep}
                                                    onChange={(e) =>
                                                            setPep(e.target.checked)
                                                    }
                                                />
                                                <label htmlFor="additional-questions-4">
                                                    Не являюсь публичным должностным лицом
                                                </label>
                                                <img src={question} className="tooltip-show" alt="question" data-tip
                                                     data-for="publicOfficialTooltip"/>
                                                <CustomTooltip id="publicOfficialTooltip" place={tooltipPlace}>ПДЛ -
                                                    публичное должностное лицо. Лицо,<br/> занимающее государственную
                                                    должность РФ и т.п.</CustomTooltip>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="h3">
                                                Сведения о степени родства (статусе) по отношению к ПДЛ
                                            </div>
                                        </li>
                                        <li>
                                            <div style={{display: "flex", marginBottom: "40px"}}>
                                                <input
                                                    type="checkbox"
                                                    id="additional-questions-5"
                                                    className="checkbox"
                                                    checked={pepRelationshipDegree}
                                                    onChange={(e) =>
                                                        setPepRelationshipDegree(e.target.checked)
                                                    }
                                                />
                                                <label htmlFor="additional-questions-5">
                                                    Не являюсь близким родственником или супругом(ой) ПДЛ
                                                </label>
                                                <img src={question} className="tooltip-show" alt="question" data-tip
                                                     data-for="publicOfficialTooltip"/>
                                            </div>
                                        </li>
                                    </ul>
                                </li>


                                <li className="item " style={{marginTop: "70px"}}>
                                    <label htmlFor="" className="label" style={{zIndex: 1, top: -50}}>
                                        Сведения о целях установления и предполагаемом характере<br/>
                                        деловых отношений с компанией
                                    </label>
                                    <div className="select" style={{marginTop: "10px"}}>
                                        <CustomSelect
                                            options={dictionary?.claimAimTypes.map(aim => ({
                                                value: aim.id,
                                                label: aim.name
                                            }))}
                                            onChange={({value}) => handleClaimAim(value)}
                                            value={claimAim}
                                            placeholder={dictionary?.claimAimTypes[1]?.name}
                                        />
                                    </div>
                                </li>
                                {claimAimAdditional && (
                                    <li className="item ">
                                        <label htmlFor="claimAimAdditional" className="label">
                                            Введите цель
                                        </label>
                                        <input onChange={e => setClaimAimAdditional(e.currentTarget.value)} type="text"
                                               placeholder='цель' id="claimAimAdditional"
                                               value={claimAimAdditional}/>
                                    </li>
                                )}

                                <li className="item " style={{marginTop: "25px"}}>
                                    <label htmlFor="" className="label" style={{zIndex: 1, top: -5}}>
                                        Сведения о финансово-хозяйственной деятельности
                                    </label>
                                    <div className="select" style={{marginTop: "10px"}}>
                                        <CustomSelect
                                            options={dictionary?.financialAimTypes.map(aim => ({
                                                value: aim.id,
                                                label: aim.name
                                            }))}
                                            onChange={({value}) => setFinancialAndEconomicActivities(value)}
                                            value={financialAndEconomicActivities}
                                            placeholder={dictionary?.financialAimTypes[2]?.name}
                                        />
                                    </div>
                                </li>


                                <li className="item " style={{marginTop: "25px"}}>
                                    <label htmlFor="" className="label" style={{zIndex: 1, top: -5}}>
                                        Сведения о финансовом положении
                                    </label>
                                    <div className="select" style={{marginTop: "10px"}}>
                                        <CustomSelect
                                            options={dictionary?.financialPositionTypes.map(aim => ({
                                                value: aim.id,
                                                label: aim.name
                                            }))}
                                            onChange={({value}) => setFinancialStatus(value)}
                                            value={financialStatus}
                                            placeholder={dictionary?.financialPositionTypes[2]?.name}
                                        />
                                    </div>
                                </li>

                                <li className="item " style={{marginTop: "25px"}}>
                                    <label htmlFor="" className="label" style={{zIndex: 1, top: -5}}>
                                        Сведения о деловой репутации
                                    </label>
                                    <div className="select" style={{marginTop: "10px"}}>
                                        <CustomSelect
                                            options={dictionary?.reputationRatingTypes.map(aim => ({
                                                value: aim.id,
                                                label: aim.name
                                            }))}
                                            onChange={({value}) => setReputation(value)}
                                            value={reputation}
                                            placeholder={dictionary?.reputationRatingTypes[2]?.name}
                                            placeholderGap="10"
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
