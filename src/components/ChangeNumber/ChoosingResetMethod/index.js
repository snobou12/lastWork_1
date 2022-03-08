import React, {useState} from 'react';
import chooseNumberOne from '../../../img/svg/choose-number-1.svg'
import chooseNumberTwo from '../../../img/svg/choose-number-2.svg'

export const ChoosingResetMethod = () => {
    const [activeCode, setActiveCode] = useState(false);
    const [activeMail, setActiveMail] = useState(false);
    return (
        <main className="page-registration">
            <form action="" className="form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 registration-col">
                            <div className="h1">Выберите способ изменения номера</div>

                            <ul className="tab-list">
                                <li onMouseEnter={() => setActiveCode(true)}  onMouseLeave={() => setActiveCode(false)} className={activeCode && "active"}>
                                    <div className="item">
                                        <img src={chooseNumberOne} alt="chooseNumberOne"/>
                                    </div>
                                    <span>Кодовое слово</span>
                                </li>
                                <li onMouseEnter={() => setActiveMail(true)}  onMouseLeave={() => setActiveMail(false)} className={activeMail && "active"}>
                                    <div className="item">
                                        <img src={chooseNumberTwo} alt="chooseNumberTwo"/>
                                    </div>
                                    <span>Адрес  электронной почты</span>
                                </li>
                            </ul>

                            <button className="btn btn_blue" type="submit">Далее</button>

                        </div>


                    </div>
                </div>
            </form>
        </main>
    );
};
