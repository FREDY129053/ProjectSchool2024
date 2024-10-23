import React from 'react';
import './event-catalog.css';
import { EventCard } from '../../../components/common/event-card';
import { BigButton } from '../../../components/common/big-button';
import { ActiveFilter } from '../../../components/common/active-filter';
import { CatalogFilter } from '../../../components/common/catalog-filter';

function EventCatalog( {eventsData} ) {
    return (
        <div className="event-catalog">
            <div className="wrapper">
                <div className="event-catalog-header">
                    <div className="event-catalog-title">
                            Каталог событий 
                    </div>
                    <div className="event-catalog-filters">
                        
                        <CatalogFilter
                            text="Теги"
                            icon="/assets/icons/filter-icons/arrow-down.svg"
                        />
                    </div>
                </div>
                <div className="event-catalog-active-filters">
                            <ActiveFilter
                                title="Название фильтра"
                            />
                </div>

                <div className="event-catalog-list">
                        {eventsData.map((eventData, index) => (
                            <EventCard 
                                key={index}
                                eventImg={eventData.img}
                                eventTitle={eventData.title}
                                eventDatetime={eventData.datetime}
                                eventLocation={eventData.location}
                                eventPrice={eventData.price}
                            />
                    ))}
                </div>

                <div className="catalog-showmore">
                    <BigButton
                        text="Показать ещё"
                    />
                </div>
            </div>
        </div>
    )
}

export { EventCatalog };