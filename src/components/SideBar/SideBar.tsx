import React from 'react';
import s from './SideBar.module.css'
import OwnCardsSelector from "./OwnCardsSelector/OwnCardsSelector";
import DoubleRange from "./DoubleRange/DoubleRange";

const SideBar = () => {
    return (
        <div className={s.content}>
            <OwnCardsSelector/>
            <DoubleRange/>
        </div>
    );
};

export default SideBar;