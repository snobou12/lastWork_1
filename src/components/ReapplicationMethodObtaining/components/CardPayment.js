import React, { useState, useEffect } from "react";
import { FinancingApi } from '../../../server/agent';
import NavLink from "react-router-dom/es/NavLink";
import checkGrey from '../../../img/svg/check-grey.svg'
import {useSelector} from "react-redux";
import questions from "../../../img/svg/questions.svg";
import CustomTooltip from "../../../ui/CustomTooltip";

export const CardPayment = () => {

    const [frameData, setFrameData] = useState(null);
    const [turboBonus, setTurboBonus] = useState('')
    const [isAgreementOpen, setIsAgreementOpen] = useState(false);
    const [isAssignment, setIsAssignment] = useState(false);
    const applicationId = useSelector(state => state.newFormReducer.applicationId);

    useEffect(()=> {
        FinancingApi.getPaymentFrame(applicationId)
        .then(res=> { setFrameData(res.frame)})
    }, [])

    const setAssignment = () => {
       setIsAssignment(!isAssignment)
    }

    const checkFormFields = () => {
        return !isAssignment
    }

    return (
        <>
        <div id="map" className="tab-pane fade in active" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <iframe src={frameData?.url} height={frameData?.height} width={frameData?.width}/>
        </div>
        <ul
            className="form-list form-list--card-payment"
            style={{
                alignSelf: "stretch",
            }}
        >
            <li className="item">
                <div className="d-flex position-relative">
                    <label className="form-group has-float-label" style={{width: "100%"}}>
                        <input className="form-control" type="text" maxLength="4" value={turboBonus} onChange={(e) => setTurboBonus(e.target.value)}
                               placeholder="0000" id="tyrbobonus2"/>
                        <span>Турбобонус</span>
                        <label htmlFor="tyrbobonus2" style={{display: 'none'}}>Турбобонус</label>
                        <img src={questions} className="turbo-bonus-tooltip" alt="questions" data-tip
                             data-for="turboBonus"/>
                        <CustomTooltip id="turboBonus" place="right">Укажите промокод и получите скидку</CustomTooltip>
                    </label>
                </div>
            </li>
            <li className="item item-checkbox">
                <input
                    type="checkbox"
                    id="item-input-checkbox-2"
                    className="checkbox"
                    value={isAssignment}
                    onChange={setAssignment}
                />
                <label htmlFor="item-input-checkbox-2">Согласен на добровольное страхование</label>
                {
                    isAgreementOpen ? <button className="check-grey"
                                              onClick={(e) => {
                                                  e.preventDefault()
                                                  setIsAgreementOpen(false)
                                              }}><img src={checkGrey} style={{ width: "100%"}} alt="checkGrey"/></button>
                      :
                      <button className="check-grey active"
                              onClick={(e) => {
                                  e.preventDefault()
                                  setIsAgreementOpen(true)
                              }}><img  style={{ width: "100%"}}
                                       src={checkGrey} alt="checkGrey"/></button>
                }
            </li>
            <div className={isAgreementOpen  ? "item-checkbox active" : "item-checkbox hide"} style={{ marginBottom:"20px"}}>
                <ul className="item-checkbox-list">
                    <li className="item ">
                        <p>Наименование продукта
                            Услуга предоставляется наименование компании
                            Полис страхования для ознакомления по ссылке
                            Стоимость услуги страхования параметр от параметр
                            Стоимость страхового покрытия: параметр руб.
                            Срок страхования: параметр дней
                            Страховые случаи: смерть в результате несчастного случая,
                            установление инвалидности I и II группы в результате несчастного
                            случая. временная утрата
                        </p>
                    </li>
                </ul>
            </div>
        </ul>
            <div style={{display: 'flex'}}>
                <NavLink
                    to={'/new_application-docs-uploading'}
                    className={`btn btn_blue ${checkFormFields() ? 'disabled' : ''}`}
                >
                    Далее
                </NavLink>
            </div>
        </>
    )
}
