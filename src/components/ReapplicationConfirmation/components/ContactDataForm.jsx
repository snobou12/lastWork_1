import React, {useState, useEffect} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import InputMask from "react-input-mask";
import {AccountApi} from '../../../server/agent'
import * as Yup from 'yup';
import { parseDateString } from "../utils/parseDateString";
import handlePhone, {beforeMaskedValueChangeHandler, formatChars} from "../../../helpers/handle-phone";

const ContactDataForm = () => {

    const [contactDataVisible, setContactDataVisible] = useState(false);

    const [noPatronymic, setNoPatronymic] = useState(false)
    const [phone, setPhone] = useState('')

    const [contactFormValues, setContactFormValues] = useState({
        applicationId:"",
        name: "",
        lastName: "",
        patronymic: "",
        birthDate: '1988-08-17', // yyyy-mm-dd
        // phone: '',
        email: '',
    })

    const validationContactSchema = Yup.object({
        name: Yup.string().required('Поле не может быть пустым'),
        lastName: Yup.string().required('Поле не может быть пустым'),
        birthDate: Yup.date().transform(parseDateString).max(new Date(), 'Некорректная дата'),
        email: Yup.string().email('Неверный формат почты').required('Поле не может быть пустым')
    })

    const getPersonalData = () => {
        AccountApi.getPersonalData()
        .then(response=>{
          setContactFormValues({
              applicationId:response.data.applicationId,
              name: response.data.name,
              lastName: response.data.lastName,
              patronymic: response.data.patronymic,
              birthDate: response.data.birthDate.substr(0,10), // yyyy-mm-dd
              // phone: response.data.phone,
              email: '',
            }
          )
            setPhone(response.data.phone)
          response.data.patronymic ? setNoPatronymic(false) : setNoPatronymic(true)
        })
        .catch(error=>console.log(error))
    }

    useEffect(()=>{
        getPersonalData()
    },[])

    return (
        <>
            <label className="label">ФИО и контактные данные</label>
            <div className={`reapplication-item ${contactDataVisible ? 'active' : ''}`}>
                <div className="reapplication-item-value">{contactFormValues.name + " " + contactFormValues.lastName + " " + contactFormValues.patronymic}</div>
                <a className="reapplication-item-icon" onClick={() => setContactDataVisible(!contactDataVisible)}></a>
                <Formik
                    enableReinitialize={true}
                    initialValues={contactFormValues}
                    validationSchema={validationContactSchema}
                >
                    <Form className="reapplication-item-desc">
                        <ul className="form-list">
                            <li className="item">
                                <label className="form-group has-float-label">
                                    <label htmlFor="item-input-surname" className="d-none">Фамилия</label>
                                    <Field type="text" className="form-control" placeholder=" " name="name" id="item-input-contact-surname" />
                                    <span>Фамилия</span>
                                    <div className="error-text"><ErrorMessage name="name"/></div>
                                </label>
                            </li>
                            <li className="item ">
                                <label className="form-group has-float-label">
                                    <label htmlFor="item-input-name" className="d-none">Имя</label>
                                    <Field type="text" placeholder=" " className="form-control" name="lastName" id="item-input-contact-name" />
                                    <span>Имя</span>
                                    <div className="error-text"><ErrorMessage name="lastName"/></div>
                                </label>
                            </li>
                            <li className="item">
                                <label className="form-group has-float-label">
                                    <label htmlFor="item-input-middlename" className="d-none">Отчество</label>
                                    <Field type="text" className="form-control" placeholder=" " name="patronymic" id="item-input-contact-middlename" disabled={noPatronymic} />
                                    <span>Отчество</span>
                                    <ErrorMessage name="patronymic"/>
                                </label>
                            </li>
                            <li className="item item-checkbox-none">
                                <input
                                    type="checkbox"
                                    id="item-input-contact-checkbox"
                                    className="checkbox"
                                    checked={noPatronymic}
                                    onChange={() => {setNoPatronymic(!noPatronymic)}}
                                />
                                <label
                                    htmlFor="item-input-contact-checkbox"
                                    style={{width: 'fit-content'}}
                                >
                                    Нет отчества
                                </label>
                            </li>
                            <li className="item ">
                                <label className="form-group has-float-label">
                                    <label htmlFor="datepicker" className="d-none">Дата рождения</label>
                                    <Field
                                        type="date"
                                        placeholder=""
                                        name='birthDate'
                                        id="datepicker"
                                        className="datepicker-ru form-control"
                                    />
                                    <span>Дата рождения</span>
                                    <div className="error-text"><ErrorMessage name="birthDate"/></div>
                                </label>
                            </li>
                            <li className="item">
                                <label className="form-group has-float-label">
                                    <label htmlFor="item-input-phone" className="d-none">Телефон</label>
                                    {/*<Field name="phone"*/}
                                    {/*       as={InputMask}*/}
                                    {/*       className="form-control"*/}
                                    {/*       mask="+7\ 999 999 99 99"*/}
                                    {/*       maskChar={null}*/}
                                    {/*       placeholder=" "*/}
                                    {/*/>*/}
                                    <InputMask
                                        className={`form-control`}
                                        placeholder="+7 (999) 999-99-99"
                                        value={phone}
                                        onChange={e => {
                                            handlePhone(e, phone, setPhone)
                                        }}
                                        mask="*9 (999) 999 99 99"
                                        maskChar={null}
                                        formatChars={formatChars}
                                        beforeMaskedValueChange={beforeMaskedValueChangeHandler}
                                    />
                                    <span>Телефон</span>
                                </label>
                            </li>
                            <li className="item ">
                                <label className="form-group has-float-label">
                                    <label htmlFor="item-input-email" className="d-none">Почта</label>
                                    <Field type="email" className="form-control" name="email" id="item-input-contact-email" placeholder=" " />
                                    <span>Почта</span>
                                    <div className="error-text"><ErrorMessage name="email"/></div>
                                </label>
                            </li>
                            <li className="item">
                                <ul className="d-flex" style={{marginBottom: 0}}>
                                    <li>
                                        <button
                                            className={`btn btn_blue`}
                                            type="submit"
                                        >
                                            Редактировать данные
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className={`btn btn_border_blue`}
                                            type="button"
                                        >
                                            Выйти без изменений
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </Form>
                </Formik>
            </div>
        </>
    )

}

export default ContactDataForm
