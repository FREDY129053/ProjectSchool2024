import React from 'react';
import './search-bar.css';

function SearchBar() {
    return (
        <div className='SearchBar'>
            <input type="text" placeholder="Поиск в каталоге" className="searchbar-input"></input>
        </div>
    );
}

export { SearchBar };