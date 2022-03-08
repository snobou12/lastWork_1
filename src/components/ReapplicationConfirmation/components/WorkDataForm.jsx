import React, {useState, useEffect} from 'react';
import InputMask from "react-input-mask";
import {useSelector, useDispatch} from "react-redux";
import {findCitiesThunk, sendWorkDataThunk} from '../../../server/thunks/thunks';
import {DictionariesApi, PassportApi} from "../../../server/agent";
import {getDictionariesThunk} from "../../../server/thunks/thunks";
import {useHistory} from "react-router-dom";
import {CustomSelect} from "../../../ui/CustomSelect";
import handlePhone, {beforeMaskedValueChangeHandler, formatChars} from "../../../helpers/handle-phone";

const WorkDataForm = () => {

  const [workDataVisible, setWorkDataVisible] = useState(false)

  const dispatch = useDispatch();
  const history = useHistory();

  const dictionaries = useSelector(state => state.newFormReducer?.dictionaries);

  const [data, setData] = useState(null);

  const [isRetiredOrSelfEmployed, setIsRetiredOrSelfEmployed] = useState(false);
  const [contactCompanyName, setContactCompanyName] = useState("");
  const [partySuggestions, setPartySuggestions] = useState(null);
  const [companyCompletionsVisible, setCompanyCompletionsVisible] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [workAddress, setWorkAddress] = useState('');
  const [busynessId, setBusynessId] = useState("543073ab-0484-48d1-91f7-36e521c0142b");
  const [workPhone, setWorkPhone] = useState('')
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
  const [phoneWrongSecondSignErrorMessage, setPhoneWrongSecondSignErrorMessage] = useState(false);
  const [stagePeriodId, setStagePeriodId] = useState("e91a7c15-dfdb-4764-a910-97f16915c133");
  const [sumAverageMonthEarning, setSumAverageMonthEarning] = useState('');
  const [profitSourceId, setProfitSourceId] = useState('fd0212ce-6b7d-4371-a1ee-72bf9edbe5a8');


  const workAddressCompletions = useSelector((state) => state.newFormReducer.completions.workAddress ? state.newFormReducer.completions.workAddress : null);
  const [workAddressVisible, setWorkAddressVisisble] = useState(false)
  const [businessOptions, setBusinessOptions] = useState([])


  useEffect(() => {
    dispatch(getDictionariesThunk())
  }, [])

  useEffect(()=> {
      PassportApi.getBusinessOptions()
        .then(res => setBusinessOptions(res.data.busynessTypes))
      PassportApi.getWorkData()
          .then(res => {
              setData(res.data)
        })
  }, [])

  useEffect(() => {
      if (data) {
          setIsRetiredOrSelfEmployed(data?.isRetiredOrSelfEmployed)
          setContactCompanyName(data?.contactCompanyName);
          setJobTitle(data?.jobTitle);
          setWorkAddress(data?.workAddress);
          setBusynessId(data?.busyness?.name);
          setWorkPhone(data?.workPhone);
          setStagePeriodId(data?.stagePeriod?.name);
          setSumAverageMonthEarning(data?.sumAverageMonthEarning);
          setProfitSourceId(data?.incomeSource?.name)
      }
  }, [data])


  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isValidIncome, setIsValidIncome] = useState(true);

  const getProfitOptions = () => {
      const dict = dictionaries?.incomeSource?.map(i => {
          return {label: i.name, value: i.id}
      })
      return dict
  }

  const getBusynessOptions = () => {
      const dict = businessOptions.map(i => {
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


  const handleIncomeChange = (e) => {
      // const incomeRegexp = /^\d{3,6}([\.\,]\d{1,2})?$/;
      // if(incomeRegexp.test(value)) {
      //     setIsValidIncome(true)
      // } else {
      //     setIsValidIncome(false)
      // }

      setSumAverageMonthEarning(e.target.value);

      if (e.target.value.length < 5 || e.target.value.length > 7) {
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
      console.log(incomeOptions)
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

  const sendPlaceWorkData = (e) => {
      e.preventDefault()
      dispatch(sendWorkDataThunk({
          applicationId: "20C60AA1-55AB-4AEF-9DBE-BC8D5020544D",
          isRetiredOrSelfEmployed,
          contactCompanyName,
          jobTitle,
          workAddress,
          busynessId,
          workPhone,
          stagePeriodId,
          sumAverageMonthEarning,
          profitSourceId
      }))
      setWorkDataVisible(false)
  }

  const exitDiscardChanges = () => {
    PassportApi.getWorkData()
          .then(res => setData(res.data))
    setWorkDataVisible(false)
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
        <>
            <label className="label">Сведения о работе</label>
            <div className={`reapplication-item ${workDataVisible ? 'active' : ''}`}>
                <div className="reapplication-item-value">{isRetiredOrSelfEmployed ? "Пенсионер или самозанятый" : contactCompanyName}</div>
                <a className="reapplication-item-icon" onClick={() => setWorkDataVisible(!workDataVisible)}></a>
                <form action="" className="reapplication-item-desc" onSubmit={sendPlaceWorkData}>
                  <ul className="form-list">
                      <li className="item ">
                          <input
                                  type="checkbox"
                                  id="address-income" className="checkbox"
                                  checked={isRetiredOrSelfEmployed}
                                  onChange={() => {setIsRetiredOrSelfEmployed(!isRetiredOrSelfEmployed)}}
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
                                         autoComplete="off"
                                         className="form-control"
                                         value={contactCompanyName}
                                         onChange={(e)=> {setContactCompanyName(e.target.value)}}
                                         placeholder="ООО “Алкис”"
                                         />
                                  <span>Название организации</span>
                                </label>
                              </li>

                              <li className="item ">
                                <label className="form-group has-float-label">
                                  <label htmlFor="trainer" className="d-none">Должность</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Тренер" id="trainer"
                                    value={jobTitle}
                                    onChange={(e)=> {setJobTitle(e.target.value)}}
                                    />
                                  <span>Дожность</span>
                                </label>
                              </li>
                              <li className="item auto-complete">
                                <label className="form-group has-float-label">
                                  <label htmlFor="street" className="d-none">Адрес работы</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Красная площадь"
                                    id="street"
                                    value={workAddress}
                                    onChange={(e)=> {handleWorkAddress(e)}}
                                    autoComplete="off"
                                  />
                                  <span>Адрес работы</span>
                                </label>
                              </li>
                          </>
                          : null
                      }
                      <li className="item">
                          <label htmlFor="" className="label" style={{zIndex: 1, top: -5, fontSize: '75%', padding: '0 4px',}}>
                              Занятость</label>
                          <div className="select">
                              <CustomSelect
                                  options={getBusynessOptions()}
                                  value={busynessId}
                                  onChange={(e)=> {handleBusinessId(e)}}
                                  placeholder=""
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
                                             value={workPhone}
                                             placeholder="+7 (999) 999-99-99"
                                             onChange={e => {
                                                 handlePhone(e, workPhone, setWorkPhone, setIsPhoneValid, setPhoneErrorMessage, setPhoneWrongSecondSignErrorMessage)
                                             }}
                                             mask="*9 (999) 999 99 99"
                                             maskChar={null}
                                             formatChars={formatChars}
                                             beforeMaskedValueChange={beforeMaskedValueChangeHandler}
                                  />
                                  <span style={{zIndex: 1}}>Телефон</span>
                                    {!isPhoneValid && <div className="error-text">{phoneErrorMessage}</div>}
                                    {phoneWrongSecondSignErrorMessage && <div className="error-text">Вторая цифра номера отлична от 9</div>}
                                </label>
                              </li>
                              <li className="item">
                                  <label htmlFor="" className="label" style={{zIndex: 1, top: -5, fontSize: '75%', padding: '0 4px',}}>
                                      Стаж на последнем месте (мес.)</label>
                                  <div className="select">
                                      <CustomSelect
                                          options={getStagePeriodOptions()}
                                          value={stagePeriodId}
                                          onChange={(e)=> {handleStagePeriodId(e)}}
                                      />
                                  </div>
                              </li>
                          </>
                          : null
                      }

                      <li className="item ">
                        <label className="form-group has-float-label">
                          <label htmlFor="income" className="d-none">Ежемесячный доход</label>
                          <InputMask
                            className="phone form-control"
                            id="income"
                            placeholder='10000'
                            mask="999999"
                            maskChar={null}
                            value={sumAverageMonthEarning}
                            onChange={(e) => {handleIncomeChange(e)}}
                            />
                          <span style={{zIndex: 1}}>Ежемесячный доход</span>
                          {(Boolean(sumAverageMonthEarning) && !isValidIncome) &&
                          <div className="error-text">Введите сумму от 1000 до 999999 в формате 999999</div>}
                        </label>
                      </li>

                      {/*<li className="item " style={{marginTop: "25px"}}>*/}
                      {/*  <label className="form-group has-float-label">*/}
                      {/*    <label htmlFor="profit" className="d-none">Источники дохода</label>*/}
                      {/*    <input*/}
                      {/*      type="text"*/}
                      {/*      placeholder="Аренда"*/}
                      {/*      className="form-control"*/}
                      {/*      id="profit"*/}
                      {/*      value={profitSourceId}*/}
                      {/*      onChange={(e) => {handleProfiteSourceId(e)}}*/}
                      {/*      autoComplete="off"*/}
                      {/*    />*/}
                      {/*    <span style={{zIndex: 1}}>Источники дохода</span>*/}
                      {/*  </label>*/}
                      {/*</li>*/}
                      <li className="item">
                          <label htmlFor="" className="label" style={{zIndex: 1, top: -5, fontSize: '75%', padding: '0 4px',}}>
                              Источники дохода</label>
                          <div className="select">
                              <CustomSelect
                                  options={getProfitOptions()}
                                  value={profitSourceId}
                                  onChange={(e)=> {handleProfiteSourceId(e)}}
                              />
                          </div>
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

export default WorkDataForm
