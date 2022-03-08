import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import {HashRouter,BrowserRouter} from "react-router-dom";//Hash
import {Provider} from "react-redux";
import {store} from './store/store'
import {instance} from "./server/agent";

fetch('/config.json').then(res => res.json()).then(conf => {
    instance.defaults.baseURL = conf.apiUrl;
    if (conf.useProxy){
        instance.defaults.proxy = conf.proxyUrl
    }
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );
});

