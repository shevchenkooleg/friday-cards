import React from 'react';
import s from "./Cards.module.css";
import PackTable from "./PackTable/PackTable";
import SearchCardBlock from './SearchCardBlock/SearchCardBlock';

const Cards = () => {
    return (
        <div className={s.container}>
            <h2>Pack name</h2>
            <SearchCardBlock/>
            <PackTable/>
        </div>
    );
};

export default Cards;