import React from 'react';
import './event-card.css';
import { likeEvent  } from '../../../constants/images';
import { useNavigate } from "react-router-dom";

function EventCard({ eventTitle, eventImg, eventDatetime, eventLocation, eventPrice }) {
    const freeEvent = (eventPrice == 0);
    let navigate = useNavigate();

    const routeChange = () => { 
        let path = `/event/` + eventTitle; 
        navigate(path);
    }

    /*
        Нужно будет придумать какой-то айди события или что-то в этом роде.
        Чтобы все работало поставил eventTitle, но это надо будет менять
    */
    
    return (
        <div className='EventCard' onClick={routeChange}>
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