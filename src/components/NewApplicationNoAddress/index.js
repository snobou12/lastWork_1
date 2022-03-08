import React from 'react';

export const NewApplicationNoAddress = () => {
    return (
        <main className="page-registration">
            <form action="" className="form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 registration-col">
                            <div className="h1 md-hide">Укажите адрес регистрации и фактического проживания</div>

                            <ul className="form-list">
                                <li className="item ">
                                    <label htmlFor="region" className="label">Регион РФ</label>
                                    <input type="text" placeholder="Московская область" id="region"/>
                                </li>
                                <li className="item ">
                                    <label htmlFor="city" className="label">Населенный пункт</label>
                                    <input type="text" placeholder="Москва" id="city"/>
                                </li>
                                <li className="item ">
                                    <label htmlFor="street" className="label">Улица</label>
                                    <input type="text" placeholder="Красная площадь" id="street"/>
                                </li>
                                <li className="item-3">
                                    <ul className="item-3-list">
                                        <li className="item ">
                                            <label htmlFor="house" className="label">Дом</label>
                                            <input type="text" id="house"/>
                                        </li>
                                        <li className="item ">
                                            <label htmlFor="frame" className="label">Корпус</label>
                                            <input type="text" value="10" id="frame"/>
                                        </li>
                                        <li className="item ">
                                            <label htmlFor="flat" className="label">Квартира</label>
                                            <input type="text" value="30" id="flat"/>
                                        </li>
                                    </ul>
                                </li>

                                <li className="item ">
                                    <input type="checkbox" id="address-registration" className="checkbox"/>
                                        <label htmlFor="address-registration">Фактический адрес совпадает с
                                            регистрацией</label>
                                </li>
                                <li className="item ">
                                    <label htmlFor="region" className="label">Регион РФ</label>
                                    <input type="text" placeholder="Московская область" id="region"/>
                                </li>
                                <li className="item ">
                                    <label htmlFor="city" className="label">Населенный пункт</label>
                                    <input type="text" placeholder="Москва" id="city"/>
                                </li>
                                <li className="item ">
                                    <label htmlFor="street" className="label">Улица</label>
                                    <input type="text" placeholder="Красная площадь" id="street"/>
                                </li>
                                <li className="item-3">
                                    <ul className="item-3-list">
                                        <li className="item ">
                                            <label htmlFor="house" className="label">Дом</label>
                                            <input type="text" placeholder="10" id="house"/>
                                        </li>
                                        <li className="item ">
                                            <label htmlFor="frame" className="label">Корпус</label>
                                            <input type="text" placeholder="10" id="frame"/>
                                        </li>
                                        <li className="item ">
                                            <label htmlFor="flat" className="label">Квартира</label>
                                            <input type="text" placeholder="30" id="flat"/>
                                        </li>
                                    </ul>
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
