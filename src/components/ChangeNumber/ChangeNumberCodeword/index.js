import React, {useState} from 'react';
import eye from '../../../img/eye.png'

export const ChangeNumberCodeword = () => {
    const [showPass, setShowPass] = useState(false)
    const isRightCode = true;
    return (
        <main className="page-registration">
            <form action="" className="form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 registration-col">
                            <div className="h1 -md-hide">Введите данные для изменения номера телефона</div>

                            <ul className="form-list">
                                <li className="item">
                                    <label htmlFor="password" className="label">Кодовое слово</label>
                                    <input type={showPass ? 'text' : 'password'} id="password" className="password"/>
                                    <button
                                        onMouseDown={() => setShowPass(true)}
                                        onMouseUp={() => setShowPass(false)}
                                        className="password-icon"
                                    >
                                            <img src={eye} alt="eye"/>
                                    </button>
                                </li>
                                <li className="item">
                                    <a href="#" className="color-blue text-decoration-underline">Не помню кодовое
                                        слово</a>
                                </li>
                                <li className="item pt-3">
                                    {!isRightCode &&
                                    <div className="error-text mb-3">Кодовое слово указано неверно. Осталось N-1
                                        попытка
                                    </div>}
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
