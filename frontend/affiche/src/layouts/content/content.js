import React from 'react';
import './content.css';
import { EventCarousel } from './event-carousel';
import { Banners } from './banners';

const eventData = {
    img: "./assets/examples/event-image.png",
    title: "Мюзикл \"Холодное сердце. Замороженные\"", 
    datetime: "3 ноября, 18:00",
    location: "концерт холл",
    price: "0"
}

const bannerData = {
    bgImg: "./assets/examples/banner-bg.png",
    bannerTitle: "IX Международный Дальневосточный Фестиваль \"Мариинский\""
}

const eventsData = Array.from({length: 15}, () => eventData);

const bannersData = Array.from({length: 6}, () => bannerData);

function Content({ recomendationsTitle, interestingTitle, catalogTitle }) {
    return (
        <>
        <EventCarousel
            eventsData={eventsData} />
        <Banners
            bannersData={bannersData} />
        </>
    );
}

export { Content };