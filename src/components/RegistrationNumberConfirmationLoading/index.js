import React from 'react';

export const RegistrationNumberConfirmationLoading = () => {
    return (
        <main className="page-registration">
            <form action="" className="form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 registration-col">
                            <div className="confirmation confirmation--center text-center">
                                <div className="h1">Подтвердите мобильный телефон</div>
                                <p>Код подтверждения отправлен на номер +7 (902) 001-02-03. <br/>
                                    Введите полученный код</p>
                                <div className="code-sms">
                                    <div className="text-left">
                                        Код из СМС
                                    </div>
                                    <input type="password" value="1234"/>
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
                                </div>
                                <ul className="link-block">
                                    <li><a href="#" className="">Выслать код повторно </a></li>
                                    <li><a href="#" className="text-decoration-none">Изменить номер</a></li>
                                </ul>
                                <div className="btn btn_blue mx-auto">Далее</div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    );
};
