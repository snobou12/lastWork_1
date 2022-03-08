import React, {useState, useEffect, useRef} from "react";
import NavLink from "react-router-dom/es/NavLink";
import {documentRulesApi, OfferApi} from "../../server/agent";

export const ReapplicationSigning = () => {
    const [loading, setLoading] = useState(true);
    const [code, setCode] = useState('');
    const [seconds, setSeconds] = useState(60);
    const [offerInfoText, setOfferInfoText] = useState('Мы Вам перезвоним');


    const requestCodeResend = async () => {
        let result = await OfferApi.requestCodeResend("contactId"); // contactId?
    };

    const resendCode = (e) => {
        e.preventDefault();
        setSeconds(60)
        requestCodeResend();
    }

    useEffect(()=>{
        const fetchData = async () => {
            const offerMessage = await OfferApi.getOfferInfoText();
            const offerDocuments = await OfferApi.getPaymentShortOfferFile();
            const rules = await documentRulesApi.documentsForPage();

            console.log(offerMessage.data.text)
            console.log(offerDocuments.data.offerData)


            setOfferInfoText(offerMessage.data.text)
            setLoading(false);
        };

        fetchData();
    }, []);

    useEffect(()=>{
        let myInterval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                        clearInterval(myInterval);
                        setSeconds(0);
                    }
            }, 1000)
            return ()=> {
                clearInterval(myInterval);
              };
        });

    return (
        <main class="page-registration">
  <form action="" class="form">
    <div class="container">
      <div class="row">
        <div class="col-md-12 registration-col contract">
          <div class="h1 mb-3 only-desktop">Подпишите договор и заявление</div>
          <h2 class="mt-3 max-width-600">Код для подписания индивидуальных условий договора отправленвам на номер: + 7 (902) 001-02-03 </h2>

          <div class="confirmation ml-0">

            <div class="code-sms">
              <div class="text-left">
                Код из СМС
              </div>
              <input
                  type="text"
                  value={code}
                  maxLength={4}
                  onChange={(e)=>setCode(e.target.value.replace(/\D/,''))}/>
              <p>Получить код повторно можно <br />через 00:{seconds < 10 ?  `0${seconds}` : seconds}</p>
            </div>
            <ul class="link-block">
                {seconds == 0 ? (
                    <li>
                        <button className="button-resend" onClick={resendCode}>
                            Выслать код повторно{" "}
                        </button>
                    </li>
                ) : null}
            </ul>
            <NavLink
                to="/new_application-timer"
                className="btn btn_blue"
            >
                Подписать и отправить на рассмотрение
            </NavLink>
            <ul class="link-block">
              <li>
                  <b dangerouslySetInnerHTML={{ __html: offerInfoText}}>
                  </b>
              </li>
              <li>
                  Ознакомиться с заявлением на получение займа можно по <a class=""> ссылке</a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </form>
</main>
    )
}
