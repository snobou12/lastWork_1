import React, {useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import {routes} from './router';
import {ButtonCallback} from "../components/ButtonCallback";

export const AppRouter = () => {

    useEffect(() => {

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = "//cs15.livetex.ru/js/client.js";

        let c = document['getElementsByTagName']('script')[0];
        if (c)
            c['parentNode']['insertBefore'](script, c);
        else
            document['documentElement']['firstChild']['appendChild'](script);

        // document.body.appendChild(script);
        //
        // return () => {
        //     document.body.removeChild(script);
        // }
    }, []);

    return (
      <div className={"body"}>
          <Switch>
              {routes.map(route => <Route key={route.id} path={route.path} exact={route.exact} component={route.component}/>)}
          </Switch>
          <ButtonCallback />
      </div>
    );
};
