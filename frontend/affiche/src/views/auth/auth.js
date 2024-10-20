import React from 'react';
import './auth.css';
import { Header } from '../../layouts/header';
import { AuthForm } from './components/auth-form';

function Auth() {
    return (
        <div className='Auth'>
            <Header 
                searchBar={false}
                userControls={false}
            />
            <AuthForm />
        </div>
    );
}

export { Auth };