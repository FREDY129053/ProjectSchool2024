import React from 'react';
import './event-card.css';
import { likeEvent  } from '../../../constants/images';

function EventCard({ eventTitle, eventImg, eventDatetime, eventLocation, eventPrice }) {
    const freeEvent = (eventPrice == 0);

    return (
        <div className='EventCard'>
            <img
                src={eventImg}
                alt={""}
                className="EventImage"
            />
            <div className={'EventPrice ' + (freeEvent ? 'Free' : '')}>
                <b>{freeEvent ? 'бесплатно' : eventPrice}</b>
            </div>
            <div className="EventLike">
                <img src={likeEvent} className="EventLikeImg"/>
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