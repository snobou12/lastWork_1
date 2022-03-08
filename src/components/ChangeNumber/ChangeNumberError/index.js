import React from 'react';

export const ChangeNumberError = () => {
    return (
        <main className="page-registration">
            <form action="" className="form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 registration-col">
                            <div className="h1 -md-hide">Введите данные для изменения номера телефона</div>

                            <ul className="form-list">
                                <li className="item error error-icon">
                                    <label htmlFor="item-input-phone-old" className="label">Старый номер</label>
                                    <input type="text" id="item-input-phone-old" placeholder="+7 (___) ___-__-__"
                                           className="phone border-red"/>
                                    <div className="error-text">Проверьте правильность введенного номера</div>
                                </li>
                                <li className="item error error-icon">
                                    <label htmlFor="item-input-phone" className="label">Новый номер</label>
                                    <input type="text" id="item-input-phone" placeholder="+7 (___) ___-__-__"
                                           className="phone border-red"/>
                                    <div className="error-text">Проверьте правильность введенного номера</div>
                                </li>
                                <li className="item error ">
                                    <label htmlFor="datepicker" className="label">Дата рождения</label>
                                    <input type="text" id="datepicker" value="1988-08-17" translate="no"
                                           className="border-red datepicker-ru"/>
                                    <div className="error-text">Неверно указана дата</div>
                                </li>
                                <li className="item error ">
                                    <div className="error-text">Неверно введен старый номер и/или дата рождения.
                                        Осталось N-1 попытка
                                    </div>
                                </li>
                                <li className="item">
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
