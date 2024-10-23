import React, { useState, useEffect, useRef } from 'react';
import './filter-menu.css';
import crossIcon from '../../../assets/icons/cross.svg';
import arrowDownIcon from '../../../assets/icons/arrow-down.svg';

const FilterMenu = ({ title, filters, style, buttonStyle, filterStyle, addFilter, removeFilter }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState([]);
    const [rotateAngle, setRotateAngle] = useState(0);
    const menuListRef = useRef(null);
    const menuRef = useRef(null);

    const handleToggle = (event) => {
        event.stopPropagation();
        setIsOpen(!isOpen);
        setRotateAngle(prevAngle => prevAngle + 180);
    };

    const handleClickOutside = (event) => {
        if (menuListRef.current && !menuListRef.current.contains(event.target) && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
            setRotateAngle(prevAngle => prevAngle + 180);
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
            className='FilterMenu'
        >
            <button
                className='FilterMenuButton MenuStyledBox'
                onClick={handleToggle}
                style={buttonStyle}
                ref={menuRef}
            >
                {title}
                <img
                    src={arrowDownIcon}
                    alt={''}
                    className='ArrowIcon'
                    style={{ transform: `rotate(${rotateAngle}deg)` }}
                />
            </button>
            {isOpen && (
                <div
                    className={`FilterList MenuStyledBox`}
                    ref={menuListRef}
                >
                    {filters.map((filter, index) => (
                        <div
                            key={index}
                            style={filterStyle}
                            className={`Filter MenuStyledBox ${activeFilters.includes(index) ? 'Active' : ''}`}
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
