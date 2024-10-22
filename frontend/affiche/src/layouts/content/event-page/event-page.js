/*
    
    Сейчас это просто голая верстка, плейсхолдер на плейсхолдере

*/

import React from "react";
import './event-page.css';
import {BigButton} from '../../../components/common/big-button';

function EventPage() {
    return (
        <>
        <div className="event-page">
            <div className="event-page-block wrapper">
                <div>
                    <img src="/assets/examples/image.png" className="event-image-poster" />
                </div>
                <div className="event-main-info wrapper">
                    <div className="event-info-title">
                        <div>Мюзикл "Холодное сердце. Зачарованный лес" во Владивостоке</div>
                        <div>
                            <img src="/assets/like-button-inactive.svg" className="event-like"></img>
                        </div>
                    </div>
                    <div className="event-info-tag">
                        <span>Название тега</span>
                        <span>0+</span>
                    </div>
                    <div className="event-info-place">
                        <span>
                            Место проведения
                        </span>
                        <span>
                            Калина Молл
                        </span>
                    </div>
                    <div className="event-info-rating">
                        <div className="event-likes event-rate">
                            <img src="/assets/icons/like-color.svg" className="event-rate-ico"/>
                            <span className="rating-text">55</span>
                        </div>
                        <div className="event-dislikes event-rate">
                            <img src="/assets/icons/dislike-color.svg" className="event-rate-ico"/>
                            <span className="rating-text">55</span>
                        </div>
                    </div>
                    <div className="big-button buy-tickets">
                        Купить билеты
                    </div>
                </div> 
            </div>
            <div className="event-schelude">
                <div className="wrapper">
                    <div className="event-schelude-title">
                        Расписание события
                    </div>

                    <div className="event-tickets">
                        <div className="event-ticket">
                            <div className="ticket-date">
                                <div className="date-big">
                                    20
                                </div>
                                <div className="date-small">
                                    октября
                                </div>
                            </div>
                            <div className="ticket-date-when">
                                СЕГОДНЯ
                            </div>
                            <div className="ticket-time">
                                10:00
                            </div>
                            <div className="ticket-place">
                                Место проведения, номер
                            </div>
                            <div className="ticket-button-price">
                                <BigButton
                                    text="от 2000р"
                                />
                            </div>
                        </div>
                        <div className="event-ticket">
                            <div className="ticket-date">
                                <div className="date-big">
                                    20
                                </div>
                                <div className="date-small">
                                    октября
                                </div>
                            </div>
                            <div className="ticket-date-when">
                                СЕГОДНЯ
                            </div>
                            <div className="ticket-time">
                                10:00
                            </div>
                            <div className="ticket-place">
                                Место проведения, номер
                            </div>
                            <div className="ticket-button-price">
                                <BigButton
                                    text="от 2000р"
                                />
                            </div>
                        </div>
                        <div className="event-ticket">
                            <div className="ticket-date">
                                <div className="date-big">
                                    20
                                </div>
                                <div className="date-small">
                                    октября
                                </div>
                            </div>
                            <div className="ticket-date-when">
                                СЕГОДНЯ
                            </div>
                            <div className="ticket-time">
                                10:00
                            </div>
                            <div className="ticket-place">
                                Место проведения, номер
                            </div>
                            <div className="ticket-button-price">
                                <BigButton
                                    text="от 2000р"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="event-page-block wrapper">
                        <div className="event-desc">
                            <div className="desc-title">
                                Описание
                            </div>
                            <div className="desc-text"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis hendrerit est vitae lorem posuere aliquam. Integer eros dui, posuere non molestie vel, dictum sit amet lacus. Aliquam viverra ligula ipsum, vitae laoreet enim pharetra non. In neque justo, dapibus sed viverra consectetur, vestibulum eu lorem</div>
                            <div className="desc-full-link">
                                <a href="#" className="full-link">Читать полностью</a>
                            </div>
                            <div className="desc-title">
                                Условия посещения события:
                            </div>
                            <div className="desc-text">1 билет действителен на 1 человека. Детям с любого возраста необходимо приобретать билет.</div>
                        </div>
                        <div className="event-map">
                            <iframe src="https://yandex.ru/map-widget/v1/?mode=search&text=Владивосток, ул. Калинина, 8" width="693" height="270" frameborder="1"/>
                            <span class="event-map-desc">Малая сцена Начало в 10:00 ул. Петра Великого, 8.</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        </>
    )
};

export { EventPage };