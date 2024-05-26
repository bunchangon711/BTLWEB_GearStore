import { Image } from 'antd';
import React from 'react';
import { WrapperSliderSmallLeftStyle } from './style';

const SliderComponentSmall = ({ arrImages }) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
    };
    return (
        <WrapperSliderSmallLeftStyle {...settings}>
            {arrImages.map((image) => {
                return (
                    <Image key={image} src={image} alt="slider" preview={false} width="100%" height="300px"/>
                )
            })}
        </WrapperSliderSmallLeftStyle>
    )
}

export default SliderComponentSmall