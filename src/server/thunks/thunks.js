import {
    AccountApi,
    PassportApi,
    ProductApi,
    FinancingApi,
    AddressApi,
    RegistrationApi,
    AuthorizationApi,
    DictionariesApi
} from "../agent";
import {LoanActionCreators, NewFormActionCreators, RegistrationActionCreators} from "../../store/action-creators";

export const checkPhoneThunk = (phone) => {
    return async (dispatch) => {
        try {
            const response = await AccountApi.checkPhone(phone);
            console.log(response, "response");
            // dispatch(...)
        } catch (e) {
            console.error(e);
        }
    };
};

export const sendPassportThunk = (passportData) => {
    return async (dispatch) => {
        try {
            const response = await PassportApi.sendPassport(passportData);

            if (!response.result) {
                dispatch(
                    NewFormActionCreators.setErrors({
                        isError: true,
                        errorCode: response.errorCode,
                        errorMessage: response.errorMessage,
                    })
                );
                dispatch(NewFormActionCreators.setResult(response.result));
            } else {
                dispatch(NewFormActionCreators.setResult(response.result));
                dispatch(NewFormActionCreators.setIsPassport(true));
            }
        } catch (e) {
            console.error(e);
        }
    };
};

export const sendAddressDataThunk = (addressData) => {
    return async (dispatch, getState) => {
        try {
            console.log('Отправил', addressData)
            let cityData = await AddressApi.findCity(addressData.city);
            cityData = cityData.data
            if (cityData.suggestions.length < 1) throw new Error('Город не найден.')
            cityData = cityData.suggestions[0];

            let streetData = await AddressApi.findStreet(
                addressData.street,
                cityData.data.city_fias_id,
            );
            streetData = streetData.data.suggestions[0];


            console.log('cityData', cityData)
            console.log('streetData', streetData)

            const data = {
                applicationId: getState().newFormReducer.applicationId,
                registrationAddress: {
                    regionCode: cityData.data.region_kladr_id,
                    regionName: addressData.region,
                    regionAoGuid: cityData.data.region_fias_id,
                    city: cityData.value,
                    cityScName: cityData.data.city_type,
                    houseBuilding: addressData.frame,
                    flatNumber: addressData.flat,
                    street: streetData.value,
                    streetScName: streetData.data.street_type,
                    streetAoGuid: streetData.data.street_fias_id,
                    house: addressData.home,

                    cityAoGuid: cityData.data.city_fias_id,
                    postalCode: cityData.data.postal_code || '444444',
                },
                residenceAddress: {
                    regionCode: cityData.data.region_kladr_id,
                    regionName: addressData.region,
                    regionAoGuid: cityData.data.region_fias_id,
                    city: cityData.value,
                    cityScName: cityData.data.city_type,
                    cityAoGuid: cityData.data.city_fias_id,
                    street: streetData.value,
                    streetScName: streetData.data.street_type,
                    streetAoGuid: streetData.data.street_fias_id,
                    house: addressData.home,
                    houseBuilding: addressData.frame,
                    flatNumber: addressData.flat,
                    postalCode: cityData.data.postal_code || '444444',
                },
                // residenceAddress: {
                //     regionCode: cityData.data.region_kladr_id,
                //     regionName: addressData.region,
                //     regionId: cityData.data.region_fias_id,
                //     city: cityData.value,
                //     cityScName: cityData.data.city_type,
                //     // cityAoGuid: fetchedAddressData.residenceAddress.cityAoGuidm,
                //     street: streetData.value,
                //     streetScName: streetData.data.street_type,
                //     // streetAoGuid:
                //     house: addressData.home,
                //     houseBuilding: addressData.frame,
                //     flatNumber: addressData.flat,
                //     postalCode: cityData.data.postal_code,
                // },
            };

            const response = await PassportApi.sendAddressData(data);

            console.log(response)


            if (!response.response) {
                dispatch(
                    NewFormActionCreators.setErrors({
                        isError: true,
                        errorCode: response.errorCode,
                        errorMessage: response.errorMessage,
                    })
                );
                dispatch(NewFormActionCreators.setResult(response.result));
            } else {
                dispatch(NewFormActionCreators.setResult(response.result));
                dispatch(NewFormActionCreators.setIsAddress(true));
            }
        } catch (e) {
            console.error(e);
        }
    };
};

export const findRegionThunk = (key, query) => {
    return async dispatch => {
        try {
            const results = await AddressApi.findRegion(query);
            dispatch(NewFormActionCreators.setCompletions(key, results.data.suggestions))
            return results;
        } catch (e) {
            console.error(e);
        }
    }
}

export const findCitiesThunk = (key, query, guid) => {
    return async dispatch => {
        try {
            const results = await AddressApi.findCity(query, guid);
            dispatch(NewFormActionCreators.setCompletions(key, results.data.suggestions))
            return results;
        } catch (e) {
            console.error(e);
        }
    }
}

export const findStreetThunk = (key, query, guid) => {
    return async dispatch => {
        try {
            const results = await AddressApi.findStreet(query, guid)
            dispatch(NewFormActionCreators.setCompletions(key, results.data.suggestions));
            return results;
        } catch (e) {
            console.error(e);
        }
    }
}

export const findHouseThunk = (key, query, parentguid, kladrId) => {
    return async dispatch => {
        try {
            const results = await AddressApi.findHouse(query, parentguid, kladrId)
            dispatch(NewFormActionCreators.setCompletions(key, results.data.suggestions));
            return results;
        } catch (e) {
            console.error(e);
        }
    }
}

export const sendWorkDataThunk = (workData) => {
    return async (dispatch) => {
        try {
            const response = await PassportApi.sendWorkData(workData);

            if (!response.result) {
                dispatch(
                    NewFormActionCreators.setErrors({
                        isError: true,
                        errorCode: response.errorCode,
                        errorMessage: response.errorMessage,
                    })
                );
                dispatch(NewFormActionCreators.setResult(response.result));
            } else {
                dispatch(NewFormActionCreators.setResult(response.result));
                dispatch(NewFormActionCreators.setIsWork(true));
            }
        } catch (e) {
            console.error(e);
        }
    };
};

export const getCalculatorSettingsThunk = (id) => {
    return async (dispatch) => {
        try {
            const response = await ProductApi.getCalculatorSettings(id);
            if (response) {
                dispatch(
                    NewFormActionCreators.setAvailablePayment(
                        response?.availableFinancingInstrumentTypes
                    )
                );
                dispatch(
                    NewFormActionCreators.setCalculatorSettings(
                        response
                    )
                );
            } else {
                dispatch(
                    NewFormActionCreators.setErrors({
                        isError: true,
                        errorCode: response.errorCode,
                        errorMessage: response.errorMessage,
                    })
                );
            }
        } catch (e) {
            console.error(e);
        }
    };
};

export const addBankAccountThunk = (data) => {
    return async (dispatch, getState) => {
        try {
            const response = await FinancingApi.addBankAccount({
                ...data,
                applicationId: getState().newFormReducer.applicationId,
            });
            if (response) {
                dispatch(NewFormActionCreators.addBankAccountSuccess(response?.result));
            } else {
                dispatch(
                    NewFormActionCreators.setErrors({
                        isError: true,
                        errorCode: response.errorCode,
                        errorMessage: response.errorMessage,
                    })
                );
            }
        } catch (e) {
            console.error(e);
        }
    };
};

export const addWalletThunk = (data) => {
    return async (dispatch) => {
        try {
            const response = await FinancingApi.addWallet(data);
            if (response) {
                dispatch(NewFormActionCreators.addWalletSuccess(response?.result));
            } else {
                dispatch(
                    NewFormActionCreators.setErrors({
                        isError: true,
                        errorCode: response.errorCode,
                        errorMessage: response.errorMessage,
                    })
                );
            }
        } catch (e) {
            console.error(e);
        }
    };
};

export const sendAdditionalQuestions = (values) => {
    return async (dispatch) => {
        try {
            let dictionary = await AccountApi.getAdditionalQuestionsDictionary();
            dictionary = dictionary.data.entity;
            const claimAim =
                values.aims === "personal"
                    ? dictionary.claimAimTypes[1]
                    : dictionary.claimAimTypes[0];
            const financialAim =
                values.financialAndEconomicActivities === "no"
                    ? dictionary.financialAimTypes[0]
                    : dictionary.financialAimTypes[1];
            const financialPosition =
                values.financialStatus === "undefined"
                    ? dictionary.financialPositionTypes[0]
                    : values.financialStatus === "bad"
                    ? dictionary.financialPositionTypes[1]
                    : dictionary.financialPositionTypes[2];
            const reputationRating =
                values.reputation === "undefined"
                    ? dictionary.reputationRatingTypes[0]
                    : values.reputation === "bad"
                    ? dictionary.reputationRatingTypes[1]
                    : dictionary.reputationRatingTypes[2];

            const id = "20C60AA1-55AB-4AEF-9DBE-BC8D5020544D";

            const data = {
                applicationId: "20C60AA1-55AB-4AEF-9DBE-BC8D5020544D",
                citizenship: {
                    name: values.citizenship,
                    id,
                    entityType: "test",
                },
                claimAim: {
                    entityType: "test",
                    name: claimAim.name,
                    id: claimAim.id,
                },
                claimAimAnnotation: "",
                financialAim: {
                    entityType: "test",
                    name: financialAim.name,
                    id: financialAim.id,
                },
                financialAimAnnotation: "",
                financialPosition: {
                    entityType: "test",
                    name: financialPosition.name,
                    id: financialPosition.id,
                },
                reputationRating: {
                    entityType: "test",
                    name: reputationRating.name,
                    id: reputationRating.id,
                },
                contactPublicOfficialAffiliationList: [], // пока что
                representativeList: [], // пока что
                relativeList: [], // пока что
                beneficiarOwnerList: [], // пока что
                beneficiarList: [], // пока что
                entityType: "test",
                id: "20C60AA1-55AB-4AEF-9DBE-BC8D5020544D",
            };
            const response = await AccountApi.setAdditionalQuestions(data);

            if (response.response) {
            }
        } catch (e) {
            console.error(e);
        }
    };
};

export const getAdditionalQuestionsDictionary = () => {
    return async (dispatch) => {
        try {
            let result = await AccountApi.getAdditionalQuestionsDictionary();
            if (!result.data.result) throw new Error("Ошибка при получения словаря дополнительных вопросов.")
            dispatch(NewFormActionCreators.setAdditionalQuestionsDictionary(result.data.data))
        } catch (e) {
            console.error(e);
        }
    }
}

export const loginThunk = (data) => {
    return async (dispatch) => {
        let result = await AuthorizationApi.login(data);

        return result;
    }

}
export const getDictionariesThunk = () => {


    return async (dispatch) => {

        try {
            const response = await DictionariesApi.getDictionaries();

            if (response) {
                dispatch(
                    NewFormActionCreators.setDictionaries(
                        response.dictionaries
                    )
                );
            } else {
                dispatch(
                    NewFormActionCreators.setErrors({
                        isError: true,
                        errorCode: response.errorCode,
                        errorMessage: response.errorMessage,
                    })
                );
            }
        } catch (e) {
            console.error(e);
        }
    };
}

export const findBankThunk = (bank, key) => {
    return async dispatch => {
        const result = await FinancingApi.findBank(bank);
        if (result.data.daDataResult.suggestions) {
            dispatch(NewFormActionCreators.setCompletions(key, result.data.daDataResult.suggestions));
        }
    }
}

export const getAvailableTypesThunk = () => async (dispatch, getState) => {
  const id = getState().newFormReducer.calculatorSettings.selectedProduct.productId;
  if (!id) {
    return
  }
  const result = await FinancingApi.getAvailableTypes(id);
  dispatch(NewFormActionCreators.setAvailableTypes(result.data.availableTypes))
}
export const sendCalculatorSettings = (calcData) => {
    return async (dispatch) => {
        try {
            const response = await ProductApi.setCalculatorSettings(calcData);

            if (response.result) {
                dispatch(LoanActionCreators.setRefundAmount(response.selectedProduct.fullOfferSum));
                dispatch(LoanActionCreators.setLoanAmount(response.selectedProduct.offerSum));
                dispatch(LoanActionCreators.setTermAmount(response.selectedProduct.offerPeriod));
                dispatch(LoanActionCreators.setPeriodType(response.selectedProduct.periodTypeId));
                dispatch(LoanActionCreators.setOverpaymentAmount(response.selectedProduct.fullOfferSum - response.selectedProduct.offerSum));

            } else {
                dispatch(
                    NewFormActionCreators.setErrors({
                        isError: true,
                        errorCode: response.errorCode,
                        errorMessage: response.errorMessage,
                    })
                );
            }
        } catch (e) {
            console.error(e);
        }
    };
};


export const findFirstNameThunk = (key, query) => {
    return async dispatch => {
        try {
            const results = await AccountApi.findFirstName(query);
            dispatch(NewFormActionCreators.setCompletions(key, results.daDataResult.suggestions))
            return results;
        } catch (e) {
            console.error(e);
        }
    }
}

export const findLastNameThunk = (key, query) => {
    return async dispatch => {
        try {
            const results = await AccountApi.findLastName(query);
            dispatch(NewFormActionCreators.setCompletions(key, results.daDataResult.suggestions))
            return results;
        } catch (e) {
            console.error(e);
        }
    }
}

export const findMiddleNameThunk = (key, query) => {
    return async dispatch => {
        try {
            const results = await AccountApi.findMiddleName(query);
            dispatch(NewFormActionCreators.setCompletions(key, results.daDataResult.suggestions))
            return results;
        } catch (e) {
            console.error(e);
        }
    }
}



export const sendRegistrationCodeThunk = (data) => {
    return async (dispatch) => {
        let response = await RegistrationApi.sendCode(data);
        if (!response.data.result){
            dispatch(
                RegistrationActionCreators.setRegistrationErrors({
                    isError: true,
                    errorCode: response.data.errorCode,
                    errorMessage: response.data.errorMessage,
                })
            )
        } else {

        }

        return response.data;
    }
}

export const checkRegistrationCodeThunk = (data) => {
    return async (dispatch) => {
        let response = await RegistrationApi.checkCode(data);
        if (!response.data.result){
            dispatch(
                RegistrationActionCreators.setRegistrationErrors({
                    isError: true,
                    errorCode: response.data.errorCode,
                    errorMessage: response.data.errorMessage,
                })
            )
        } else {

        }
        return response.data;
    }
}

export const resendRegistrationCodeThunk = (data) => {
    return async (dispatch) => {
        let response = await RegistrationApi.resendCode(data);
        if (!response.data.result){
            dispatch(
                RegistrationActionCreators.setRegistrationErrors({
                    isError: true,
                    errorCode: response.data.errorCode,
                    errorMessage: response.data.errorMessage,
                })
            )
        } else {
            dispatch(RegistrationActionCreators.setRegistrationCodes({codeId: response.data.codeId}))
        }
        return response.data;
    }
}

export const createTempContactThunk = (query) => {
    return async dispatch => {
        try {
            const response = await RegistrationApi.sendCode(query);
            if (!response.data.result) {

                dispatch(
                    RegistrationActionCreators.setRegistrationErrors({
                        isError: true,
                        errorCode: response.data.errorCode,
                        errorMessage: response.data.errorMessage,
                    })
                );
            }
            return response;
        } catch (e) {
            console.error(e);
        }
    }
}


export const createContactThunk = (query) => {
    return async dispatch => {
        try {
            const response = await RegistrationApi.createContact(query);
            console.log(response)
            if (!response.data.result) {
                dispatch(
                    RegistrationActionCreators.setRegistrationErrors({
                        isError: true,
                        errorCode: response.data.errorCode,
                        errorMessage: response.data.errorMessage,
                    })
                );
            }
            return response;
        } catch (e) {
            console.error(e);
        }
    }
}




