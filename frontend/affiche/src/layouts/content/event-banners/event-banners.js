import React from 'react';
import { EventBanner } from '../../../components/common/event-banner';
import { interestingTitle } from '../../../constants';
import './event-banners.css';

function EventBanners({bannersData}) {
    return (
        <>
        <div className="content-container">
            <h1 className="content-title">
                {interestingTitle}
            </h1>
            <div className="banners">
                {bannersData.map((bannerData, index) => (
                    <EventBanner
                        bgImg={bannerData.bgImg}
                        title={bannerData.bannerTitle}
                    />
                ))}
            </div>
        </div>
        </>
    )
}

export { EventBanners };