import React, {useEffect, useState} from 'react';
import servisesIcon from '../../img/servises-icon.png'
import {useDispatch, useSelector} from "react-redux";
import {LoanActionCreators} from "../../store/action-creators";
import InputMask from 'react-input-mask';
import {loginThunk} from "../../server/thunks/thunks";
import handlePhone, {beforeMaskedValueChangeHandler, formatChars} from "../../helpers/handle-phone";
import NavLink from "react-router-dom/es/NavLink";


export const Authorization = () => {
    const dispatch = useDispatch();
    const amounts = useSelector(state => state.loanReducer);

    const dataError = false;

    const [loan, setLoan] = useState(0);
    const [date, setDate] = useState(0);

    const [phone, setPhone] = useState('')
    const [isValidPhone, setIsValidPhone] = useState(false);
    const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
    const [phoneWrongSecondSignErrorMessage, setPhoneWrongSecondSignErrorMessage] = useState(false);

    const [registerDate, setRegisterDate] = useState('');

    const checkFormFields = () => {
        const formFields = {
            registerDate,
        }
        const fieldsValidations = {
            isValidPhone
        }

        const emptyFields = Object.keys(formFields).some(p => formFields[p] === '');
        const fieldsWithErrors = Object.keys(fieldsValidations).some(p => fieldsValidations[p] === false);

        return emptyFields || fieldsWithErrors
    }

    useEffect(() => {
        const responseFromBack = 0.02;
        if(date <= 30){
            dispatch(LoanActionCreators.setRefundAmount(loan + ((loan * responseFromBack) / 0.01) * loan))
            dispatch(LoanActionCreators.setOverpaymentAmount(amounts.refundAmount - loan))
        }

    }, [loan, date])

    const handleSubmit = (e) => {
        e.preventDefault();
        // dispatch(loginThunk({
        // }))
    }

    return (
        <main className="page-registration">
            <form action="" className="form" onSubmit={handleSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 registration-col">
                            <div className="h1 -md-hide">?????????????????? ???????????? ???? ????????</div>
                            <div className="h3 md-hide">?????????? ??????????:</div>
                            <div className="login">
                                <a href="#" className="img">
                                    <img src={servisesIcon} alt="servisesIcon"/>
                                    <span className="md-hide">??????????</span>
                                    <span className="md-visible">?????????? ?????????? ????????????????</span>
                                </a>
                                <ul className="login-list md-hide">
                                    <li>- ???????????????????????????? ???????????????????? ????????????</li>
                                    <li>- ?????????????????????? ???????? ?????????????????? ???? 30%</li>
                                    <li>- ???????????????? ???? 5000 ???????????? ????????????</li>
                                </ul>
                            </div>
                            <ul className="form-list">
                                <li className={isValidPhone ? "item success" : "item .error-icon"}>
                                    <label className="form-group has-float-label">
                                        <label htmlFor="item-input-phone" className="d-none">??????????????</label>
                                        <InputMask className="phone form-control" id="item-input-phone"
                                                   placeholder="+7 (999) 999-99-99"
                                                   value={phone}
                                                   onChange={e => {
                                                       handlePhone(e, phone, setPhone, setIsValidPhone, setPhoneErrorMessage, setPhoneWrongSecondSignErrorMessage)
                                                   }}
                                                   mask="*9 (999) 999 99 99"
                                                   maskChar={null}
                                                   formatChars={formatChars}
                                                   beforeMaskedValueChange={beforeMaskedValueChangeHandler}
                                        />
                                        <span>??????????????</span>
                                    </label>
                                    {!isValidPhone && <div className="error-text">{phoneErrorMessage}</div>}
                                    {phoneWrongSecondSignErrorMessage && <div className="error-text">???????????? ?????????? ???????????? ?????????????? ???? 9</div>}
                                </li>
                                <li className="item">
                                    <label className="form-group has-float-label">
                                        <label htmlFor="datepicker" className="d-none">???????? ????????????????</label>
                                        <input type="date" id="datepicker"
                                               onChange={e => setRegisterDate(e.currentTarget.value)}
                                               translate="no"
                                               // defaultValue={"2017-01-01"}
                                               className="datepicker-ru form-control"
                                               value={registerDate}/>
                                        <span>???????? ????????????????</span>
                                    </label>
                                </li>
                                <li className="item">
                                    <a href="" className="color-blue text-decoration-underline">?????????????????? ??????????
                                        ?????????????????</a>
                                </li>
                                {dataError && <li className="item error">
                                    <div className="error-text">?????????????? ???????????? ?????????? ??/?????? ???????? ????????????????. <br/>
                                        ?????????????? ????????????????: N
                                    </div>
                                </li>}
                                <li className="item">
                                    <NavLink className={`btn btn_blue ${checkFormFields() ? 'disabled' : ''}`} to="/authorization-number-confirmation" >??????????</NavLink>
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
                                <span>???????????? ?????????????????????? ????????????</span>
                            </div>
                            <ul className="form-list">
                                <li className="item">
                                    <label htmlFor="item-input-loan-amount" className="label">?????????? ??????????</label>
                                    <input type="text" value={loan} id="item-input-loan-amount"/>
                                    <div className="rub">???</div>
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
                                    <label htmlFor="item-input-loan-term" className="label">????????</label>
                                    <input type="text" value={`${date} ????????`} id="item-input-loan-term"/>
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
                                        <li>7 ????????</li>
                                        <li>16 ??????.</li>
                                        <li>24 ??????.</li>
                                    </ul>
                                </li>

                                <li className="item item_sum">
                                    <ul className="item_list">
                                        <li>
                                            <span>?????????? ?? ????????????????:</span>
                                            <div className="green">{amounts.refundAmount} ??</div>
                                        </li>
                                        <li>
                                            <span>?????????? ??????????????????:</span>
                                            <div className="green">{amounts.overpaymentAmount} ??</div>
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
