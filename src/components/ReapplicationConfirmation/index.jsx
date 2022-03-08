import React, {useState, useEffect} from "react";
import {useFormik} from "formik";
import checkGrey from '../../img/svg/check-grey.svg';

import eye from '../../img/eye.png'

import {useDispatch, useSelector} from "react-redux";

import {sendPassportThunk} from "../../server/thunks/thunks";
import ContactDataForm from "./components/ContactDataForm";
import PassportDataForm from "./components/PassportDataForm";
import AddressDataForm from "./components/AddressDataForm";
import WorkDataForm from "./components/WorkDataForm";
import {useHistory} from "react-router-dom";

const ReapplicationConfirmation = (props) => {

  const history = useHistory();

  const dispatch = useDispatch();
  const applicationId = useSelector(state => state.newFormReducer.applicationId);

  const [docsVisible, setDocsVisible] = useState(false)

  const [showPass, setShowPass] = useState(false)
  const [code, setCode] = useState('')
  const [isCodeValid, setIsCodeValid] = useState(true)

  const [isConform, setIsConform] = useState(null)

  const [mainCheck, setMainCheck] = useState(false)
  const [ruleProcessingPersonalData, setRuleProcessingPersonalData] = useState(false)
  const [consentProcessingPersonalData, setConsentProcessingPersonalData] = useState(false)
  const [loanRules, setLoanRules] = useState(false)
  const [conditionsLoanAgreement, setConditionsLoanAgreement] = useState(false)
  const [serviceRules, setServiceRules] = useState(false)
  const [informationOfTerms, setInformationOfTerms] = useState(false)

  const setConform = val => {
    setIsConform(val)
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

  const goToNextForm = () => {
    dispatch(sendPassportThunk({
      applicationId,
      codeword: code
    }))
    history.push("/reapplication-number-confirmation")
  }

  useEffect(()=>{
    ruleProcessingPersonalData &&
    consentProcessingPersonalData &&
    loanRules &&
    conditionsLoanAgreement &&
    serviceRules &&
    informationOfTerms ? setMainCheck(true) : setMainCheck(false)
  },[ruleProcessingPersonalData, consentProcessingPersonalData, loanRules, conditionsLoanAgreement, serviceRules, informationOfTerms])

  return (
    <main className="page-registration">
      <div className="container">
        <div className="row">
          <div className="col-md-12 registration-col">
            <div className="h1 mb-1">Ваши данные</div>
            <h3 className="mb-4">Для просмотра нажмите на поле</h3>
            <ul className="form-list">
              <li className="item">
                <ContactDataForm/>
              </li>
              <li className="item">
                <PassportDataForm/>
              </li>
              <li className="item">
                <AddressDataForm/>
              </li>
              <li className="item">
                <WorkDataForm/>
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
                  <li className="item item-checkbox">
                    <input type="checkbox" id="item-input-checkbox-2" className="checkbox" checked={mainCheck} onChange={()=>setMainCheck(prev=>!prev)}/>
                    <label htmlFor="item-input-checkbox-2">Я присоединяюсь к Соглашению об использовании аналога
                      собственноручной
                      подписи и подтверждаю, что ознакомился и согласен с документами</label>
                    <button className={`check-grey ${!docsVisible ? '' : 'active'}`}
                            onClick={() => setDocsVisible(!docsVisible)}><img src={checkGrey} alt=""/></button>
                  </li>
                  <li className={`item-checkbox ${!docsVisible ? 'hide' : ''}`}>
                    <ul className="item-checkbox-list">
                      <li className="item ">
                        <input type="checkbox" id="item-input-checkbox-2-1" className="checkbox" checked={mainCheck ? true : ruleProcessingPersonalData} onChange={()=>setRuleProcessingPersonalData(prev=>!prev)}/>
                        <label htmlFor="item-input-checkbox-2-1">Правилами обработки персональных данных <br/>и иной
                          информации</label>
                      </li>
                      <li className="item ">
                        <input type="checkbox" id="item-input-checkbox-2-2" className="checkbox" checked={mainCheck ? true : consentProcessingPersonalData} onChange={()=>setConsentProcessingPersonalData(prev=>!prev)}/>
                        <label htmlFor="item-input-checkbox-2-2">Согласие субъекта на обработку персональных
                          данных</label>
                      </li>
                      <li className="item ">
                        <input type="checkbox" id="item-input-checkbox-2-3" className="checkbox" checked={mainCheck ? true : loanRules} onChange={()=>setLoanRules(prev=>!prev)}/>
                        <label htmlFor="item-input-checkbox-2-3">Правилами предоставления займов </label>
                      </li>
                      <li className="item ">
                        <input type="checkbox" id="item-input-checkbox-2-4" className="checkbox" checked={mainCheck ? true : conditionsLoanAgreement} onChange={()=>setConditionsLoanAgreement(prev=>!prev)}/>
                        <label htmlFor="item-input-checkbox-2-4">Общими условиями договора потребительского
                          займа</label>
                      </li>
                      <li className="item ">
                        <input type="checkbox" id="item-input-checkbox-2-5" className="checkbox" checked={mainCheck ? true : serviceRules} onChange={()=>setServiceRules(prev=>!prev)}/>
                        <label htmlFor="item-input-checkbox-2-5">Правилами комплексного обслуживания </label>
                      </li>
                      <li className="item ">
                        <input type="checkbox" id="item-input-checkbox-2-6" className="checkbox" checked={mainCheck ? true : informationOfTerms} onChange={()=>setInformationOfTerms(prev=>!prev)}/>
                        <label htmlFor="item-input-checkbox-2-6">Информацией об условиях предоставления, <br/>использования
                          и
                          возврата потребительского микрозайма </label>
                      </li>
                    </ul>
                  </li>
                  <li className="item">
                    <p>Согласен на уступку прав требований по договору</p>
                    <ul className="radio-list">
                    <li
                        data-tooltip-md="Согласие на уступку прав требования может повысить вероятность одобрения займа">
                        <input
                                style={{
                                  marginRight: '5px',
                                }}
                                onChange={() => setConform(true)}
                                type="radio"
                                className="radio"
                                id="yes"
                                name="yes"
                                checked={isConform===true}
                        />
                        <label htmlFor="yes">Да</label>
                    </li>
                    <li
                        data-tooltip-md="Согласие на уступку прав требования может повысить вероятность одобрения займа"
                        style={{marginLeft: "10px", position: "relative"}}>
                        <input
                                style={{
                                  marginRight: '5px',
                                }}
                                onChange={() => setConform(false)}
                                type="radio"
                                className="radio"
                                id="no"
                                name="no"
                                checked={isConform===false}
                        />
                        <label htmlFor="no" data-tip data-for="agreementTooltip">Нет</label>
                        <div className="agreement-tooltip">Согласие на уступку прав требования<br /> может&nbsp;повысить вероятность одобрения займа</div>
                    </li>

                    </ul>
                  </li>

                  <li className="item">
                    <button className="btn btn_blue" disabled={!(mainCheck && isConform && isCodeValid)} onClick={goToNextForm}>Далее</button>
                  </li>
                  <li className="item">
                    <p>Нажимая на кнопку «Далее», я подтверждаю указанную <a href="#" className="color-blue">дополнительную
                      информацию</a> о себе, а также направляю указанные мною сведения о себе для подтверждения их
                      достоверности с использованием единой системы межведомственного электронного взаимодействия</p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ReapplicationConfirmation;
