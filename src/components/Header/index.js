import React, {useState, useEffect} from 'react';
import logo from '../../img/svg/logo.svg'
import logoMD from '../../img/svg/logo-md.svg'
import arrowCircleRight from '../../img/svg/arrow-circle-right.svg'
import {useSelector} from "react-redux";
import {Calculator} from "../Calculator";
import {CalculatorMobile} from "../CalculatorMobile";
import {AccountApi, OfferApi} from "../../server/agent";
import NavLink from "react-router-dom/es/NavLink";

export const Header = () => {
    const amounts = useSelector(state => state.loanReducer)
    const progressbarOptions = useSelector(state => state.progressbarReducer.options)

    const [showCalc, setShowCalc] = useState(false)
    const [loading, setLoading] = useState(true)
    const [lkUrl, setLkUrl] = useState('')
    const [phone, setPhone] = useState('')
    const [workingMode, setWorkingMode] = useState('')

    const openCalculator = () => {
        setShowCalc(!showCalc)
    }

    const periodType = () => {
        if (amounts.periodTypeId === '40250ae9-0770-4ca9-939d-fdb3a3c867bd'){
            return 'дней'
        } else {
            return 'недель'
        }
    }

    useEffect(()=> {
        const fetchData = async () => {
            const url = await AccountApi.redirectToLk();
            const headerText = await AccountApi.getHeaderText();

            if (url.result) {
                setLkUrl(url.redirectUrl)
            }
            if (headerText.result) {
                setPhone(headerText.phone)
                setWorkingMode(headerText.workingMode)
            }

            setLoading(false);
        };
        fetchData();
    }, [])

    return (

        <header className="header">
            <div className="header-top">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 header-top-col-left">
                            <a href="#" className="logo">
                                <img src={logo} alt="logo" className="md-hide"/>
                                <img src={logoMD} alt="logoMD" className="md-visible"/>
                            </a>
                        </div>
                        <div className="col-md-9 header-top-col-right">
                            <a href="tel:8-499-951-9180" className="phone">{phone}</a>
                            <div className="time">
                                {workingMode}
                                {/*c 7:00 до 20:00 мск, <br/>*/}
                                {/*без выходных (звонок платный)*/}
                            </div>
                            {
                                loading ?    <a href="#" className="btn btn_blue_dark">
                                                <img src={arrowCircleRight} alt="arrowCircleRight"/>
                                                <span className="md-hide">Личный кабинет</span>
                                                <span className="md-visible">Вход</span>
                                            </a>
                                      :
                                            <a href={lkUrl} className="btn btn_blue_dark">
                                                <img src={arrowCircleRight} alt="arrowCircleRight"/>
                                                <span className="md-hide">Личный кабинет</span>
                                                <span className="md-visible">Вход</span>
                                            </a>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-calc">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 header-calc-col-progressbar md-hide">
                            <div className="header-calc-title">
                                <div className="header-calc-title-in"><span>Уже заполнено</span></div>
                                <div className="header-calc-title-in">
                                    <div className="bold">{progressbarOptions.percent} %</div>
                                </div>
                            </div>
                            <div className="progressbar">
                                <div className="progressbar-scale" style={{width: `${progressbarOptions.lightGreenStripe}%`}}></div>
                                <div className="circle" style={{width: `${progressbarOptions.greenStripe}%`}}></div>
                            </div>
                        </div>

                        <div className="col-md-6 header-calc-col-result mw-480 md-hide">
                            <div className="header-calc-title">
                                <div className="header-calc-title-in">
                                    <span>Вы берете займ на сумму:</span>
                                    <b>{amounts.loanAmount} ₽</b>
                                </div>
                                <div className="header-calc-title-in">
                                    <span>Сроком на:</span>
                                    <b>{amounts.term} {periodType()}</b>
                                </div>
                                <div className="position-relative">
                                    <ul className="calc-btn" onClick={openCalculator}>
                                        <li className="pluse">+</li>
                                        <li className="minuse">-</li>
                                        <li className="multiply">*</li>
                                        <li className="exactly">=</li>
                                    </ul>
                                    {
                                        showCalc &&
                                        <div className="header-calculator">
                                            <Calculator/>
                                        </div>
                                    }
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-12 md-visible">
                            <CalculatorMobile/>
                        </div>
                        <div className="col-md-12 header-calc-col-progressbar md-visible">
                            <div className="header-calc-title">
                                <div className="header-calc-title-in"><span>Уже заполнено</span></div>
                                <div className="header-calc-title-in">
                                    <div className="bold">{progressbarOptions.percent}%</div>
                                </div>
                            </div>
                            <div className="progressbar">
                                <div className="progressbar-scale" style={{width: `${progressbarOptions.lightGreenStripe}%`}}></div>
                                <div className="circle" style={{width: `${progressbarOptions.greenStripe}%`}}></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



        </header>

    );
};
