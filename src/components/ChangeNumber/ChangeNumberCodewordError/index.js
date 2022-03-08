import React from 'react';
import eye from '../../../img/eye.png'

export const ChangeNumberCodewordError = () => {
    return (
        <main className="page-registration">
            <form action="" className="form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 registration-col">
                            <div className="h1 -md-hide">Введите данные для изменения номера телефона</div>

                            <ul className="form-list">
                                <li className="item">
                                    <label htmlFor="password" className="label">Старый номер</label>
                                    <input type="password" id="password" className="password" value="password"/>
                                    <div className="password-icon"><img src={eye} alt="eye"/></div>
                                </li>
                                <li className="item">
                                    <a href="#" className="color-blue text-decoration-underline">Не помню кодовое
                                        слово</a>

                                </li>
                                <li className="item">
                                    <div className="error-text mb-3">Кодовое слово указано неверно. Осталось N-1
                                        попытка
                                    </div>

                                    <button className="btn btn_blue" type="submit">Далее</button>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </form>
        </main>
    );
};
