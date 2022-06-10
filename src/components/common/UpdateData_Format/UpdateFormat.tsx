import React from 'react';
import s from './UpdateDataFormat.module.css'
type UpdateFormatPropsType = {
    time: string
}

export const UpdateFormat = ({time}:UpdateFormatPropsType) => {
    return (
        <div>
            <span><span>{time.match(/(\d+\-)+\d+/g)}</span>
                 (<span className={s.time}>{time.match(/(\d+\:)+(\d+)+(\d+)/g)}</span>)</span>
        </div>
    );
};

