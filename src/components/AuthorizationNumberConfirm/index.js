import React, {useEffect, useState} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {MessageApi} from "../../server/agent";

export const AuthorizationNumberConfirm = () => {
    const history = useHistory();

    const [code, setCode] = useState('');
    const [isCodeCorrect, setIsCodeCorrect] = useState('');
    const [incorrectAttemptsLeft, setIncorrectAttemptsLeft] = useState(3);
    const [seconds, setSeconds] = useState(60);

    const sendCode = async () => {
        let result = await MessageApi.checkCode(code);
        history.push("/authorization-blocking-counter")
    };

    const requestCodeResend = async () => {
        let result = await MessageApi.requestCodeResend("contactId"); // contactId?
    };

    const resendCode = (e) => {
        e.preventDefault();
        setSeconds(60)
        requestCodeResend();
    }

    const checkCode = () => {
        return code.length === 4
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
            <form action="" className="form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 registration-col">
                            <div className="confirmation confirmation--center text-center">
                                <div className="h1">Подтвердите мобильный телефон</div>
                                <p>Код подтверждения отправлен на номер <a href="tel:+79020010203">+7 (902)
                                    001-02-03.</a> <br/>
                                    Введите полученный код</p>
                                <div
                                    className={`code-sms ${isCodeCorrect === false ? 'error' : ''}`}
                                >
                                    <div className="text-left">
                                        Код из СМС
                                    </div>
                                    <div className="error-icon">
                                        <input type="password" onChange={e => setCode(e.currentTarget.value)} maxLength={4} value={code}/>
                                    </div>
                                    {isCodeCorrect === false &&
                                    <div className="error-text">Веевден не корректный код <br/>
                                        Осталось попыток: {incorrectAttemptsLeft}</div>
                                    }
                                    <p>Получить код повторно можно <br/>через 00:{seconds.toString().padStart(2, "0")}</p>
                                </div>
                                <ul className="link-block">
                                    {seconds == 0 ? (
                                        <li>
                                            <button
                                                className="button-resend"
                                                onClick={resendCode}
                                            >
                                                Выслать код повторно{" "}
                                            </button>
                                        </li>
                                    ) : null}
                                </ul>
                                <NavLink
                                    to="/new_application-timer"
                                    className={`btn btn_blue ${!checkCode() ? 'disabled' : ''}`}
                                    onClick={sendCode}
                                >
                                    Далее
                                </NavLink>
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </main>
    );
};
