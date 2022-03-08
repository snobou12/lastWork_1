import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {registrationReducer} from "../../store/reducers/regestration-reducer";
import {NavLink, useHistory} from "react-router-dom";
import {
    checkRegistrationCodeThunk, createContactThunk,
    resendRegistrationCodeThunk,
    sendRegistrationCodeThunk
} from "../../server/thunks/thunks";
import {AccountApi} from "../../server/agent";

export const RegistrationNumberConfirmation = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const isLoading = useSelector(state => state.registrationReducer);
    const codeId = useSelector(state => state.registrationReducer.codeId);
    const tempUserId = useSelector(state => state.registrationReducer.tempUserId);
    const genderId = useSelector(state => state.registrationReducer.genderId);
    const phone = useSelector(state => state.registrationReducer.phone);
    const amounts = useSelector(state => state.loanReducer);
    let errors = useSelector((state) => state.registrationReducer.errors ? state.registrationReducer.errors : null);

    const [code, setCode] = useState('');
    const [isCodeCorrect, setIsCodeCorrect] = useState('');
    const [incorrectAttemptsLeft, setIncorrectAttemptsLeft] = useState(3);
    const [seconds, setSeconds] = useState(60);
    const [codeError, setCodeError] = useState(null)

    // временная штука с кодом, который высылается на телефон
    useEffect(() => {
        AccountApi.getSentCode().then(res => console.log(res))
    }, [codeId])


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(checkRegistrationCodeThunk({
            codeId,
            code
        })).then(res => {
            if (res.result){
                createUser()
            } else {
                setCodeError(res)
            }
        })
    }

    const createUser = () => {
        dispatch(createContactThunk({
            tempUserId,
            amount: amounts.loanAmount,
            term: amounts.term,
            genderId
        })).then(res => {
            if (res.data.result){
                history.push('/authorization')
            } else {
                setCodeError(res)
            }
        })
    }

    const checkCode = () => {
        return code.length === 4
    }

    const resendCode = () => {
        dispatch(resendRegistrationCodeThunk({
            tempUserId
        })).then(res => {
            if (res.result){
                setCodeError(null)
                setSeconds(60)
            } else {
                setCodeError(res)
            }
        })
    }


    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                clearInterval(myInterval);
            }
        }, 1000);
        return () => {
            clearInterval(myInterval);
        };
    });

    return (
        <main className="page-registration">
            <form className="form" onSubmit={handleSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 registration-col">
                            <div className="confirmation confirmation--center text-center">
                                <div className="h1">Подтвердите мобильный телефон</div>
                                <p>Код подтверждения отправлен на номер <a href="tel:+79020010203">{ phone }</a> <br/>
                                    Введите полученный код</p>
                                <div
                                    className={`code-sms ${isCodeCorrect === false ? 'error' : ''}`}
                                >
                                    <div className="text-left">Код из СМС</div>
                                    <div className="error-icon">
                                        <input
                                            type="password"
                                            onChange={e => setCode(e.currentTarget.value)}
                                            value={code}
                                            maxLength={4}
                                        />
                                    </div>
                                    {codeError &&
                                    <div className="error-text">{codeError.errorMessage}</div>
                                    }
                                    {!isLoading ?
                                        <div className="lds-spinner">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                        : <p>Получить код повторно можно <br/>через 00:{seconds.toString().padStart(2, "0")}</p>
                                    }
                                </div>
                                <ul className="link-block">
                                    {seconds == 0 ?
                                        <li><a  className="" onClick={resendCode}>Выслать код повторно </a></li> : null
                                    }
                                        <li><NavLink to={'/choosing-reset-method'} href="#" className="text-decoration-none">Изменить номер</NavLink></li>
                                </ul>
                                <button
                                    disabled={!checkCode()}
                                    className={`btn btn_blue ${!checkCode() ? 'disabled' : ''}`}
                                    type="submit"
                                >
                                    Далее
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    );
};
