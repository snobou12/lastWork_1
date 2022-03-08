import React, {useState} from 'react';
import InputMask from 'react-input-mask';
import handlePhone, {beforeMaskedValueChangeHandler, formatChars} from "../../../helpers/handle-phone";

export const ChangeNumberStepOne = () => {
    const [oldPhone, setOldPhone] = useState('')
    const [isOldPhoneValid, setIsOldPhoneValid] = useState(false);
    const [newPhone, setNewPhone] = useState('')
    const [isNewPhoneValid, setIsNewPhoneValid] = useState(false);
    const [registerDate, setRegisterDate] = useState('')
    const [isRegisterDateCorrect, setIsRegisterDateCorrect] = useState(true);
    const [oldPhoneErrorMessage, setOldPhoneErrorMessage] = useState('');
    const [newPhoneErrorMessage, setNewPhoneErrorMessage] = useState('');
    const [oldPhoneWrongSecondSignErrorMessage, setOldPhoneWrongSecondSignErrorMessage] = useState(false);
    const [newPhoneWrongSecondSignErrorMessage, setNewPhoneWrongSecondSignErrorMessage] = useState(false);
    const [sentError, setSentError] = useState(false);
    const [remainingAttempts, setRemainingAttempts] = useState(null);


    const checkFormFields = () => {
        const formFields = {
            registerDate,
        }
        const fieldsValidations = {
            isOldPhoneValid,
            isNewPhoneValid
        }

        const emptyFields = Object.keys(formFields).some(p => formFields[p] === '');
        const fieldsWithErrors = Object.keys(fieldsValidations).some(p => fieldsValidations[p] === false);

        return emptyFields || fieldsWithErrors
    }

    return (
        <main className="page-registration">
            <form action="" className="form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 registration-col">
                            <div className="h1 -md-hide">Введите данные для изменения номера телефона</div>

                            <ul className="form-list">
                                <li
                                    className={`item ${oldPhoneErrorMessage === 'Проверьте правильность введенного номера' ? 'error error-icon' : ''}`}
                                >
                                    <label className="form-group has-float-label">
                                        <InputMask
                                                   className={`phone form-control ${oldPhoneErrorMessage === 'Проверьте правильность введенного номера' ? 'border-red' : ''}`}
                                                   id="item-input-phone-old"
                                                   placeholder="+7 (999) 999-99-99"
                                                   value={oldPhone}
                                                   onChange={e => {
                                                       handlePhone(e, oldPhone, setOldPhone, setIsOldPhoneValid, setOldPhoneErrorMessage, setOldPhoneWrongSecondSignErrorMessage)
                                                   }}
                                                   mask="*9 (999) 999 99 99"
                                                   maskChar={null}
                                                   formatChars={formatChars}
                                                   beforeMaskedValueChange={beforeMaskedValueChangeHandler}
                                        />
                                        <span>Старый номер</span>
                                        <label htmlFor="item-input-phone-old" className="d-none">Старый номер</label>
                                    </label>
                                    {!isOldPhoneValid && <div className="error-text">{oldPhoneErrorMessage}</div>}
                                    {oldPhoneWrongSecondSignErrorMessage && <div className="error-text">Вторая цифра номера отлична от 9</div>}
                                </li>
                                <li
                                    className={`item ${newPhoneErrorMessage === 'Проверьте правильность введенного номера' ? 'error error-icon' : ''}`}
                                >
                                    <label className="form-group has-float-label">
                                        <InputMask
                                                   className={`phone form-control ${newPhoneErrorMessage === 'Проверьте правильность введенного номера' ? 'border-red' : ''}`}
                                                   id="item-input-phone"
                                                   placeholder="+7 (999) 999-99-99"
                                                   value={newPhone}
                                                   onChange={e => {
                                                       handlePhone(e, newPhone, setNewPhone, setIsNewPhoneValid, setNewPhoneErrorMessage, setNewPhoneWrongSecondSignErrorMessage)
                                                   }}
                                                   mask="*9 (999) 999 99 99"
                                                   maskChar={null}
                                                   formatChars={formatChars}
                                                   beforeMaskedValueChange={beforeMaskedValueChangeHandler}
                                        />
                                        <span>Новый номер</span>
                                        <label htmlFor="item-input-phone" className="d-none">Новый номер</label>
                                    </label>
                                    {!isNewPhoneValid && <div className="error-text">{newPhoneErrorMessage}</div>}
                                    {newPhoneWrongSecondSignErrorMessage && <div className="error-text">Вторая цифра номера отлична от 9</div>}
                                </li>
                                <li className="item ">
                                    <label className="form-group has-float-label">
                                        <label htmlFor="datepicker" className="d-none">Дата рождения</label>
                                        <input
                                               type="date"
                                               id="datepicker"
                                               translate="no"
                                               onChange={e => setRegisterDate(e.currentTarget.value)}
                                               defaultValue={"2017-01-01"}
                                               className={`datepicker-ru form-control ${!isRegisterDateCorrect ? 'border-red' : ''}`}
                                               value={registerDate}/>
                                        <span>Дата рождения</span>
                                    </label>
                                    {!isRegisterDateCorrect && <div className="error-text">Неверно указана дата</div>}
                                </li>
                                {
                                    sentError &&
                                        <li className="item error">
                                            <div className="error-text">Неверно введен старый номер и/или дата рождения.
                                                Осталось {remainingAttempts} попыток
                                            </div>
                                        </li>
                                }
                                <li className="item pt-3">
                                    <button className={`btn btn_blue ${checkFormFields() ? 'disabled' : ''}`} type="submit">Далее</button>
                                </li>
                            </ul>
                        </div>


                    </div>
                </div>
            </form>
        </main>
    );
};
