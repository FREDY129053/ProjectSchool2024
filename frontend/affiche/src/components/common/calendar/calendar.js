import React from "react";
import './calendar.css';

function Calendar() {
    return (
        <>
            <div className="Calendar">
                <div className="Calendar-header">
                    <div className="Calendar-header-button">
                        <img src="/assets/icons/left-arrow.svg"/>
                    </div>
                    <div className="Calendar-header-text">Октябрь 2024</div>
                    <div className="Calendar-header-button">
                    <img src="/assets/icons/right-arrow.svg"/>
                    </div>
                </div>
                <div className="Calendar-body">
                    <div className="Calendar-tips">
                        <div className="Calendar-tip">MON</div>
                        <div className="Calendar-tip">TUE</div>
                        <div className="Calendar-tip">WED</div>
                        <div className="Calendar-tip">THU</div>
                        <div className="Calendar-tip">FRI</div>
                        <div className="Calendar-tip">SAT</div>
                        <div className="Calendar-tip">SUN</div>
                    </div>
                    <div className="Calendar-dates">
                        <div className="Calendar-date">1</div>
                        <div className="Calendar-date">2</div>
                        <div className="Calendar-date">3</div>
                        <div className="Calendar-date">4</div>
                        <div className="Calendar-date">5</div>
                        <div className="Calendar-date">6</div>
                        <div className="Calendar-date">7</div>
                        <div className="Calendar-date">8</div>
                        <div className="Calendar-date">9</div>
                        <div className="Calendar-date">10</div>
                        <div className="Calendar-date">12</div>
                        <div className="Calendar-date">13</div>
                        <div className="Calendar-date">14</div>
                        <div className="Calendar-date">15</div>
                        <div className="Calendar-date">16</div>
                        <div className="Calendar-date">17</div>
                        <div className="Calendar-date">18</div>
                        <div className="Calendar-date">19</div>
                        <div className="Calendar-date">20</div>
                        <div className="Calendar-date">21</div>
                        <div className="Calendar-date">22</div>
                        <div className="Calendar-date">23</div>
                        <div className="Calendar-date">24</div>
                        <div className="Calendar-date">25</div>
                        <div className="Calendar-date">26</div>
                        <div className="Calendar-date">27</div>
                        <div className="Calendar-date">28</div>
                        <div className="Calendar-date">29</div>
                        <div className="Calendar-date">30</div>
                        <div className="Calendar-date">31</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export { Calendar };