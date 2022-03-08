import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {
    findCitiesThunk,
    findHouseThunk,
    findRegionThunk,
    findStreetThunk,
    sendAddressDataThunk
} from "../../server/thunks/thunks";
import NavLink from "react-router-dom/es/NavLink";
import Cookies from "js-cookie";
import {AddressApi} from "../../server/agent";
import {NewFormActionCreators, ProgressBarCreators} from "../../store/action-creators";

export const NewApplicationAddress = () => {
    const [registrationRegion, setRegistrationRegion] = useState("");
    const [registrationCity, setRegistrationCity] = useState("");
    const [registrationStreet, setRegistrationStreet] = useState("");
    const [registrationHouse, setRegistrationHouse] = useState("");
    const [registrationFrame, setRegistrationFrame] = useState("");
    const [registrationFlat, setRegistrationFlat] = useState("");
    const [residenceRegion, setResidenceRegion] = useState("");
    const [residenceCity, setResidenceCity] = useState("");
    const [residenceStreet, setResidenceStreet] = useState("");
    const [residenceHouse, setResidenceHouse] = useState("");
    const [residenceFrame, setResidenceFrame] = useState("");
    const [residenceFlat, setResidenceFlat] = useState("");
    const [isAddressMatched, setIsAddressMatched] = useState(true);

    useEffect(() => {
        dispatch(ProgressBarCreators.setPercent({
            percent: 25,
            greenStripe: 25,
            lightGreenStripe: 50
        }))
    }, [])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         let fetchedAddressData = await AddressApi.getAddressData();
    //         setRegistrationRegion(fetchedAddressData.data.registrationAddress.regionName)
    //         setRegistrationCity(fetchedAddressData.data.registrationAddress.city)
    //         setRegistrationStreet(fetchedAddressData.data.registrationAddress.street)
    //         setRegistrationHouse(fetchedAddressData.data.registrationAddress.house)
    //         setRegistrationFrame(fetchedAddressData.data.registrationAddress.houseBuilding)
    //         setRegistrationFlat(fetchedAddressData.data.registrationAddress.flatNumber)
    //
    //         setResidenceRegion(fetchedAddressData.data.residenceAddress.regionName)
    //         setResidenceCity(fetchedAddressData.data.residenceAddress.city)
    //         setResidenceStreet(fetchedAddressData.data.residenceAddress.street)
    //         setResidenceHouse(fetchedAddressData.data.residenceAddress.houseBuilding)
    //         setResidenceFrame(fetchedAddressData.data.residenceAddress.house)
    //         setResidenceFlat(fetchedAddressData.data.residenceAddress.flatNumber)
    //     };
    //     fetchData();
    // }, []);

    const dispatch = useDispatch();
    const history = useHistory();
    const newFormData = useSelector((state) => state.newFormReducer);


    let registrationRegionCompletions = useSelector((state) => state.newFormReducer.completions.registrationRegion ? state.newFormReducer.completions.registrationRegion : null);
    let registrationCityCompletions = useSelector((state) => state.newFormReducer.completions.registrationCity ? state.newFormReducer.completions.registrationCity : null);
    let registrationStreetCompletions = useSelector(state => state.newFormReducer.completions.registrationStreet ? state.newFormReducer.completions.registrationStreet : null);
    let registrationHouseCompletions = useSelector(state => state.newFormReducer.completions.registrationHouse ? state.newFormReducer.completions.registrationHouse : null);
    let residenceRegionCompletions = useSelector((state) => state.newFormReducer.completions.residenceRegion ? state.newFormReducer.completions.residenceRegion : null);
    let residenceCityCompletions = useSelector((state) => state.newFormReducer.completions.residenceCity ? state.newFormReducer.completions.residenceCity : null);
    let residenceStreetCompletions = useSelector((state) => state.newFormReducer.completions.residenceStreet ? state.newFormReducer.completions.residenceStreet : null);
    let residenceHouseCompletions = useSelector((state) => state.newFormReducer.completions.residenceHouse ? state.newFormReducer.completions.residenceHouse : null);

    const [registrationRegionGuid, setRegistrationRegionGuid] = useState(null);
    const [residenceRegionGuid, setResidenceRegionGuid] = useState(null);
    const [registrationCityGuid, setRegistrationCityGuid] = useState(null);
    const [registrationStreetGuid, setRegistrationStreetGuid] = useState(null);
    const [registrationStreetKladrId, setRegistrationStreetKladrId] = useState(null);
    const [residenceCityGuid, setResidenceCityGuid] = useState(null);
    const [residenceStreetGuid, setResidenceStreetGuid] = useState(null);
    const [residenceStreetKladrId, setResidenceStreetKladrId] = useState(null);


    const [completionsVisible, setCompletionsVisible] = useState({
        registrationRegion: false,
        registrationCity: false,
        registrationStreet: false,
        registrationHouse: false,
        residenceRegion: false,
        residenceCity: false,
        residenceStreet: false,
        residenceHouse: false,
    });


    const handleRegistrationRegion = (item) => {
        if (item.data.region) {
            setRegistrationRegion(item.data.region + ' ' + item.data.region_type)
            setRegistrationRegionGuid(item.data.fias_id);
            console.log(registrationRegion)
            console.log(registrationRegionGuid)
        } else {
            setRegistrationRegion('')
        }
    }

    const handleRegistrationCity = (item) => {
        const places = ['г', 'хутор', 'поселок', 'рп', 'пгт', 'деревня', 'с/мо'];
        const city = item.value.split(',')[item.value.split(',').length - 1];

        const isValidPlace = places.some(p => city.includes(p));

        if (isValidPlace){
            setRegistrationCity(city);
            setRegistrationCityGuid(item.data.fias_id);
        } else {
            setRegistrationCity('')
        }
    }
    const handleRegistrationStreet = (item) => {
        if (item.data.street) {
            const street = item.data.street;
            setRegistrationStreet(street);
            setRegistrationStreetGuid(item.data.fias_id);
            setRegistrationStreetKladrId(item.data.kladr_id);
        } else {
            setRegistrationStreet('');
        }
    }
    const handleRegistrationHouse = (item) => {
        if (item.data.house) {
            const house = item.data.house;
            setRegistrationHouse(house);
        } else {
            setRegistrationHouse('');
        }
    }

    const handleResidenceRegion = (item) => {
        console.log(item)
        if (item.data.region) {
            setResidenceRegion(item.data.region + ' ' + item.data.region_type)
            setResidenceRegionGuid(item.data.fias_id);
        } else {
            setRegistrationRegion('')
        }
    }

    const handleResidenceCity = (item) => {
        const places = ['г', 'хутор', 'поселок', 'рп', 'пгт', 'деревня', 'с/мо'];
        const city = item.value.split(',')[item.value.split(',').length - 1];

        const isValidPlace = places.some(p => city.includes(p));

        if (isValidPlace){
            setResidenceCity(city);
            setResidenceCityGuid(item.data.fias_id);
        } else {
            setResidenceCity('')
        }
    }
    const handleResidenceStreet = (item) => {
        if (item.data.street) {
            const street = item.data.street;
            setResidenceStreet(street);
            setResidenceStreetGuid(item.data.fias_id);
            setResidenceStreetKladrId(item.data.kladr_id);
        } else {
            setResidenceStreet('');
        }
    }
    const handleResidenceHouse = (item) => {
        if (item.data.house) {
            const house = item.data.house;
            setResidenceHouse(house);
        } else {
            setRegistrationHouse('');
        }
    }

    const sendData = (e) => {
        e.preventDefault();

        dispatch(
            sendAddressDataThunk({
                region: registrationRegion,
                city: registrationCity,
                street: registrationStreet,
                home: registrationHouse,
                frame: registrationFrame,
                flat: registrationFlat,
                isAddressMatched,
            })
        );
         history.push("/new_application-place-work");
    };

    const checkFormFields = () => {
        const registrationFields = {
            registrationRegion,
            registrationCity,
            registrationStreet,
            registrationHouse,
        }
        const residenceFields = {
            residenceRegion,
            residenceCity,
            residenceStreet,
            residenceHouse,
        }

        const emptyRegistrationFields = Object.keys(registrationFields).some(p => registrationFields[p] === '');
        const emptyResidenceFields = Object.keys(residenceFields).some(p => residenceFields[p] === '');

        return isAddressMatched
            ? emptyRegistrationFields
            : emptyRegistrationFields || emptyResidenceFields
    }

    return (
        <main className="page-registration">
            <form className="form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 registration-col">
                            <div className="h1 md-hide">
                                Укажите адрес регистрации и фактического проживания
                            </div>

                            <ul className="form-list">
                                <li className="item auto-complete">
                                    <label className="form-group has-float-label">
                                        <label htmlFor="region" className="d-none">
                                            Регион РФ
                                        </label>
                                        <input
                                          onChange={(e) => {
                                              Cookies.set("region", e.currentTarget.value);
                                              setRegistrationRegion(e.currentTarget.value);
                                              dispatch(findRegionThunk('registrationRegion', e.target.value));
                                          }}
                                          className="form-control"
                                          value={registrationRegion}
                                          type="text"
                                          // placeholder="Московская область"
                                          placeholder=" "
                                          id="region"
                                          autoComplete="off"
                                          onFocus={() => setCompletionsVisible({
                                              ...completionsVisible,
                                              registrationRegion: true
                                          })}
                                          onBlur={() => {
                                              setCompletionsVisible({...completionsVisible, registrationRegion: false})
                                          }}
                                        />
                                        <span>Регион РФ</span>
                                    </label>
                                    <ul className={`completions ${completionsVisible.registrationRegion ? '' : 'inactive'}`}>
                                        {registrationRegionCompletions ? registrationRegionCompletions.map(item => (
                                            <li key={item.value} onClick={() => {
                                                handleRegistrationRegion(item)
                                            }}>{item.value}</li>
                                        )) : null}
                                    </ul>
                                </li>
                                <li className="item auto-complete">
                                    <label className="form-group has-float-label">
                                        <label htmlFor="city" className="d-none">
                                            Населенный пункт
                                        </label>
                                        <input
                                          onChange={(e) => {
                                              Cookies.set("city", e.currentTarget.value);
                                              setRegistrationCity(e.currentTarget.value);
                                              dispatch(findCitiesThunk('registrationCity', e.target.value, registrationRegionGuid));
                                          }}
                                          value={registrationCity}
                                          type="text"
                                          // placeholder="Москва"
                                          placeholder=" "
                                          id="city"
                                          className="form-control"
                                          autoComplete="off"
                                          onFocus={() => setCompletionsVisible({
                                              ...completionsVisible,
                                              registrationCity: true
                                          })}
                                          onBlur={() => {
                                              setCompletionsVisible({...completionsVisible, registrationCity: false})
                                          }}
                                        />
                                        <span>
                                            Населенный пункт
                                        </span>
                                    </label>
                                    <ul className={`completions ${completionsVisible.registrationCity ? '' : 'inactive'}`}>
                                        {registrationCityCompletions ? registrationCityCompletions.map(item => (
                                            <li key={item.value} onClick={() => {
                                                handleRegistrationCity(item)

                                            }}>{item.value}</li>
                                        )) : null}
                                    </ul>
                                </li>
                                <li className="item auto-complete">
                                    <label className="form-group has-float-label">
                                        <label htmlFor="street" className="d-none">
                                            Улица
                                        </label>
                                        <input
                                          onChange={(e) => {
                                              Cookies.set("street", e.currentTarget.value);
                                              setRegistrationStreet(e.currentTarget.value);
                                              dispatch(findStreetThunk('registrationStreet', e.target.value, registrationCityGuid))
                                          }}
                                          className="form-control"
                                          value={registrationStreet}
                                          type="text"
                                          // placeholder="Красная площадь"
                                          placeholder=" "
                                          id="street"
                                          onFocus={() => setCompletionsVisible({
                                              ...completionsVisible,
                                              registrationStreet: true
                                          })}
                                          onBlur={() => {
                                              setCompletionsVisible({...completionsVisible, registrationStreet: false})
                                          }}
                                        />
                                        <span>Улица</span>
                                    </label>
                                    <ul className={`completions ${completionsVisible.registrationStreet ? '' : 'inactive'}`}>
                                        {registrationStreetCompletions ? registrationStreetCompletions.map(item => (
                                            <li key={item.value} onClick={() => {
                                                handleRegistrationStreet(item)
                                            }}>{item.value}</li>
                                        )) : null}
                                    </ul>
                                </li>
                                <li className="item-3">
                                    <ul className="item-3-list">
                                        <li className="item auto-complete">
                                            <label className="form-group has-float-label">
                                                <label htmlFor="house" className="d-none">
                                                    Дом
                                                </label>
                                                <input
                                                  onChange={(e) => {
                                                      Cookies.set("home", e.currentTarget.value);
                                                      setRegistrationHouse(e.currentTarget.value);
                                                      dispatch(findHouseThunk('registrationHouse', e.target.value, registrationStreetGuid, registrationStreetKladrId));
                                                  }}
                                                  onFocus={() => setCompletionsVisible({
                                                      ...completionsVisible,
                                                      registrationHouse: true
                                                  })}
                                                  onBlur={() => {
                                                      setCompletionsVisible({
                                                          ...completionsVisible,
                                                          registrationHouse: false
                                                      })
                                                  }}
                                                  value={registrationHouse}
                                                  type="text"
                                                  className="form-control"
                                                  // placeholder="10"
                                                  placeholder=" "
                                                  id="house"
                                                />
                                                <span>Дом</span>
                                            </label>
                                            <ul className={`completions ${completionsVisible.registrationHouse ? '' : 'inactive'}`}>
                                                {registrationHouseCompletions ? registrationHouseCompletions.map(item => (
                                                    <li key={item.value} onClick={() => {
                                                        handleRegistrationHouse(item)
                                                    }}>{item.value}</li>
                                                )) : null}
                                            </ul>
                                        </li>
                                        <li className="item ">
                                            <label className="form-group has-float-label">
                                                <label htmlFor="frame" className="d-none">
                                                    Корпус
                                                </label>
                                                <input
                                                  onChange={(e) => {
                                                      Cookies.set("frame", e.currentTarget.value);
                                                      setRegistrationFrame(e.currentTarget.value);
                                                  }}
                                                  value={registrationFrame}
                                                  type="text"
                                                  // placeholder="10"
                                                  className="form-control"
                                                  placeholder=" "
                                                  id="frame"
                                                />
                                                <span>Корпус</span>
                                            </label>
                                        </li>
                                        <li className="item ">
                                            <label className="form-group has-float-label">
                                                <label htmlFor="flat" className="d-none">
                                                    Квартира
                                                </label>
                                                <input
                                                  onChange={(e) => {
                                                      Cookies.set("flat", e.currentTarget.value);
                                                      setRegistrationFlat(e.currentTarget.value);
                                                  }}
                                                  value={registrationFlat}
                                                  type="text"
                                                  // placeholder="30"
                                                  placeholder=" "
                                                  className="form-control"
                                                  id="flat"
                                                />
                                                <span>Квартира</span>
                                            </label>
                                        </li>
                                    </ul>
                                </li>
                                <li className="item ">
                                    <input
                                        checked={isAddressMatched}
                                        onChange={(e) => {
                                            Cookies.set("IsAddressMatched", e.currentTarget.checked);
                                            setIsAddressMatched(e.currentTarget.checked);
                                        }}
                                        type="checkbox"
                                        id="address-registration"
                                        className="checkbox"
                                    />
                                    <label htmlFor="address-registration">
                                        Фактический адрес совпадает с регистрацией
                                    </label>
                                </li>
                                {isAddressMatched && (
                                    <li className="item">
                                        <button
                                            disabled={checkFormFields()}
                                            onClick={(e) => sendData(e)}
                                            className={`btn btn_blue ${checkFormFields() ? 'disabled' : ''}`}
                                            type="submit"
                                        >
                                            Далее
                                        </button>
                                    </li>
                                )}

                                {!isAddressMatched && (
                                    <>
                                        <li className="item auto-complete">
                                            <label className="form-group has-float-label">
                                                <label htmlFor="region" className="d-none">
                                                    Регион РФ
                                                </label>
                                                <input
                                                  type="text"
                                                  value={residenceRegion}
                                                  onChange={(e) => {
                                                      setResidenceRegion(e.target.value)
                                                      dispatch(findRegionThunk('residenceRegion', e.target.value));
                                                  }}
                                                  // placeholder="Московская область"
                                                  placeholder=" "
                                                  id="region"
                                                  autoComplete="off"
                                                  className="form-control"
                                                  onFocus={() => setCompletionsVisible({
                                                      ...completionsVisible,
                                                      residenceRegion: true
                                                  })}
                                                  onBlur={() => {
                                                      setCompletionsVisible({
                                                          ...completionsVisible,
                                                          residenceRegion: false
                                                      });
                                                  }}
                                                />
                                                <span>
                                                    Регион РФ
                                                </span>
                                            </label>
                                            <ul className={`completions ${completionsVisible.residenceRegion ? '' : 'inactive'}`}>
                                                {residenceRegionCompletions ? residenceRegionCompletions.map(item => (
                                                    <li key={item.value} onClick={() => {
                                                        handleResidenceRegion(item)
                                                    }}>{item.value}</li>
                                                )) : null}
                                            </ul>
                                        </li>
                                        <li className="item auto-complete">
                                            <label className="form-group has-float-label">
                                                <label htmlFor="city" className="d-none">
                                                    Населенный пункт
                                                </label>
                                                <input
                                                  type="text"
                                                  value={residenceCity}
                                                  onChange={(e) => {
                                                      setResidenceCity(e.target.value)
                                                      dispatch(findCitiesThunk('residenceCity', e.target.value, residenceRegionGuid));
                                                  }}
                                                  autoComplete="off"
                                                  // placeholder="Москва"
                                                  placeholder=" "
                                                  className="form-control"
                                                  id="city"
                                                  onFocus={() => setCompletionsVisible({
                                                      ...completionsVisible,
                                                      residenceCity: true
                                                  })}
                                                  onBlur={() => {
                                                      setCompletionsVisible({
                                                          ...completionsVisible,
                                                          residenceCity: false
                                                      });
                                                  }}
                                                />
                                                <span>Населенный пункт</span>
                                            </label>
                                            <ul className={`completions ${completionsVisible.residenceCity ? '' : 'inactive'}`}>
                                                {residenceCityCompletions ? residenceCityCompletions.map(item => (
                                                    <li key={item.value} onClick={() => {
                                                        handleResidenceCity(item)
                                                    }}>{item.value}</li>
                                                )) : null}
                                            </ul>
                                        </li>
                                        <li className="item auto-complete">
                                            <label className="form-group has-float-label">
                                                <label htmlFor="street" className="d-none">
                                                    Улица
                                                </label>
                                                <input
                                                  type="text"
                                                  value={residenceStreet}
                                                  onChange={(e) => {
                                                      setResidenceStreet(e.target.value)
                                                      dispatch(findStreetThunk('residenceStreet', e.target.value, residenceCityGuid))
                                                  }}
                                                  onFocus={() => setCompletionsVisible({
                                                      ...completionsVisible,
                                                      residenceStreet: true
                                                  })}
                                                  onBlur={() => {
                                                      setCompletionsVisible({
                                                          ...completionsVisible,
                                                          residenceStreet: false
                                                      });
                                                  }}
                                                  // placeholder="Красная площадь"
                                                  placeholder=" "
                                                  className="form-control"
                                                  id="street"
                                                />
                                                <span>Улица</span>
                                            </label>
                                            <ul className={`completions ${completionsVisible.residenceStreet ? '' : 'inactive'}`}>
                                                {residenceStreetCompletions ? residenceStreetCompletions.map(item => (
                                                    <li key={item.value} onClick={() => {
                                                        handleResidenceStreet(item)
                                                    }}>{item.value}</li>
                                                )) : null}
                                            </ul>
                                        </li>
                                        <li className="item-3 auto-complete">
                                            <ul className="item-3-list">
                                                <li className="item ">
                                                    <label className="form-group has-float-label">
                                                        <label htmlFor="house" className="d-none">
                                                            Дом
                                                        </label>
                                                        <input
                                                          type="text"
                                                          value={residenceHouse}
                                                          onChange={(e) => {
                                                              setResidenceHouse(e.target.value)
                                                              dispatch(findHouseThunk('residenceHouse', e.target.value, residenceStreetGuid, residenceStreetKladrId));
                                                          }}
                                                          // placeholder="10"
                                                          placeholder=" "
                                                          className="form-control"
                                                          id="house"
                                                          onFocus={() => setCompletionsVisible({
                                                              ...completionsVisible,
                                                              residenceHouse: true
                                                          })}
                                                          onBlur={() => {
                                                              setCompletionsVisible({
                                                                  ...completionsVisible,
                                                                  residenceHouse: false
                                                              });
                                                          }}
                                                        />
                                                        <span>
                                                            Дом
                                                        </span>
                                                        <ul className={`completions ${completionsVisible.residenceHouse ? '' : 'inactive'}`}>
                                                            {residenceHouseCompletions ? residenceHouseCompletions.map(item => (
                                                              <li key={item.value} onClick={() => {
                                                                  handleResidenceHouse()
                                                              }}>{item.value}</li>
                                                            )) : null}
                                                        </ul>
                                                    </label>
                                                </li>
                                                <li className="item ">
                                                    <label className="form-group has-float-label">
                                                        <label htmlFor="frame" className="d-none">
                                                            Корпус
                                                        </label>
                                                        <input
                                                          type="text"
                                                          value={residenceFrame}
                                                          onChange={(e) => setResidenceFrame(e.target.value)}
                                                          // placeholder="10"
                                                          placeholder=" "
                                                          className="form-control"
                                                          id="frame"
                                                        />
                                                        <span>Корпус</span>
                                                    </label>
                                                </li>
                                                <li className="item ">
                                                    <label className="form-group has-float-label">
                                                        <label htmlFor="flat" className="d-none">
                                                            Квартира
                                                        </label>
                                                        <input
                                                          type="text"
                                                          value={residenceFlat}
                                                          onChange={(e) => setResidenceFlat(e.target.value)}
                                                          // placeholder="30"
                                                          placeholder=" "
                                                          className="form-control"
                                                          id="flat"
                                                        />
                                                        <span>Квартира</span>
                                                    </label>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="item item--centered">
                                            {!newFormData.isAddress ? (
                                                <button
                                                    disabled={checkFormFields()}
                                                    className={`btn btn_blue ${checkFormFields() ? 'disabled' : ''}`}
                                                    onClick={(e) => sendData(e)}
                                                    type="submit"
                                                >
                                                    Далее
                                                </button>
                                            ) : (
                                                <NavLink
                                                    to={"/new_application-place-work"}
                                                    className={`btn btn_blue ${checkFormFields() ? 'disabled' : ''}`}
                                                >
                                                    Далее
                                                </NavLink>
                                            )}
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    );
};
