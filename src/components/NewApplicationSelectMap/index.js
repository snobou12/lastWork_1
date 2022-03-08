import React, {useState, useEffect} from 'react';
import visa from '../../img/svg/visa.svg'
import house from '../../img/svg/house.svg'
import yandex from '../../img/svg/yandex.svg'
import { useSelector, useDispatch } from "react-redux";
import { getCalculatorSettingsThunk } from '../../server/thunks/thunks';
import { CardPayment } from "./components/CardPayment";
import { WalletPayment } from "./components/WalletPayment";
import { BankAccountPayment } from './components/BankAccountPayment';
import {ProgressBarCreators} from "../../store/action-creators";


export const NewApplicationSelectMap = () => {
    const dispatch = useDispatch();
    const availablePayment = useSelector(state => state.newFormReducer.availablePayment);

    const [tabs, setTabs] = useState([
        {
            component: <CardPayment />,
            id: 1,
            name: "Платежная карта",
            image: visa,
        },
        {
            component: <BankAccountPayment />,
            id: 2,
            name: "Банковский счет",
            image: house,
        },
        {
            component: <WalletPayment />,
            id: 3,
            name: "ЮМoney",
            image: yandex,
        }
    ])

    const [ activeTab, setActiveTab ] = useState("Платежная карта")

    useEffect(() => {
        dispatch(ProgressBarCreators.setPercent({
            percent: 80,
            greenStripe: 80,
            lightGreenStripe: 90
        }))
    }, [])

    useEffect(() => {
        dispatch(getCalculatorSettingsThunk({applicationId: "20C60AA1-55AB-4AEF-9DBE-BC8D5020544D"}))
    }, [])

    useEffect(() => {
        if(availablePayment){
            const availableTabs = tabs.filter(tab => availablePayment.find((item) => tab.name !== item.name))
            setTabs(availableTabs)
        }
    }, [availablePayment])

    const renderTab = () => {
        const selectedTab = tabs.filter(i => i.name == activeTab)
        return selectedTab[0].component
    }

    return (
        <main className="page-registration">
            <form action="" className="form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 registration-col">
                            <div className="h1">Выберите способ получения денег</div>
                            <ul className="nav nav-tabs nav-list-select" style={{marginBottom: "30px", width:"100%", maxWidth: "630px"}}>
                                {tabs.map(item => {
                                    const isActive = activeTab === item.name;
                                    const border = isActive ? "1px solid #007bc9" :"1px solid #e5e5e5"
                                    const background = isActive ? "#edf8ff" :"#fff"
                                    return (
                                    <li onClick={(e) => {
                                        e.preventDefault()
                                        setActiveTab(item.name)
                                    }}
                                    style={{width: "33.33%",
                                            padding: "0 6px",
                                            borderRadius: "14px",
                                            border: border,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: background,
                                           }}>
                                        <a
                                            style={{ border: "none" }}
                                            data-toggle="tab" href="" >
                                            <img src={item.image} alt="tab"/>
                                        </a>
                                    </li>
                                )})}
                            </ul>

                            <div
                                className="tab-content"
                                style={{  maxWidth: "600px" }}
                            >

                                {renderTab()}

                            </div>
                        </div>
                    </div>
                </div>
           </form>
        </main>

);
};
