import React, { useState } from 'react';
import './auth-form.css';
import tgIcon from '../../../../assets/icons/media-icons/tg.svg';
import { TextInput } from '../../../../components/common/text-input';
import { BigButton } from '../../../../components/common/big-button';

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);

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
                />
                <div className='PasswordRecovery'>
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
                />
            </>
            }
        </div>
    );
}

export { AuthForm };