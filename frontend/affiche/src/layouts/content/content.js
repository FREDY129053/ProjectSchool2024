import React from 'react';
import './content.css';
import { EventCarousel } from './event-carousel';
import { EventBanners } from './event-banners';
import { EventCatalog } from './event-catalog';
import { EventPage } from './event-page';
import { FavoriteEvents } from './favorite-events';

const eventData = {
    img: "./assets/examples/event-image.png",
    title: "Мюзикл \"Холодное сердце. Замороженные\"", 
    datetime: "3 ноября, 18:00",
    location: "концерт холл",
    price: "0"
}

const bannerData = {
    bgImg: "./assets/examples/banner-bg.png",
    bannerTitle: "Вечеринка Насти Ивлеевой"
}

const eventsData = Array.from({length: 18}, () => eventData);

const bannersData = Array.from({length: 6}, () => bannerData);

function Content({PageType}) {
    switch (PageType) {
        case "MainPage":
            return (
                <>
                <EventCarousel
                    eventsData={eventsData} />
                <EventBanners
                    bannersData={bannersData} />
                <EventCatalog
                    eventsData={eventsData} />
                </>
            );
            break;
        case "EventPage":
            return (
                <>
                <EventPage />
                </>
            );
            break;
        case "FavoriteEvents":
            return (
                <>
                <FavoriteEvents
                    eventsData={eventsData}
                />
                </>
            );
            break;
    }
}

export { Content };