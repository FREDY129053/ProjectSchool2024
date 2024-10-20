import React from 'react';
import { Banner } from '../../../components/common/banner';
import { interestingTitle } from '../../../constants';
import './banners.css';

function Banners({bannersData}) {
    return (
        <>
        <div className="content-container">
            <h1 className="content-title">
                {interestingTitle}
            </h1>
            <div className="banners">
                {bannersData.map((bannerData, index) => (
                    <Banner
                        bgImg={bannerData.bgImg}
                        title={bannerData.bannerTitle}
                    />
                ))}
            </div>
        </div>
        </>
    )
}

export { Banners };