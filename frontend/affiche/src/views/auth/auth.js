import React from 'react';
import './auth.css';
import { Header } from '../../layouts/header';
import { AuthForm } from './components/auth-form';
import { FilterMenu } from '../../components/common/filter-menu';



function Auth() {

    const filters = [
        'балет',
        'кино',
        'опера',
        'вечеринка',
        'встреча',
        'интенсив',
        'спорт',
        'концерт',
        'балет',
        'кино',
        'опера',
        'вечеринка',
        'встреча',
        'интенсив',
        'спорт',
        'концерт',
    ]

    const menuStyle = {
        width: '200px',

    }

    const addFilter = (filter) => {
        console.log('Add filter:', filter);
    };

    const removeFilter = (filter) => {
        console.log('Remove filter:', filter);
    };


    return (
        <div className='Auth'>
            <Header 
                searchBar={false}
                userControls={false}
            />

            {/* раскоментить когда закончится верстка менюшки фильтров */}
            {/* <AuthForm /> */}

            {/* это временно, чтобы видеть верстку */}
            <FilterMenu 
                style={menuStyle}
                title={'Теги'}
                filters={filters}
                addFilter={addFilter}
                removeFilter={removeFilter}
            />
        </div>
    );
}

export { Auth };