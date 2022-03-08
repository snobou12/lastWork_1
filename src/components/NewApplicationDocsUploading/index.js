import React, { useEffect, useState } from "react";
import CustomTooltip from "../../ui/CustomTooltip";
import userphoto from "../../img/photo-user/photo-user.png";
import photoCard from "../../img/photo-user/photo-card.png";
import photoPassport from "../../img/photo-user/photo-paspord.webp";
import questions from "../../img/svg/questions.svg";
import icon from "../../img/svg/icon-img.svg";
import deleteIcon from "../../img/svg/delete.svg";
import download from "../../img/svg/download.svg";
import { ScanApi } from "../../server/agent";
import NavLink from "react-router-dom/es/NavLink";
import { useHistory } from "react-router-dom";
import { MessageApi } from "../../server/agent";
import {NewApplicationNumberCofirm, NewApplicationNumberConfirm} from "../NewApplicationNumberConfirm";
import {ProgressBarCreators} from "../../store/action-creators";
import {useDispatch, useSelector} from "react-redux";


export const NewApplicationDocsUploading = () => {

  //mock
  let [selfi, setSelfi] = useState([{name: 'селфи.png', id: '123213'}]);
  let [cardPhoto, setCardPhoto] = useState([{name: 'карта.png', id: '1212321'}]);
  let [passportPhoto, setPassportPhoto] = useState([{name: 'Обложка1.png', id: '12345346'}]);
  let [registrationPhoto, setRegistrationPhoto] = useState([{name: 'регистрация.png', id: '436456'}]);
  const selfiType = "977587e6-18ba-40f4-9597-31423be1a72b";
  const cardPhotoType = "127eab6d-0529-47f7-af8d-98ae59a389a0";
  const passportPhotoType = "1ea20110-999c-49d3-8d62-bafcbc76895e";
  const registrationPhotoType = "999acd2e-c742-481d-9fc1-b42e486e2a2d";

  const dispatch = useDispatch();
    // const [isDocsLoaded, setIsDocsLoaded] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    useEffect(() => {
        dispatch(ProgressBarCreators.setPercent({
            percent: 85,
            greenStripe: 90,
            lightGreenStripe: 97
        }))
    }, [])

    useEffect(()=> {
        ScanApi.getDictionary()
            .then(res=>console.log("check", res))
        ScanApi.checkScan({applicationId: "20C60AA1-55AB-4AEF-9DBE-BC8D5020544D", "isReturnData": true})
            .then(res=>console.log("check", res))
    }, [])

    const handleDocsInput = async (e, type, scanArray, scanTypeAddHandler) => {
        const data = new FormData();
        const imageName = e.target.files[0].name;
        const imagedata = e.target.files[0];

        data.append(imageName, imagedata);
        data.append('applicationId', '20C60AA1-55AB-4AEF-9DBE-BC8D5020544D');
        data.append('typeId', type);


        ScanApi.saveScan(data).then(res=>{
            if (res.result) {
                console.log(res)
                const fileName = res.data.fileName
                const fileId = res.data.id
                scanTypeAddHandler([...scanArray, {name: fileName, id: fileId}])
            }
        })
    }

  const removeScan = async (id, scanArray, scanTypeAddHandler) => {
    let res = await ScanApi.removeScan(id);

    if (res.result) {
        scanTypeAddHandler(
            scanArray.filter((scan) => {
                return scan.id !== id
            })
        )
    }
  }

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

      const handleCodeChange = (e) => {
          setCode(e.target.value.replace(/\D/,''));
      }

      const sendCode = async () => {
        let result = await MessageApi.checkCode(code);
        //history.push("/new_application-signing")
      };

      const requestCodeResend = async () => {
        let result = await MessageApi.requestCodeResend("contactId"); // contactId?
      };



    return (
        <main className="page-registration">
  <form action="" className="form" encType="multipart/form-data">
    <div className="container" style={{width: "100%"}}>
      <div className="row">
        <div className="col-md-12 registration-col" style={{width: "100%"}}>
          <div className="h1 -md-hide">Загрузите фото паспорта и банковской карты</div>
          <ul className=" form-list-full">
            <li className="item item-full" style={{marginBottom: "30px"}}>
              <p className="info">Для завершения оформления заявки загрузите <br /> и заверьте подтверждающие документы и
                фотографии в соответсвии с инструкцией.</p>
            </li>
            <li className="item-full item-full--docs-uploading">
              <div className="photo-row row">
                <div className="col-md-6">
                  <div className="col-photo" style={styles.card} >
                    <div className="img" style={{marginRight: "20px", minWidth: "100px"}}>
                      <img src={userphoto} alt=""/>
                    </div>
                    <div className="text" style={styles.text}>
                      Фото своего лица (селфи)<br /> со своим паспортом.
                    </div>
                    <div className="position-absolute" style={styles.questionIcon}>
                      <CustomTooltip id="photoDiscountTooltip">Сделайте и прикрепите селфи с паспортом (второй разворот с фото на уровне лица).<br />
                        Постарайтесь не перекрыть серию и номер паспорта пальцами, очки следует снять.</CustomTooltip>
                      <div className="svg-block">
                        <img src={questions} alt="" data-tip data-for="photoDiscountTooltip" />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    {selfi.length && (
                        <ul className="result-img">
                            {selfi.map((scan) => (
                                <li key={scan.id}>
                                <div className="result-img-item">
                                    <img src={icon} alt="" />
                                    <span>{scan.name}</span>
                                    </div>
                                    <button className="button-remove-scan" type="button" onClick={() => {removeScan(scan.id, selfi, setSelfi)}}><img src={deleteIcon} alt="" /></button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="inputfile-box" style={{maxWidth: "480px"}}>
                      <input type="file"
                             name="file"
                             id="input_file"
                             className="inputfile"
                             data-multiple-caption="{count} files selected"
                             multiple=""
                             onChange={(e)=> handleDocsInput(e, selfiType, selfi, setSelfi)}
                      />
                      <label htmlFor="input_file">
                        <strong><img src={download} alt="" /></strong><span>Фото лица с паспортом</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="col-photo" style={styles.card}>
                    <div className="img" style={{marginRight: "20px"}}>
                      <img src={photoCard} alt="" />
                    </div>
                    <div className="text" style={styles.text}>
                      Фото личной <br /> банковской карты
                    </div>
                    <div className="position-absolute" style={styles.questionIcon}>
                      <CustomTooltip id="discountTooltip"> Прикрепите фото Вашей банковской карты (достаточно той стороны, где указаны Ваши фамилия и имя).<br />
                        Должно быть фото карты, которая выбрана в качестве способа получения займа. Если на фото попадает CVC-код карты,<br />
                         то его нужно закрыть рукой, при этом остальная информация должна хорошо читаться.</CustomTooltip>
                      <div className="svg-block">
                        <img src={questions} alt="" data-tip data-for="discountTooltip"/>
                      </div>
                    </div>
                  </div>
                    <div className="d-flex">
                        {cardPhoto.length && (
                            <ul className="result-img">
                                {cardPhoto.map((scan) => (
                                    <li key={scan.id}>
                                        <div className="result-img-item">
                                            <img src={icon} alt="" />
                                            <span>{scan.name}</span>
                                        </div>
                                        <button className="button-remove-scan" type="button" onClick={() => {removeScan(scan.id, cardPhoto, setCardPhoto)}}><img src={deleteIcon} alt="" /></button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="inputfile-box" style={{maxWidth: "480px", width: "100%"}}>
                            <input type="file" name="file" id="input_file2" className="inputfile"
                                   data-multiple-caption="{count} files selected" multiple=""
                                   onChange={(e)=> handleDocsInput(e, cardPhotoType, cardPhoto, setCardPhoto)}/>
                            <label htmlFor="input_file2"><strong><img src={download} alt="" /></strong><span>Фото личной банковской карты</span></label>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                  <div className="col-photo" style={styles.card}>
                    <div className="img" style={{marginRight: "20px", minWidth: "100px"}}>
                      <img src={photoPassport} alt="" />
                    </div>
                    <div className="text" style={styles.text}>
                      Фото главное страницы паспорта
                    </div>
                    <div className="position-absolute" style={styles.questionIcon}>
                      <CustomTooltip id="passportTooltip"> Прикрепите 2 и 3 страницы с фотографией (второй разворот)</CustomTooltip>
                      <div className="svg-block" data-tooltip="">
                        <img src={questions} alt="" data-tip data-for="passportTooltip"/>
                      </div>
                    </div>
                  </div>
                    <div className="d-flex">
                        {passportPhoto.length && (
                            <ul className="result-img">
                                {passportPhoto.map((scan) => (
                                    <li key={scan.id}>
                                        <div className="result-img-item">
                                            <img src={icon} alt="" />
                                            <span>{scan.name}</span>
                                        </div>
                                        <button className="button-remove-scan" type="button" onClick={() => {removeScan(scan.id, passportPhoto, setPassportPhoto)}}><img src={deleteIcon} alt="" /></button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="inputfile-box" style={{maxWidth: "480px",  width: "100%"}}>
                            <input type="file" name="file" id="input_file3" className="inputfile"
                                   data-multiple-caption="{count} files selected" multiple=""
                                   onChange={(e)=> handleDocsInput(e, passportPhotoType, passportPhoto, setPassportPhoto)}/>
                            <label htmlFor="input_file3"><strong><img src={download} alt="" /></strong><span>Паспорт гражданина РФ</span></label>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                  <div className="col-photo" style={styles.card}>
                    <div className="img" style={{marginRight: "20px", minWidth: "100px"}}>
                      <img src={photoPassport} alt="" />
                    </div>
                    <div className="text" style={styles.text}>
                     Фото страницы регистрации паспорта гражданина РФ
                    </div>
                    <div className="position-absolute" style={styles.questionIcon}>
                      <CustomTooltip id="passportRegistrationTooltip">Прикрепите страницу с действующей регистрацией (разворот с последней пропиской)</CustomTooltip>
                      <div className="svg-block" data-tooltip="">
                        <img src={questions} alt="" data-tip data-for="passportRegistrationTooltip" />
                      </div>
                    </div>
                  </div>
                    <div className="d-flex">
                        {registrationPhoto.length && (
                            <ul className="result-img">
                                {registrationPhoto.map((scan) => (
                                    <li key={scan.id}>
                                        <div className="result-img-item">
                                            <img src={icon} alt="" />
                                            <span>{scan.name}</span>
                                        </div>
                                        <button className="button-remove-scan" type="button" onClick={() => {removeScan(scan.id, registrationPhoto, setRegistrationPhoto)}}><img src={deleteIcon} alt="" /></button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="inputfile-box md-width" style={{maxWidth: "480px",  width: "100%"}}>
                            <input type="file" name="file" id="input_file4" className="inputfile"
                                   data-multiple-caption="{count} files selected" multiple=""
                                   onChange={(e)=> handleDocsInput(e, registrationPhotoType, registrationPhoto, setRegistrationPhoto)}/>
                            <label htmlFor="input_file4"><strong><img src={download} alt="" /></strong><span>Фото страницы регистрации </span></label>
                        </div>
                    </div>
                </div>

              </div>
            </li>

            <li className="item">

            </li>

            <div onClick={()=>setIsConfirmationOpen(true)} className="btn btn_blue">Далее</div>
                {isConfirmationOpen && (
                  <div className="col-md-12 registration-col" style={{marginTop: "30px", paddingLeft: "0px"}}>
                  <div className="confirmation">
                    <p className="confirmation__title">
                      Введите код подтверждения, направленный на номер:
                      <br /> <span>+7 (902) 001-02-03.</span>
                    </p>
                    <p className="confirmation__description">
                      Введением кода из смс я подтверждаю, что внесенные анкетные данные,<br />
                      данные паспорта принадлежат мне и верны, загруженные копии страниц<br />
                      паспорта соответствуют их подлиннику
                    </p>
                    <div className="code-sms">
                      <div className="text-left">Код из СМС</div>
                      <input
                        type="text"
                        maxLength={4}
                        value={code}
                        onChange={handleCodeChange}
                      />
                      <p>
                        Получить код повторно можно <br />
                        через 00:{seconds.toString().padStart(2, "0")}
                      </p>
                    </div>
                    <ul className="link-block" style={{paddingLeft: "0px", marginLeft: "0px"}}>
                      {seconds == 0 ? (
                        <li>
                          <button className="button-resend" onClick={requestCodeResend}>
                            Выслать код повторно{" "}
                          </button>
                        </li>
                      ) : null}
                    </ul>
                    <NavLink
                        to="/new_application-signing"
                        className="btn btn_blue"
                        style={{paddingLeft: "0px", marginLeft: "0px"}}
                        onClick={sendCode}>
                      Далее
                    </NavLink>
                  </div>
                </div>
                )}
          </ul>
        </div>
      </div>
    </div>
  </form>
</main>
    )
}

const styles = {
    card: {
        boxShadow: "0 0 10px rgb(0 0 0 / 17%)",
        display: "flex",
        alignItems: "center",
        position: "relative",
        width: "100%",
        maxWidth: "475px",
        minHeight: "169px",
        marginRight: "30px",
        marginBottom: "30px",
        padding: "20px 50px 20px 20px",
        background: "#fff",
        borderRadius: "16px",
    },
    text: {
        fontWeight: 600,
        lineHeight: "130%",
        color: "#333",
    },
    questionIcon: {
        bottom: 0,
        right: 0,
        padding: "10px",
    }
    }
