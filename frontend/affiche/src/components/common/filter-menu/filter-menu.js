import React, { useState, useEffect, useRef } from 'react';
import './filter-menu.css';
import crossIcon from '../../../assets/icons/cross.svg';

const FilterMenu = ({ title, filters, style, buttonStyle, filterStyle, addFilter, removeFilter }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState([]);
    const menuRef = useRef(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const handleFilterClick = (index) => {
        if (activeFilters.includes(index)) {
            setActiveFilters(activeFilters.filter(i => i !== index));
            removeFilter(filters[index]);
        } else {
            setActiveFilters([...activeFilters, index]);
            addFilter(filters[index]);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            style={style}
            ref={menuRef}
            className='FilterMenu'
        >
            <button
                className='FilterMenuButton'
                onClick={handleToggle}
                style={buttonStyle}
            >
                {title}
            </button>
            {isOpen && (
                <div className='FilterList FadeInOut'>
                    {filters.map((filter, index) => (
                        <div
                            key={index}
                            style={filterStyle}
                            className={`Filter ${activeFilters.includes(index) ? 'Active' : ''}`}
                            onClick={() => handleFilterClick(index)}
                        >
                            {filter}
                            {activeFilters.includes(index) && (
                                <img
                                    src={crossIcon}
                                    alt={''}
                                    className='FilterIcon'
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export { FilterMenu };
