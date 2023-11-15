import React from 'react';
import Slider from '@mui/material/Slider';


function PositionSlider({
    handleChangePosition,
    handleChangeScale,
    handleChangeTransformRotateX
}){

    return (
        <div className="settings_container">
            <div className="translate_button_container">
                <div className='vertical_container'>
                    <div className='translate_button' onClick={() => handleChangePosition('up')}>
                        <p className="utf-symbol">&#9650;</p>
                    </div>
                </div>
                <div className='horizontal_container'>
                    <div className='translate_button' onClick={() => handleChangePosition('left')}>
                        <p className="utf-symbol">&#9664;</p>
                    </div>
                    {/* adjusting the poisition back to the original */}
                    <div className='translate_button' onClick={() => handleChangePosition('return')}>
                        <p className="utf-symbol">&#9679;</p>
                    </div>
                    <div className='translate_button' onClick={() => handleChangePosition('right')}>
                        <p className="utf-symbol">&#9654;</p>
                    </div>
                </div>
                <div className='vertical_container'>
                    <div className='translate_button' onClick={() => handleChangePosition('down')}>
                        <p className="utf-symbol">&#9660;</p>
                    </div>
                </div>
            </div>
            <div className="size_button" onClick={() => handleChangeScale('increase')}>
                <p className="utf-symbol2">&#43;</p>
            </div>
            <div className="size_button" onClick={() => handleChangeScale('decrease')}>
                <p className="utf-symbol2">&#8722;</p>
            </div>
            <div className="slider_container">
                <Slider
                    orientation="vertical"
                    defaultValue={45}
                    aria-labelledby="vertical-slider"
                    onChange={handleChangeTransformRotateX}
                    max={80}
                />
            </div>

        </div>
    )
}

export default PositionSlider;
