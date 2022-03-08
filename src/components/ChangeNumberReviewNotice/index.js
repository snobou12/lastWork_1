import React from 'react';
import checkMail from '../../img/svg/check-email.svg'
import {NavLink} from "react-router-dom";

export const ChangeNumberReviewNotice = () => {
    return (
        <main className="page-registration">
            <form action="" className="form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 registration-col">
                            <div className="confirmation confirmation--center confirmation--vertical-middle d-flex ">
                                <img src={checkMail} alt="checkMail"/>
                                <p>Ваши данные отправлены на рассмотрение, ожидайте звонка оператора контактного
                                    центра</p>
                                <ul className="link-block">
                                    <li><NavLink to="/authorization">Авторизация</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    );
};
