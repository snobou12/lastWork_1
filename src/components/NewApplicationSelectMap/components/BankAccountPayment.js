import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import InputMask from "react-input-mask";
import questions from '../../../img/svg/questions.svg'
import checkGrey from '../../../img/svg/check-grey.svg'
import {addBankAccountThunk, findBankThunk} from "../../../server/thunks/thunks";
import NavLink from "react-router-dom/es/NavLink";
import CustomTooltip from "../../../ui/CustomTooltip";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";
import {NewFormActionCreators} from "../../../store/action-creators";

export const BankAccountPayment = () => {
    const dispatch = useDispatch();

    const [isAgreementOpen, setIsAgreementOpen] = useState(false);
    const [bankAccount, setBankAccount] = useState("");
    const [bankName, setBankName] = useState('');
    const [bankAccountCity, setBankAccountCity] = useState('');
    const [bankAccountBik, setBankAccountBik] = useState('');
    const [bankAccountCorrAcc, setBankAccountCorrAcc] = useState('');
    const [turboBonus, setTurboBonus] = useState('')

    const [isBankAccountValid, setIsBankAccountValid] = useState(false);
    const [isBankAccountBikValid, setIsBankAccountBikValid] = useState(false);
    const [isBankAccountCorrAccValid, setIsBankAccountCorrAccValid] = useState(false);
    const [isAssignment, setIsAssignment] = useState(false);


    const handleBankAccount = (value) => {
        setBankAccount(value)
        if (value.length < 23) {
            setIsBankAccountValid(false)
        } else {
            setIsBankAccountValid(true)
        }
    }

    const handleBankAccountBik = (value) => {
        setBankAccountBik(value)
        if (value.length < 6) {
            setIsBankAccountBikValid(false)
        } else {
            setIsBankAccountBikValid(true)
        }
    }

    const handleBankAccountCorrAcc = (value) => {
        setBankAccountCorrAcc(value)
        if (value.length < 23) {
            setIsBankAccountCorrAccValid(false)
        } else {
            setIsBankAccountCorrAccValid(true)
        }
    }

    const setAssignment = () => {
        if (isAssignment === false) {
            setIsAssignment(true)
        } else {
            setIsAssignment(false)
        }
    }

    const checkFormFields = () => {
        const formFields = {
            bankName,
            bankAccountCity,
        }

        const fieldsValidations = {
            isAssignment,
            isBankAccountValid,
            isBankAccountBikValid,
            isBankAccountCorrAccValid
        }

        const emptyFields = Object.keys(formFields).some(p => formFields[p] === '');
        const fieldsWithErrors = Object.keys(fieldsValidations).some(p => fieldsValidations[p] === false);

        return emptyFields || fieldsWithErrors
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addBankAccountThunk({
            bankAccount,
            bankName,
            bankAccountCity,
            bankAccountBik,
            bankAccountCorrAcc
        }))
        dispatch(NewFormActionCreators.setCompletions('bankName', []))
        dispatch(NewFormActionCreators.setCompletions('bankBic', []))
    }
    useEffect(() => {
        dispatch(NewFormActionCreators.setCompletions('bankName', []))
        dispatch(NewFormActionCreators.setCompletions('bankBic', []))
    }, []);

    const completions = useSelector(state => state.newFormReducer.completions.bankName);
    const [completionsVisible, setCompletionsVisible] = useState(false);
    const bicCompletions = useSelector(state => state.newFormReducer.completions.bankBic);
    const [bicCompletionsVisible, setBicCompletionsVisible] = useState(false);

    return (
        <div id="house" className="tab-pane fade">
            <ul className="form-list">
                <li className="item">
                    <div className="h3">???? ?????????????????? ????????</div>
                </li>
                <li className="item">
                    <label className="form-group has-float-label">
                        <label htmlFor="number-account" className="d-none">?????????? ??????????</label>
                        <InputMask className="phone form-control" id="number-account"
                                   placeholder="XXXXX XXXXX XXXXX XXXXX"
                                   value={bankAccount}
                                   onChange={e => {
                                       handleBankAccount(e.currentTarget.value)
                                   }}
                                   mask="99999 99999 99999 99999" maskChar=""/>
                        <span>?????????? ??????????</span>
                    </label>
                </li>
                <li className="item auto-complete">
                    <label className="form-group has-float-label">
                        <label htmlFor="name-banc" className="d-none">???????????????????????? ??????????</label>
                        <input
                          type="text"
                          id="name-banc"
                          placeholder="??????"
                          value={bankName}
                          className="form-control"
                          onFocus={() => {
                              setCompletionsVisible(true)
                              if (bankName.length >= 3) {
                                  dispatch(findBankThunk(bankName, 'bankName'));
                              }
                          }}
                          onBlur={() => {
                              setCompletionsVisible(false)
                          }}
                          onChange={e => {
                              setBankName(e.target.value)
                              if (e.target.value.length >= 3) {
                                  dispatch(findBankThunk(e.target.value, 'bankName'));
                              }
                          }}/>
                        <span>???????????????????????? ??????????</span>
                    </label>
                    <ul className={`completions ${completionsVisible ? '' : 'inactive'}`}>
                        {completions ? completions.map(item => (
                            <li key={item.value} onClick={() => {
                                setBankName(item.value)
                                setBankAccountBik(item.data.bic);
                                setIsBankAccountBikValid(true)
                                setBankAccountCorrAcc(item.data.correspondent_account);
                                setIsBankAccountCorrAccValid(true)
                                setBankAccountCity(item.data.address.value.slice(2, item.data.address.value.indexOf(',')))
                                dispatch(NewFormActionCreators.setCompletions('bankName', []))
                            }}>{item.value}</li>
                        )) : null}
                    </ul>
                </li>
                <li className="item">
                    <label className="form-group has-float-label">
                        <label htmlFor="city" className="d-none">??????????</label>
                        <input
                          className="form-control"
                          type="text"
                          id="city"
                          placeholder="??????????"
                          value={bankAccountCity}
                          onChange={e => setBankAccountCity(e.target.value)}/>
                        <span>??????????</span>
                    </label>
                </li>
                <li className="item auto-complete">
                    <label className="form-group has-float-label">
                        <label htmlFor="bic" className="d-none">??????</label>
                        <InputMask className="phone form-control" id="bik"
                                   placeholder="XXXXXX"
                                   value={bankAccountBik}
                                   onChange={e => {
                                       handleBankAccountBik(e.currentTarget.value)
                                       if (e.target.value.length >= 3) {
                                           dispatch(findBankThunk(e.target.value, 'bankBic'));
                                       }
                                   }}
                                   onFocus={() => {
                                       setBicCompletionsVisible(true)
                                       if (bankAccountBik.length >= 3) {
                                           dispatch(findBankThunk(bankAccountBik, 'bankBic'));
                                       }
                                   }}
                                   onBlur={() => {
                                       setBicCompletionsVisible(false)
                                   }}
                                   mask="999999" maskChar=""/>
                        <span>??????</span>
                    </label>
                    <ul className={`completions ${bicCompletionsVisible ? '' : 'inactive'}`}>
                        {bicCompletions ? bicCompletions.map(item => (
                            <li key={item.value} onClick={() => {
                                setBankName(item.value)
                                setBankAccountBik(item.data.bic);
                                setIsBankAccountBikValid(true)
                                setBankAccountCorrAcc(item.data.correspondent_account);
                                setIsBankAccountCorrAccValid(true)
                                setBankAccountCity(item.data.address.value.slice(2, item.data.address.value.indexOf(',')))
                                dispatch(NewFormActionCreators.setCompletions('bankBic', []))
                            }}>{item.value}</li>
                        )) : null}
                    </ul>
                </li>
                <li className="item">
                    <label className="form-group has-float-label">
                        <InputMask className="phone form-control" id="correspondent-account"
                                   placeholder="XXXXX XXXXX XXXXX XXXXX"
                                   value={bankAccountCorrAcc}
                                   onChange={e => {
                                       handleBankAccountCorrAcc(e.currentTarget.value)
                                   }}
                                   mask="99999 99999 99999 99999" maskChar=""/>
                        <span >?????????????????????????????????? ????????</span>
                        <label htmlFor="correspondent-account" className="d-none">?????????????????????????????????? ????????</label>
                    </label>
                </li>
                <li className="item">
                    <div className="d-flex position-relative">
                        <label className="form-group has-float-label" style={{width: "100%"}}>
                            <input className="form-control" type="text" maxLength="4" value={turboBonus} onChange={(e) => setTurboBonus(e.target.value)}
                                   placeholder="0000" id="tyrbobonus2"/>
                            <span>????????????????????</span>
                            <label htmlFor="tyrbobonus2" style={{display: 'none'}}>????????????????????</label>
                            <img src={questions} className="turbo-bonus-tooltip" alt="questions" data-tip
                                 data-for="turboBonus"/>
                            <CustomTooltip id="turboBonus" place="right">?????????????? ???????????????? ?? ???????????????? ????????????</CustomTooltip>
                        </label>
                    </div>
                </li>
                <li className="item item-checkbox">
                    <input
                        type="checkbox"
                        id="item-input-checkbox-2"
                        className="checkbox"
                        value={isAssignment}
                        onChange={setAssignment}
                    />
                    <label htmlFor="item-input-checkbox-2">???????????????? ???? ???????????????????????? ??????????????????????</label>
                    {
                        isAgreementOpen ? <button className="check-grey"
                                                  onClick={(e) => {
                                                      e.preventDefault()
                                                      setIsAgreementOpen(false)
                                                  }}><img
                                src={checkGrey} alt="checkGrey"/></button>
                            :
                            <button className="check-grey active"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setIsAgreementOpen(true)
                                    }}><img className="check-grey-rotated"
                                            src={checkGrey} alt="checkGrey"/></button>
                    }
                </li>

                <li className={isAgreementOpen ? "item-checkbox active" : "item-checkbox hide"}>
                    <ul className="item-checkbox-list">
                        <li className="item ">
                            <p>???????????????????????? ????????????????
                                ???????????? ?????????????????????????????? ???????????????????????? ????????????????
                                ?????????? ?????????????????????? ?????? ???????????????????????? ???? ????????????
                                ?????????????????? ???????????? ?????????????????????? ???????????????? ???? ????????????????
                                ?????????????????? ???????????????????? ????????????????: ???????????????? ??????.
                                ???????? ??????????????????????: ???????????????? ????????
                                ?????????????????? ????????????: ???????????? ?? ???????????????????? ?????????????????????? ????????????,
                                ???????????????????????? ???????????????????????? I ?? II ???????????? ?? ???????????????????? ??????????????????????
                                ????????????. ?????????????????? ????????????
                            </p>
                        </li>
                    </ul>
                </li>
                <li className="item item--centered">
                <div onClick={(e) => handleSubmit(e)}>
                    <NavLink
                        to={'/new_application-docs-uploading'}
                        className={`btn btn_blue ${checkFormFields() ? 'disabled' : ''}`}
                    >??????????
                    </NavLink>
                </div>
                </li>
            </ul>
        </div>
    )
}
