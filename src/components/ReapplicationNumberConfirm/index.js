import React, { useEffect, useState } from "react";
import { MessageApi } from "../../server/agent";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

export const ReapplicationNumberConfirm = () => {
  const history = useHistory();

  const [seconds, setSeconds] = useState(60);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const [code, setCode] = useState("");
  const handleCodeChange = (e) => setCode(e.target.value);

  const sendCode = async () => {
    let result = await MessageApi.checkCode(code);
    history.push("/reapplication-method-obtaining")
  };

  const requestCodeResend = async () => {
    let result = await MessageApi.requestCodeResend("contactId"); // contactId?
  };

  const resendCode = (e) => {
    e.preventDefault();
    setSeconds(60)
    requestCodeResend();
  }

  const checkCode = () => {
    return code === ''
  }

  return (
    <main className="page-registration">
      <form action="" className="form">
        <div className="container">
          <div className="row">
            <div className="col-md-12 registration-col">
              <div
                  className="confirmation confirmation--center text-center"
              >
                <div className="h1">Подтверждение данных</div>
                <p>
                  Код подтверждения отправлен на номер
                  <br /> <a href="tel:+79020010203">+7 (902) 001-02-03.</a>
                </p>
                <div
                    className="code-sms"
                >
                  <div className="text-left">Код из СМС</div>
                  <input
                    type="password"
                    maxLength={4}
                    value={code}
                    onChange={handleCodeChange}
                  />
                  <p>
                    Получить код повторно можно <br />
                    через 00:{seconds.toString().padStart(2, "0")}
                  </p>
                </div>
                <ul className="link-block">
                  {seconds == 0 ? (
                    <li>
                      <button
                          className="button-resend"
                          onClick={resendCode}
                      >
                        Выслать код повторно{" "}
                      </button>
                    </li>
                  ) : null}
                </ul>
                <NavLink
                    to="/reapplication-method-obtaining"
                    className={`btn btn_blue ${checkCode() ? 'disabled' : ''}`}
                    onClick={sendCode}
                >
                  Далее
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};
