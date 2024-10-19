import React from 'react';
import './event-card.css';

function EventCard({ eventTitle, eventImg, eventDatetime, eventLocation, eventPrice }) {
    const freeEvent = (eventPrice == 0);

    return (
        <div className='EventCard'>
            <img
                src={eventImg}
                alt={""}
            />
            <div className={'EventPrice ' + (freeEvent ? 'Free' : '')}>
                <b>{freeEvent ? 'бесплатно' : eventPrice}</b>
            </div>
            <div className='EventInfo'>
                <div className='EventTitle'>
                    <b>{eventTitle}</b> 
                </div>
                <div className='EventDatetime'>
                    {eventDatetime}
                </div>
                <div className='EventLocation'>
                    <b>{eventLocation}</b>
                </div>
            </div>
        </div>
    );
}

export { EventCard };