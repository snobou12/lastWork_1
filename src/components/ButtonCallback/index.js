import React, {useState} from 'react';

export const ButtonCallback = () => {
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [modalName, setModalName] = useState('');
    const [modalEmail, setModalEmail] = useState('');
    const [modalPhone, setModalPhone] = useState('');

    const toggleModal = () => {
        if (isModalOpened) {
            setIsModalOpened(false)
        } else {
            setIsModalOpened(true)
        }
    }

    return (
        <div className="modal-callback">
            <button className="button_callback" id="button_callback" data-target="#modal_callback" onClick={toggleModal}>
                  <span className="button_callback-icon">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M14.2971 12L12.4309 13.8972C11.6741 14.6667 10.3425 14.6833 9.56932 13.8972L7.70299 12L1 18.8133C1.24951 18.9302 1.52461 19 1.81707 19H20.1831C20.4756 19 20.7506 18.9303 21 18.8134L14.2971 12Z"
                    fill="#007BC9"/>
                <path
                    d="M20.1831 3H1.81699C1.52452 3 1.24942 3.06958 1 3.18618L8.16265 10.4488C8.16313 10.4493 8.1637 10.4494 8.16418 10.4499C8.16466 10.4504 8.16474 10.451 8.16474 10.451L10.4937 12.8125C10.7411 13.0625 11.2591 13.0625 11.5065 12.8125L13.835 10.4514C13.835 10.4514 13.8355 10.4504 13.836 10.4499C13.836 10.4499 13.837 10.4493 13.8375 10.4488L21 3.18614C20.7506 3.06949 20.4756 3 20.1831 3Z"
                    fill="#007BC9"/>
                <path
                    d="M0.210614 4C0.0800915 4.25187 0 4.53146 0 4.83096V16.169C0 16.4685 0.0800035 16.7481 0.21057 17L7 10.5002L0.210614 4Z"
                    fill="#007BC9"/>
                <path
                    d="M21.7894 4L15 10.5002L21.7894 17C21.9199 16.7481 22 16.4685 22 16.169V4.83103C22 4.53146 21.9199 4.25187 21.7894 4Z"
                    fill="#007BC9"/>
                </svg>
                  </span>
                <span className="button_callback-text">Оставить заявку</span>
            </button>
            <div className={`modal_callback ${isModalOpened ? 'active' : ''}`} id="modal_callback">
                <div className="modal_callback-header">
                    <div className="icon">
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13.6322 11L11.8593 12.8972C11.1404 13.6667 9.87535 13.6833 9.14085 12.8972L7.36784 11L1 17.8133C1.23703 17.9302 1.49838 18 1.77622 18H19.2239C19.5018 18 19.7631 17.9303 20 17.8134L13.6322 11Z"
                                fill="white"></path>
                            <path
                                d="M19.2239 3H1.77614C1.4983 3 1.23695 3.06262 1 3.16756L7.80452 9.70395C7.80498 9.70439 7.80551 9.70447 7.80597 9.7049C7.80642 9.70534 7.80651 9.70593 7.80651 9.70593L10.019 11.8312C10.254 12.0563 10.7461 12.0563 10.9811 11.8312L13.1932 9.70629C13.1932 9.70629 13.1937 9.70534 13.1942 9.7049C13.1942 9.7049 13.1952 9.70439 13.1956 9.70395L20 3.16752C19.763 3.06254 19.5018 3 19.2239 3Z"
                                fill="white"></path>
                            <path
                                d="M0.210614 4C0.0800915 4.25187 0 4.53146 0 4.83096V16.169C0 16.4685 0.0800035 16.7481 0.21057 17L7 10.5002L0.210614 4Z"
                                fill="white"></path>
                            <path
                                d="M20.7894 4L14 10.5002L20.7894 17C20.9199 16.7481 21 16.4685 21 16.169V4.83103C21 4.53146 20.9199 4.25187 20.7894 4Z"
                                fill="white"></path>
                        </svg>
                    </div>
                    <span className="title">Оставить заявку</span>
                    <button className="close" id="close" data-close="#modal_callback" onClick={()=> {setIsModalOpened(false)}}>
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="2" y="1" width="23" height="2" transform="rotate(45 2 1)" fill="white"></rect>
                            <rect x="1" y="17" width="23" height="2" transform="rotate(-45 1 17)" fill="white"></rect>
                        </svg>
                    </button>
                </div>
                <div className="modal_callback-content">
                    <div className="prompt">
                        Оставьте свои контактные данные,
                        и мы свяжемся с вами в ближайшее время
                    </div>
                    <form>
                        <input
                            type="text"
                            placeholder="Имя"
                            value={modalName}
                            onChange={e => setModalName(e.currentTarget.value)}
                        />
                        <input
                            type="email"
                            placeholder="E-mail"
                            value={modalEmail}
                            onChange={e => setModalEmail(e.currentTarget.value)}
                        />
                        <input
                            type="text"
                            placeholder="Телефон"
                            className="phone"
                            value={modalPhone}
                            onChange={e => setModalPhone(e.currentTarget.value)}
                        />
                        <textarea name="" placeholder="Ваше сообщение"/>
                        <ul className="btn-list">
                            <li>
                                <a href="#" className="btn btn_border_blue">Заказать звонок</a>
                            </li>
                            <li>
                                <a href="#" className="btn btn_blue">Отправить</a>
                            </li>
                        </ul>
                    </form>
                </div>
                <div className="modal_callback-footer">
                    <span>Работает на платформе <a href="#">LiveTex</a></span>
                </div>
            </div>
        </div>
    )
}
