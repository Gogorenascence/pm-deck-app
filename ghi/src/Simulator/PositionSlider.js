import React, {useRef, useState} from 'react';
import Slider from '@mui/material/Slider';
import { useDraggable } from '../display/Draggable';


function PositionSlider({
    handleChangePosition,
    handleChangeScale,
    handleChangeTransformRotateX
}){

    const [show, setShow] = useState(true)

    return (
        <div className='position-container'>
            {show?
                <div className="settings_container">
                    <p className='lock pointer' onClick={() => setShow(false)}>[Hide]</p>
                {/* <div className={show? null: "hidden2"}> */}
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
                {/* </div> */}
                </div>
            :
            <div className="no_settings_container">
                <p className='lock pointer' onClick={() => setShow(true)}>[Show]</p>
            </div>}
        </div>
    )
}

export default PositionSlider;
