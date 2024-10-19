import React from 'react';
import './event-carousel.css';
import { EventCard } from '../../../сomponents/common/event-card';
import { ScrollingCarousel } from '@trendyol-js/react-carousel';


function EventCarousel({ eventsData }) {
    return(
        <ScrollingCarousel>
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
        </ScrollingCarousel>
    );
}

export { EventCarousel };