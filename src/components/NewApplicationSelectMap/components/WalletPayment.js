import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import InputMask from "react-input-mask";
import questions from '../../../img/svg/questions.svg'
import checkGrey from '../../../img/svg/check-grey.svg'
import {addWalletThunk} from "../../../server/thunks/thunks";
import NavLink from "react-router-dom/es/NavLink";
import CustomTooltip from "../../../ui/CustomTooltip";

export const WalletPayment = () => {
    const dispatch = useDispatch();

    const [isAgreementOpen, setIsAgreementOpen] = useState(false);
    const [walletNumber, setWalletNumber] = useState('')
    const [turboBonus, setTurboBonus] = useState('')

    const [isWalletNumberValid, setIsWalletNumberValid] = useState(false);
    const [isAssignment, setIsAssignment] = useState(false);

    const handleWalletNumber = (value) => {
        setWalletNumber(value)
        if (value.length < 14) {
            setIsWalletNumberValid(false)
        } else {
            setIsWalletNumberValid(true)
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
        const fieldsValidations = {
            isAssignment,
            isWalletNumberValid
        }

        const fieldsWithErrors = Object.keys(fieldsValidations).some(p => fieldsValidations[p] === false);

        return fieldsWithErrors
    }

    const applicationId = useSelector(state => state.newFormReducer.applicationId);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addWalletThunk({
            applicationId,
            walletNumber
        }))
    }
    return (
        <div id="yandex" className="tab-pane fade">
            <ul className="form-list">
                <li className="item">
                    <div className="h3">На электронный кошелек</div>
                </li>
                <li className="item">
                    <label className="form-group has-float-label" style={{width: "100%"}}>
                        <label htmlFor="number-wallet" className="d-none">Номер кошелька</label>
                        <InputMask className="phone form-control" id="number-wallet"
                                   placeholder="XXXX XXXX XXXX XXXX"
                                   value={walletNumber}
                                   onChange={e => handleWalletNumber(e.currentTarget.value)}
                                   mask="9999 9999 9999 9999" maskChar=""/>
                        <span>Номер кошелька</span>
                    </label>
                </li>
                <li className="item">
                    <div className="d-flex position-relative">
                        <label className="form-group has-float-label" style={{width: "100%"}}>
                            <input className="form-control" type="text" maxLength="4" value={turboBonus} onChange={(e) => setTurboBonus(e.target.value)}
                                   placeholder="0000" id="tyrbobonus2"/>
                            <span>Турбобонус</span>
                            <label htmlFor="tyrbobonus2" style={{display: 'none'}}>Турбобонус</label>
                            <img src={questions} className="turbo-bonus-tooltip" alt="questions" data-tip
                                 data-for="turboBonus"/>
                            <CustomTooltip id="turboBonus" place="right">Укажите промокод и получите скидку</CustomTooltip>
                        </label>
                    </div>
                </li>
                <li className="item item-checkbox">
                    <input
                        type="checkbox"
                        id="item-input-checkbox-3"
                        className="checkbox"
                        value={isAssignment}
                        onChange={setAssignment}
                    />
                    <label htmlFor="item-input-checkbox-3">Согласен на добровольное страхование</label>
                    {
                        isAgreementOpen ? <button className="check-grey"
                                                  onClick={(e) => {
                                                      //e.preventDefault()
                                                      setIsAgreementOpen(false)
                                                  }}>
                                <img src={checkGrey} alt="checkGrey"/>
                            </button>
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
                            <p>Наименование продукта
                                Услуга предоставляется наименование компании
                                Полис страхования для ознакомления по ссылке
                                Стоимость услуги страхования параметр от параметр
                                Стоимость страхового покрытия: параметр руб.
                                Срок страхования: параметр дней
                                Страховые случаи: смерть в результате несчастного случая,
                                установление инвалидности I и II группы в результате несчастного
                                случая. временная утрата
                            </p>
                        </li>
                    </ul>
                </li>
                <li className="item item--centered">
                    <div onClick={(e) => handleSubmit(e)}>

                        <NavLink
                            to={'/new_application-docs-uploading'}
                            className={`btn btn_blue ${checkFormFields() ? 'disabled' : ''}`}
                        >
                            Далее
                        </NavLink>

                    </div>
                </li>
            </ul>
        </div>

    )
}
