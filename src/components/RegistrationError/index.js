import React from 'react';
import servisesIcon from '../../img/servises-icon.png'
import checkGrey from '../../img/svg/check-grey.svg'


export const RegistrationError = () => {
    return (
        <main className="page-registration">
            <form action="" className="form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 registration-col">
                            <div className="h1 md-hide">Заполнение заявки займет 5 минут</div>
                            <div className="h3 md-hide">Быстрая регистрация через:</div>
                            <div className="login">
                                <a href="#" className="img">
                                    <img src={servisesIcon} alt="servisesIcon"/>
                                        <span className="md-hide">Войти</span>
                                        <span className="md-visible">Регистрация через Госулуги</span>
                                </a>
                                <ul className="login-list md-hide">
                                    <li>- Автоматическое заполнение анкеты</li>
                                    <li>- Увеличенный шанс обобрения на 30%</li>
                                    <li>- Получите на 5000 рублей больше</li>
                                </ul>
                            </div>
                            <ul className="form-list">
                                <li className="item error error-icon">
                                    <label htmlFor="item-input-surname" className="label">Фамилия</label>
                                    <input type="text" value="Иванов" id="item-input-surname"/>
                                        <div className="error-text">Только символы русского алфавита</div>
                                </li>
                                <li className="item ">
                                    <label htmlFor="item-input-name" className="label">Имя</label>
                                    <input type="text" value="Имя" id="item-input-name"/>
                                </li>
                                <li className="item">
                                    <label htmlFor="item-input-middlename" className="label">Отчество</label>
                                    <input type="text" value="Иванович" id="item-input-middlename"/>
                                </li>
                                <li className="item ">
                                    <input type="checkbox" id="item-input-checkbox" className="checkbox"/>
                                        <label htmlFor="item-input-checkbox">Нет отчества</label>

                                </li>
                                <li className="item ">
                                    <label htmlFor="datepicker" translate="no" className="label">Дата рождения</label>
                                    <input type="text" id="datepicker" className="datepicker-ru" value="1988-08-17"/>
                                </li>
                                <li className="item">
                                    <label htmlFor="item-input-phone" className="label">Телефон</label>
                                    <input type="text" id="item-input-phone" placeholder="+7 (___) ___-__-__"
                                           className="phone"/>
                                </li>
                                <li className="item ">
                                    <label htmlFor="item-input-email" className="label">Почта</label>
                                    <input type="text" id="item-input-email" placeholder="Example@gmail.com"/>
                                </li>
                                <li className="item">
                                    <button className="btn btn_blue" type="submit">Далее</button>
                                </li>
                                <li className="item error">
                                    <div className="error-text">
                                        Для продолжения - необходимо согласиться с условиями предоставления займов
                                    </div>
                                </li>

                                <li className="item item-checkbox error">
                                    <input type="checkbox" id="item-input-checkbox-2" className="checkbox" checked/>
                                        <label htmlFor="item-input-checkbox-2">Я присоединяюсь к Соглашению об
                                            использовании аналога собственноручной
                                            подписи и подтверждаю, что ознакомился и согласен с документами</label>
                                        <a className="check-grey" href="javascript:void(0);"
                                           onClick="$(this).toggleClass('active').parent().next().toggleClass('hide')"><img
                                            src={checkGrey} alt="checkGrey"/></a>
                                </li>
                                <li className="item-checkbox hide">
                                    <ul className="item-checkbox-list">
                                        <li className="item ">
                                            <input type="checkbox" id="item-input-checkbox-2-1" className="checkbox"
                                                   checked/>
                                                <label htmlFor="item-input-checkbox-2-1">Правилами обработки
                                                    персональных данных <br/>и иной
                                                        информации</label>
                                        </li>
                                        <li className="item ">
                                            <input type="checkbox" id="item-input-checkbox-2-2" className="checkbox"
                                                   checked/>
                                                <label htmlFor="item-input-checkbox-2-2">Согласие субъекта на обработку
                                                    персональных данных</label>
                                        </li>
                                        <li className="item ">
                                            <input type="checkbox" id="item-input-checkbox-2-3" className="checkbox"
                                                   checked/>
                                                <label htmlFor="item-input-checkbox-2-3">Правилами предоставления
                                                    займов </label>
                                        </li>
                                        <li className="item ">
                                            <input type="checkbox" id="item-input-checkbox-2-4" className="checkbox"
                                                   checked/>
                                                <label htmlFor="item-input-checkbox-2-4">Общими условиями договора
                                                    потребительского займа</label>
                                        </li>
                                        <li className="item ">
                                            <input type="checkbox" id="item-input-checkbox-2-5" className="checkbox"
                                                   checked/>
                                                <label htmlFor="item-input-checkbox-2-5">Правилами комплексного
                                                    обслуживания </label>
                                        </li>
                                        <li className="item ">
                                            <input type="checkbox" id="item-input-checkbox-2-6" className="checkbox"
                                                   checked/>
                                                <label htmlFor="item-input-checkbox-2-6">Информацией об условиях
                                                    предоставления, <br/>использования и
                                                        возврата потребительского микрозайма </label>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>


                        <div className="col-md-4 sidebar-col md-hide">
                            <div className="h2">
                                <ul className="calc-btn">
                                    <li className="pluse">+</li>
                                    <li className="minuse">-</li>
                                    <li className="multiply">*</li>
                                    <li className="exactly">=</li>
                                </ul>
                                <span>Онлайн калькулятор заявки</span>
                            </div>
                            <ul className="form-list">
                                <li className="item">
                                    <label htmlFor="item-input-loan-amount" className="label">Сумма займа</label>
                                    <input type="text" value="10 000" id="item-input-loan-amount"/>
                                        <div className="rub">₽</div>
                                </li>
                                <li className="item progressbar">
                                    <div className="progressbar-scale" style={{width: "70%"}}></div>
                                    <div className="circle" style={{left: "70%"}}></div>
                                </li>
                                <li className="item">
                                    <ul className="item_list">
                                        <li>1 000</li>
                                        <li>5 000</li>
                                        <li>10 000</li>
                                        <li>15 000</li>
                                    </ul>
                                </li>
                                <li className="item item-data">
                                    <label htmlFor="item-input-loan-term" className="label">Срок</label>
                                    <input type="text" value="13 дней" id="item-input-loan-term"/>
                                </li>
                                <li className="item progressbar">
                                    <div className="progressbar-scale" style={{width: "70%"}}></div>
                                    <div className="circle" style={{left: "70%"}}></div>
                                </li>
                                <li className="item">
                                    <ul className="item_list">
                                        <li>7 дней</li>
                                        <li>16 нед.</li>
                                        <li>24 нед.</li>
                                    </ul>
                                </li>

                                <li className="item item_sum">
                                    <ul className="item_list">
                                        <li>
                                            <span>Сумма к возврату:</span>
                                            <div className="green">10 170 Р</div>
                                        </li>
                                        <li>
                                            <span>Сумма переплаты:</span>
                                            <div className="green">1 170 Р</div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    );
};
