import React, {useEffect} from 'react';
import {NavLink} from "react-router-dom";
import denied from '../../img/denied.png'
import {useDispatch, useSelector} from "react-redux";
import {getDictionariesThunk} from "../../server/thunks/thunks";

export const RegistrationExistingAccount = () => {

    const dispatch = useDispatch()
    const registrationInfo = useSelector((state) => state.registrationReducer ? state.registrationReducer: null);
    const dictionaries = useSelector(state => state.newFormReducer?.dictionaries);

    useEffect(() => {
        dispatch(getDictionariesThunk())
    }, [])

    const respectGender = () => {
        if (registrationInfo.genderId === dictionaries.gender.find(item => item.name === 'Женский').id ){
            return 'Уважаемая'
        } else if (registrationInfo.genderId === dictionaries.gender.find(item => item.name === 'Мужской').id ){
            return 'Уважаемый'
        } else {
            return 'Уважаемый'
        }
    }

    return (
        <main className="page-registration">
            <form action="" className="form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 registration-col">
                            <div className="denied text-center">
                                <img src={denied} alt="denied"/>
                                <div className="denied-text">
                                    {respectGender()}, {registrationInfo.firstName} {registrationInfo.lastName} {registrationInfo.middleName}!
                                    Вы уже зарегистрированы в системе. Введите данные на странице <NavLink to="authorization">входа в кабинет</NavLink>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>
            </form>
        </main>
    );
};
