import React from 'react';

export const RegistrationNumberConfirmationError = () => {
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
                                <div className="code-sms error ">
                                    <div className="text-left">
                                        Код из СМС
                                    </div>
                                    <div className="error-icon">
                                        <input type="password" value="1234"/>
                                    </div>
                                    <div className="error-text">Веевден не корректный код <br/>
                                        Осталось попыток: 2</div>
                                </div>
                                <ul className="link-block">
                                    <li><a href="#" className="">Выслать код повторно </a></li>
                                    <li><a href="#" className="text-decoration-none">Изменить номер</a></li>
                                </ul>
                                <div className="btn btn_blue">Далее</div>
                            </div>

                        </div>


                    </div>
                </div>
            </form>
        </main>
    );
};
