import axios from "axios";

export const instance = axios.create()


export const DictionariesApi = {
    getDictionaries() {
        return instance.get(`account/dictionaries`).then(res => res.data)
    }
}
export const ScanApi = {
    getDictionary () {
        return instance.get(`account/scan/getDictionary`).then(res => res.data)
    },
    checkScan(data) {
        return instance.post(`account/scan/check`, data).then(res => res.data)
    },
    getFile(id) {
        return instance.get(`account/scan/get`, id).then(res => res.data)
    },
    saveScan(data) {
        return instance.post(`account/scan/save`, data, {
            headers: {
                Accept: "application/json ,text/plain, */*",
                'Content-type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    removeScan(id) {
        return instance.post(`account/scan/remove`,{fileId: id}).then(res => res.data)
    }
}
export const FinancingApi = {
    getPaymentFrame() {
        return instance.get(`account/financing/addCardFrame?applicationId=20C60AA1-55AB-4AEF-9DBE-BC8D5020544D`).then(res => res.data)
    },
    addBankAccount(data) {
        return instance.post(`account/financing/addBankAccount`, data).then(res => res.data)
    },
    addWallet(data) {
        return instance.post(`account/financing/addWallet`, data).then(res => res.data)
    },
    findBank(input) {
        const params = new URLSearchParams();
        params.append('inputString', input);
        params.append('count', 20)
        return instance.get('dadata/findBank?' + params.toString());
    },
    getAvailableTypes(guid) {
        const params = new URLSearchParams();
        params.append('productId', guid);
        return instance.get('account/financing/availableTypes?' + params.toString());
    }
}
export const ProductApi = {
    getCalculatorSettings(id) {
        return instance.post(`account/product/calculatorSettings`, id).then(res => res.data)
    },
    setCalculatorSettings(settings) {
        return instance.post(`account/product/select`, settings).then(res => res.data)
    }
}
export const AccountApi = {
    getHeaderText() {
        return instance.get(`account/getHeaderText?contactId=20C60AA1-55AB-4AEF-9DBE-BC8D5020544D`).then(res => res.data)
    },
    redirectToLk() {
        return instance.post(`account/redirectToLk`, {url: ''}).then(res => res.data)
    },
    checkPhone(phone) {
        return (
            instance.post(`account/checkPhone`, phone).then(res => res.data)
        )
    },
    updatePhone(phone) {
        return (
            instance.post('account/phone/update', phone).then(res => res.data)
        )
    },
    setAdditionalProduct(id) {
        return instance.post('account/additionalProduct/select', {
            "applicationId": id
        }).then(res => res.data);
    },
    setAdditionalQuestions(values) {
        return instance.post('account/additionalQuestion/save', values).then(res => res.data);
    },
    getAdditionalQuestionsDictionary() {
        return instance.get('account/additionalQuestion/getDictionary');
    },
    getPersonalData() {
        return instance.get('account/personal').then(res => res.data)
    },
    savePersonalData(values) {
        return instance.post('account/personal', values).then(res => res.data)
    },
    getAdditionalInfo(values){
        return instance.post('account/additionalProduct/select', values).then(res => res.data)
    },
    findFirstName(name){
        return instance.post('account/name/findFirstName', name).then(res => res.data)
    },
    findLastName(name){
        return instance.post('account/name/findLastName', name).then(res => res.data)
    },
    findMiddleName(name){
        return instance.post('account/name/findMiddleName', name).then(res => res.data)
    },
    getSentCode(){
        return instance.get('account/getSendCode').then(res => res.data)
    }
}

export const AddressApi = {
    saveAddressData() {
        return instance.post('account/address/save').then(res => res.data)
    },
    getAddressData() {
        return instance.get('account/address/get').then(res => res.data);
    },
    findCities(query) {
        const params = new URLSearchParams();
        params.append('cityName', query);
        return instance.get('account/address/findCities?' + params.toString());
    },
    findRegion(region) {
        const params = new URLSearchParams();
        params.append('region', region);
        return instance.get('account/address/findRegion?' + params.toString());
    },
    findCity(city, parentguid) {
        const params = new URLSearchParams();
        params.append('city', city);
        params.append('parentguid', parentguid);
        return (
            instance.get('account/address/findCity?' + params.toString())
        )
    },
    findStreet(street, parentguid) {
        const params = new URLSearchParams();
        params.append('street', street);
        params.append('parentguid', parentguid);
        return (
            instance.get('account/address/findStreet?' + params.toString())
        )
    },
    findHouse(house, parentguid, kladrId) {
        const params = new URLSearchParams();
        params.append('house', house);
        params.append('parentguid', parentguid);
        params.append('parentKladrId', kladrId);
        return (
            instance.get('account/address/findHouse?' + params.toString())
        )
    }
}

export const PassportApi = {
    getPassportData() {
        return (
            instance.get('account/passport/get').then(res => res.data)
        )
    },
    sendPassport(passportData) {
        const data = {
            applicationId: '20C60AA1-55AB-4AEF-9DBE-BC8D5020544D',
            ...passportData,
        }
        return (
            instance.post(`account/passport/save`, data).then(res => res.data)
        )
    },
    sendAddressData(addressData) {
        return (
            instance.post(`account/address/save`, addressData).then(res => res.data)
        )
    },
    getWorkData() {
        return (instance.get(`account/employment/get`).then(res => res.data))
    },
    sendWorkData(workData) {
        return (
            instance.post(`account/employment/save`, workData).then(res => res.data)
        )
    },
    findFms(data) {
        return instance.post(`account/passport/findFms`, data).then(res => res.data)
    },
    getParty(data) {
        return instance.get(`account/employment/findParty?inputString={${data}}`).then(res => res.data)
    },
    getBusinessOptions() {
        return instance.get(`account/employment/getDictionary`).then(res => res.data)
    },
    checkSnils(snils) {
        return instance.post(`account/passport/сheckSumSnils`, {snils: snils}).then(res => res.data)
    },
    checkPassportDate(passportIssueDate) {
        return instance.post(`account/passport/checkIssueDate`, {passportIssueDate: passportIssueDate}).then(res => res.data)
    }
}

export const documentRulesApi = {
    documentsForPage() {
        return (
            instance.post(`account/documentRules/documentsForPage`, {
                formPageId: "31D08EE1-9249-4779-BB6E-408F2C3F418A",
                onlyNew: true
            })
        )
    },
}

export const OfferApi = {
    getOfferInfoText(id) {
        return (
            instance.get(`account/offer/getOfferInfoText?applicationId=20C60AA1-55AB-4AEF-9DBE-BC8D5020544D`)
        )
    },
    getPaymentShortOfferFile(id) {
        return (
            instance.get(`account/offer/getPaymentShortOfferFile?applicationId=20C60AA1-55AB-4AEF-9DBE-BC8D5020544D`)
        )
    },
    getPendingMessage() {
        return (
            instance.get('account/offer/getPendingText')
        )
    },
    getPendingTime() {
        return (
            instance.get('account/offer/getPendingTime')
        )
    },
    requestCode(contactId) {
        return (
            instance.post('account/offer/sendAspCode', {
                contactId: '20C60AA1-55AB-4AEF-9DBE-BC8D5020544D'
            })
        )
    },
    requestCodeResend(contactId) {
        return (
            instance.post('account/offer/resendAspCode', {
                approvalCodeId: '20C60AA1-55AB-4AEF-9DBE-BC8D5020544D'
            })
        )
    },
    saveAndSend(codeId, code) {
        return (
            instance.post('account/offer/savePaymentOfferAndSendToConsideration', {
                codeId: codeId,
                code: code,
                applicationId: '20C60AA1-55AB-4AEF-9DBE-BC8D5020544D',
            })
        )
    }
}

export const MessageApi = {
    requestCode(contactId) {
        return (
            instance.post('message/SendAuthorizationCode', {
                contactId: '20C60AA1-55AB-4AEF-9DBE-BC8D5020544D'
            })
        )
    },
    checkCode(code) {
        return (
            instance.post('message/CheckApprovalCode', {
                approvalCodeId: "20C60AA1-55AB-4AEF-9DBE-BC8D5020544D",
                enteredCode: code,
            })
        )
    },
    requestCodeResend(contactId) {
        return (
            instance.post('message/ResendApprovalCode', {
                approvalCodeId: '20C60AA1-55AB-4AEF-9DBE-BC8D5020544D'
            })
        )
    }
}

export const RegistrationApi = {
    createContact(data){
        return instance.post('account/registration/createContact', data)
    },
    sendCode(data) {
        return instance.post('account/registration/sendCode', data)
    },
    resendCode(userId) {
        return instance.post('account/registration/resendCode', userId)
    },
    checkCode(data) {
        return instance.post('account/registration/checkCode', data)
    },
}

export const AuthorizationApi = {
    login(data) {
        return instance.post('auth/login', {
            ...data,
        })
    }
}
