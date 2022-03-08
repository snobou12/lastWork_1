import React from 'react';
import denied from '../../img/denied.png'

export const RegistrationRefusal = () => {
    return (
        <main className="page-registration">
            <form action="" className="form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 registration-col">
                            <div className="denied text-center">
                                <img src={denied} alt="denied"/>
                                    <div className="denied-text">Завершение регистрации невозможно, обратитесь по
                                        телефону:
                                    </div>
                                    <a href="tel:" className="denied-phone">8-499-951-91-80</a>
                            </div>

                        </div>


                    </div>
                </div>
            </form>
        </main>
    );
};
