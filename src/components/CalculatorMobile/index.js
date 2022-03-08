import React, {useEffect, useState} from 'react';
import dataBgWhite from '../../img/svg/data-bg-white.svg'
import {useDispatch, useSelector} from "react-redux";
import {LoanActionCreators} from "../../store/action-creators";
import {getCalculatorSettingsThunk, sendCalculatorSettings} from "../../server/thunks/thunks";


export const CalculatorMobile = () => {

    const dispatch = useDispatch();
    const amounts = useSelector(state => state.loanReducer);

    const [offerSum, setOfferSum] = useState(0 || amounts.loanAmount);
    const [offerPeriod, setOfferPeriod] = useState(0 || amounts.term);
    const [priorityType, setPriorityType] = useState(0);
    const [periodTypeId, setPeriodTypeId] = useState('40250ae9-0770-4ca9-939d-fdb3a3c867bd');



    const calculatorSettings = useSelector(state => state.newFormReducer.calculatorSettings?.settings) || {};
    const currentSettings = useSelector(state => state.newFormReducer.calculatorSettings?.selectedProduct);
    const sumItems = calculatorSettings?.sumItems;
    const productId = currentSettings?.productId;


    const days = calculatorSettings?.periodTypeItems?.[0]?.periodItems;
    const weeks = calculatorSettings?.periodTypeItems?.[1]?.periodItems;
    const lastDay = days?.[days?.length - 1];     // наибольший срок в днях
    const lastWeek = weeks?.[weeks?.length - 1];  // наибольший срок в неделях
    const maxOfferSum = calculatorSettings?.sumItems?.[calculatorSettings?.sumItems?.length - 1]; // наибольшая доступная сумма
    const arr = Array(weeks?.length).fill(0).map((p, i) => i + lastDay + 1); // массив недель превращаем в продолжение массива дней
    const periodAmount = days ? [...days, ...arr] : []; // массив объединенный "дни + недели" для input type="range"


    useEffect(() => {

        dispatch(getCalculatorSettingsThunk({applicationId: "20C60AA1-55AB-4AEF-9DBE-BC8D5020544D"}))

    }, [])

    useEffect(() => {

        setLoan();
        setTerm();

    }, [amounts])


    // метод вызываем каждый раз когда пользователь отпускает бегунок
    const recalculate = () => {

        dispatch(sendCalculatorSettings({
            applicationId: "20C60AA1-55AB-4AEF-9DBE-BC8D5020544D",
            productId,
            offerSum,
            offerPeriod: transformNumberToPeriod(offerPeriod),
            priorityType,
            periodTypeId,
            notSetProductInApplication: false
        }))
    }

    // рассчитывает элементы для шкалы суммы и период
    const setScaleItem = (number, type) => {
        if (type === 'sum'){
            switch (number){
                case 0:
                    return sumItems?.[0]
                case 1:
                    return sumItems?.[(sumItems?.length / 2).toFixed(0)]
                case 2:
                    return sumItems?.[sumItems?.length - 1]
                default: return 0
            }
        }

        if (type === 'period'){
            switch (number){
                case 0:
                    return days?.[0]
                case 1:
                    return weeks?.[0]
                case 2:
                    return weeks?.[weeks?.length - 1]
                default: return 0
            }
        }
    }


    // проверяем стор, если ранее выбранная сумма клиентом больше максимально возможной на калькуляторе -
    // ставим максимально возможную
    const setLoan = () => {
        if (amounts.loanAmount > maxOfferSum) {
            setOfferSum(maxOfferSum)
        } else {
            setOfferSum(amounts.loanAmount)
        }
    }

    // если срок, выбранный клиентом, выходит за рамки допустимного в настройках калькулятора,
    // то ставим наибольший возможный срок
    const setTerm = () => {
        if (amounts.periodTypeId === '40250ae9-0770-4ca9-939d-fdb3a3c867bd') {
            days?.indexOf(amounts.term) >= 0
                ? setOfferPeriod(amounts.term)
                : setOfferPeriod(lastDay)
        } else {
            weeks?.indexOf(amounts.term) >= 0
                ? setOfferPeriod(transformPeriodToNumber(amounts.term))
                : setOfferPeriod(lastWeek)
        }
    }

    // метод который значение, поступившее с input type="range" трансформирует в элемент массива weeks
    const transformNumberToPeriod = (number) => {
        if (number < lastDay + 1) {
            setPeriodTypeId('40250ae9-0770-4ca9-939d-fdb3a3c867bd')
            return number
        } else {
            setPeriodTypeId('c0259c89-d87e-404c-84dd-30282d0c7abf')
            return weeks?.[number - lastDay - 1]
        }
    }

    // метод который значение, поступившее как элемент массива weeks, трансформирует в элемент объединенного массива дней и недель
    const transformPeriodToNumber = (period) => {
        const idx = weeks?.indexOf(period)
        return lastDay + idx + 1
    }


    const periodType = () => {
        if (amounts.periodTypeId === '40250ae9-0770-4ca9-939d-fdb3a3c867bd') {
            return 'дн.'
        } else {
            return 'нед.'
        }
    }

    const handleSumInput = (e) => {
        setOfferSum(Number(e.target.value))
        setPriorityType(1)
        dispatch(LoanActionCreators.setLoanAmount(Number(e.target.value)));

    }

    const handlePeriodInput = (e) => {
        const period = transformNumberToPeriod(Number(e.target.value))
        setOfferPeriod(Number(e.target.value))
        setPriorityType(2)
        dispatch(LoanActionCreators.setTermAmount(period));
        dispatch(LoanActionCreators.setPeriodType(periodTypeId));
    }

    return (

        <>

        {
            currentSettings ? <ul className="form-list">
                <li className="item">
                    <ul className="form-list-in">
                        <li>
                            <div className="label">Сумма займа</div>
                            <div className="rub">{offerSum} ₽</div>
                        </li>
                        <li>
                            <div className="label">Сумма к возврату:</div>
                            <div className="rub">{amounts.refundAmount} ₽</div>
                        </li>
                    </ul>
                </li>
                <li className="item item--calculator-mobile progressbar">
                    <input
                        type="range"
                        onChange={e => {
                            handleSumInput(e)
                        }}
                        value={offerSum}
                        step={1000}
                        min={sumItems[0]}
                        max={sumItems[sumItems.length - 1]}
                        onMouseUp={recalculate}
                    />
                </li>
                <li className="item">
                    <ul className="item_list">
                        <li>{setScaleItem(0, 'sum')}</li>
                        <li>{setScaleItem(1, 'sum')}</li>
                        {/*<li>10 000</li>*/}
                        <li>{setScaleItem(2, 'sum')}</li>
                    </ul>
                </li>
                <li className="item item-data">
                    <ul className="form-list-in">
                        <li>
                            <div className="label">Срок займа</div>
                            <div className="rub">
                                <img src={dataBgWhite} alt="dataBgWhite"/>
                                <span> {amounts.term} {periodType()}</span>
                            </div>
                        </li>
                        <li>
                            <div className="label">Сумма переплаты:</div>
                            <div className="rub">{amounts.overpaymentAmount.toFixed(2)} ₽</div>
                        </li>
                    </ul>
                </li>
                <li className="item item--calculator-mobile progressbar">
                    <input
                        type="range"
                        onChange={e => {
                            handlePeriodInput(e)
                        }}
                        value={offerPeriod}
                        min={periodAmount[0]}
                        max={periodAmount[periodAmount.length - 1]}
                        onMouseUp={recalculate}
                    />
                </li>
                <li className="item">
                    <ul className="item_list">
                        <li>{setScaleItem(0, 'period')} дн.</li>
                        <li>{setScaleItem(1, 'period')} нед.</li>
                        <li>{setScaleItem(2, 'period')} нед.</li>
                    </ul>
                </li>

            </ul> : null
        }

        </>


    );
};
