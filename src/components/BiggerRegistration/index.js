import React, {useEffect, useState} from 'react';
import checkGrey from '../../img/svg/check-grey.svg'
import servisesIcon from '../../img/servises-icon.png'

export const BiggerRegistration = () => {
    const [loan, setLoan] = useState(0);
    const [date, setDate] = useState(0);

    const [name, setName] = useState(null);
    const [isValidName, setIsValidName] = useState(false);

    const [registerDate, setRegisterDate] = useState(null);

    const [phone, setPhone] = useState(null)
    const [isValidPhone, setIsValidPhone] = useState(false);

    const [surname, setSurName] = useState(null);
    const [isValidSurname, setIsValidSurname] = useState(false);

    const [mail, setMail] = useState("");
    const [isValidMail, setIsValidMail] = useState(false);

    const [middlename, setMiddlename] = useState(null);
    const [isValidMiddlename, setIsValidMiddlename] = useState(false);

    const [isOpenedList, setIsOpenedList] = useState(false);

    let sumOfReturning = date > 0 && loan + ((loan * (loan / date)) / 0.01) * date;

    const countOverflow = () => {
        if (date <= 7 && date <= 30) {
            return 5
        } else {
            return 6
        }
    }

    const checkValid = (type) => {
        const regexp = /^[a-z\s]+$/i;
        const phoneRegexp = /(^8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))/;
        const mailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

        switch (type){
            case "name":
                if(name !== ""){
                    if(!regexp.test(name)){
                        setIsValidName(true)
                    }else{
                        setIsValidName(false)
                    }
                }
                break;
            case "surname":
                if(!regexp.test(surname)){
                    setIsValidSurname(true)
                }else{
                    setIsValidSurname(false)
                }
                break;
            case "middlename":
                if(!regexp.test(middlename)){
                    setIsValidMiddlename(true)
                }else{
                    setIsValidMiddlename(false)
                }
                break;
            case "phone":
                if(phoneRegexp.test(phone)){
                    setIsValidPhone(true)
                }else{
                    setIsValidPhone(false)
                }
                break;
            case "mail":
                if(mailRegexp.test(mail)){
                    console.log("valid mail")
                    setIsValidMail(true)
                }else{
                    setIsValidMail(false)
                }
                break;
            default: break
        }

    }

    return (
        <main className="page-registration">
            <form action="" className="form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 registration-col">
                            <div className="h1 md-hide">???????????????????? ???????????? ???????????? 5 ??????????</div>
                            <div className="h3 md-hide">?????????????? ?????????????????????? ??????????:</div>
                            <div className="login">
                                <a href="#" className="img">
                                    <img src={servisesIcon} alt="servisesIcon"/>
                                    <span className="md-hide">??????????</span>
                                    <span className="md-visible">?????????????????????? ?????????? ????????????????</span>
                                </a>
                                <ul className="login-list md-hide">
                                    <li>- ???????????????????????????? ???????????????????? ????????????</li>
                                    <li>- ?????????????????????? ???????? ?????????????????? ???? 30%</li>
                                    <li>- ???????????????? ???? 5000 ???????????? ????????????</li>
                                </ul>
                            </div>
                            <ul className="form-list">
                                <li className={isValidSurname ? "item success" : "item"}>
                                    <label htmlFor="item-input-surname" className="label">??????????????</label>
                                    <input type="text" value={surname} id="item-input-surname"
                                           onChange={e => {
                                               setSurName(e.currentTarget.value)
                                               checkValid("surname")
                                           }}
                                           placeholder="??????????????"/>
                                    {(surname !==  null && !isValidSurname) && <div className="error-text">???????????? ?????????????? ???????????????? ????????????????</div>}
                                </li>
                                <li className={isValidName ? "item success" : "item"}>
                                    <label htmlFor="item-input-name" className="label">??????</label>
                                    <input onChange={e => {
                                        setName(e.currentTarget.value)
                                        checkValid("name")
                                    }} type="text" value={name} id="item-input-name" placeholder="??????"/>
                                    {(name !== null && !isValidName) && <div className="error-text">???????????? ?????????????? ???????????????? ????????????????</div>}
                                </li>
                                <li className={isValidMiddlename ? "item success" : "item"}>
                                    <label htmlFor="item-input-middlename" className="label">????????????????</label>
                                    <input type="text" value={middlename} id="item-input-middlename" placeholder="????????????????"
                                           onChange={e => {
                                               setMiddlename(e.currentTarget.value)
                                               checkValid("middlename")
                                           }}
                                    />
                                    {(middlename  !==  null && !isValidMiddlename) && <div className="error-text">???????????? ?????????????? ???????????????? ????????????????</div>}
                                </li>
                                <li className="item ">
                                    <input type="checkbox" id="item-input-checkbox" className="checkbox"/>
                                    <label htmlFor="item-input-checkbox">?????? ????????????????</label>

                                </li>
                                <li className="item ">
                                    <label htmlFor="datepicker" className="label">???????? ????????????????</label>
                                    <input type="date" id="datepicker" onChange={e => setRegisterDate(e.currentTarget.value)}
                                           defaultValue={"2017-01-01"} className="datepicker-ru" translate="no"
                                           value={registerDate}/>
                                </li>
                                <li className={isValidPhone ? "item success" : "item"}>
                                    <label htmlFor="item-input-phone" className="label">??????????????</label>
                                    <input type="text" id="item-input-phone" value={phone} onChange={e => {
                                        setPhone(e.currentTarget.value)
                                        checkValid("phone")
                                    }} placeholder="+7 (___) ___-__-__"
                                           className="phone"/>
                                </li>
                                <li className={isValidMail ? "item success" : "item"}>
                                    <label htmlFor="item-input-email" className="label">??????????</label>
                                    <input type="text" id="item-input-email" value={mail}
                                           onChange={e => {
                                               setMail(e.currentTarget.value)
                                               checkValid("mail")
                                           }}
                                           placeholder="Example@gmail.com"/>
                                </li>
                                <li className="item">
                                    <button className="btn btn_blue" type="submit">??????????</button>
                                </li>

                                <li className="item item-checkbox">
                                    <input type="checkbox" id="item-input-checkbox-2" className="checkbox"/>
                                    <label htmlFor="item-input-checkbox-2">?? ?????????????????????????? ?? ???????????????????? ????
                                        ?????????????????????????? ?????????????? ????????????????????????????????
                                        ?????????????? ?? ??????????????????????, ?????? ?????????????????????? ?? ???????????????? ?? ??????????????????????</label>
                                    {
                                        isOpenedList ? <button className="check-grey"
                                                               onClick={(e) => {
                                                                   e.preventDefault()
                                                                   setIsOpenedList(false)
                                                               }}><img
                                                src={checkGrey} alt="checkGrey"/></button>
                                            :
                                            <button className="check-grey active"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        setIsOpenedList(true)
                                                    }}><img className="check-grey-rotated"
                                                            src={checkGrey} alt="checkGrey"/></button>
                                    }
                                </li>
                                <li className={isOpenedList ? "item-checkbox active" : "item-checkbox hide"}>
                                    <ul className="item-checkbox-list">
                                        <li className="item ">
                                            <input type="checkbox" id="item-input-checkbox-2-1" className="checkbox"
                                                   />
                                            <label htmlFor="item-input-checkbox-2-1">?????????????????? ??????????????????
                                                ???????????????????????? ???????????? <br/>?? ????????
                                                ????????????????????</label>
                                        </li>
                                        <li className="item ">
                                            <input type="checkbox" id="item-input-checkbox-2-2" className="checkbox"
                                                   />
                                            <label htmlFor="item-input-checkbox-2-2">???????????????? ???????????????? ???? ??????????????????
                                                ???????????????????????? ????????????</label>
                                        </li>
                                        <li className="item ">
                                            <input type="checkbox" id="item-input-checkbox-2-3" className="checkbox"
                                                   />
                                            <label htmlFor="item-input-checkbox-2-3">?????????????????? ????????????????????????????
                                                ???????????? </label>
                                        </li>
                                        <li className="item ">
                                            <input type="checkbox" id="item-input-checkbox-2-4" className="checkbox"
                                                   />
                                            <label htmlFor="item-input-checkbox-2-4">???????????? ?????????????????? ????????????????
                                                ???????????????????????????????? ??????????</label>
                                        </li>
                                        <li className="item ">
                                            <input type="checkbox" id="item-input-checkbox-2-5" className="checkbox"
                                                   />
                                            <label htmlFor="item-input-checkbox-2-5">?????????????????? ????????????????????????
                                                ???????????????????????? </label>
                                        </li>
                                        <li className="item ">
                                            <input type="checkbox" id="item-input-checkbox-2-6" className="checkbox"
                                                   />
                                            <label htmlFor="item-input-checkbox-2-6">?????????????????????? ???? ????????????????
                                                ????????????????????????????, <br/>?????????????????????????? ??
                                                ???????????????? ???????????????????????????????? ???????????????????? </label>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>


                        <div className="col-md-4 sidebar-col md-hide">
                            <div className="h2">
                                <ul className="calc-btn">
                                    <li className="pluse">+</li>
                                    <li className="minuse">-</li>
                                    <li className="multiply">*</li>
                                    <li className="exactly">=</li>
                                </ul>
                                <span>???????????? ?????????????????????? ????????????</span>
                            </div>
                            <ul className="form-list">
                                <li className="item">
                                    <label htmlFor="item-input-loan-amount" className="label">?????????? ??????????</label>
                                    <input type="text" value={loan} id="item-input-loan-amount"/>
                                    <div className="rub">???</div>
                                </li>
                                <li className="item progressbar">
                                    {/*<div className="progressbar-scale" style={{width: "70%"}}></div>*/}
                                    {/*<div className="circle" style={{left: "70%"}}></div>*/}
                                    <input defaultValue={0} type="range"
                                           onChange={e => setLoan(e.currentTarget.value * 150)}/>
                                </li>
                                <li className="item">
                                    <ul className="item_list">
                                        <li>1 000</li>
                                        <li>5 000</li>
                                        <li>10 000</li>
                                        <li>15 000</li>
                                    </ul>
                                </li>
                                <li className="item item-data">
                                    <label htmlFor="item-input-loan-term" className="label">????????</label>
                                    <input type="text" value={`${date} ????????`} id="item-input-loan-term"/>
                                </li>
                                <li className="item progressbar">
                                    {/*    <div className="progressbar-scale" style={{width: "70%"}}></div>*/}
                                    {/*    <div className="circle" style={{left: "70%"}}></div>*/}
                                    <input defaultValue={0} type="range"
                                           onChange={e => setDate(Math.floor(e.currentTarget.value * 1.68))}/>
                                </li>
                                <li className="item">
                                    <ul className="item_list">
                                        <li>7 ????????</li>
                                        <li>16 ??????.</li>
                                        <li>24 ??????.</li>
                                    </ul>
                                </li>

                                <li className="item item_sum">
                                    <ul className="item_list">
                                        <li>
                                            <span>?????????? ?? ????????????????:</span>
                                            <div className="green">10 000 ??</div>
                                        </li>
                                        <li>
                                            <span>?????????? ??????????????????:</span>
                                            <div className="green">10 000 ??</div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    );
};

