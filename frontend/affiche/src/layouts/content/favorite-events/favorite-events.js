import React from "react";
import './favorite-events.css';
import { EventCard } from "../../../components/common/event-card";

function FavoriteEvents( {eventsData} ) {
    return (
        <>
        <div className="favorite-events">
            <div className="favorite-events-header">
                Избранное
            </div>
            <div className="favorite-events-block">
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
        </div>
        </>
    )
}

export {FavoriteEvents};