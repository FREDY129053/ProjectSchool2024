import React from 'react';
import './event-carousel.css';
import { EventCard } from '../../../components/common/event-card';
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import { recomendationsTitle } from '../../../constants';

function EventCarousel({ eventsData }) {
    return(
        <div className="content-container">
            <h1 className="content-title">
                {recomendationsTitle}
            </h1>
            <ScrollingCarousel className='EventCarousel'>
                <div className='Indent'></div>
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
                <div className='Indent'></div>
            </ScrollingCarousel>
        </div>
    );
}

export { EventCarousel };