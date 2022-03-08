import React from 'react';
import checkEmail from '../../img/svg/check-email.svg'

export const RegistrationEmail = () => {
    return (
        <main className="page-registration">
            <form action="" className="form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 registration-col">
                            <div className="confirmation confirmation--center confirmation--vertical-middle d-flex ">
                                <img src={checkEmail} alt="checkEmail"/>
                                <p>На указанный Вами E-mail выслана ссылка
                                    для продолжения регистрации. Пожалуйста, используйте ее в течение</p>
                                <div className="h1 color-blue">24 часов</div>
                                <ul className="link-block">
                                    <li>
                                        <a href="#" className="">Ссылка не получена</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    );
};
