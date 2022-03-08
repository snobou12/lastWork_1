import React, { useState, useEffect } from "react";
import {AddressApi, OfferApi} from "../../server/agent";
import NavLink from "react-router-dom/es/NavLink";
import {useHistory} from "react-router-dom";
import {ProgressBarCreators} from "../../store/action-creators";
import {useDispatch, useSelector} from "react-redux";

export const NewApplicationTimer = () => {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(5);
    const [messageText, setMessageText] = useState('Мы Вам перезвоним');
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(ProgressBarCreators.setPercent({
            percent: 100,
            greenStripe: 100,
            lightGreenStripe: 100
        }))
    }, [])


    useEffect(() => {
        const fetchData = async () => {
            const message = await OfferApi.getPendingMessage();
            const time = await OfferApi.getPendingTime();


            setMessageText(message.data.infoMessage)
            setMinutes(time.data.infoMessage)
            setLoading(false);
        };

        fetchData();
    }, [])


    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                setMinutes(minutes - 1)
                setSeconds(59)
            }
            if (minutes === 0) {

                if (seconds === 0) {
                    clearInterval(myInterval);
                    setSeconds(0)
                    setMinutes(0)
                    history.push("/new_application-select-map");
                }
            }
        }, 1000);
        return () => {
            clearInterval(myInterval);
        };
    });

    return  (
        <main className="page-registration">
            {!loading && (
                <form action="" className="form">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 registration-col">
                                <div className="confirmation confirmation--center text-center">
                                    <div className="h1">Ваша заявка <br />на рассмотрении</div>
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

                                <div className="confirmation confirmation--center text-center pt-3">
                                    {messageText}
                                </div>
                            </div>
                            <NavLink style={{ display: "block", width: "fit-content", margin: "30px auto 0 auto", fontSize: "30px" }} to="/new_application-select-map">перейти</NavLink>
                        </div>
                    </div>
                </form>
            )}
        </main>
    )
}



