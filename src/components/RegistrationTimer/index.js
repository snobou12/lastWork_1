import React, {useEffect, useState} from 'react';

export const RegistrationTimer = () => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(5);

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                setMinutes(minutes - 1)
                setSeconds(60)
            }
            if (minutes === 0) {

                if (seconds === 0) {
                    clearInterval(myInterval);
                    setSeconds(0)
                    setMinutes(0)
                }
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
                                <div className="h1">Блокировка ввода
                                    <br/>СМС-кода
                                </div>
                                <p>Вы неправильно ввели код авторизации 4 раза. <br/>
                                    Повторная попытка ввода кода будет доступна через:</p>
                            </div>


                            <div className="timer">
                                <div className="timer_section">
                                    <div className="timer_section-count minutes_1">{minutes >= 10 ? minutes.toString().split().join()[0] : 0}</div>
                                    <div className="timer_section-count minutes_2">{minutes >= 10 ? minutes.toString().split().join()[1] : minutes.toString().split().join()[0]}</div>
                                    <div className="timer_section_desc">минуты</div>
                                </div>
                                <div className="timer_delimetr">:</div>
                                <div className="timer_section">
                                    <div className="timer_section-count seconds_1">{seconds >= 10 ? seconds.toString().split().join()[0] : 0}</div>
                                    <div className="timer_section-count seconds_2">{seconds >= 10 ? seconds.toString().split().join()[1] : seconds.toString().split().join()[0]}</div>
                                    <div className="timer_section_desc">секунды</div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </form>
        </main>
    );
};
