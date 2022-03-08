import React, {useState} from 'react';
import question from '../../img/svg/question.svg'
import InputMask from "react-input-mask";
import NavLink from "react-router-dom/es/NavLink";

export const NewApplicationAdditionalQuestionsExpanded = () => {
    const [phone, setPhone] = useState(null)
    const [isValidPhone, setIsValidPhone] = useState(false);

    const [birthDate, setBirthDate] = useState('');
    const [dateOfIssue, setDateOfIssue] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const checkValid = (type) => {
        const regexp = /^[a-z\s]+$/i;
        const phoneRegexp = /^(()+([0-9]){10})$/;
        const mailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

        switch (type) {
            case "phone":
                if (phoneRegexp.test(phone)) {
                    setIsValidPhone(true)
                } else {
                    setIsValidPhone(false)
                }
                break;
            default:
                break
        }

    }


    return (
        <main className="page-registration">
            <form action="" className="form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 registration-col">
                            <div className="h1 md-hide">Дополнительные вопросы</div>
                            <ul className="form-list">
                                <li className="item ">
                                    <label htmlFor="country" className="label">Гражданство</label>
                                    <input type="text" placeholder="Российская Федерация" id="country" />
                                </li>
                                <li className="list-checkbox">
                                    <ul className="list-checkbox-in">
                                        <li>
                                            <div className="h3">Сведения о представителях</div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <input type="checkbox" id="additional-questions-1" className="checkbox"/>
                                                    <label htmlFor="additional-questions-1">Представители
                                                        отсутсвуют</label>
                                                    <img src={question} alt="question"/>
                                            </div>
                                            <ul className="expanded-check">
                                                <li className="item ">
                                                    <label htmlFor="" className="label label-general-light">Тип лица</label>
                                                    <div className="select">
                                                        <select className="slct">
                                                            <option value="">Физ. лицо</option>
                                                            <option value="">Юр. лицо</option>
                                                        </select>
                                                    </div>
                                                </li>
                                                <li className="item ">
                                                    <label htmlFor="additional-information" className="label">Дополнительная
                                                        информация</label>
                                                    <input type="text" placeholder="Текст" id="additional-information"/>
                                                </li>
                                                <li className="item ">
                                                    <label htmlFor="fio" className="label">ФИО</label>
                                                    <input type="text" placeholder="Иванов Иван Иванович" id="fio"/>
                                                </li>
                                                <li className="item ">
                                                    <label htmlFor="datepicker" translate="no" className="label">Дата рождения</label>
                                                    <input type="date" id="datepicker" translate="no" onChange={e => setBirthDate(e.currentTarget.value)} className="datepicker-ru"
                                                            defaultValue='03.02.2021' value={birthDate}/>
                                                </li>
                                                <li className="item">
                                                    <label htmlFor="place-birth" className="label">Место
                                                        рождения</label>
                                                    <input type="text" id="place-birth" placeholder="Москва"/>
                                                </li>
                                                <li className=" ">
                                                    <ul className="pessword_data">
                                                        <li className="item ">
                                                            <label htmlFor="passport-1" className="label">Серия
                                                                документа</label>
                                                            <input type="text" placeholder="0000" id="passport-1"/>
                                                        </li>
                                                        <li className="item ">
                                                            <label htmlFor="passport-2" className="label">Номер
                                                                документа</label>
                                                            <input type="text" placeholder="0000" id="passport-2"/>
                                                        </li>
                                                        <li className="item ">
                                                            <label htmlFor="datepicker2" className="label">Дата
                                                                выдачи</label>
                                                            <input type="date" id="datepicker2"
                                                                   defaultValue='03.02.2021' translate="no"
                                                                   className="datepicker-ru"
                                                                   onChange={e => setDateOfIssue(e.currentTarget.value)}
                                                                   value={dateOfIssue}/>
                                                        </li>
                                                        <li className="item ">
                                                            <label htmlFor="passport-4" className="label">Код
                                                                подразделения</label>
                                                            <input type="text" placeholder="322-233" id="passport-4"/>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="item">
                                                    <label htmlFor="name-organ" className="label">Наименование органа,
                                                        выдавшего документ</label>
                                                    <input type="text" id="name-organ" placeholder="Подразделение"/>
                                                </li>
                                                <li className="item">
                                                    <label htmlFor="number-cards" className="label">Номер миграционной
                                                        карты</label>
                                                    <input type="text" id="number-cards" placeholder="0000-0000"/>
                                                </li>
                                                <li className="item ">
                                                    <label htmlFor="datepicker3" className="label">Дата начала срока
                                                        пребывания</label>
                                                    <input type="date" id="datepicker3" translate="no" onChange={e => setStartDate(e.currentTarget.value)} className="datepicker-ru"
                                                           value={startDate}/>
                                                </li>
                                                <li className="item ">
                                                    <label htmlFor="datepicker4" className="label">Дата окончания срока
                                                        пребывания</label>
                                                    <input type="date" id="datepicker4" translate="no" onChange={e => setFinishDate(e.currentTarget.value)} className="datepicker-ru"
                                                           value={finishDate}/>
                                                </li>
                                                <li className="item">
                                                    <label htmlFor="city" className="label">Адрес места жительства или
                                                        пребывания</label>
                                                    <input type="text" id="city" placeholder="Москва"/>
                                                </li>
                                                <li className="item">
                                                    <label htmlFor="inn" className="label">ИНН</label>
                                                    <input type="text" id="inn" placeholder="0000000000"/>
                                                </li>
                                                <li className="item">
                                                    <label htmlFor="cnilc" className="label">СНИЛС</label>
                                                    <input type="text" id="cnilc" placeholder="ХХХ-ХХХ-ХХХ YY"/>
                                                </li>
                                                <li className="item">
                                                    <label htmlFor="attorney" className="label">Доверенность</label>
                                                    <input type="text" id="attorney" placeholder="0000000000"/>
                                                </li>
                                                <li className="item">
                                                    <label htmlFor="ogr" className="label">ОГРНИП</label>
                                                    <input type="text" id="ogr" placeholder="0000000000"/>
                                                </li>
                                                <li className="item">
                                                    <label htmlFor="plase-ip" className="label">Место регистрации
                                                        ИП</label>
                                                    <input type="text" id="plase-ip" placeholder="0000000000"/>
                                                </li>
                                                <li className="item">
                                                    <label htmlFor="item-input-phone" className="label">Номер
                                                        телефона</label>
                                                    <InputMask className="phone" id="item-input-phone"
                                                               placeholder="+7"
                                                               onChange={e => {
                                                                   setPhone(e.currentTarget.value)
                                                                   checkValid("phone")
                                                               }}
                                                               mask="+7\ 999 999 999 99" maskChar=" "/>
                                                </li>
                                                <li className="item ">
                                                    <label htmlFor="item-input-email" className="label">Электронная
                                                        почта</label>
                                                    <input type="text" id="item-input-email"
                                                           placeholder="example@gmail.com"/>
                                                </li>
                                            </ul>
                                        </li>


                                        <li>
                                            <div className="h3">Сведения о выгодоприобретателях</div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <input type="checkbox" id="additional-questions-2" className="checkbox"
                                                       checked/>
                                                    <label htmlFor="additional-questions-2">Выгодоприобретатели
                                                        отсутствуют</label>
                                                    <img src={question} alt="question"/>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="h3">Сведения о бенефициарных владельцах клиента</div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <input type="checkbox" id="additional-questions-3" className="checkbox"
                                                       checked/>
                                                    <label htmlFor="additional-questions-3">Бенефициарные владельцы
                                                        отсутствуют</label>
                                                <img src={question} alt="question"/>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="h3">Сведения о принадлежности к ПДЛ</div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <input type="checkbox" id="additional-questions-4" className="checkbox"
                                                       checked/>
                                                    <label htmlFor="additional-questions-4">Не являюсь публичным
                                                        должностным лицом</label>
                                                    <img src={question} alt="question"/>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="h3">Сведения о степени родства (статусе) по отношению к
                                                ПДЛ
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <input type="checkbox" id="additional-questions-5" className="checkbox"
                                                       checked/>
                                                    <label htmlFor="additional-questions-5">Не являюсь близким
                                                        родственником или супругом(ой) ПДЛ</label>
                                                <img src={question} alt="question"/>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="h3">Сведения о степени родства (статусе) по отношению к
                                                ПДЛ
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <input type="checkbox" id="additional-questions-6" className="checkbox"
                                                       checked/>
                                                    <label htmlFor="additional-questions-6">Не являюсь близким
                                                        родственником или супругом(ой) ПДЛ</label>
                                                    <img src={question} alt="question"/>
                                            </div>
                                        </li>
                                    </ul>
                                </li>


                                <li className="item ">
                                    <div className="h3">Сведения о целях установления и предполагаемом характере деловых
                                        отношений с компанией
                                    </div>

                                    <div className="select">
                                        <select className="slct">
                                            <option value="">С целью получения микрозайма в личных целях</option>
                                        </select>
                                    </div>
                                </li>
                                <li className="item ">
                                    <div className="h3">Сведения о финансово-хозяйственной деятельности</div>

                                    <div className="select">
                                        <select className="slct">
                                            <option value="">Не веду финансово-хозяйственную деятельность</option>
                                            <option value="">Веду финансово-хозяйственную деятельность</option>
                                        </select>

                                    </div>
                                </li>
                                <li className="item ">
                                    <div className="h3">Сведения о финансовом положении</div>
                                    <div className="select">
                                        <select className="slct">
                                            <option value="">Положительная</option>
                                            <option value="">Хорошая</option>
                                            <option value="">Плохая</option>
                                        </select>
                                    </div>
                                </li>
                                <li className="item ">
                                    <div className="h3"></div>
                                    <label htmlFor="" className="label label-general">Сведения о деловой репутации</label>
                                    <div className="select">
                                        <select className="slct">
                                            <option value="">Положительная</option>
                                            <option value="">Хорошая</option>
                                            <option value="">Плохая</option>
                                        </select>
                                    </div>
                                </li>
                                <NavLink to={'/new_application-number-confirmation'} className="btn btn_blue">Далее
                                    </NavLink>


                            </ul>
                        </div>


                    </div>
                </div>
            </form>
        </main>

);
};
