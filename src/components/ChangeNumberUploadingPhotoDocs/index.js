import React, {useState, useRef, useEffect} from 'react';
import arrowDownload from '../../img/svg/arrowDown.svg'
import arrowDown from '../../img/svg/arrow-down-blue.svg'
import preview from '../../img/svg/image.svg'
import trash from '../../img/svg/trash.svg'

export const ChangeNumberUploadingPhotoDocs = () => {
    const [passportData, setPassportData] = useState([]);
    const [isListOpened, setIsListOpened] = useState(false);
    const [sentError, setSentError] = useState(false);

    const [amount, setAmount] = useState([]);
    const inputRef = useRef(null);

    const handleChange = async (e) => {
        console.log(e.target.files[0]);
         setPassportData(e.target.files[0]);

    };

    const uploadPassport = (e, file) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("passportData", e.target.files[0])
        const data = formData.get("passportData");
        console.log(data.name) // file's name
        setPassportData( file)
        console.log(passportData) // []
    }
    useEffect(() => {
        inputRef.current.addEventListener("input", handleChange);
    }, []);

    return (
        <main className="page-registration">
            <form action="" className="form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 registration-col">
                            <div className="h1 -md-hide">Загрузите фото/сканы документов</div>
                            <ul className="form-list">
                                <li className="item">
                                    <p className="info">Для изменения номера телефона необходимо пройти процесс
                                        аутентификации личности. Для этого загрузите,
                                        пожалуйста, фото своего лица (селфи)
                                        со 2-м разворотом паспорта (2 и 3 страницы с фотографией),
                                        а также фото листа бумаги с надписью "Изменить номер" и новым
                                        номером со 2 разворотом паспорта (2 и 3 страницы с фотографией)</p>
                                </li>
                                <li className="item pb-3">
                                    <a
                                        className="text-decoration-underline color-blue d-flex"
                                        onClick={() => {setIsListOpened(!isListOpened)}}
                                    >
                                        <span className="d-inline mr-3">Инструкция</span> <img
                                        src={arrowDown} alt="arrowDown"/>
                                    </a>
                                    <div
                                        className="item-hide"
                                        className={`item-hide ${isListOpened ? 'active' : ''}`}
                                    >
                                        <div>
                                            <p><b>Фото своего лица (селфи) со своим паспортом.</b></p>
                                            <p>Сделайте и прикрепите селфи с паспортом (второй разворот с фото на уровне
                                                лица). Постарайтесь не перекрыть серию и номер паспорта пальцами, очки
                                                следует снять.</p>
                                        </div>
                                        <div>
                                            <p><b>Фото листа с надписью "Изменить номер".</b></p>
                                            <p>Прикрепите фото паспорта (второй разворот с фото ) рядом с листом, на
                                                котором будет написано или напечатано предложение "Изменить номер" и
                                                указан новый номер телефона.</p>
                                        </div>
                                        <div>
                                            <p><b>Паспорт гражданина РФ (фото- или скан-копия).</b></p>
                                            <p>Прикрепите следующие страницы Вашего паспорта:</p>
                                            <ul className="list">
                                                <li>страница со сведениями по ранее выданным паспортам</li>
                                            </ul>
                                            <p><span className="color-blue">Важно!</span> Данный скан необходим, если с
                                                момента последнего обращения в Компанию у Вас произошла замена паспорта.
                                            </p>
                                        </div>
                                        <div>
                                            <p><b>Требования к прикрепляемым файлам.</b></p>
                                            <p>Подойдут следующие форматы: <span className="color-blue">BMP, PNG, JPG, PDF.</span>
                                            </p>
                                            <p><span className="color-blue">Важно!</span> Все фото должны быть хорошего
                                                качества, читаемы.</p>
                                            <p>После загрузки всех файлов нажмите кнопку <span
                                                className="color-blue">«Далее»</span>.</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="item pt-3">
                                    <div className="inputfile-box inputfile-box--change-number">
                                        <input type="file" name="file" id="input_file" className="inputfile"
                                               data-multiple-caption="{count} files selected" multiple=""
                                               ref={inputRef} />
                                        <label htmlFor="input_file"><strong>
                                            <img src={arrowDownload} alt="arrowDown"/></strong><span>Паспорт гражданина РФ (главная)</span></label>
                                    </div>
                                </li>
                                <li className="item">
                                    <ul className="result-img">
                                        <li>
                                            <div className="result-img-item">
                                                <img src={preview} alt="preview"/>
                                                <span>Обложка.jpg</span>
                                            </div>
                                            <a href="#"><img src={trash} alt="trash"/></a>
                                        </li>
                                        <li>
                                            <div className="result-img-item">
                                                <img src={preview} alt="preview"/>
                                                <span>Регистрация.jpg</span>
                                            </div>
                                            <a href="#"><img src={trash} alt="trash"/></a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="item">
                                    <div className="inputfile-box inputfile-box--change-number">
                                        <input type="file" name="file" id="input_file2" className="inputfile"
                                               data-multiple-caption="{count} files selected" multiple=""/>
                                        <label htmlFor="input_file2"><strong><img src={arrowDownload}
                                                                                  alt="arrowDown"/></strong><span>Фото личной банковской карты</span></label>
                                    </div>
                                </li>
                                <li className="item">
                                    <div className="inputfile-box inputfile-box--change-number">
                                        <input type="file" name="file" id="input_file3" className="inputfile"
                                               data-multiple-caption="{count} files selected" multiple=""/>
                                        <label htmlFor="input_file3"><strong><img src={arrowDownload}
                                                                                  alt="arrowDown"/></strong><span>Паспорт гражданина РФ (главная)</span></label>
                                    </div>
                                </li>
                                {sentError &&
                                    <li className="item">
                                        <div className="error-text">
                                            Загруженные фото/сканы не соответствуют требованиям
                                        </div>
                                    </li>
                                }
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
