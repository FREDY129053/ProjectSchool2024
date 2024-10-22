import React, { useState } from 'react';
import './auth-form.css';
import tgIcon from '../../../../assets/icons/media-icons/tg.svg';
import { TextInput } from '../../../../components/common/text-input';
import { BigButton } from '../../../../components/common/big-button';
import warnIcon from '../../../../assets/icons/warn.svg';

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [isConfirm, setIsConfirm] = useState(false);
    
    function handleSubmitClick() {
        if (isLogin) {
            // тут должны быть проверки данных на наличие и все остальное
            setIsConfirm(true);
        } else if (!isConfirm) {
            // тут должны быть проверки данных на наличие и все остальное
            setIsConfirm(true);
        } else {
            // проверка кода и перенаправление еще куда-то
        }
    }

    const tgButtonStyle = {
        border: '1px solid #282828',
        backgroundColor: 'white',
        color: 'black',
        fontSize: '16px',
        width: 'calc(100% - 26px)',
        height: '40px',
    };
    
    const submitButtonStyle = {
        backgroundColor: '#4a9ae8',
        color: 'white',
        fontSize: '22px',
        width: 'calc(100% - 26px)',
        height: '40px',
        marginTop: '15px',
    };


    return (
        <div className='AuthForm'>
            {!isConfirm ?
                <>
                    <div className='FormToggle'>
                        <button 
                            className={'ToggleButton ' + (isLogin ? 'Active' : '')}
                            onClick={() => setIsLogin(true)}
                        >
                            <b>Войти с паролем</b>
                        </button>
                        <button 
                            className={'ToggleButton ' + (!isLogin ? 'Active' : '')}
                            onClick={() => setIsLogin(false)}
                        >
                            <b>Регистрация</b>
                        </button>
                    </div>
                    {isLogin ?
                    <>
                        <div className='Title'>
                            <b>Войти</b>
                        </div>
                        <BigButton 
                            text={'Войти через Телеграм'}
                            icon={tgIcon}
                            style={tgButtonStyle}
                        />
                        <div className="DividerText">
                            <span> <b>или</b> </span>
                        </div>
                        <TextInput 
                            title={'Телефон'}
                        />
                        <TextInput 
                            title={'Пароль'}
                            showVisibilitySwitch={true}
                        />
                        <BigButton 
                            text={'Получить код на телефон'}
                            icon={tgIcon}
                            style={submitButtonStyle}
                            onClick={handleSubmitClick}
                        />
                        <div className='SmallCenteredNote'>
                            Восстановить пароль
                        </div>
                    </>
                    :
                    <>
                        <div className='Title'>
                            <b>Регистрация</b>
                        </div>
                        <BigButton 
                            text={'Войти через Телеграм'}
                            icon={tgIcon}
                            style={tgButtonStyle}
                        />
                        <div className="DividerText">
                            <span> <b>или</b> </span>
                        </div>
                        <TextInput 
                            title={'Телефон'}
                        />
                        <BigButton 
                            text={'Получить код на телефон'}
                            icon={tgIcon}
                            style={submitButtonStyle}
                            onClick={handleSubmitClick}
                        />
                    </>
                    }
                </>
            :
                <>
                    <div className='Title NoTopMargin'>
                        <b>
                            {isLogin ?
                                <>Войти</>
                                :
                                <>Регистрация</>
                            }
                        </b>
                    </div>
                    <div className='Notifier'>
                        <img
                            src={warnIcon}
                            alt={''}
                            className='WarnImage'
                        />
                        <div className='NotifierMessage'>
                            <div className='NotifierText'>
                                SMS с кодом отправлено и должно прийти в течение 10 минут на указанный номер
                            </div>
                            <div className='PhoneNumber'>
                                +791****56-27
                            </div>
                        </div>
                    </div>
                    <TextInput
                        title={'Код из SMS'}
                    />
                    <BigButton
                        text={'Подтвердить код'}
                        style={submitButtonStyle}
                    />
                    <div className='SmallCenteredNote'>
                        Код не пришел
                    </div>
                </>
            }   
        </div>
    );
}

export { AuthForm };